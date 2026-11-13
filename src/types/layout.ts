export type LayoutType = '3-2' | '2-3-2';

export interface AircraftLayoutConfig {
    id: LayoutType;
    name: string;
    aircraftModel: string;
    totalRows: number;
    groups: string[][];
    exitRows: number[];
    wingRows: number[];
}

export const AIRCRAFT_LAYOUT_CONFIGS: Record<LayoutType, AircraftLayoutConfig> = {
    "3-2": {
        id: '3-2',
        name: '3-2 narrow body',
        aircraftModel: "airbus a220",
        totalRows: 30,
        groups: [
            ['A', 'B', 'C'],
            ['D', 'E']
        ],
        exitRows: [12],
        wingRows: [10, 11]

    },
    "2-3-2": {
        id: "2-3-2",
        name: "2-3-2 wide body",
        aircraftModel: "airbus a330",
        totalRows: 40,
        groups: [
            ['A', 'B'],
            ['C', 'D', 'E'],
            ['F', 'G']
        ],
        exitRows: [12, 30],
        wingRows: [15, 16, 20, 21]
    }
}