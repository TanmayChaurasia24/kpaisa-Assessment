// src/components/passengers/PassengerList.tsx

import { useBooking } from '../../store/BookingContext';

export function PassengerList() {
    const { state, dispatch } = useBooking();
    const { passengers, activePassengerId } = state;

    return (
        <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
            <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50">
                <h3 className="text-sm font-bold text-slate-900">Passenger List</h3>
                <p className="text-xs text-slate-500">Click a passenger to assign their seat</p>
            </div>

            <div className="divide-y divide-slate-100">
                {passengers.map((passenger) => {
                    const isActive = passenger.id === activePassengerId;

                    return (
                        <button
                            key={passenger.id}
                            type="button"
                            onClick={() =>
                                dispatch({ type: 'SET_ACTIVE_PASSENGER', payload: passenger.id })
                            }
                            className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all cursor-pointer ${isActive
                                    ? 'bg-blue-50 border-l-4 border-blue-500'
                                    : 'bg-white border-l-4 border-transparent hover:bg-slate-50'
                                }`}
                        >
                            {/* Avatar Circle */}
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${isActive
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-slate-200 text-slate-600'
                                    }`}
                            >
                                P{passenger.id.split('-')[1]}
                            </div>

                            {/* Passenger Info */}
                            <div className="flex-1 min-w-0">
                                <p
                                    className={`text-sm font-semibold truncate ${isActive ? 'text-blue-900' : 'text-slate-800'
                                        }`}
                                >
                                    {passenger.name}
                                </p>
                                <p className="text-xs text-slate-500">
                                    {passenger.assignedSeatId
                                        ? `Seat ${passenger.assignedSeatId}`
                                        : 'No seat assigned'}
                                </p>
                            </div>

                            {/* Active Indicator */}
                            {isActive && (
                                <span className="text-[10px] font-bold bg-blue-500 text-white px-2 py-0.5 rounded-full uppercase tracking-wide">
                                    Active
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
