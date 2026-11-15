export type SeatCategory = 'standard' | 'extra_legroom' | 'premium';

export interface SeatCategoryInfo {
    name: string,
    price: number,
    color: string,
    description: string
}

export const SEAT_CATEGORIES: Record<SeatCategory, SeatCategoryInfo> = {
    standard: {
        name: 'standard',
        price: 0,
        color: '#FFFFFF',
        description: 'Standard seat with normal legroom'
    },
    extra_legroom: {
        name: 'extra_legroom',
        price: 100,
        color: '#00FF00',
        description: 'Extra legroom seat'
    },
    premium: {
        name: 'premium',
        price: 200,
        color: '#0000FF',
        description: 'Premium seat'
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