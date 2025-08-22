import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Thank you for your message! We will get back to you soon.');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get in touch with our friendly team
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="shadow-lg rounded-xl">
            <CardHeader>
              <CardTitle>Send us a message</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" required />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" required />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="+855 12 345 678" />
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <select id="subject" className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                    <option>General Inquiry</option>
                    <option>Booking Support</option>
                    <option>Complaint</option>
                    <option>Suggestion</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="How can we help you?"
                    required
                  ></textarea>
                </div>
                <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 rounded-full">Send Message</Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="shadow-lg rounded-xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 bg-teal-500/10 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-teal-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Phone</h3>
                    <p className="text-muted-foreground">+855 69 373 415</p>
                    <p className="text-muted-foreground">+855 12 345 678</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg rounded-xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 bg-teal-500/10 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-teal-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Email</h3>
                    <p className="text-muted-foreground">info@kimsengexpress.com</p>
                    <p className="text-muted-foreground">booking@kimsengexpress.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg rounded-xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 bg-teal-500/10 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-teal-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Main Office</h3>
                    <p className="text-muted-foreground">123 Street 271, Toul Kork<br />Phnom Penh, Cambodia</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg rounded-xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 bg-teal-500/10 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-teal-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Office Hours</h3>
                    <p className="text-muted-foreground">Monday - Friday: 6:00 AM - 8:00 PM</p>
                    <p className="text-muted-foreground">Saturday: 6:00 AM - 6:00 PM</p>
                    <p className="text-muted-foreground">Sunday: 7:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
