import { useState } from 'react';
import { useBooking } from '../../store/BookingContext';
import { useToast } from '../feedback/ToastContext';

const MIN_PASSENGERS = 1;
const MAX_PASSENGERS = 9;

export function PassengerSelector() {
  const { state, dispatch } = useBooking();
  const { showToast } = useToast();
  const { passengerCount, passengers } = state;

  const [pendingRemoval, setPendingRemoval] = useState<{
    passengerName: string;
    seatId: string;
  } | null>(null);

  const handleDecrement = () => {
    if (passengerCount <= MIN_PASSENGERS) return;

    const passengerToRemove = passengers[passengerCount - 1];
    if (passengerToRemove?.assignedSeatId) {
      setPendingRemoval({
        passengerName: passengerToRemove.name,
        seatId: passengerToRemove.assignedSeatId,
      });
    } else {
      dispatch({
        type: 'SET_PASSENGER_COUNT',
        payload: passengerCount - 1,
      });
    }
  };

  const confirmRemoval = () => {
    if (pendingRemoval) {
      dispatch({
        type: 'SET_PASSENGER_COUNT',
        payload: passengerCount - 1,
      });
      showToast(
        `${pendingRemoval.passengerName} and Seat ${pendingRemoval.seatId} were released.`,
        'info'
      );
      setPendingRemoval(null);
    }
  };

  const handleIncrement = () => {
    if (passengerCount >= MAX_PASSENGERS) return;
    dispatch({
      type: 'SET_PASSENGER_COUNT',
      payload: passengerCount + 1,
    });
  };

  return (
    <>
      {pendingRemoval && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full border border-slate-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 text-xl font-bold">
                ⚠
              </div>
              <h2 className="text-base font-bold text-slate-900">Release Assigned Seat?</h2>
            </div>
            <p className="text-xs text-slate-600 mb-5 leading-relaxed">
              Reducing passenger count will remove{' '}
              <strong className="text-slate-900">{pendingRemoval.passengerName}</strong> and
              clear their assigned seat{' '}
              <strong className="text-red-600 font-bold">({pendingRemoval.seatId})</strong>.
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setPendingRemoval(null)}
                className="flex-1 px-4 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmRemoval}
                className="flex-1 px-4 py-2 rounded-lg bg-red-600 text-white text-xs font-semibold hover:bg-red-700 transition-colors cursor-pointer"
              >
                Confirm & Remove
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-xs">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Passengers</h3>
          <p className="text-xs text-slate-500">Max {MAX_PASSENGERS} passengers</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleDecrement}
            disabled={passengerCount <= MIN_PASSENGERS}
            aria-label="Decrease passenger count"
            className="w-8 h-8 rounded-lg border border-slate-300 bg-slate-50 text-slate-700 font-bold text-lg flex items-center justify-center transition-colors hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            −
          </button>
          <span className="w-8 text-center text-lg font-bold text-slate-900 tabular-nums">
            {passengerCount}
          </span>
          <button
            type="button"
            onClick={handleIncrement}
            disabled={passengerCount >= MAX_PASSENGERS}
            aria-label="Increase passenger count"
            className="w-8 h-8 rounded-lg border border-slate-300 bg-slate-50 text-slate-700 font-bold text-lg flex items-center justify-center transition-colors hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            +
          </button>
        </div>
      </div>
    </>
  );
}
