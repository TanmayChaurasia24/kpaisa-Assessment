import React from 'react';
import type { Seat } from '../../types/seat';

export type SeatStatus = 'available' | 'occupied' | 'selected-mine' | 'selected-other';

interface SeatItemProps {
    seat: Seat;
    status: SeatStatus;
    passengerLabel?: string;
    onClick?: () => void;
}

export const SeatItem = React.memo(function SeatItem({
    seat,
    status,
    passengerLabel,
    onClick,
}: SeatItemProps) {
    const isClickable = status === 'available' || status === 'selected-mine';

    const statusStyles: Record<SeatStatus, string> = {
        occupied:
            'bg-slate-200 text-slate-400 border-slate-300 cursor-not-allowed opacity-60 select-none',
        'selected-mine':
            'bg-blue-600 text-white border-blue-700 ring-2 ring-blue-300 ring-offset-1 cursor-pointer shadow-md scale-105',
        'selected-other':
            'bg-emerald-100 text-emerald-800 border-emerald-400 cursor-not-allowed opacity-80 select-none',
        available: '',
    };

    const availableCategoryStyles: Record<Seat['category'], string> = {
        standard:
            'bg-slate-100 text-slate-700 border-slate-300 hover:bg-blue-50 hover:border-blue-400 cursor-pointer',
        extra_legroom:
            'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100 hover:border-amber-400 cursor-pointer',
        premium:
            'bg-purple-50 text-purple-800 border-purple-300 hover:bg-purple-100 hover:border-purple-400 cursor-pointer',
    };

    const resolvedStyle =
        status === 'available' ? availableCategoryStyles[seat.category] : statusStyles[status];

    const tooltip =
        status === 'occupied'
            ? `Seat ${seat.id} — Occupied / Unavailable`
            : status === 'selected-mine'
                ? `Seat ${seat.id} — Assigned to you (click to unassign)`
                : status === 'selected-other'
                    ? `Seat ${seat.id} — Assigned to ${passengerLabel}`
                    : `Seat ${seat.id} · ${seat.category.replace('_', ' ')} · ${seat.price === 0 ? 'Free' : `₹${seat.price}`}`;

    return (
        <button
            type="button"
            title={tooltip}
            aria-label={tooltip}
            aria-disabled={!isClickable}
            onClick={isClickable ? onClick : undefined}
            className={`relative flex flex-col items-center justify-center w-9 h-10 md:w-10 md:h-11 rounded-t-lg rounded-b border-2 text-xs font-semibold transition-all duration-150 shadow-xs ${resolvedStyle}`}
        >
            <span className="w-5 h-1 bg-current opacity-20 rounded-full mb-0.5 pointer-events-none" />

            <span className="leading-none text-[11px] md:text-xs font-bold pointer-events-none">
                {passengerLabel && (status === 'selected-mine' || status === 'selected-other')
                    ? passengerLabel
                    : seat.col}
            </span>

            <span className="text-[9px] opacity-70 leading-none mt-0.5 pointer-events-none">
                {status === 'occupied'
                    ? '✕'
                    : status === 'selected-mine' || status === 'selected-other'
                        ? '✓'
                        : seat.price === 0
                            ? 'Free'
                            : `₹${seat.price}`}
            </span>
        </button>
    );
});