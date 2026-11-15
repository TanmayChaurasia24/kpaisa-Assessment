import { useBooking } from "../../store/BookingContext";

const MIN_PASSENGERS = 1;
const MAX_PASSENGERS = 9;

export function PassengerSelector() {
    const { state, dispatch } = useBooking();
    const { passengerCount } = state;

    const decrement = () => {
        dispatch({
            type: 'SET_PASSENGER_COUNT',
            payload: passengerCount - 1
        });
    };

    const increment = () => {
        dispatch({
            type: 'SET_PASSENGER_COUNT',
            payload: passengerCount + 1
        })
    }


    return (
        <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-xs">
            <div>
                <h3 className="text-sm font-bold text-slate-900">Passengers</h3>
                <p className="text-xs text-slate-500">Max {MAX_PASSENGERS} passengers</p>
            </div>
            <div className="flex items-center gap-3">
                {/* Minus Button */}
                <button
                    type="button"
                    onClick={decrement}
                    disabled={passengerCount <= MIN_PASSENGERS}
                    className="w-8 h-8 rounded-lg border border-slate-300 bg-slate-50 text-slate-700 font-bold text-lg flex items-center justify-center transition-colors hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                    −
                </button>
                {/* Count Display */}
                <span className="w-8 text-center text-lg font-bold text-slate-900 tabular-nums">
                    {passengerCount}
                </span>
                {/* Plus Button */}
                <button
                    type="button"
                    onClick={increment}
                    disabled={passengerCount >= MAX_PASSENGERS}
                    className="w-8 h-8 rounded-lg border border-slate-300 bg-slate-50 text-slate-700 font-bold text-lg flex items-center justify-center transition-colors hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                    +
                </button>
            </div>
        </div>
    );
}