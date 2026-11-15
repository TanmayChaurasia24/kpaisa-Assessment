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

export type BookingAction = | {
    type: 'SET_LAYOUT';
    payload: LayoutType
} | {
    type: 'SET_PASSENGER_COUNT';
    payload: number
} | {
    type: 'SET_ACTIVE_PASSENGER';
    payload: string
}

function createPassanger(num: number): Passenger {
    return {
        id: `p-${num}`,
        name: `passenger ${num}`,
        assignedSeatId: null,
        selectedMealId: null
    }
}

export function bookingReducer(state: BookingState, action: BookingAction): BookingState {
    switch (action.type) {
        case 'SET_LAYOUT': {
            return {
                ...state,
                layoutType: action.payload,
                passengers: state.passengers.map((p) => ({
                    ...p,
                    assignedSeatId: null
                }))
            }
        }

        case 'SET_PASSENGER_COUNT': {
            const newCount = action.payload;

            if (newCount < 1 || newCount > 9) return state;

            let newPassengers: Passenger[];

            if (newCount > state.passengers.length) {
                const toAdd = Array.from(
                    { length: newCount - state.passengers.length },
                    (_, i) => createPassanger(state.passengers.length + i + 1)
                )
                newPassengers = [...state.passengers, ...toAdd];
            } else {
                newPassengers = state.passengers.slice(0, newCount);
            }

            let newActiveId = state.activePassengerId;
            const activestillexists = newPassengers.some((p) => p.id === newActiveId);
            if (!activestillexists) {
                newActiveId = newPassengers[newPassengers.length - 1].id;
            }

            return {
                ...state,
                passengerCount: newCount,
                passengers: newPassengers,
                activePassengerId: newActiveId
            }
        }

        case 'SET_ACTIVE_PASSENGER': {
            return {
                ...state,
                activePassengerId: action.payload
            };
        }

        default:
            return state;
    }
}