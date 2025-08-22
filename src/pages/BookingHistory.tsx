import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useBooking } from '../context/BookingContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Calendar, Clock, Users, Mail, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const BookingHistory = () => {
  const { bookings } = useBooking();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 text-center">{t('bookingHistory')}</h1>

          {bookings.length === 0 ? (
            <p className="text-center text-muted-foreground">{t('noBookingsYet')}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookings.map((booking) => (
                <Card key={booking.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-xl">{t('bookingID')}: {booking.id}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-teal-500" />
                      <p className="font-semibold">{booking.route}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-teal-500" />
                      <p>{booking.departureDate}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-teal-500" />
                      <p>{booking.departureTime}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="h-5 w-5 text-teal-500" />
                      <p>{booking.passengers} {booking.passengers > 1 ? t('passengersPlural') : t('passenger')}</p>
                    </div>
                    <div className="border-t pt-4 space-y-2">
                      <h4 className="font-semibold">{t('passengerDetails')}</h4>
                      <p>{booking.passengerName}</p>
                      <div className="flex items-center space-x-3 text-sm text-gray-600">
                        <Mail className="h-4 w-4" />
                        <p>{booking.passengerEmail}</p>
                      </div>
                      <div className="flex items-center space-x-3 text-sm text-gray-600">
                        <Phone className="h-4 w-4" />
                        <p>{booking.passengerPhone}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookingHistory; 