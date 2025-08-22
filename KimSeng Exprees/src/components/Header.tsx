import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { useLanguage } from '../context/LanguageContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageSelectOpen, setIsLanguageSelectOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const isActive = (path: string) => location.pathname === path;

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    setIsLanguageSelectOpen(false);
  };

  return (
    <header className="bg-gray-800 fixed w-full top-0 z-50 shadow-md rounded-b-lg border-b border-gray-700">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/images/kimseng-express-logo.png" alt="Kimseng Express Logo" className="h-12 w-auto" />
          <span className="text-xl font-bold text-white">Kimseng Express</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link 
            to="/" 
            className={`text-white hover:text-teal-300 transition-colors ${isActive('/') ? 'text-teal-300 font-bold' : ''}`}
          >
            {t('home')}
          </Link>
          <Link 
            to="/routes" 
            className={`text-white hover:text-teal-300 transition-colors ${isActive('/routes') ? 'text-teal-300 font-bold' : ''}`}
          >
            {t('routes')}
          </Link>
          <Link 
            to="/booking" 
            className={`text-white hover:text-teal-300 transition-colors ${isActive('/booking') ? 'text-teal-300 font-bold' : ''}`}
          >
            {t('booking')}
          </Link>
          <Link 
            to="/about" 
            className={`text-white hover:text-teal-300 transition-colors ${isActive('/about') ? 'text-teal-300 font-bold' : ''}`}
          >
            {t('about')}
          </Link>
          <Link 
            to="/contact" 
            className={`text-white hover:text-teal-300 transition-colors ${isActive('/contact') ? 'text-teal-300 font-bold' : ''}`}
          >
            {t('contact')}
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Select
            value={language}
            onValueChange={handleLanguageChange}
            open={isLanguageSelectOpen}
            onOpenChange={setIsLanguageSelectOpen}
          >
            <SelectTrigger className="w-32 bg-teal-500 hover:bg-teal-600 text-white rounded-md">
              <SelectValue placeholder={t('language')} />
            </SelectTrigger>
            <SelectContent className="w-32">
              <SelectItem value="en">{t('english')}</SelectItem>
              <SelectItem value="km">{t('khmer')}</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-transparent border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white rounded-md">
            {t('blog')}
          </Button>
          <Link to="/login">
            <Button className="bg-teal-500 hover:bg-teal-600 rounded-md">
              {t('signIn')}
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 border-t rounded-b-lg shadow-lg">
          <nav className="px-4 py-4 space-y-4">
            <Link to="/" className="block text-white hover:text-teal-300" onClick={() => setIsMenuOpen(false)}>{t('home')}</Link>
            <Link to="/routes" className="block text-white hover:text-teal-300" onClick={() => setIsMenuOpen(false)}>{t('routes')}</Link>
            <Link to="/booking" className="block text-white hover:text-teal-300" onClick={() => setIsMenuOpen(false)}>{t('booking')}</Link>
            <Link to="/about" className="block text-white hover:text-teal-300" onClick={() => setIsMenuOpen(false)}>{t('about')}</Link>
            <Link to="/contact" className="block text-white hover:text-teal-300" onClick={() => setIsMenuOpen(false)}>{t('contact')}</Link>
            <div className="pt-4 space-y-2">
              <Select
                value={language}
                onValueChange={handleLanguageChange}
                open={isLanguageSelectOpen}
                onOpenChange={setIsLanguageSelectOpen}
              >
                <SelectTrigger className="w-full bg-teal-500 hover:bg-teal-600 text-white rounded-md">
                  <SelectValue placeholder={t('language')} />
                </SelectTrigger>
                <SelectContent className="w-32">
                  <SelectItem value="en">{t('english')}</SelectItem>
                  <SelectItem value="km">{t('khmer')}</SelectItem>
                </SelectContent>
              </Select>
              <Button className="w-full bg-transparent border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white rounded-md">{t('blog')}</Button>
              <Link to="/login" className="block">
                <Button className="w-full bg-teal-500 hover:bg-teal-600 rounded-md">{t('signIn')}</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
