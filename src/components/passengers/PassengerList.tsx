import { useBooking } from '../../store/BookingContext';
import { SEAT_CATEGORIES } from '../../types/seat';
import { AIRCRAFT_LAYOUT_CONFIGS } from '../../types/layout';
import { generateSeatsForLayout } from '../../data/seat';
import { useMemo } from 'react';

export function PassengerList() {
    const { state, dispatch } = useBooking();
    const { passengers, activePassengerId, layoutType } = state;

    // Build a lookup map: seatId -> price & category
    const seatInfoMap = useMemo(() => {
        const config = AIRCRAFT_LAYOUT_CONFIGS[layoutType];
        const seats = generateSeatsForLayout(config);
        return new Map(seats.map((s) => [s.id, { price: s.price, category: s.category }]));
    }, [layoutType]);

    return (
        <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
            <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50">
                <h3 className="text-sm font-bold text-slate-900">Passenger List</h3>
                <p className="text-xs text-slate-500">Select a passenger, then click any seat to assign</p>
            </div>

            <div className="divide-y divide-slate-100">
                {passengers.map((passenger) => {
                    const isActive = passenger.id === activePassengerId;
                    const num = passenger.id.split('-')[1];
                    const seatInfo = passenger.assignedSeatId ? seatInfoMap.get(passenger.assignedSeatId) : null;

                    return (
                        <div
                            key={passenger.id}
                            className={`flex items-center gap-3 px-3 py-2.5 transition-all border-l-4 ${isActive ? 'bg-blue-50 border-blue-500' : 'bg-white border-transparent hover:bg-slate-50'
                                }`}
                        >
                            {/* Click passenger body to make active */}
                            <button
                                type="button"
                                onClick={() => dispatch({ type: 'SET_ACTIVE_PASSENGER', payload: passenger.id })}
                                className="flex items-center gap-3 flex-1 min-w-0 text-left cursor-pointer"
                            >
                                {/* Avatar Badge */}
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${isActive ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
                                        }`}
                                >
                                    P{num}
                                </div>

                                {/* Details */}
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

                                    {passenger.assignedSeatId && seatInfo ? (
                                        <div className="flex items-center gap-1.5 mt-0.5 text-xs">
                                            <span className="font-bold text-emerald-700">
                                                Seat {passenger.assignedSeatId}
                                            </span>
                                            <span className="text-slate-300">•</span>
                                            <span className="text-slate-500 capitalize">
                                                {SEAT_CATEGORIES[seatInfo.category].name}
                                            </span>
                                            <span className="text-slate-300">•</span>
                                            <span className="font-semibold text-slate-700">
                                                {seatInfo.price === 0 ? 'Free' : `₹${seatInfo.price}`}
                                            </span>
                                        </div>
                                    ) : (
                                        <p className="text-xs text-slate-400 mt-0.5">No seat assigned</p>
                                    )}
                                </div>
                            </button>

                            {/* Remove Seat Button (only visible if seat is assigned) */}
                            {passenger.assignedSeatId && (
                                <button
                                    type="button"
                                    title="Remove assigned seat"
                                    onClick={() => dispatch({ type: 'REMOVE_SEAT', payload: passenger.id })}
                                    className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}