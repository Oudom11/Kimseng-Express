import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Award, MapPin, Clock } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: Users, number: "50,000+", label: "Happy Customers" },
    { icon: Award, number: "15+", label: "Years Experience" },
    { icon: MapPin, number: "200+", label: "Countries Served" },
    { icon: Clock, number: "99.5%", label: "On-Time Delivery" }
  ];

  return (
    <section id="about" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              About Kimseng Express
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              For over a decade, Kimseng Express has been Cambodia's trusted name for comfortable and safe travel. We are dedicated to providing an unparalleled journey experience across the kingdom.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              Our modern fleet and experienced drivers ensure a smooth ride, while our commitment to punctuality and customer satisfaction makes us the preferred choice for countless travelers.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="h-2 w-2 bg-primary rounded-full mr-4"></div>
                <span className="text-foreground">Modern & Well-Maintained Fleet</span>
              </div>
              <div className="flex items-center">
                <div className="h-2 w-2 bg-primary rounded-full mr-4"></div>
                <span className="text-foreground">Experienced & Professional Drivers</span>
              </div>
              <div className="flex items-center">
                <div className="h-2 w-2 bg-primary rounded-full mr-4"></div>
                <span className="text-foreground">Easy Online Booking & Support</span>
              </div>
              <div className="flex items-center">
                <div className="h-2 w-2 bg-primary rounded-full mr-4"></div>
                <span className="text-foreground">Safe & Punctual Journeys</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center p-6">
                <CardContent className="pt-6">
                  <stat.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <div className="text-3xl font-bold text-foreground mb-2">{stat.number}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
