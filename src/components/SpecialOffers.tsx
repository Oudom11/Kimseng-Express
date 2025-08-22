import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const SpecialOffers = () => {
  const offers = [
    {
      id: 1,
      title: "PLAN YOUR TRIP TO KAMPOT AND KEP?",
      discount: "$15 OFF",
      description: "FOR ALL PASSENGERS BOOK BY NOVEMBER 2023",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      bgColor: "bg-gradient-to-r from-teal-400 to-blue-500"
    },
    {
      id: 2,
      title: "CONTACT US",
      subtitle: "WITH BEST INSTRUCTOR AND GOOD CARE",
      phone: "+855 69 373 415",
      description: "TRAINED DRIVER",
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      bgColor: "bg-gradient-to-r from-teal-500 to-cyan-500"
    },
    {
      id: 3,
      title: "Weekend Getaway Deal",
      subtitle: "EXPLORE NEW DESTINATIONS",
      discount: "10% OFF",
      description: "Book your weekend trip and get a special discount!",
      image: "https://images.unsplash.com/photo-1542010580-c9a92f026a0c?q=80&w=2070&auto=format&fit=crop",
      bgColor: "bg-gradient-to-r from-purple-500 to-pink-500"
    }
  ];

  return (
    <section className="py-16 bg-background dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground dark:text-white mb-4">Special Offers</h2>
          <p className="text-xl text-muted-foreground dark:text-gray-300">These popular destinations has lot of to offer</p>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <Carousel className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {offers.map((offer) => (
                <CarouselItem key={offer.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className={`h-80 ${offer.bgColor} text-white overflow-hidden relative`}>
                    <CardContent className="p-6 h-full flex flex-col justify-between relative z-10">
                      <div>
                        <h3 className="text-lg font-bold mb-2">{offer.title}</h3>
                        {offer.discount && (
                          <div className="bg-white text-teal-600 px-3 py-1 rounded-md inline-block font-bold mb-2">
                            GET {offer.discount}
                          </div>
                        )}
                        {offer.subtitle && (
                          <p className="text-sm mb-2">{offer.subtitle}</p>
                        )}
                        {offer.phone && (
                          <p className="font-bold text-lg mb-2">{offer.phone}</p>
                        )}
                      </div>
                      
                      <div>
                        <p className="text-sm mb-4">{offer.description}</p>
                        <Button 
                          variant="secondary" 
                          className="bg-white text-teal-600 hover:bg-gray-100"
                        >
                          Learn More
                        </Button>
                      </div>
                    </CardContent>
                    
                    {/* Decorative elements */}
                    <div className="absolute top-4 right-4 w-16 h-16 bg-white/20 rounded-full"></div>
                    <div className="absolute bottom-4 left-4 w-8 h-8 bg-white/20 rounded-full"></div>
                    <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-white/10 rounded-full"></div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
