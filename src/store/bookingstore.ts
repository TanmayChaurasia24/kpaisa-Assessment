import type { LayoutType } from '../types/layout';
import type { Passenger } from '../types/passenger';

export const OCCUPIED_SEATS: Record<LayoutType, Set<string>> = {
  '3-2': new Set(['2C', '4B', '6A', '8E', '10C', '15D', '20B', '25A', '28E', '30C']),
  '2-3-2': new Set(['1B', '3E', '5A', '7G', '9C', '12F', '15D', '20E', '25B', '30G', '35A', '38C']),
};

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
      name: 'Passenger 1',
      assignedSeatId: null,
      selectedMealId: null,
    },
  ],
  activePassengerId: 'p-1',
};

export type BookingAction =
  | { type: 'SET_LAYOUT'; payload: LayoutType }
  | { type: 'SET_PASSENGER_COUNT'; payload: number }
  | { type: 'SET_ACTIVE_PASSENGER'; payload: string }
  | { type: 'ASSIGN_SEAT'; payload: string }
  | { type: 'REMOVE_SEAT'; payload: string }
  | { type: 'SELECT_MEAL'; payload: { passengerId: string; mealId: string | null } };

function createPassenger(num: number): Passenger {
  return {
    id: `p-${num}`,
    name: `Passenger ${num}`,
    assignedSeatId: null,
    selectedMealId: null,
  };
}

export function bookingReducer(state: BookingState, action: BookingAction): BookingState {
  switch (action.type) {
    case 'SET_LAYOUT': {
      return {
        ...state,
        layoutType: action.payload,
        passengers: state.passengers.map((p) => ({
          ...p,
          assignedSeatId: null,
        })),
      };
    }

    case 'SET_PASSENGER_COUNT': {
      const newCount = action.payload;
      if (newCount < 1 || newCount > 9) return state;

      let newPassengers: Passenger[];

      if (newCount > state.passengers.length) {
        const toAdd = Array.from(
          { length: newCount - state.passengers.length },
          (_, i) => createPassenger(state.passengers.length + i + 1)
        );
        newPassengers = [...state.passengers, ...toAdd];
      } else {
        newPassengers = state.passengers.slice(0, newCount);
      }

      const activeStillExists = newPassengers.some((p) => p.id === state.activePassengerId);
      const newActiveId = activeStillExists
        ? state.activePassengerId
        : newPassengers[newPassengers.length - 1].id;

      return {
        ...state,
        passengerCount: newCount,
        passengers: newPassengers,
        activePassengerId: newActiveId,
      };
    }

    case 'SET_ACTIVE_PASSENGER': {
      return {
        ...state,
        activePassengerId: action.payload,
      };
    }

    case 'ASSIGN_SEAT': {
      const seatId = action.payload;
      const { activePassengerId, passengers, layoutType } = state;

      if (!activePassengerId) return state;
      if (OCCUPIED_SEATS[layoutType].has(seatId)) return state;

      const takenByOther = passengers.find(
        (p) => p.assignedSeatId === seatId && p.id !== activePassengerId
      );
      if (takenByOther) return state;

      const currentPassenger = passengers.find((p) => p.id === activePassengerId);
      if (currentPassenger?.assignedSeatId === seatId) {
        return {
          ...state,
          passengers: passengers.map((p) =>
            p.id === activePassengerId ? { ...p, assignedSeatId: null } : p
          ),
        };
      }

      return {
        ...state,
        passengers: passengers.map((p) =>
          p.id === activePassengerId ? { ...p, assignedSeatId: seatId } : p
        ),
      };
    }

    case 'REMOVE_SEAT': {
      const passengerId = action.payload;
      return {
        ...state,
        passengers: state.passengers.map((p) =>
          p.id === passengerId ? { ...p, assignedSeatId: null } : p
        ),
      };
    }

    case 'SELECT_MEAL': {
      const { passengerId, mealId } = action.payload;
      return {
        ...state,
        passengers: state.passengers.map((p) =>
          p.id === passengerId ? { ...p, selectedMealId: mealId } : p
        ),
      };
    }

    default:
      return state;
  }
}
