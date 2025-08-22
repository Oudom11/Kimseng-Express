import { createContext, useContext, useState, useEffect } from 'react';

export interface Booking {
  id: string;
  route: string;
  departureDate: string;
  departureTime: string;
  passengers: number;
  passengerName: string;
  passengerEmail: string;
  passengerPhone: string;
}

interface BookingContextType {
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  generateNextBookingId: () => string;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>(() => {
    if (typeof window !== 'undefined') {
      const storedBookings = localStorage.getItem('bookingHistory');
      const parsed = storedBookings ? JSON.parse(storedBookings) : [];
      return Array.isArray(parsed) ? parsed : []; // ensure it's an array
    }
    return [];
  });

  const [nextBookingNumber, setNextBookingNumber] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const storedNumber = localStorage.getItem('nextBookingNumber');
      return storedNumber ? parseInt(storedNumber, 10) : 1;
    }
    return 1;
  });

  useEffect(() => {
    localStorage.setItem('bookingHistory', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('nextBookingNumber', nextBookingNumber.toString());
  }, [nextBookingNumber]);

  const generateNextBookingId = (): string => {
    const newNumber = nextBookingNumber;
    setNextBookingNumber(prev => prev + 1);
    return `KE-${String(newNumber).padStart(3, '0')}`;
  };

  const addBooking = (newBooking: Booking) => {
    setBookings(prev => {
      if (prev.some(b => 
          b.route === newBooking.route &&
          b.departureDate === newBooking.departureDate &&
          b.departureTime === newBooking.departureTime &&
          b.passengers === newBooking.passengers &&
          b.passengerName === newBooking.passengerName &&
          b.passengerEmail === newBooking.passengerEmail
      )) return prev;
      return [...prev, newBooking];
    });
  };

  return (
    <BookingContext.Provider value={{ bookings, addBooking, generateNextBookingId }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) throw new Error('useBooking must be used within a BookingProvider');
  return context;
}
