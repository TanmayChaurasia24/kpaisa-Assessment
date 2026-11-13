import type { AircraftLayoutConfig } from "../types/layout";
import { SEAT_CATEGORIES, type Seat } from "../types/seat";

export function generateSeatsForLayout(config: AircraftLayoutConfig): Seat[] {
    const seats: Seat[] = [];
    const allcol = config.groups.flat();

    for (let row = 1; row <= config.totalRows; row++) {
        let category: Seat['category'] = 'standard';
        if (row <= 3) {
            category = 'premium'
        } else if (config.exitRows.includes(row)) {
            category = 'extra_legroom'
        }

        const price = SEAT_CATEGORIES[category].price;

        for (const col of allcol) {
            seats.push({
                id: `${row}${col}`,
                row,
                col,
                category,
                price,
                isExitRow: config.exitRows.includes(row)
            })
        }
    }
    return seats;
}

export const default_occ_seats: Record<string, string[]> = {
    '3-2': ['1C', '2B', '3E', '5A', '7C', '8D'],
    '2-3-2': ['1B', '2E', '4A', '6D', '6E', '8G'],
}