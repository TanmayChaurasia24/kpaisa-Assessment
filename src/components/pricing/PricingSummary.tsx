import React, { useMemo } from 'react';
import { useBooking } from '../../store/BookingContext';
import {
  calculateTotal,
  formatPrice,
  getPricingLineItems,
  getSeatMapForLayout,
} from '../../utils/pricing';

export const PricingSummary: React.FC = () => {
  const { state } = useBooking();
  const { passengers, layoutType } = state;

  const seatMap = useMemo(() => getSeatMapForLayout(layoutType), [layoutType]);

  const lineItems = useMemo(
    () => getPricingLineItems(passengers, seatMap),
    [passengers, seatMap]
  );

  const grandTotal = useMemo(
    () => calculateTotal(passengers, seatMap),
    [passengers, seatMap]
  );

  const seatsSelectedCount = useMemo(
    () => passengers.filter((p) => p.assignedSeatId !== null).length,
    [passengers]
  );

  const mealsSelectedCount = useMemo(
    () => passengers.filter((p) => p.selectedMealId !== null).length,
    [passengers]
  );

  const totalSeatsCost = useMemo(
    () => lineItems.reduce((acc, item) => acc + item.seatPrice, 0),
    [lineItems]
  );

  const totalMealsCost = useMemo(
    () => lineItems.reduce((acc, item) => acc + item.mealPrice, 0),
    [lineItems]
  );

  const totalPassengers = passengers.length;
  const isEverythingEmpty = seatsSelectedCount === 0 && mealsSelectedCount === 0;

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Fare Summary</h3>
          <p className="text-xs text-slate-500">Seats & in-flight meals breakdown</p>
        </div>
        <div className="flex gap-1.5">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 uppercase tracking-wider">
            {seatsSelectedCount}/{totalPassengers} Seats
          </span>
          {mealsSelectedCount > 0 && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 uppercase tracking-wider">
              {mealsSelectedCount}/{totalPassengers} Meals
            </span>
          )}
        </div>
      </div>

      <div className="p-4 space-y-3">
        {isEverythingEmpty ? (
          <div className="text-center py-6 px-4 bg-slate-50 rounded-lg border border-dashed border-slate-200">
            <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 text-lg">
              💺
            </div>
            <p className="text-xs font-semibold text-slate-700">No add-ons selected yet</p>
            <p className="text-[11px] text-slate-400 mt-1 max-w-xs mx-auto">
              Select seats on the aircraft cabin layout or add complimentary/gourmet meals to review total charges.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {lineItems.map((item) => (
              <div key={item.passengerId} className="py-2.5 flex flex-col gap-1 text-xs">
                <div className="flex items-center justify-between font-semibold text-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 font-bold flex items-center justify-center text-[10px] shrink-0">
                      P{item.passengerNumber}
                    </span>
                    <span>{item.passengerName}</span>
                  </div>
                  <span className="font-bold text-slate-900">
                    {formatPrice(item.totalPrice)}
                  </span>
                </div>

                <div className="pl-7 space-y-0.5 text-[11px] text-slate-500">
                  <div className="flex justify-between">
                    <span>
                      Seat: {item.seatId ? `${item.seatId} (${item.seatCategoryName || 'Standard'})` : 'None'}
                    </span>
                    <span>{item.seatId ? formatPrice(item.seatPrice) : '—'}</span>
                  </div>

                  {item.mealId && (
                    <div className="flex justify-between text-purple-700">
                      <span className="truncate max-w-[200px]">
                        Meal: {item.mealIcon} {item.mealName}
                      </span>
                      <span>{formatPrice(item.mealPrice)}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="border-t border-slate-200 pt-3 mt-3 space-y-1.5 text-xs text-slate-500">
          <div className="flex items-center justify-between">
            <span>Total Seat Add-ons</span>
            <span className="font-medium text-slate-700">{formatPrice(totalSeatsCost)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Total Meal Add-ons</span>
            <span className="font-medium text-slate-700">{formatPrice(totalMealsCost)}</span>
          </div>

          <div className="flex items-baseline justify-between pt-2.5 border-t border-dashed border-slate-200">
            <div>
              <span className="text-sm font-bold text-slate-900">Total Booking Add-ons</span>
              <p className="text-[10px] text-slate-400">All applicable taxes included</p>
            </div>
            <div className="text-right">
              <span className="text-xl font-extrabold text-blue-600 tabular-nums">
                {formatPrice(grandTotal)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
