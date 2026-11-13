export interface Passenger {
    id: string;
    name: string;
    assignedSeatId: string | null;
    selectedMealId: string | null;
}