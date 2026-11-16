import { useReducer, type ReactNode } from 'react';
import { bookingReducer, initialState } from './bookingstore';
import { BookingContext } from './BookingContext';

export function BookingProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  return (
    <BookingContext.Provider value={{ state, dispatch }}>
      {children}
    </BookingContext.Provider>
  );
}
