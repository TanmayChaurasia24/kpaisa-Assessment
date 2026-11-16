import type { Passenger } from '../types/passenger';
import { SEAT_CATEGORIES, type Seat } from '../types/seat';
import { AIRCRAFT_LAYOUT_CONFIGS, type LayoutType } from '../types/layout';
import { generateSeatsForLayout } from '../data/seat';
import { MEAL_MAP } from '../data/meal';

export function formatPrice(price: number): string {
  if (price === 0) {
    return 'Free';
  }
  return `₹${price.toLocaleString('en-IN')}`;
}

export function getSeatMapForLayout(layoutType: LayoutType): Map<string, Seat> {
  const config = AIRCRAFT_LAYOUT_CONFIGS[layoutType];
  const seats = generateSeatsForLayout(config);
  return new Map(seats.map((seat) => [seat.id, seat]));
}

export interface PassengerLineItem {
  passengerId: string;
  passengerName: string;
  passengerNumber: string;
  seatId: string | null;
  seatCategoryName: string | null;
  seatPrice: number;
  mealId: string | null;
  mealName: string | null;
  mealIcon: string | null;
  mealPrice: number;
  totalPrice: number;
}

export function getPricingLineItems(
  passengers: Passenger[],
  seatMap: Map<string, Seat>
): PassengerLineItem[] {
  return passengers.map((p) => {
    const num = p.id.split('-')[1] || p.id;
    const seat = p.assignedSeatId ? seatMap.get(p.assignedSeatId) : null;
    const seatCategoryInfo = seat ? SEAT_CATEGORIES[seat.category] : null;
    const seatPrice = seat ? seat.price : 0;

    const meal = p.selectedMealId ? MEAL_MAP.get(p.selectedMealId) : null;
    const mealPrice = meal ? meal.price : 0;

    return {
      passengerId: p.id,
      passengerName: p.name,
      passengerNumber: num,
      seatId: p.assignedSeatId,
      seatCategoryName: seatCategoryInfo ? seatCategoryInfo.name : null,
      seatPrice,
      mealId: p.selectedMealId,
      mealName: meal ? meal.name : null,
      mealIcon: meal ? meal.icon : null,
      mealPrice,
      totalPrice: seatPrice + mealPrice,
    };
  });
}

export function calculateTotal(
  passengers: Passenger[],
  seatMap: Map<string, Seat>
): number {
  return passengers.reduce((sum, p) => {
    const seat = p.assignedSeatId ? seatMap.get(p.assignedSeatId) : null;
    const seatPrice = seat ? seat.price : 0;

    const meal = p.selectedMealId ? MEAL_MAP.get(p.selectedMealId) : null;
    const mealPrice = meal ? meal.price : 0;

    return sum + seatPrice + mealPrice;
  }, 0);
}
