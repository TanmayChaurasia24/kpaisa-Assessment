import {
    bookingReducer,
    initialState,
    type BookingState,
    type BookingAction
} from './bookingstore'
import { createContext, useReducer, type ReactNode, useContext } from 'react';

interface BookingContextValue {
    state: BookingState;
    dispatch: React.Dispatch<BookingAction>;
}

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(bookingReducer, initialState);

    return (
        <BookingContext.Provider value={{ state, dispatch }} >
            {children}
        </BookingContext.Provider>
    )
}

// oxlint-disable-next-line react/only-export-components
export function useBooking(): BookingContextValue {
    const context = useContext(BookingContext);
    if (!context) {
        throw new Error('useBooking must be used within BookingProvider');
    }
    return context;
}