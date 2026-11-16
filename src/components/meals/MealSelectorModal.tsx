import React from 'react';
import type { Meal } from '../../types/meal';
import { MEAL_OPTIONS } from '../../data/meal';
import { formatPrice } from '../../utils/pricing';

interface MealSelectorModalProps {
  passengerName: string;
  currentMealId: string | null;
  onSelectMeal: (mealId: string | null) => void;
  onClose: () => void;
}

export const MealSelectorModal: React.FC<MealSelectorModalProps> = ({
  passengerName,
  currentMealId,
  onSelectMeal,
  onClose,
}) => {
  const typeBadgeStyles: Record<Meal['type'], { bg: string; text: string; label: string }> = {
    veg: { bg: 'bg-emerald-50 border-emerald-300', text: 'text-emerald-700', label: 'Vegetarian' },
    'non-veg': { bg: 'bg-rose-50 border-rose-300', text: 'text-rose-700', label: 'Non-Vegetarian' },
    vegan: { bg: 'bg-green-50 border-green-300', text: 'text-green-700', label: 'Vegan' },
    jain: { bg: 'bg-amber-50 border-amber-300', text: 'text-amber-700', label: 'Jain' },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs px-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Select In-Flight Meal</h2>
            <p className="text-xs text-slate-500">For {passengerName} • One meal per passenger</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors cursor-pointer"
            aria-label="Close meal selection dialog"
          >
            ✕
          </button>
        </div>

        <div className="p-4 overflow-y-auto space-y-2.5 divide-y divide-slate-100 flex-1">
          {MEAL_OPTIONS.map((meal) => {
            const isSelected = currentMealId === meal.id;
            const badge = typeBadgeStyles[meal.type];

            return (
              <div
                key={meal.id}
                onClick={() => {
                  onSelectMeal(meal.id);
                  onClose();
                }}
                className={`pt-2.5 first:pt-0 p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50/50 ring-2 ring-blue-200'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/70'
                }`}
              >
                <span className="text-2xl shrink-0 p-1 bg-white rounded-lg border border-slate-200 shadow-xs">
                  {meal.icon}
                </span>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="text-sm font-bold text-slate-900 truncate">{meal.name}</h3>
                    <span
                      className={`text-xs font-bold shrink-0 ${
                        meal.price === 0 ? 'text-emerald-600' : 'text-slate-900'
                      }`}
                    >
                      {formatPrice(meal.price)}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 leading-snug mb-2">{meal.description}</p>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badge.bg} ${badge.text}`}
                    >
                      {badge.label}
                    </span>
                    {isSelected && (
                      <span className="text-[10px] font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                        Selected ✓
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3">
          {currentMealId ? (
            <button
              type="button"
              onClick={() => {
                onSelectMeal(null);
                onClose();
              }}
              className="px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
            >
              Remove Meal
            </button>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
