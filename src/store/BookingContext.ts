import { createContext, useContext } from 'react';
import type { BookingState, BookingAction } from './bookingstore';

export interface BookingContextValue {
  state: BookingState;
  dispatch: React.Dispatch<BookingAction>;
}

export const BookingContext = createContext<BookingContextValue | null>(null);

export function useBooking(): BookingContextValue {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within BookingProvider');
  }
  return context;
}
