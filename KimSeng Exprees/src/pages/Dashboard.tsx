import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '../context/LanguageContext';
import { LayoutDashboard, History, MapPin, Calendar, Clock, Users, Mail, Phone } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

const Dashboard = () => {
  const { t } = useLanguage();
  const { bookings } = useBooking();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-10 flex flex-col items-center min-h-[calc(100vh-80px)] bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 max-w-6xl w-full">
          <Card className="mt-8 dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-3xl font-bold flex items-center justify-center text-center dark:text-white">
                <LayoutDashboard className="h-8 w-8 mr-3" />
                {t('dashboard')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="text-center">
                <p className="text-lg text-gray-700 dark:text-gray-300">{t('welcomeToDashboard')}</p>
                <p className="text-md text-gray-600 dark:text-gray-400">{t('viewYourBookings')}</p>
              </div>

              <Card className="dark:bg-gray-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xl font-semibold flex items-center dark:text-white">
                    <History className="h-5 w-5 mr-2" />
                    {t('bookingHistory')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {bookings.length === 0 ? (
                    <p className="text-gray-600 dark:text-gray-400 text-center py-4">{t('noBookingsYet')}</p>
                  ) : (
                    <div className="space-y-4">
                      {bookings.map((booking) => (
                        <div key={booking.id} className="p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800 dark:border-gray-600">
                          <p className="text-md font-semibold dark:text-white">{t('bookingID')}: {booking.id}</p>
                          <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                            <MapPin className="h-4 w-4" />
                            <p>{t('trip')}: {booking.route}</p>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                            <Calendar className="h-4 w-4" />
                            <p>{t('date')}: {booking.departureDate}</p>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                            <Clock className="h-4 w-4" />
                            <p>{t('time')}: {booking.departureTime}</p>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                            <Users className="h-4 w-4" />
                            <p>{t('passengers')}: {booking.passengers}</p>
                          </div>
                          <div className="mt-2 text-gray-700 dark:text-gray-300">
                            <p className="font-semibold">{t('passengerDetails')}:</p>
                            <p>{booking.passengerName}</p>
                            <div className="flex items-center space-x-2 text-sm">
                              <Mail className="h-3 w-3" />
                              <p>{booking.passengerEmail}</p>
                            </div>
                            <div className="flex items-center space-x-2 text-sm">
                              <Phone className="h-3 w-3" />
                              <p>{booking.passengerPhone}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Account Settings */}
              <Card className="dark:bg-gray-700 shadow-lg rounded-xl">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold dark:text-white">Account Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-10 p-6">
                  {/* Personal Information */}
                  <div>
                    <h4 className="font-semibold text-lg mb-4 dark:text-white">Personal Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</Label>
                        <Input id="fullName" placeholder="John Doe" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white" />
                      </div>
                      <div>
                        <Label htmlFor="emailSettings" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</Label>
                        <Input id="emailSettings" type="email" placeholder="john@example.com" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white" />
                      </div>
                      <div>
                        <Label htmlFor="phoneSettings" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</Label>
                        <Input id="phoneSettings" placeholder="+855 12 345 678" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white" />
                      </div>
                    </div>
                    <Button className="mt-6 bg-teal-500 hover:bg-teal-600 text-white rounded-full px-6 py-2 transition-colors duration-200">Update Profile</Button>
                  </div>

                  {/* Password Management */}
                  <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="font-semibold text-lg mb-4 dark:text-white">Password</h4>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Password</Label>
                        <Input id="currentPassword" type="password" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white" />
                      </div>
                      <div>
                        <Label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Password</Label>
                        <Input id="newPassword" type="password" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white" />
                      </div>
                      <div>
                        <Label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm New Password</Label>
                        <Input id="confirmPassword" type="password" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white" />
                      </div>
                    </div>
                    <Button className="mt-6 bg-teal-500 hover:bg-teal-600 text-white rounded-full px-6 py-2 transition-colors duration-200">Change Password</Button>
                  </div>

                  {/* Notification Preferences (Optional) */}
                  <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="font-semibold text-lg mb-4 dark:text-white">Notification Preferences</h4>
                    <div className="flex items-center space-x-3">
                      <input type="checkbox" id="emailNotifications" className="form-checkbox h-5 w-5 text-teal-600 rounded-md focus:ring-teal-500 dark:bg-gray-800 dark:border-gray-600" />
                      <Label htmlFor="emailNotifications" className="text-base text-gray-700 dark:text-gray-300">Receive email notifications</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard; 