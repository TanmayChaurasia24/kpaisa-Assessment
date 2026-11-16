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
  const isAvailableOrMine = status === 'available' || status === 'selected-mine';

  const statusStyles: Record<SeatStatus, string> = {
    occupied:
      'bg-[repeating-linear-gradient(45deg,#e2e8f0,#e2e8f0_4px,#cbd5e1_4px,#cbd5e1_8px)] text-slate-500 border-slate-300 cursor-not-allowed opacity-75 select-none',
    'selected-mine':
      'bg-blue-600 text-white border-blue-700 ring-2 ring-blue-400 ring-offset-1 cursor-pointer shadow-md scale-105',
    'selected-other':
      'bg-emerald-100 text-emerald-900 border-emerald-400 cursor-not-allowed opacity-90 select-none',
    available: '',
  };

  const availableCategoryStyles: Record<Seat['category'], string> = {
    standard:
      'bg-slate-100 text-slate-800 border-slate-300 hover:bg-blue-50 hover:border-blue-400 cursor-pointer',
    extra_legroom:
      'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100 hover:border-amber-500 cursor-pointer',
    premium:
      'bg-purple-50 text-purple-900 border-purple-300 hover:bg-purple-100 hover:border-purple-500 cursor-pointer',
  };

  const resolvedStyle =
    status === 'available' ? availableCategoryStyles[seat.category] : statusStyles[status];

  const categorySymbol =
    seat.category === 'premium' ? '★ ' : seat.category === 'extra_legroom' ? '+ ' : '';

  const tooltip =
    status === 'occupied'
      ? `Seat ${seat.id} — Occupied / Unavailable`
      : status === 'selected-mine'
        ? `Seat ${seat.id} — Assigned to you (click to unassign)`
        : status === 'selected-other'
          ? `Seat ${seat.id} — Assigned to ${passengerLabel}`
          : `Seat ${seat.id} · ${categorySymbol}${seat.category.replace('_', ' ')} · ${
              seat.price === 0 ? 'Free' : `₹${seat.price}`
            }`;

  return (
    <button
      type="button"
      title={tooltip}
      aria-label={tooltip}
      aria-disabled={!isAvailableOrMine}
      onClick={onClick}
      className={`relative flex flex-col items-center justify-center min-w-[38px] w-9 h-11 md:w-10 md:h-12 rounded-t-lg rounded-b border-2 text-xs font-semibold transition-all duration-150 shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${resolvedStyle}`}
    >
      <span className="w-5 h-1 bg-current opacity-25 rounded-full mb-0.5 pointer-events-none" />

      <span className="leading-none text-[11px] md:text-xs font-bold pointer-events-none flex items-center gap-0.5">
        {status === 'occupied' ? (
          <span className="text-slate-500 text-sm font-black">✕</span>
        ) : status === 'selected-mine' ? (
          <span>✓ {passengerLabel}</span>
        ) : status === 'selected-other' ? (
          <span>👤 {passengerLabel}</span>
        ) : (
          <>
            {seat.category === 'premium' && (
              <span className="text-[10px] text-purple-600 font-bold" aria-hidden="true">★</span>
            )}
            {seat.category === 'extra_legroom' && (
              <span className="text-[10px] text-amber-600 font-bold" aria-hidden="true">+</span>
            )}
            <span>{seat.col}</span>
          </>
        )}
      </span>

      <span className="text-[9px] opacity-75 leading-none mt-0.5 pointer-events-none">
        {status === 'occupied'
          ? 'Booked'
          : status === 'selected-mine' || status === 'selected-other'
            ? 'Taken'
            : seat.price === 0
              ? 'Free'
              : `₹${seat.price}`}
      </span>
    </button>
  );
});
