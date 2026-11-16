import React from 'react';
import { SEAT_CATEGORIES } from '../../types/seat';

export const CabinLegend: React.FC = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 py-3 px-4 sm:px-6 bg-white border border-slate-200 rounded-xl shadow-xs text-xs font-medium text-slate-700">
      <div className="flex items-center gap-1.5">
        <span className="w-4 h-4 rounded-t bg-slate-100 border-2 border-slate-300" />
        <span>Standard ({SEAT_CATEGORIES.standard.price === 0 ? 'Free' : `₹${SEAT_CATEGORIES.standard.price}`})</span>
      </div>

      <div className="flex items-center gap-1.5">
        <span className="w-4 h-4 rounded-t bg-amber-50 border-2 border-amber-300 flex items-center justify-center text-[10px] text-amber-700 font-bold leading-none">
          +
        </span>
        <span>Extra Legroom (₹{SEAT_CATEGORIES.extra_legroom.price})</span>
      </div>

      <div className="flex items-center gap-1.5">
        <span className="w-4 h-4 rounded-t bg-purple-50 border-2 border-purple-300 flex items-center justify-center text-[10px] text-purple-700 font-bold leading-none">
          ★
        </span>
        <span>Premium Front (₹{SEAT_CATEGORIES.premium.price})</span>
      </div>

      <div className="flex items-center gap-1.5">
        <span className="w-4 h-4 rounded-t bg-blue-600 border-2 border-blue-700 flex items-center justify-center text-[9px] text-white font-bold leading-none">
          ✓
        </span>
        <span>Your Seat</span>
      </div>

      <div className="flex items-center gap-1.5">
        <span className="w-4 h-4 rounded-t bg-[repeating-linear-gradient(45deg,#e2e8f0,#e2e8f0_2px,#cbd5e1_2px,#cbd5e1_4px)] border-2 border-slate-300 flex items-center justify-center text-[9px] text-slate-500 font-bold leading-none">
          ✕
        </span>
        <span>Occupied</span>
      </div>

      <div className="flex items-center gap-1.5 border-l pl-2 sm:pl-3 border-slate-200">
        <span className="px-1 py-0.5 rounded text-[9px] font-bold bg-amber-100 border border-amber-300 text-amber-800 uppercase">
          Exit
        </span>
        <span className="text-slate-500">Exit Row</span>
      </div>
    </div>
  );
};
