import React, { useState } from 'react';
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
import { useLanguage } from '../context/LanguageContext';
import { useToast } from "@/hooks/use-toast";
import { CardSkeleton } from '@/components/ui/skeleton';
import { useBooking } from '../context/BookingContext';

const Booking = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { toast } = useToast();
  const location = useLocation();
  const { generateNextBookingId } = useBooking();
  const { prefilledData } = (location.state || {}) as { prefilledData?: {
    from: string;
    to: string;
    departureDate: Date | undefined;
    passengers: string;
  } };

  const [formData, setFormData] = useState({
    from: prefilledData?.from || '',
    to: prefilledData?.to || '',
    departureDate: prefilledData?.departureDate || undefined as Date | undefined,
    returnDate: undefined as Date | undefined,
    tripType: 'one-way',
    departureTime: '',
    passengers: prefilledData?.passengers || '1',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: ''
  });
  const [availableTrips, setAvailableTrips] = useState<any[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState(false);

  const cities = [
    'phnomPenh',
    'kampot',
    'kep',
    'mondulkiri',
    'siemReap',
    'battambang',
    'sihanoukville'
  ];

  const times = [
    "06:00 AM",
    "07:00 AM",
    "08:00 AM",
    "10:00 AM",
    "12:00 PM",
    "02:00 PM",
    "04:00 PM"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePassengerInfo()) {
      // If passenger info is invalid, stop form submission
      return;
    }

    setIsLoading(true);

    // Simulate a search for available trips based on formData
    // In a real application, this would be an API call
    setTimeout(() => {
      const mockTrips = [
        {
          id: 1,
          departureTime: "07:00 AM",
          arrivalTime: "10:30 AM",
          duration: "3h 30m",
          price: "$12",
          vanType: "Standard Bus",
        },
        {
          id: 2,
          departureTime: "08:00 AM",
          arrivalTime: "11:30 AM",
          duration: "3h 30m",
          price: "$15",
          vanType: "VIP Bus",
        },
        {
          id: 3,
          departureTime: "09:00 AM",
          arrivalTime: "12:30 PM",
          duration: "3h 30m",
          price: "$10",
          vanType: "Mini Van",
        },
      ];
      setAvailableTrips(mockTrips);
      setIsLoading(false);
    }, 1500);
  };

  const validatePassengerInfo = () => {
    const errors: {[key: string]: string} = {};

    if (!formData.firstName.trim()) {
      errors.firstName = t('firstNameRequired');
    } else if (formData.firstName.trim().length < 2) {
      errors.firstName = t('firstNameMinLength');
    }

    if (!formData.lastName.trim()) {
      errors.lastName = t('lastNameRequired');
    } else if (formData.lastName.trim().length < 2) {
      errors.lastName = t('lastNameMinLength');
    }

    if (!formData.email.trim()) {
      errors.email = t('emailRequired');
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      errors.email = t('invalidEmailFormat');
    }

    if (!formData.phone.trim()) {
      errors.phone = t('phoneRequired');
    } else if (!/^\+?[0-9\s\-()]{7,20}$/.test(formData.phone)) { // Basic phone number regex
      errors.phone = t('invalidPhoneFormat');
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleBookNow = async (trip: any) => {
    if (!validatePassengerInfo()) {
      // If passenger info is invalid, prevent booking
      return;
    }

    setIsLoading(true);

    // Simulate API call for booking confirmation
    // In a real application, this would involve sending data to your backend
    // and potentially integrating with a payment gateway.
    setTimeout(() => {
      const bookingId = generateNextBookingId(); 
      navigate('/booking-confirmation', { state: { bookingData: { ...formData, ...trip, selectedSeats, bookingId } } });
      setIsLoading(false);
    }, 1500);
  };

  const handleSeatClick = (seatId: string) => {
    const numPassengers = parseInt(formData.passengers);
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
    } else {
      if (selectedSeats.length < numPassengers) {
        setSelectedSeats([...selectedSeats, seatId]);
      } else {
        toast({
          title: t('warning'),
          description: t('maxSeatsReached', { num: numPassengers }),
          variant: "destructive",
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
                    <div className="space-y-2 col-span-full">
                      <Label className="flex items-center font-semibold dark:text-white">
                        <Bus className="h-4 w-4 mr-2 dark:text-white" />
                        {t('tripType')}
                      </Label>
                      <div className="flex space-x-4">
                        <Button
                          type="button"
                          variant={formData.tripType === 'one-way' ? "default" : "outline"}
                          onClick={() => setFormData({ ...formData, tripType: 'one-way', returnDate: undefined })}
                          className="dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
                        >
                          {t('oneWay')}
                        </Button>
                        <Button
                          type="button"
                          variant={formData.tripType === 'round-trip' ? "default" : "outline"}
                          onClick={() => setFormData({ ...formData, tripType: 'round-trip' })}
                          className="dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
                        >
                          {t('roundTrip')}
                        </Button>
                      </div>
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
                            {cities.map((cityKey) => (
                              <SelectItem key={cityKey} value={cityKey} className="dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">{t(cityKey)}</SelectItem>
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
                                {num} {num > 1 ? t('passengersPlural') : t('passenger')}
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
                    <div className="space-y-4 pt-6">
                      <h3 className="text-lg font-semibold flex items-center dark:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-armchair mr-2 dark:text-white">
                          <path d="M18 9V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v3" />
                          <path d="M5 11v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-8" />
                          <path d="M10 11V7a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v4" />
                          <path d="M2 15h2" />
                          <path d="M20 15h2" />
                        </svg>
                        {t('selectSeats')}
                      </h3>
                      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg text-center">
                        <div className="mb-4 flex justify-center space-x-8">
                          <div className="flex items-center space-x-2">
                            <span className="inline-block w-4 h-4 bg-teal-500 rounded-full"></span>
                            <span className="text-sm text-gray-700 dark:text-gray-300">{t('available')}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="inline-block w-4 h-4 bg-gray-400 rounded-full"></span>
                            <span className="text-sm text-gray-700 dark:text-gray-300">{t('booked')}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="inline-block w-4 h-4 border-2 border-teal-500 rounded-full"></span>
                            <span className="text-sm text-gray-700 dark:text-gray-300">{t('selected')}</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 gap-4 max-w-sm mx-auto p-4 border border-gray-300 rounded-lg dark:border-gray-700">
                          <div className="col-span-4 flex justify-center mb-4">
                            <div className="w-12 h-8 bg-gray-300 rounded-b-lg dark:bg-gray-600 flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-steering-wheel dark:text-gray-300">
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
                          {[0, 1, 2, 3, 4].map((rowIndex) => (
                            <React.Fragment key={rowIndex}>
                              {/* Left side seats group */}
                              <div className="col-span-2 grid grid-cols-2 gap-x-2">
                                {[`R${rowIndex + 1}S1`, `R${rowIndex + 1}S2`].map((seatId) => (
                                  <Button
                                    key={seatId}
                                    variant="outline"
                                    size="sm"
                                    className={cn(
                                      "w-full h-10",
                                      selectedSeats.includes(seatId)
                                        ? "bg-teal-500 text-white hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700"
                                        : "bg-card text-foreground border-border hover:bg-accent dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600",
                                      // Example of a booked seat (you'd get this from your API)
                                      (seatId === 'R1S3' || seatId === 'R2S4') &&
                                        !selectedSeats.includes(seatId)
                                        ? "bg-gray-400 text-gray-600 cursor-not-allowed dark:bg-gray-600 dark:text-gray-400"
                                        : ""
                                    )}
                                    onClick={() => handleSeatClick(seatId)}
                                    disabled={(seatId === 'R1S3' || seatId === 'R2S4') && !selectedSeats.includes(seatId)}
                                  >
                                    {seatId}
                                  </Button>
                                ))}
                              </div>
                              {/* Right side seats group */}
                              <div className="col-span-2 grid grid-cols-2 gap-x-2">
                                {[`R${rowIndex + 1}S3`, `R${rowIndex + 1}S4`].map((seatId) => (
                                  <Button
                                    key={seatId}
                                    variant="outline"
                                    size="sm"
                                    className={cn(
                                      "w-full h-10",
                                      selectedSeats.includes(seatId)
                                        ? "bg-teal-500 text-white hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700"
                                        : "bg-card text-foreground border-border hover:bg-accent dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600",
                                      // Example of a booked seat (you'd get this from your API)
                                      (seatId === 'R1S3' || seatId === 'R2S4') &&
                                        !selectedSeats.includes(seatId)
                                        ? "bg-gray-400 text-gray-600 cursor-not-allowed dark:bg-gray-600 dark:text-gray-400"
                                        : ""
                                    )}
                                    onClick={() => handleSeatClick(seatId)}
                                    disabled={(seatId === 'R1S3' || seatId === 'R2S4') && !selectedSeats.includes(seatId)}
                                  >
                                    {seatId}
                                  </Button>
                                ))}
                              </div>
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Passenger Information */}
                    <div className="space-y-4 pt-6">
                      <h3 className="text-lg font-semibold flex items-center dark:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user mr-2 dark:text-white">
                          <circle cx="12" cy="7" r="4" />
                          <path d="M12 22v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4-4v-2" />
                          <path d="M12 22v-2a4 4 0 0 1 4-4h0a4 4 0 0 1 4-4v-2" />
                        </svg>
                        {t('passengerInformation')}
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="firstName" className="font-semibold dark:text-white">
                            {t('firstName')}
                          </Label>
                          <Input
                            id="firstName"
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            placeholder={t('enterFirstName')}
                            aria-invalid={validationErrors.firstName ? "true" : "false"}
                            aria-describedby="firstName-error"
                            className="dark:bg-gray-800 dark:text-white dark:border-gray-700"
                          />
                          {/* {validationErrors.firstName && (
                            <p id="firstName-error" className="text-red-500 text-sm mt-1">{validationErrors.firstName}</p>
                          )} */}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName" className="font-semibold dark:text-white">
                            {t('lastName')}
                          </Label>
                          <Input
                            id="lastName"
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            placeholder={t('enterLastName')}
                            aria-invalid={validationErrors.lastName ? "true" : "false"}
                            aria-describedby="lastName-error"
                            className="dark:bg-gray-800 dark:text-white dark:border-gray-700"
                          />
                          {/* {validationErrors.lastName && (
                            <p id="lastName-error" className="text-red-500 text-sm mt-1">{validationErrors.lastName}</p>
                          )} */}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="font-semibold dark:text-white">
                            {t('email')}
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder={t('enterEmailAddress')}
                            aria-invalid={validationErrors.email ? "true" : "false"}
                            aria-describedby="email-error"
                            className="dark:bg-gray-800 dark:text-white dark:border-gray-700"
                          />
                          {/* {validationErrors.email && (
                            <p id="email-error" className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
                          )} */}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="font-semibold dark:text-white">
                            {t('phone')}
                          </Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder={t('enterPhoneNumber')}
                            aria-invalid={validationErrors.phone ? "true" : "false"}
                            aria-describedby="phone-error"
                            className="dark:bg-gray-800 dark:text-white dark:border-gray-700"
                          />
                          {/* {validationErrors.phone && (
                            <p id="phone-error" className="text-red-500 text-sm mt-1">{validationErrors.phone}</p>
                          )} */}
                        </div>
                        <div className="space-y-2 col-span-full">
                          <Label htmlFor="specialRequests" className="font-semibold dark:text-white">
                            {t('specialRequests')}
                          </Label>
                          <Input
                            id="specialRequests"
                            type="text"
                            value={formData.specialRequests}
                            onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                            placeholder={t('anySpecialRequests')}
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
                          {availableTrips.map((trip) => (
                            <Card 
                              key={trip.id} 
                              className="p-4 dark:bg-gray-800 dark:text-white dark:border-gray-700 shadow-md rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105"
                            >
                              <CardHeader className="flex flex-row items-center space-x-2 p-4 border-b dark:border-gray-700">
                                <Bus className="h-5 w-5 text-teal-500" />
                                <CardTitle className="font-semibold text-lg dark:text-white">{trip.vanType}</CardTitle>
                              </CardHeader>
                              <CardContent className="pt-4">
                                <p className="text-muted-foreground dark:text-gray-300 flex items-center mb-2"><MapPin className="h-4 w-4 mr-2 text-teal-500" />{formData.from} → {formData.to}</p>
                                <p className="text-muted-foreground dark:text-gray-300 flex items-center mb-2"><Clock className="h-4 w-4 mr-2 text-teal-500" />{t('departure')}: {trip.departureTime}</p>
                                <p className="text-muted-foreground dark:text-gray-300 flex items-center mb-2"><Clock className="h-4 w-4 mr-2 text-teal-500" />{t('arrival')}: {trip.arrivalTime}</p>
                                <p className="text-muted-foreground dark:text-gray-300 flex items-center mb-2"><Hourglass className="h-4 w-4 mr-2 text-teal-500" />{t('duration')}: {trip.duration}</p>
                                <p className="text-muted-foreground dark:text-gray-300 flex items-center mb-4"><Users className="h-4 w-4 mr-2 text-teal-500" />{t('passengers')}: {formData.passengers}</p>
                                <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>
                                <p className="text-2xl font-bold text-teal-500 mt-4">{t('price')}: {trip.price}</p>
                                <Button 
                                  className="mt-4 w-full bg-teal-500 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700"
                                  onClick={() => handleBookNow(trip)}
                                  disabled={isLoading}
                                >
                                  {isLoading ? t('booking') : t('bookNow')}
                                </Button>
                              </CardContent>
                            </Card>
                          ))}
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