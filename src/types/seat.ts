export type SeatCategory = 'standard' | 'extra_legroom' | 'premium';

export interface SeatCategoryInfo {
    name: string,
    price: number,
    color: string,
    description: string
}

export const SEAT_CATEGORIES: Record<SeatCategory, SeatCategoryInfo> = {
    standard: {
        name: 'Standard',
        price: 0,
        color: '#FFFFFF',
        description: 'Standard seat with normal legroom'
    },
    extra_legroom: {
        name: 'Extra Legroom',
        price: 350,
        color: '#00FF00',
        description: 'Extra legroom seat'
    },
    premium: {
        name: 'Premium',
        price: 250,
        color: '#0000FF',
        description: 'Premium front seat'
    }
}

export interface Seat {
    id: string;
    row: number;
    col: string;
    category: SeatCategory;
    price: number;
    isExitRow?: boolean;
}