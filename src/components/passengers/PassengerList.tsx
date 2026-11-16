import { useState, useMemo } from 'react';
import { useBooking } from '../../store/BookingContext';
import { useToast } from '../feedback/ToastContext';
import { SEAT_CATEGORIES } from '../../types/seat';
import { AIRCRAFT_LAYOUT_CONFIGS } from '../../types/layout';
import { generateSeatsForLayout } from '../../data/seat';
import { MEAL_MAP } from '../../data/meal';
import { MealSelectorModal } from '../meals/MealSelectorModal';
import { formatPrice } from '../../utils/pricing';

export function PassengerList() {
  const { state, dispatch } = useBooking();
  const { showToast } = useToast();
  const { passengers, activePassengerId, layoutType } = state;

  const [mealModalPassenger, setMealModalPassenger] = useState<{
    id: string;
    name: string;
    mealId: string | null;
  } | null>(null);

  const seatInfoMap = useMemo(() => {
    const config = AIRCRAFT_LAYOUT_CONFIGS[layoutType];
    const seats = generateSeatsForLayout(config);
    return new Map(seats.map((s) => [s.id, { price: s.price, category: s.category }]));
  }, [layoutType]);

  const handleSelectMeal = (passengerId: string, mealId: string | null) => {
    dispatch({ type: 'SELECT_MEAL', payload: { passengerId, mealId } });
    const passenger = passengers.find((p) => p.id === passengerId);
    if (mealId) {
      const meal = MEAL_MAP.get(mealId);
      showToast(`${meal?.name} selected for ${passenger?.name}.`, 'success');
    } else {
      showToast(`Meal removed for ${passenger?.name}.`, 'info');
    }
  };

  return (
    <>
      {mealModalPassenger && (
        <MealSelectorModal
          passengerName={mealModalPassenger.name}
          currentMealId={mealModalPassenger.mealId}
          onSelectMeal={(mealId) => handleSelectMeal(mealModalPassenger.id, mealId)}
          onClose={() => setMealModalPassenger(null)}
        />
      )}

      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50">
          <h3 className="text-sm font-bold text-slate-900">Passenger List</h3>
          <p className="text-xs text-slate-500">Select a passenger, assign a seat and meal</p>
        </div>

        <div className="divide-y divide-slate-100">
          {passengers.map((passenger) => {
            const isActive = passenger.id === activePassengerId;
            const num = passenger.id.split('-')[1];
            const seatInfo = passenger.assignedSeatId ? seatInfoMap.get(passenger.assignedSeatId) : null;
            const selectedMeal = passenger.selectedMealId ? MEAL_MAP.get(passenger.selectedMealId) : null;

            return (
              <div
                key={passenger.id}
                className={`flex flex-col gap-2 p-3.5 transition-all border-l-4 ${
                  isActive ? 'bg-blue-50/70 border-blue-500' : 'bg-white border-transparent hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => dispatch({ type: 'SET_ACTIVE_PASSENGER', payload: passenger.id })}
                    className="flex items-center gap-3 flex-1 min-w-0 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-blue-600 rounded-lg p-1"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                        isActive ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      P{num}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className={`text-sm font-semibold truncate ${isActive ? 'text-blue-900' : 'text-slate-800'}`}>
                          {passenger.name}
                        </p>
                        {isActive && (
                          <span className="text-[9px] font-bold bg-blue-600 text-white px-1.5 py-0.5 rounded-full uppercase tracking-wide">
                            Active
                          </span>
                        )}
                      </div>
                    </div>
                  </button>

                  {passenger.assignedSeatId && (
                    <button
                      type="button"
                      title="Remove assigned seat"
                      aria-label={`Remove seat ${passenger.assignedSeatId} for ${passenger.name}`}
                      onClick={() => {
                        const seatId = passenger.assignedSeatId;
                        dispatch({ type: 'REMOVE_SEAT', payload: passenger.id });
                        showToast(`Seat ${seatId} removed from ${passenger.name}.`, 'info');
                      }}
                      className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-1.5 text-xs pl-11">
                  {passenger.assignedSeatId && seatInfo ? (
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 font-medium">
                      <span>💺</span>
                      <strong className="font-bold">Seat {passenger.assignedSeatId}</strong>
                      <span className="text-emerald-500">•</span>
                      <span>{SEAT_CATEGORIES[seatInfo.category].name}</span>
                      <span className="text-emerald-500">•</span>
                      <span>{seatInfo.price === 0 ? 'Free' : `₹${seatInfo.price}`}</span>
                    </span>
                  ) : (
                    <span className="text-slate-400 text-xs italic">No seat selected</span>
                  )}

                  <button
                    type="button"
                    onClick={() =>
                      setMealModalPassenger({
                        id: passenger.id,
                        name: passenger.name,
                        mealId: passenger.selectedMealId,
                      })
                    }
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium border transition-colors cursor-pointer ${
                      selectedMeal
                        ? 'bg-purple-50 border-purple-200 text-purple-800 hover:bg-purple-100'
                        : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {selectedMeal ? (
                      <>
                        <span>{selectedMeal.icon}</span>
                        <span className="truncate max-w-[140px]">{selectedMeal.name}</span>
                        <span className="opacity-60">•</span>
                        <span>{formatPrice(selectedMeal.price)}</span>
                      </>
                    ) : (
                      <>
                        <span>🍴</span>
                        <span>+ Select Meal</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
