import type { LayoutType } from "../types/layout";
import type { Passenger } from "../types/passenger";


export interface BookingState {
    layoutType: LayoutType;
    passengerCount: number;
    passengers: Passenger[];
    activePassengerId: string | null;
}

export const initialState: BookingState = {
    layoutType: '3-2',
    passengerCount: 1,
    passengers: [
        {
            id: 'p-1',
            name: 'passenger 1',
            assignedSeatId: null,
            selectedMealId: null
        }
    ],

    activePassengerId: 'p-1'
}