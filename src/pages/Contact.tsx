
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Thank you for your message! We will get back to you soon.');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-teal-500 to-blue-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl opacity-90">Get in touch with our friendly team</p>
          </div>
        </section>

        {/* Contact Information & Form */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <Phone className="h-6 w-6 text-teal-500 mt-1" />
                      <div>
                        <h3 className="font-semibold text-lg">Phone</h3>
                        <p className="text-muted-foreground">+855 69 373 415</p>
                        <p className="text-muted-foreground">+855 12 345 678</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <Mail className="h-6 w-6 text-teal-500 mt-1" />
                      <div>
                        <h3 className="font-semibold text-lg">Email</h3>
                        <p className="text-muted-foreground">info@kimsengexpress.com</p>
                        <p className="text-muted-foreground">booking@kimsengexpress.com</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <MapPin className="h-6 w-6 text-teal-500 mt-1" />
                      <div>
                        <h3 className="font-semibold text-lg">Main Office</h3>
                        <p className="text-muted-foreground">123 Street 271, Toul Kork<br />Phnom Penh, Cambodia</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <Clock className="h-6 w-6 text-teal-500 mt-1" />
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

              {/* Contact Form */}
              <Card>
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
                      <select id="subject" className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md">
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
                        className="w-full px-3 py-2 border border-input bg-background rounded-md"
                        placeholder="How can we help you?"
                        required
                      ></textarea>
                    </div>
                    <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Google Maps */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <Card>
              <CardHeader>
                <CardTitle>Our Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">
                      Google Maps integration would be implemented here
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      Main Office: 123 Street 271, Toul Kork, Phnom Penh
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
