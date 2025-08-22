import React from 'react';
import { Truck, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-muted/50 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Truck className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-primary">Kimseng Express</span>
            </div>
            <p className="text-muted-foreground mb-6">
              Your reliable partner for comfortable and safe journeys across Cambodia.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
              <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
              <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-6">Services</h3>
            <ul className="space-y-3">
              <li><a href="javascript:void(0);" className="text-muted-foreground hover:text-primary">Domestic Express</a></li>
              <li><a href="javascript:void(0);" className="text-muted-foreground hover:text-primary">International Shipping</a></li>
              <li><a href="javascript:void(0);" className="text-muted-foreground hover:text-primary">Freight Services</a></li>
              <li><a href="javascript:void(0);" className="text-muted-foreground hover:text-primary">Home Pickup</a></li>
              <li><a href="javascript:void(0);" className="text-muted-foreground hover:text-primary">Corporate Solutions</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="javascript:void(0);" className="text-muted-foreground hover:text-primary">Track Package</a></li>
              <li><a href="javascript:void(0);" className="text-muted-foreground hover:text-primary">Calculate Rates</a></li>
              <li><a href="javascript:void(0);" className="text-muted-foreground hover:text-primary">Find Locations</a></li>
              <li><a href="javascript:void(0);" className="text-muted-foreground hover:text-primary">Customer Support</a></li>
              <li><a href="javascript:void(0);" className="text-muted-foreground hover:text-primary">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">+855 12 345 678</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">info@kimsengexpress.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-primary mt-1" />
                <span className="text-muted-foreground">#123, St. 456, Phnom Penh, Cambodia</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © 2024 Kimseng Express. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-muted-foreground text-sm hover:text-primary">Privacy Policy</a>
              <a href="#" className="text-muted-foreground text-sm hover:text-primary">Terms of Service</a>
              <a href="#" className="text-muted-foreground text-sm hover:text-primary">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
