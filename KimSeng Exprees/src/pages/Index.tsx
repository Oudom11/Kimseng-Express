import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Hero from '../components/Hero';
import SpecialOffers from '../components/SpecialOffers';
import Destinations from '../components/Destinations';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Smartphone, Download, LayoutDashboard } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { fadeIn, slideIn } from '../lib/transitions';

const Index = () => {
  const { t } = useLanguage();
  const partners = [
    { name: t('tourismCambodia'), logo: "🏛️" },
    { name: t('transportMinistry'), logo: "🚌" },
    { name: t('safetyFirst'), logo: "🛡️" },
    { name: t('travelSafe'), logo: "✅" },
    { name: t('greenTravel'), logo: "🌱" },
    { name: t('customerChoice'), logo: "⭐" }
  ];

  return (
    <Layout>
      <div className="min-h-screen overflow-x-hidden">
        <Header />
        <Hero />

        {/* Dashboard Access Section */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeIn}
          className="py-10 bg-white dark:bg-gray-900 border-t border-b border-gray-200 dark:border-gray-700"
        >
          <div className="container mx-auto px-4 flex justify-center">
            <Card className="max-w-2xl w-full p-5 shadow-lg rounded-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-gradient-to-br from-teal-500 to-blue-600">
              <CardHeader className="text-center">
                <h2 className="text-3xl font-bold text-white mb-2">Access Your Dashboard</h2>
                <p className="text-white opacity-90">Manage your bookings and account with ease.</p>
              </CardHeader>
              <CardContent className="mt-4">
                <Link to="/dashboard" className="block">
                  <Button
                    size="lg"
                    className="w-full bg-white text-teal-600 hover:bg-gray-100 hover:text-teal-700 text-lg font-semibold py-3 rounded-lg shadow-md transition-all duration-300"
                  >
                    <LayoutDashboard className="h-6 w-6 mr-3" />
                    Go to Dashboard
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        <SpecialOffers />
        
        {/* Partner Logos Section */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={slideIn}
          className="py-12 bg-gray-50 dark:bg-gray-800"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('trustedPartners')}</h2>
              <p className="text-gray-600 dark:text-gray-300">{t('leadingOrganizations')}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {partners.map((partner, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-md transition-shadow dark:bg-gray-700">
                    <CardContent className="p-6 text-center">
                      <div className="text-3xl mb-2">{partner.logo}</div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{partner.name}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <Destinations />

        {/* Mobile App Download Section */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeIn}
          className="py-16 bg-gradient-to-r from-teal-500 to-blue-600 text-white"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Smartphone className="h-16 w-16 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('downloadMobileApp')}
              </h2>
              <p className="text-xl opacity-90 mb-8">
                {t('bookTicketsTrackJourney')}
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button 
                  size="lg" 
                  className="bg-black hover:bg-gray-800 text-white px-8 py-3"
                >
                  <Download className="h-5 w-5 mr-2" />
                  {t('downloadForAndroid')}
                </Button>
                <Button 
                  size="lg" 
                  className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3"
                >
                  <Download className="h-5 w-5 mr-2" />
                  {t('downloadForIOS')}
                </Button>
              </div>
              
              <div className="mt-8 grid md:grid-cols-3 gap-6 text-left">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="font-semibold mb-2">{t('easyBooking')}</h3>
                  <p className="text-sm opacity-90">{t('bookTicketsInFewTaps')}</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="font-semibold mb-2">{t('realtimeTracking')}</h3>
                  <p className="text-sm opacity-90">{t('trackBusLocation')}</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <h3 className="font-semibold mb-2">{t('digitalTickets')}</h3>
                  <p className="text-sm opacity-90">{t('noPaperTickets')}</p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>

        <About />
        <Contact />
        <Footer />
      </div>
    </Layout>
  );
};

export default Index;
