// src/components/airplane/SeatItem.tsx
import React from 'react';
import type { Seat } from '../../types/seat';

interface SeatItemProps {
    seat: Seat;
}

export const SeatItem: React.FC<SeatItemProps> = ({ seat }) => {
    // Category-based color badges
    const categoryStyles: Record<Seat['category'], string> = {
        standard: 'bg-slate-100 text-slate-700 border-slate-300 hover:border-slate-400',
        extra_legroom: 'bg-amber-50 text-amber-800 border-amber-300 hover:border-amber-400',
        premium: 'bg-purple-50 text-purple-800 border-purple-300 hover:border-purple-400',
    };

    return (
        <div
            title={`Seat ${seat.id} - ${seat.category.replace('_', ' ')} (₹${seat.price})`}
            className={`relative flex flex-col items-center justify-center w-9 h-10 md:w-10 md:h-11 rounded-t-lg rounded-b border-2 text-xs font-semibold shadow-xs select-none cursor-default transition-all duration-150 ${categoryStyles[seat.category]}`}
        >
            {/* Visual seat cushion top accent */}
            <span className="w-5 h-1 bg-current opacity-20 rounded-full mb-0.5" />

            {/* Seat Column letter (or ID) */}
            <span className="leading-none text-[11px] md:text-xs font-bold">
                {seat.col}
            </span>

            {/* Tiny price indicator */}
            <span className="text-[9px] opacity-70 leading-none mt-0.5">
                {seat.price === 0 ? 'Free' : `₹${seat.price}`}
            </span>
        </div>
    );
};