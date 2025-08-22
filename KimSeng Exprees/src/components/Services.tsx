
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Truck, Plane, Package2, Home, Building, Zap } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Truck,
      title: "Domestic Express",
      description: "Same-day and next-day delivery within the country",
      features: ["Same-day delivery", "Real-time tracking", "SMS notifications"],
      price: "From $15"
    },
    {
      icon: Plane,
      title: "International Shipping",
      description: "Worldwide delivery with customs clearance",
      features: ["Door-to-door service", "Customs handling", "Insurance included"],
      price: "From $45"
    },
    {
      icon: Package2,
      title: "Freight Services",
      description: "Heavy cargo and bulk shipments",
      features: ["Air & sea freight", "Warehouse solutions", "Custom packaging"],
      price: "Quote on request"
    },
    {
      icon: Home,
      title: "Home Pickup",
      description: "Convenient pickup from your location",
      features: ["Scheduled pickup", "Free packaging", "Digital receipt"],
      price: "From $5"
    },
    {
      icon: Building,
      title: "Corporate Solutions",
      description: "Tailored logistics for businesses",
      features: ["Volume discounts", "Dedicated support", "API integration"],
      price: "Custom pricing"
    },
    {
      icon: Zap,
      title: "Express Plus",
      description: "Ultra-fast premium delivery service",
      features: ["2-hour delivery", "Priority handling", "Live tracking"],
      price: "From $35"
    }
  ];

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive logistics solutions tailored to meet your shipping needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <service.icon className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-muted-foreground">
                      <div className="h-1.5 w-1.5 bg-primary rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-primary">{service.price}</span>
                  <Button variant="outline" size="sm">Learn More</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg">View All Services</Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
