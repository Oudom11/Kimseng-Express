import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, MapPin, Users, Phone, Mail, Clock, DollarSign, Bus, Search, Hourglass } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useNavigate, useLocation } from 'react-router-dom';
// import { useLanguage } from '../context/LanguageContext';
import { useToast } from "@/hooks/use-toast";
import { CardSkeleton } from '@/components/ui/skeleton';
import { useBooking } from '../context/BookingContext';
import axios from "axios";
import { a } from 'node_modules/framer-motion/dist/types.d-CtuPurYT';

const Booking = () => {
  const navigate = useNavigate();
  // const { t } = useLanguage();

const t = (key: string, vars?: Record<string, any>) => {
  if (vars) {
    // If there’s only one variable, return its value
    const values = Object.values(vars);
    if (values.length === 1) {
      return String(values[0]);
    }
    // Otherwise show key + values
    return `${key} ${JSON.stringify(vars)}`;
  }
  return key;
};


  const { toast } = useToast();
  const location = useLocation();
  // const { generateNextBookingId } = useBooking();
  const { addBooking, generateNextBookingId } = useBooking();


  const { prefilledData } = (location.state || {}) as {
    prefilledData?: {
      from: string;
      to: string;
      departureDate: Date | undefined;
      passengers: string;
    };
  };

  const [formData, setFormData] = useState({
    from: prefilledData?.from || "",
    to: prefilledData?.to || "",
    departureDate: prefilledData?.departureDate || undefined,
    returnDate: undefined as Date | undefined,
    tripType: "one-way",
    departureTime: "",
    passengers: prefilledData?.passengers || "1",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: ""
  });


   const [availableTrips, setAvailableTrips] = useState<any[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
   const [selectedVehicles, setSelectedVehicles] = useState<{ [tripId: number]: any }>({});


  // Options from APIs


  const [cities, setCities] = useState<string[]>([]);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [tripTypes, setTripTypes] = useState<string[]>([]);
   const [seats, setSeats] = useState<{ id: number; number: string; available: number }[]>([]);
  const [times, setTimes] = useState<string[]>([]);
  const [routes, setRoutes] = useState<string[]>([]);
  const [hasSearched, setHasSearched] = useState(false); 
  

useEffect(() => {
  const fetchData = async () => {
    try {
      const [timeRes, cityRes , seatsRes,tripTypesRes,vehiclesRes ] = await Promise.all([
        axios.get("https://su24.34.juicyjisu.us/api/times"),
        axios.get("https://su24.34.juicyjisu.us/api/cities"),
        axios.get("https://su24.34.juicyjisu.us/api/seat"),
        axios.get("https://su24.34.juicyjisu.us/api/triptype"),
        axios.get("https://su24.34.juicyjisu.us/api/vehicles")

        
      ]);

      const times = timeRes.data.map((item: any) => item.Start_time.slice(0, 5));
      const cities = cityRes.data.map((city: any) => {
      const name = city.City_name;
      return name.charAt(0).toUpperCase() + name.slice(1); });

      const seatsData = seatsRes.data.map((seat: any) => ({
      id: seat.Seat_id,
      number: seat.Seat_number,
      available: seat.Is_available, // 1 = available, 0 = booked
}));
setSeats(seatsData);

      const tripTypes = tripTypesRes.data.map((trip: any) => trip.Trip_name);

    
      setTimes(times);
      setCities(cities);
      setSeats(seatsData);
      setTripTypes(tripTypes);
      setVehicles(vehiclesRes.data);

      console.log("Times:", times);
      console.log("Cities:", cities);
      console.log("Seats:", seatsData);
      console.log("Trip Types:", tripTypes);
      console.log("Vehicles:", vehiclesRes.data);
    
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData();
}, []);


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!formData.from || !formData.to) {
    toast({
      title: t("error"),
      description: t("pleaseSelectCities"),
      variant: "destructive",
    });
    return;
  }
  setIsLoading(true);
  try {
    const response = await axios.get("https://su24.34.juicyjisu.us/api/routes");

    const routes = response.data.map((route: any) => ({
      id: route.Route_id,
      from_city: route.from_city?.City_name || "",
      to_city: route.to_city?.City_name || "",
      arrival_time: route.Arrival_time,
      duration: route.Duration,
      price: route.Price,
    }));

    const filteredRoutes = routes.filter(
      (r: any) =>
        r.from_city.toLowerCase() === formData.from.toLowerCase() &&
        r.to_city.toLowerCase() === formData.to.toLowerCase()
    );

    setAvailableTrips(filteredRoutes);
    setHasSearched(true); // ✅ now booking cards can be shown
    console.log("Filtered Routes:", filteredRoutes);

    if (filteredRoutes.length === 0) {
      toast({
        title: t("noTripsFound"),
        description: t("tryDifferentRoute"),
        variant: "destructive",
      });
    }
  } catch (error) {
    console.error("Error fetching routes:", error);
    toast({
      title: t("error"),
      description: t("failedToFetchRoutes"),
      variant: "destructive",
    });
  } finally {
    setIsLoading(false);
  }
};



  //   const errors: {[key: string]: string} = {};

  //   if (!formData.firstName.trim()) {
  //     errors.firstName = t('firstNameRequired');
  //   } else if (formData.firstName.trim().length < 2) {
  //     errors.firstName = t('firstNameMinLength');
  //   }

  //   if (!formData.lastName.trim()) {
  //     errors.lastName = t('lastNameRequired');
  //   } else if (formData.lastName.trim().length < 2) {
  //     errors.lastName = t('lastNameMinLength');
  //   }

  //   if (!formData.email.trim()) {
  //     errors.email = t('emailRequired');
  //   } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
  //     errors.email = t('invalidEmailFormat');
  //   }

  //   if (!formData.phone.trim()) {
  //     errors.phone = t('phoneRequired');
  //   } else if (!/^\+?[0-9\s\-()]{7,20}$/.test(formData.phone)) { // Basic phone number regex
  //     errors.phone = t('invalidPhoneFormat');
  //   }

  //   setValidationErrors(errors);
  //   return Object.keys(errors).length === 0;
  // };

    const validatePassengerInfo = () => {
    const errors: { [key: string]: string } = {};

    if (!formData.firstName.trim()) errors.firstName = t("firstNameRequired");
    if (!formData.lastName.trim()) errors.lastName = t("lastNameRequired");
    if (!formData.email.trim()) errors.email = t("emailRequired");
    if (!formData.phone.trim()) errors.phone = t("phoneRequired");

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

const handleBookNow = async (trip: any, vehicle: any) => {
  if (!formData.firstName || !formData.lastName || !formData.phone) {
    toast({ title: "Error", description: "Please fill passenger info", variant: "destructive" });
    return;
  }
  if (selectedSeats.length !== Number(formData.passengers)) {
    toast({ title: "Error", description: "Select seats for all passengers", variant: "destructive" });
    return;
  }

  const basePrice = Number(trip.price || 0);
  const vehicleAdd = Number(vehicle?.Price_add || 0);
  const totalPrice = basePrice + vehicleAdd;

  const bookingDataTemplate = {
    from_city: trip.from_city,
    to_city: trip.to_city,
    Vehicle_name: vehicle.Vehicle_name,
    trip_types: formData.tripType === "round-trip" ? "Roundtrip" : "Oneway",
    Start_time: formData.departureTime,
    Arrival_time: trip.arrival_time,
    Duration: trip.duration,
    returndate: formData.tripType === "round-trip" ? formData.returnDate : null,
    passenger_firstname: formData.firstName,
    passenger_lastname: formData.lastName,
    passenger_phone: formData.phone,
    passenger_email: formData.email,
    passenger_count: formData.passengers,
    // special_requests: formData.specialRequests,
  
  };

  setIsLoading(true);
  try {
    const token = localStorage.getItem("token");
    const url = token
      ? "https://su24.34.juicyjisu.us/api/bookings"
      : "https://su24.34.juicyjisu.us/api/bookings/guest";
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    // Send bookings for each seat
    const bookingResponses = await Promise.all(
      selectedSeats.map((seatNumber) =>
        axios.post(url, { ...bookingDataTemplate, Seat_number: seatNumber }, { headers })
      )
    );

    // Mark seats as unavailable
    await Promise.all(
      selectedSeats.map((seatNumber) =>
        axios.patch(`https://su24.34.juicyjisu.us/api/seat/by-name/${seatNumber}`, { Is_available: 0 })
      )
    );

    // Update local seat state
    setSeats((prevSeats) =>
      prevSeats.map((seat) =>
      selectedSeats.includes(seat.number) ? { ...seat, available: 0 } : seat
      )
    );

    toast({ title: "Success", description: "Booking confirmed!" });

    // ✅ Save to BookingContext + sessionStorage
    const bookingId = generateNextBookingId();
const savedBooking = {
  id: bookingId,
  route: `${formData.from} → ${formData.to}`, // use formData instead of bookingDataTemplate
  departureDate: formData.departureDate ? format(formData.departureDate, "MMMM dd, yyyy") : "N/A",
  departureTime: formData.departureTime || "N/A",
  passengers: parseInt(formData.passengers || "0", 10),
  passengerName: `${formData.firstName} ${formData.lastName}`,
  passengerEmail: formData.email,
  passengerPhone: formData.phone,
};

    // addBooking(savedBooking);
  //  localStorage.setItem(`bookingHistory`, JSON.stringify(savedBooking)); 
    addBooking(savedBooking);

    // ✅ Save as array in localStorage
    const existing = JSON.parse(localStorage.getItem("bookingHistory") || "[]");
    localStorage.setItem("bookingHistory", JSON.stringify([...existing, savedBooking]));

    console.log("Saved booking:", savedBooking);

    // Navigate to confirmation page
    navigate("/booking-confirmation", { state: { bookingData: savedBooking } });
    // Reset form
    setFormData({
      from: "",
      to: "",
      departureDate: undefined,
      returnDate: undefined,
      tripType: "one-way",
      departureTime: "",
      passengers: "1",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      specialRequests: "",
    });
    setSelectedSeats([]);
    setAvailableTrips([]);
    setHasSearched(false);

  } catch (error: any) {
    console.error("Booking error:", error);
    toast({
      title: "Error",
      description: error.response?.data?.message || "Failed to book",
      variant: "destructive",
    });
  } finally {
    setIsLoading(false);
  }
};

// const handleBookNow = async (trip: any, vehicle: any) => {
//   if (!formData.firstName || !formData.lastName || !formData.phone) {
//     toast({ title: "Error", description: "Please fill passenger info", variant: "destructive" });
//     return;
//   }

//   if (selectedSeats.length !== Number(formData.passengers)) {
//     toast({ title: "Error", description: "Select seats for all passengers", variant: "destructive" });
//     return;
//   }

//   const basePrice = Number(trip.price || 0);
//   const vehicleAdd = Number(vehicle?.Price_add || 0);
//   const totalPrice = basePrice + vehicleAdd;

//   const bookingDataTemplate = {
//     from: trip.from_city,
//     to: trip.to_city,
//     Vehicle_name: vehicle.Vehicle_name,
//     tripType: formData.tripType === "round-trip" ? "Roundtrip" : "Oneway",
//     departureDate: formData.departureDate,
//     departureTime: formData.departureTime,
//     passengers: formData.passengers,
//     firstName: formData.firstName,
//     lastName: formData.lastName,
//     email: formData.email,
//     phone: formData.phone,
//     returndate: formData.tripType === "round-trip" ? formData.returnDate : null,
//     Seat_number: selectedSeats.join(", "),
//   };

//   setIsLoading(true);

//   try {
//     const token = localStorage.getItem("token");
//     const url = token
//       ? "https://su24.34.juicyjisu.us/api/bookings"
//       : "https://su24.34.juicyjisu.us/api/bookings/guest";
//     const headers = token ? { Authorization: `Bearer ${token}` } : {};

//     // Send bookings for each seat
//     await Promise.all(
//       selectedSeats.map((seatNumber) =>
//         axios.post(url, { ...bookingDataTemplate, Seat_number: seatNumber }, { headers })
//       )
//     );

//     // Mark seats as unavailable
//     await Promise.all(
//       selectedSeats.map((seatNumber) =>
//         axios.patch(`https://su24.34.juicyjisu.us/api/seat/by-name/${seatNumber}`, { Is_available: 0 })
//       )
//     );

//     setSeats((prevSeats) =>
//       prevSeats.map((seat) => (selectedSeats.includes(seat.number) ? { ...seat, available: 0 } : seat))
//     );

//     toast({ title: "Success", description: "Booking confirmed!" });

//     // ✅ Save booking to localStorage array and context
//     const bookingId = generateNextBookingId();
//     const savedBooking = {
//       id: bookingId,
//       route: `${formData.from} → ${formData.to}`,
//       departureDate: formData.departureDate ? format(formData.departureDate, "MMMM dd, yyyy") : "N/A",
//       departureTime: formData.departureTime || "N/A",
//       passengers: parseInt(formData.passengers || "0", 10),
//       passengerName: `${formData.firstName} ${formData.lastName}`,
//       passengerEmail: formData.email,
//       passengerPhone: formData.phone,
//     };

//     // 1. Add to context
//     addBooking(savedBooking);

//     // 2. Save to localStorage array
//     const storedBookings = JSON.parse(localStorage.getItem("bookingHistory") || "[]");
//     const updatedBookings = [...storedBookings, savedBooking];
//     localStorage.setItem("bookingHistory", JSON.stringify(updatedBookings));

//     // Go to confirmation page
//     navigate("/booking-confirmation", { state: { bookingData: { ...bookingDataTemplate, bookingId } } });

//     // Reset form & seats
//     setFormData({
//       from: "",
//       to: "",
//       departureDate: undefined,
//       returnDate: undefined,
//       tripType: "one-way",
//       departureTime: "",
//       passengers: "1",
//       firstName: "",
//       lastName: "",
//       email: "",
//       phone: "",
//       specialRequests: "",
//     });
//     setSelectedSeats([]);
//     setAvailableTrips([]);
//     setHasSearched(false);

//   } catch (error: any) {
//     console.error("Booking error:", error);
//     toast({
//       title: "Error",
//       description: error.response?.data?.message || "Failed to book",
//       variant: "destructive",
//     });
//   } finally {
//     setIsLoading(false);
//   }
// };






   const handleSeatClick = (seatId: string) => {
    const numPassengers = parseInt(formData.passengers);
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
    } else {
      if (selectedSeats.length < numPassengers) {
        setSelectedSeats([...selectedSeats, seatId]);
      } else {
        toast({
          title: t("warning"),
          description: t("maxSeatsReached", { num: numPassengers }),
          variant: "destructive"
        });
      }
    }
  };


  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-teal-500 to-blue-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('bookYourJourney')}</h1>
            <p className="text-xl opacity-90">{t('reserveYourSeat')}</p>
          </div>
        </section>

        {/* Booking Form */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="dark:bg-gray-900 dark:text-white dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center dark:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clipboard-list mr-2 dark:text-white">
                      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
                      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                      <path d="M12 11h4" />
                      <path d="M12 16h4" />
                      <path d="M8 11h.01" />
                      <path d="M8 16h.01" />
                    </svg>
                    {t('bookingDetails')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">


                    {/* Trip Type Selection */}

<div className="flex space-x-4">
  {tripTypes.length > 0 ? (
    tripTypes.map((trip: string) => {
      const tripValue = trip.toLowerCase(); // "oneway" or "roundtrip"

      return (
        <Button
          key={trip}
          type="button"
          variant={formData.tripType === tripValue ? "default" : "outline"}
          onClick={() =>
            setFormData({
              ...formData,
              tripType: tripValue,
              ...(tripValue === "oneway" ? { returnDate: undefined } : {})
            })
          }
          className="dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
        >
          {t(trip)} {/* "Oneway" / "RoundTrip" */}
        </Button>
      );
    })
  ) : (
    <p className="text-gray-500 dark:text-gray-300">Loading trip types...</p>
  )}
</div>


                    {/* Trip Details */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="flex items-center font-semibold dark:text-white">
                          <MapPin className="h-4 w-4 mr-2 dark:text-white" />
                          {t('from')}
                        </Label>
                        <Select value={formData.from} onValueChange={(value) => setFormData({...formData, from: value})}>
                          <SelectTrigger className="dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700">
                            <SelectValue>{formData.from ? t(formData.from) : t('selectDepartureCity')}</SelectValue>
                          </SelectTrigger>
                          <SelectContent className="dark:bg-gray-800 dark:text-white dark:border-gray-700">
                            {cities.map((city) => (
                       <SelectItem
                          key={city}  value={city} className="dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
                        {t(city)}
                      </SelectItem>
                      
))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="flex items-center font-semibold dark:text-white">
                          <MapPin className="h-4 w-4 mr-2 dark:text-white" />
                          {t('to')}
                        </Label>
                        <Select value={formData.to} onValueChange={(value) => setFormData({...formData, to: value})}>
                          <SelectTrigger className="dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700">
                            <SelectValue>{formData.to ? t(formData.to) : t('selectDestinationCity')}</SelectValue>
                          </SelectTrigger>
                          <SelectContent className="dark:bg-gray-800 dark:text-white dark:border-gray-700">
                            {cities.filter(cityKey => cityKey !== formData.from).map((cityKey) => (
                              <SelectItem key={cityKey} value={cityKey} className="dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">{t(cityKey)}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700 dark:text-white">
                          {t('departureDate')}
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700",
                                !formData.departureDate && "text-muted-foreground dark:text-gray-400"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4 dark:text-white" />
                              {formData.departureDate ? format(formData.departureDate, "dd-MM-yyyy") : t('selectDate')}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 dark:bg-gray-800 dark:text-white dark:border-gray-700" align="start">
                            <Calendar
                              mode="single"
                              selected={formData.departureDate}
                              onSelect={(date) => setFormData({...formData, departureDate: date})}
                              initialFocus
                              className="pointer-events-auto dark:bg-gray-800 dark:text-white"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div className="space-y-2">
                        <Label className="flex items-center font-semibold dark:text-white">
                          <Clock className="h-4 w-4 mr-2 dark:text-white" />
                          {t('departureTime')}
                        </Label>
                        <Select value={formData.departureTime} onValueChange={(value) => setFormData({...formData, departureTime: value})}>
                          <SelectTrigger className="dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700">
                            <SelectValue placeholder={t('selectTime')}>{formData.departureTime}</SelectValue>
                          </SelectTrigger>
                          <SelectContent className="dark:bg-gray-800 dark:text-white dark:border-gray-700">
                            {times.map((time) => (
                              <SelectItem key={time} value={time} className="dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">{time}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="flex items-center font-semibold dark:text-white">
                          <Users className="h-4 w-4 mr-2 dark:text-white" />
                          {t('passengers')}
                        </Label>
                        <Select value={formData.passengers} onValueChange={(value) => setFormData({...formData, passengers: value})}>
                          <SelectTrigger className="dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="dark:bg-gray-800 dark:text-white dark:border-gray-700">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                              <SelectItem key={num} value={num.toString()} className="dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
                                {num} {num > 1 ? t('passengers') : t('passenger')}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Return Date (only for Round Trip) */}
                      {formData.tripType === 'round-trip' && (
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-700 dark:text-white">
                            {t('returnDate')}
                          </Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700",
                                  !formData.returnDate && "text-muted-foreground dark:text-gray-400"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4 dark:text-white" />
                                {formData.returnDate ? format(formData.returnDate, "dd-MM-yyyy") : t('selectDate')}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 dark:bg-gray-800 dark:text-white dark:border-gray-700" align="start">
                              <Calendar
                                mode="single"
                                selected={formData.returnDate}
                                onSelect={(date) => setFormData({...formData, returnDate: date})}
                                initialFocus
                                className="pointer-events-auto dark:bg-gray-800 dark:text-white"
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      )}
                    </div>

                    {/* Seat Selection */}
 

<div className="max-w-sm mx-auto p-4 border border-gray-300 rounded-lg dark:border-gray-700">
  {/* Steering wheel at front */}
  <div className="col-span-4 flex justify-center mb-6">
    <div className="w-12 h-8 bg-gray-300 rounded-b-lg dark:bg-gray-600 flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-steering-wheel dark:text-gray-300"
      >
        <path d="M2 12a10 10 0 1 0 20 0 10 10 0 1 0-20 0" />
        <path d="M12 2v4" />
        <path d="M12 18v4" />
        <path d="M19.07 4.93l-2.83 2.83" />
        <path d="M4.93 19.07l2.83-2.83" />
        <path d="M4.93 4.93l2.83 2.83" />
        <path d="M19.07 19.07l-2.83-2.83" />
      </svg>
    </div>
  </div>

  {/* Seat legend */}
  <div className="flex justify-center mb-4 text-sm space-x-4">
    <div className="flex items-center space-x-2">
      <span className="w-4 h-4 bg-gray-400 rounded-full"></span>
      <span>Booked</span>
    </div>
    <div className="flex items-center space-x-2">
      <span className="w-4 h-4 bg-teal-500 rounded-full"></span>
      <span>Selected</span>
    </div>
    <div className="flex items-center space-x-2">
      <span className="w-4 h-4 bg-white border rounded-full dark:bg-gray-700"></span>
      <span>Available</span>
    </div>
  </div>

  {/* Seats grid */}
  <div className="grid grid-cols-4 gap-4">
    {seats.map((seat) => {
      const isSelected = selectedSeats.includes(seat.number);
      const isBooked = seat.available === 0;
      const seatLimitReached =
        selectedSeats.length >= Number(formData.passengers) && !isSelected;

      return (
        <Button
          key={seat.id}
          variant="outline"
          size="sm"
          disabled={isBooked || seatLimitReached}
          className={cn(
            "w-full h-10",
            isBooked
              ? "bg-gray-400 text-white cursor-not-allowed"
              : isSelected
              ? "bg-teal-500 text-white hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700"
              : "bg-card text-foreground border-border hover:bg-accent dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
          )}
          onClick={() => {
            if (isSelected) {
              setSelectedSeats(
                selectedSeats.filter((s) => s !== seat.number)
              );
            } else if (selectedSeats.length < Number(formData.passengers)) {
              setSelectedSeats([...selectedSeats, seat.number]);
            }
          }}
        >
          {seat.number}
        </Button>
      );
    })}
  </div>
</div>




                    {/* Passenger Information */}

                 <div className="space-y-4 pt-6">
  <h3 className="text-lg font-semibold flex items-center dark:text-white">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-user mr-2 dark:text-white"
    >
      <circle cx="12" cy="7" r="4" />
      <path d="M12 22v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4-4v-2" />
      <path d="M12 22v-2a4 4 0 0 1 4-4h0a4 4 0 0 1 4-4v-2" />
    </svg>
    {t("passengerInformation")}
  </h3>

  <div className="grid md:grid-cols-2 gap-6">
    {/* First Name */}
    <div className="space-y-2">
      <Label htmlFor="firstName" className="font-semibold dark:text-white">
        {t("firstName")}
      </Label>
      <Input
        id="firstName"
        type="text"
        value={formData.firstName}
        onChange={(e) =>
          setFormData({ ...formData, firstName: e.target.value })
        }
        placeholder={t("enterFirstName")}
        className="dark:bg-gray-800 dark:text-white dark:border-gray-700"
      />
    </div>

    {/* Last Name */}
    <div className="space-y-2">
      <Label htmlFor="lastName" className="font-semibold dark:text-white">
        {t("lastName")}
      </Label>
      <Input
        id="lastName"
        type="text"
        value={formData.lastName}
        onChange={(e) =>
          setFormData({ ...formData, lastName: e.target.value })
        }
        placeholder={t("enterLastName")}
        className="dark:bg-gray-800 dark:text-white dark:border-gray-700"
      />
    </div>

    {/* Email */}
    <div className="space-y-2">
      <Label htmlFor="email" className="font-semibold dark:text-white">
        {t("email")}
      </Label>
      <Input
        id="email"
        type="email"
        value={formData.email}
        onChange={(e) =>
          setFormData({ ...formData, email: e.target.value })
        }
        placeholder={t("enter EmailAddress")}
        className="dark:bg-gray-800 dark:text-white dark:border-gray-700"
      />
    </div>

    {/* Phone */}
    <div className="space-y-2">
      <Label htmlFor="phone" className="font-semibold dark:text-white">
        {t("phone")}
      </Label>
      <Input
        id="phone"
        type="tel"
        value={formData.phone}
        onChange={(e) =>
          setFormData({ ...formData, phone: e.target.value })
        }
        placeholder={t("enter PhoneNumber")}
        className="dark:bg-gray-800 dark:text-white dark:border-gray-700"
      />
    </div>

    {/* Special Requests */}
    <div className="space-y-2 col-span-full">
      <Label htmlFor="specialRequests" className="font-semibold dark:text-white">
        {t("specialRequests")}
      </Label>
      <Input
        id="specialRequests"
        type="text"
        value={formData.specialRequests}
        onChange={(e) =>
          setFormData({ ...formData, specialRequests: e.target.value })
        }
        placeholder={t("anySpecialRequests")}
        className="dark:bg-gray-800 dark:text-white dark:border-gray-700"
      />
    </div>
  </div>
 
</div>


                    {/* Trip Summary */}
                    {availableTrips.length > 0 && (
<div className="space-y-4 pt-6">
  <h3 className="text-lg font-semibold flex items-center dark:text-white">
    <DollarSign className="h-5 w-5 mr-2 dark:text-white" />
    {t('tripSummary')}
  </h3>

  <div className="grid md:grid-cols-2 gap-4">
    {availableTrips.map((trip: any) => {
      // filter vehicles that belong to this route if needed
      return vehicles.map((vehicle: any) => {
      const totalPrice = Number(trip.Price || 0) + Number(vehicle.Price_add || 0);

        return (
          <Card
            key={`${trip.Route_id}-${vehicle.VehicleType_id}`}
            className="p-4 dark:bg-gray-800 dark:text-white shadow-md rounded-lg transition hover:shadow-lg hover:scale-105"
          >
            <CardHeader className="flex items-center space-x-2 p-4 border-b dark:border-gray-700">
              <Bus className="h-5 w-5 text-teal-500" />
              <CardTitle className="font-semibold text-lg dark:text-white">
                {vehicle.Vehicle_name}
              </CardTitle>
            </CardHeader>

            <CardContent className="pt-4">
              <p className="flex items-center mb-2">
                <MapPin className="h-4 w-4 mr-2 text-teal-500" />
                {trip.from_city} → {trip.to_city}
              </p>
              <p className="flex items-center mb-2">
                <Clock className="h-4 w-4 mr-2 text-teal-500" /> {t('arrival')}: {trip.arrival_time}
              </p>
              <p className="flex items-center mb-2">
                <Hourglass className="h-4 w-4 mr-2 text-teal-500" /> {t('duration')}: {trip.duration}
              </p>

              <p className="text-2xl font-bold text-teal-500 mt-4">
                {t('price')}: ${totalPrice}
              </p>

              <Button
                className="mt-4 w-full bg-teal-500 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700"
                onClick={() => handleBookNow(trip, vehicle)}
                disabled={isLoading}
              >
                {isLoading ? t('booking') : t('bookNow')}
              </Button>
            </CardContent>
          </Card>
        );
      });
    })}
  </div>
</div>




                    )}

                    {/* Search Button for initial trip search (if not prefilled)*/}
                    {availableTrips.length === 0 && (
                    <Button 
                      type="submit" 
                      className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 mt-6 shadow-md hover:shadow-lg transition-all duration-200 dark:bg-teal-600 dark:hover:bg-teal-700"
                         disabled={isLoading}
>
  {isLoading ? (
            <span className="flex items-center justify-center">
      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      {t('searching')}
          </span>
           ) : (
    <span className="flex items-center justify-center">
      <Search className="h-5 w-5 mr-2" />
       {t('findTrips')}
    </span>
                      )}
                 </Button>

                    )}
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Booking;