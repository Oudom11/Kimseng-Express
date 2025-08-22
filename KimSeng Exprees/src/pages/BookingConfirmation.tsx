import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, MapPin, Calendar, Clock, Users, Mail, Phone, Info, CreditCard } from 'lucide-react';
import { format } from 'date-fns';
import { useLanguage } from '../context/LanguageContext';
import { useBooking } from '../context/BookingContext';

const BookingConfirmation = () => {
  const location = useLocation();
  const bookingData = location.state?.bookingData;
  const { t } = useLanguage();
  const { addBooking } = useBooking();
  const bookingAddedRef = React.useRef(false);

  // Use the bookingId passed from the Booking page
  const bookingId = bookingData?.bookingId;

  useEffect(() => {
    if (bookingData && bookingId && !bookingAddedRef.current) {
      // Check if this bookingId has already been added in this session
      const hasBeenAddedInSession = sessionStorage.getItem(`bookingId_${bookingId}`);
      if (hasBeenAddedInSession) {
        // If it was already added in this session, don't add again
        return;
      }

      addBooking({
        id: bookingId,
        route: `${bookingData.from} → ${bookingData.to}`,
        departureDate: bookingData.departureDate ? format(bookingData.departureDate, "MMMM dd, yyyy") : 'N/A',
        departureTime: bookingData.departureTime,
        passengers: parseInt(bookingData.passengers, 10),
        passengerName: `${bookingData.firstName} ${bookingData.lastName}`,
        passengerEmail: bookingData.email,
        passengerPhone: bookingData.phone,
      });
      sessionStorage.setItem(`bookingId_${bookingId}`, 'true');
      bookingAddedRef.current = true; // Set ref to true to prevent future additions within this component instance
    }
  }, [bookingData, addBooking, bookingId]); // Ensure bookingId is a dependency

  if (!bookingData || !bookingId) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold mb-4">{t('noBookingDataFound')}</h1>
            <Link to="/booking">
              <Button>{t('makeABooking')}</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Success Header */}
        <section className="bg-green-50 py-16">
          <div className="container mx-auto px-4 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-green-700 mb-4">{t('bookingConfirmed')}</h1>
            <p className="text-xl text-green-600">{t('bookingSuccessfullySubmitted')}</p>
            <p className="text-lg text-gray-600 mt-2">{t('bookingID')} <span className="font-semibold">{bookingId}</span></p>
          </div>
        </section>

        {/* Booking Details */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">{t('bookingDetails')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Trip Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">{t('tripInformation')}</h3>
                      
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-5 w-5 text-teal-500" />
                        <div>
                          <p className="font-semibold">{bookingData.from} → {bookingData.to}</p>
                          <p className="text-sm text-gray-600">{t('route')}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Calendar className="h-5 w-5 text-teal-500" />
                        <div>
                          <p className="font-semibold">
                            {bookingData.departureDate ? format(bookingData.departureDate, "MMMM dd, yyyy") : t('dateNotSelected')}
                          </p>
                          <p className="text-sm text-gray-600">{t('departureDate')}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Clock className="h-5 w-5 text-teal-500" />
                        <div>
                          <p className="font-semibold">{bookingData.departureTime}</p>
                          <p className="text-sm text-gray-600">{t('departureTime')}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Users className="h-5 w-5 text-teal-500" />
                        <div>
                          <p className="font-semibold">{bookingData.passengers} {bookingData.passengers !== '1' ? t('passengersPlural') : t('passenger')}</p>
                          <p className="text-sm text-gray-600">{t('totalPassengers')}</p>
                        </div>
                      </div>
                    </div>

                    {/* Passenger Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">{t('passengerDetails')}</h3>
                      
                      <div>
                        <p className="font-semibold">{bookingData.firstName} {bookingData.lastName}</p>
                        <p className="text-sm text-gray-600">{t('primaryPassenger')}</p>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <p>{bookingData.email}</p>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <p>{bookingData.phone}</p>
                      </div>

                      {bookingData.specialRequests && (
                        <div>
                          <p className="font-semibold mb-1">{t('specialRequests')}:</p>
                          <p className="text-sm text-gray-600">{bookingData.specialRequests}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Important Information */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center dark:text-white">
                      <Info className="h-5 w-5 mr-2 text-blue-500" />
                      {t('importantInformation')}
                    </h3>
                    <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg space-y-2">
                      <p className="text-sm dark:text-gray-300 flex items-center"><Clock className="h-4 w-4 mr-2 text-blue-500" /> {t('arriveEarly')}</p>
                      <p className="text-sm dark:text-gray-300 flex items-center"><CreditCard className="h-4 w-4 mr-2 text-blue-500" /> {t('validID')}</p>
                      <p className="text-sm dark:text-gray-300 flex items-center"><Phone className="h-4 w-4 mr-2 text-blue-500" /> {t('contactForChanges')}</p>
                      <p className="text-sm dark:text-gray-300 flex items-center"><Mail className="h-4 w-4 mr-2 text-blue-500" /> {t('confirmationEmailSent')} {bookingData.email}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="border-t pt-6 flex flex-col sm:flex-row gap-4">
                    <Link to="/" className="flex-1">
                      <Button variant="outline" className="w-full">
                        {t('backToHome')}
                      </Button>
                    </Link>
                    <Link to="/booking" className="flex-1">
                      <Button className="w-full bg-teal-500 hover:bg-teal-600">
                        {t('makeAnotherBooking')}
                      </Button>
                    </Link>
                    <Link to="/booking-history" className="flex-1">
                      <Button className="w-full bg-blue-700 hover:bg-blue-800">
                        {t('viewBookingHistory')}
                      </Button>
                    </Link>
                  </div>
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

export default BookingConfirmation;
