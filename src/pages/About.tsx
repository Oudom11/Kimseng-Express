import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Award, Users, MapPin, Clock, Truck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
  const { t } = useLanguage();
  const stats = [
    { icon: Users, number: "10,000+", label: t('happyCustomers') },
    { icon: Award, number: "8+", label: t('yearsExperience') },
    { icon: MapPin, number: "15+", label: t('routesCovered') },
    { icon: Clock, number: "99%", label: t('onTimeArrival') }
  ];

  const vehicles = [
    {
      type: t('standardBus'),
      capacity: `45 ${t('passengersShort')}`,
      features: [t('airConditioning'), t('comfortableSeats'), t('storageSpace')]
    },
    {
      type: t('vipBus'), 
      capacity: `28 ${t('passengersShort')}`,
      features: [t('recliningSeats'), t('extraLegroom'), t('entertainmentSystem')]
    },
    {
      type: t('miniVan'),
      capacity: `12 ${t('passengersShort')}`, 
      features: [t('privateTransport'), t('flexibleSchedule'), t('doorToDoorService')]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-teal-500 to-blue-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('aboutKimsengExpress')}</h1>
            <p className="text-xl opacity-90">{t('trustedTravelPartner')}</p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">{t('ourMission')}</h2>
              <p className="text-lg text-gray-600 mb-8">
                {t('missionStatementPart1')}
              </p>
              <p className="text-lg text-gray-600">
                {t('missionStatementPart2')}
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">{t('ourAchievements')}</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center p-6">
                  <CardContent className="pt-6">
                    <stat.icon className="h-12 w-12 text-teal-500 mx-auto mb-4" />
                    <div className="text-3xl font-bold text-foreground mb-2">{stat.number}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Vehicle Fleet */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">{t('ourVehicleFleet')}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {vehicles.map((vehicle, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <Truck className="h-12 w-12 text-teal-500 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{vehicle.type}</h3>
                    <p className="text-gray-600 mb-4">{vehicle.capacity}</p>
                    <ul className="space-y-2">
                      {vehicle.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm">
                          <div className="h-1.5 w-1.5 bg-teal-500 rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Safety Standards */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Shield className="h-16 w-16 text-teal-500 mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-4">{t('safetyStandards')}</h2>
                <p className="text-lg text-gray-600">
                  {t('yourSafetyPriority')}
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">{t('vehicleSafety')}</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <div className="h-2 w-2 bg-teal-500 rounded-full mr-3"></div>
                      {t('regularVehicleMaintenance')}
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 bg-teal-500 rounded-full mr-3"></div>
                      {t('modernSafetyEquipment')}
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 bg-teal-500 rounded-full mr-3"></div>
                      {t('gpsTracking')}
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 bg-teal-500 rounded-full mr-3"></div>
                      {t('firstAidKits')}
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">{t('driverTraining')}</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <div className="h-2 w-2 bg-teal-500 rounded-full mr-3"></div>
                      {t('professionalDriverCertification')}
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 bg-teal-500 rounded-full mr-3"></div>
                      {t('regularSafetyTraining')}
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 bg-teal-500 rounded-full mr-3"></div>
                      {t('backgroundChecks')}
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 bg-teal-500 rounded-full mr-3"></div>
                      {t('continuousMonitoring')}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
