import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '../context/LanguageContext';

const Destinations = () => {
  const { t } = useLanguage();

  const destinations = [
    {
      name: "Phnom Penh",
      description: t('phnomPenhDescription'),
      image: "/images/phnompenh.jpg", // Use the correct image name
    },
    {
      name: "Kampot",
      description: t('kampotDescription'),
      image: "/images/kompot.jpg", // Use the correct image name
    },
    {
      name: "Kep",
      description: t('kepDescription'),
      image: "/images/kep.jpg", // Assuming kep.jpg is placed in public/images/
    },
    {
      name: "Mondulkiri",
      description: t('mondulkiriDescription'),
      image: "/images/mondulkiri.jpg", // Assuming mondulkiri.jpg is placed in public/images/
    },
  ];

  return (
    <section id="destinations" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-white mb-4">
            {t('topDestinations')}
          </h2>
          <p className="text-xl text-muted-foreground dark:text-gray-300 max-w-2xl mx-auto">
            {t('popularDestinationsOffer')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {destinations.map((destination, index) => (
            <Card key={index} className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 dark:bg-gray-900 dark:border-gray-700">
              <img 
                src={destination.image} 
                alt={destination.name} 
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-foreground dark:text-white">{destination.name}</h3>
                <p className="text-sm text-muted-foreground dark:text-gray-300 mb-4">{destination.description}</p>
                <Button variant="outline" size="sm" className="dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600">{t('learnMore')}</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Destinations; 