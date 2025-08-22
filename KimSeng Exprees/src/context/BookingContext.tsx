import { createContext, useContext, useState, useEffect } from 'react';

interface Booking {
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
      return storedBookings ? JSON.parse(storedBookings) : [];
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
    if (typeof window !== 'undefined') {
      localStorage.setItem('bookingHistory', JSON.stringify(bookings));
    }
  }, [bookings]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('nextBookingNumber', nextBookingNumber.toString());
    }
  }, [nextBookingNumber]);

  const generateNextBookingId = (): string => {
    const newNumber = nextBookingNumber;
    setNextBookingNumber(prev => prev + 1);
    return `KE-${String(newNumber).padStart(3, '0')}`;
  };

  const addBooking = (newBooking: Booking) => {
    setBookings(prevBookings => {
      // Check if a booking with the same route, date, time, passengers, name, and email already exists
      if (prevBookings.some(
        booking =>
          booking.route === newBooking.route &&
          booking.departureDate === newBooking.departureDate &&
          booking.departureTime === newBooking.departureTime &&
          booking.passengers === newBooking.passengers &&
          booking.passengerName === newBooking.passengerName &&
          booking.passengerEmail === newBooking.passengerEmail
      )) {
        return prevBookings; // If a duplicate (based on content) exists, return existing bookings without adding
      }
      return [...prevBookings, newBooking]; // Otherwise, add the new booking
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
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
} 