import React from 'react';
import { SEAT_CATEGORIES } from '../../types/seat';

export const CabinLegend: React.FC = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 py-3 px-5 bg-white border border-slate-200 rounded-xl shadow-xs text-xs font-medium text-slate-700">
      <div className="flex items-center gap-2">
        <span className="w-4 h-4 rounded-t bg-slate-100 border-2 border-slate-300" />
        <span>Standard ({SEAT_CATEGORIES.standard.price === 0 ? 'Free' : `₹${SEAT_CATEGORIES.standard.price}`})</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="w-4 h-4 rounded-t bg-amber-50 border-2 border-amber-300" />
        <span>Extra Legroom (₹{SEAT_CATEGORIES.extra_legroom.price})</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="w-4 h-4 rounded-t bg-purple-50 border-2 border-purple-300" />
        <span>Premium Front (₹{SEAT_CATEGORIES.premium.price})</span>
      </div>

      <div className="flex items-center gap-2 border-l pl-3 border-slate-200">
        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 border border-amber-300 text-amber-800 uppercase">
          Exit
        </span>
        <span className="text-slate-500">Emergency Exit</span>
      </div>
    </div>
  );
};

