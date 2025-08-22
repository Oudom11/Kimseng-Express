import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, MapPin, Users, Search } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Hero = () => {
  const navigate = useNavigate();
  const [passengers, setPassengers] = useState("1");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState<Date>();
  const { t } = useLanguage();

  const cities = [
    t('phnomPenh'),
    t('kampot'), 
    t('kep'),
    t('mondulkiri'),
    t('siemReap'),
    t('battambang'),
    t('sihanoukville')
  ];

  const handleSearch = () => {
    if (!from || !to || !departureDate) {
      alert(t('fillAllFields'));
      return;
    }
    // Navigate to booking page with pre-filled data
    navigate('/booking', { 
      state: { 
        prefilledData: { from, to, departureDate, passengers } 
      } 
    });
  };

  return (
    <section id="home" className="relative min-h-screen">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/cambodia-heroo-background.jpg')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 pt-20">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              {t('discoverYourCambodia')}
            </h1>
            <p className="text-xl text-white/90 mb-8 drop-shadow-md">
              {t('safeReliableComfortable')}
            </p>
          </div>

          {/* Booking Form */}
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-lg shadow-2xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                {/* From */}
                <div className="space-y-2 min-w-0">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {t('from')}
                  </label>
                  <Select value={from} onValueChange={setFrom}>
                    <SelectTrigger className="w-48 max-w-48">
                      <SelectValue placeholder={t('departureLocation')} />
                    </SelectTrigger>
                    <SelectContent className="w-48 overflow-hidden" position="popper">
                      {cities.map((city) => (
                        <SelectItem key={city} value={city} className="truncate whitespace-nowrap overflow-hidden">{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* To */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {t('to')}
                  </label>
                  <Select value={to} onValueChange={setTo}>
                    <SelectTrigger className="w-48 max-w-48">
                      <SelectValue placeholder={t('destinationLocation')} />
                    </SelectTrigger>
                    <SelectContent className="w-48 overflow-hidden" position="popper">
                      {cities.filter(city => city !== from).map((city) => (
                        <SelectItem key={city} value={city} className="truncate whitespace-nowrap overflow-hidden">{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Departure Date */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    {t('departure')}
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !departureDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {departureDate ? format(departureDate, "dd-MM-yyyy") : t('selectDate')}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={departureDate}
                        onSelect={setDepartureDate}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Passengers */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {t('passengers')}
                  </label>
                  <Select value={passengers} onValueChange={setPassengers}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} {num > 1 ? t('passengersPlural') : t('passenger')}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Search Button */}
                <Button 
                  size="lg" 
                  className="bg-teal-500 hover:bg-teal-600 text-white px-8"
                  onClick={handleSearch}
                >
                  <Search className="h-4 w-4 mr-2" />
                  {t('search')}
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 text-center">
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                variant="outline" 
                className="bg-white/10 border-white text-white hover:bg-white hover:text-gray-900"
                onClick={() => navigate('/routes')}
              >
                {t('viewAllRoutes')}
              </Button>
              <Button 
                variant="outline" 
                className="bg-white/10 border-white text-white hover:bg-white hover:text-gray-900"
                onClick={() => navigate('/booking')}
              >
                {t('bookNow')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
