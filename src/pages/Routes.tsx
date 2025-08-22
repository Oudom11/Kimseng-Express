import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, DollarSign } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Routes = () => {
  const { t } = useLanguage();
  const routes = [
    {
      id: 1,
      from: t('phnomPenh'),
      to: t('kampot'),
      departureTime: "07:00 AM",
      arrivalTime: "10:30 AM",
      duration: "3h 30m",
      price: "12",
      frequency: "Daily"
    },
    {
      id: 2,
      from: t('phnomPenh'),
      to: t('kep'),
      departureTime: "08:00 AM",
      arrivalTime: "12:00 PM",
      duration: "4h 00m",
      price: "15",
      frequency: "Daily"
    },
    {
      id: 3,
      from: t('phnomPenh'),
      to: t('mondulkiri'),
      departureTime: "06:00 AM",
      arrivalTime: "01:00 PM",
      duration: "7h 00m",
      price: "25",
      frequency: "Mon, Wed, Fri"
    },
    {
      id: 4,
      from: t('kampot'),
      to: t('phnomPenh'),
      departureTime: "02:00 PM",
      arrivalTime: "05:30 PM",
      duration: "3h 30m",
      price: "12",
      frequency: "Daily"
    },
    {
      id: 5,
      from: t('kep'),
      to: t('phnomPenh'),
      departureTime: "01:00 PM",
      arrivalTime: "05:00 PM",
      duration: "4h 00m",
      price: "15",
      frequency: "Daily"
    },
    {
      id: 6,
      from: t('mondulkiri'),
      to: t('phnomPenh'),
      departureTime: "07:00 AM",
      arrivalTime: "02:00 PM",
      duration: "7h 00m",
      price: "25",
      frequency: "Tue, Thu, Sat"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-teal-500 to-blue-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-md">{t('ourRoutes')}</h1>
            <p className="text-xl opacity-90 drop-shadow-sm">{t('reliableTransportation')}</p>
          </div>
        </section>

        {/* Routes Grid */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {routes.map((route) => (
                <Card key={route.id} className="shadow-lg rounded-xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl font-bold text-gray-900 dark:text-white">
                      <div className="flex-shrink-0 bg-teal-500/10 p-2 rounded-full mr-3">
                        <MapPin className="h-6 w-6 text-teal-500" />
                      </div>
                      {route.from} → {route.to}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-gray-200/50 p-2 rounded-full mr-2 dark:bg-gray-700">
                          <Clock className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                        </div>
                        <span className="text-base">{t('departure')}</span>
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-white">{route.departureTime}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-gray-200/50 p-2 rounded-full mr-2 dark:bg-gray-700">
                          <Clock className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                        </div>
                        <span className="text-base">{t('arrival')}</span>
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-white">{route.arrivalTime}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-base">{t('duration')}</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{route.duration}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-base">{t('frequency')}</span>
                      <span className="font-semibold text-teal-600">{route.frequency}</span>
                    </div>

                    <div className="border-t pt-4 border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <DollarSign className="h-6 w-6 text-green-500 mr-2" />
                          <span className="text-3xl font-bold text-green-600">{route.price}</span>
                        </div>
                        <Button className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-full transition-colors duration-200">
                          {t('bookNow')}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Routes;
