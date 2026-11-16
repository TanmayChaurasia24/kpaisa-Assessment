import React, { useCallback, useMemo } from 'react';
import type { AircraftLayoutConfig } from '../../types/layout';
import { generateSeatsForLayout } from '../../data/seat';
import { OCCUPIED_SEATS } from '../../store/bookingstore';
import { useBooking } from '../../store/BookingContext';
import { CabinHeader } from './CabinHeader';
import { CabinRow } from './CabinRow';

interface AirplaneCabinProps {
  config: AircraftLayoutConfig;
}

export const AirplaneCabin: React.FC<AirplaneCabinProps> = ({ config }) => {
  const { state, dispatch } = useBooking();
  const { passengers, activePassengerId, layoutType } = state;

  const seatMap = useMemo(() => {
    const seats = generateSeatsForLayout(config);
    return new Map(seats.map((seat) => [seat.id, seat]));
  }, [config]);

  const rows = useMemo(
    () => Array.from({ length: config.totalRows }, (_, i) => i + 1),
    [config.totalRows]
  );

  const occupiedSeatIds = OCCUPIED_SEATS[layoutType];

  // Map of seatId -> "P1", "P2"
  const assignmentMap = useMemo<Map<string, string>>(() => {
    const map = new Map<string, string>();
    passengers.forEach((p) => {
      if (p.assignedSeatId) {
        const num = p.id.split('-')[1];
        map.set(p.assignedSeatId, `P${num}`);
      }
    });
    return map;
  }, [passengers]);

  const activePassengerLabel = useMemo(() => {
    if (!activePassengerId) return '';
    return `P${activePassengerId.split('-')[1]}`;
  }, [activePassengerId]);

  const handleSeatClick = useCallback(
    (seatId: string) => {
      dispatch({ type: 'ASSIGN_SEAT', payload: seatId });
    },
    [dispatch]
  );

  return (
    <div className="w-full flex flex-col items-center py-4 px-2 sm:px-4">
      {/* Active Passenger Hint Bar */}
      <div className="mb-4 text-xs font-medium text-slate-600 bg-blue-50 border border-blue-200 rounded-full px-4 py-1.5 shadow-xs flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
        {activePassengerId ? (
          <span>
            Clicking a seat assigns it to{' '}
            <strong className="text-blue-700">{activePassengerLabel}</strong> (or click your seat to unassign)
          </span>
        ) : (
          <span>Select a passenger on the left to start assigning seats</span>
        )}
      </div>

      <div className="w-full max-w-full overflow-x-auto pb-6 flex justify-center">
        <div className="min-w-fit px-12 sm:px-14 flex flex-col items-center">
          {/* Cockpit */}
          <div className="relative w-52 sm:w-60 h-24 bg-gradient-to-b from-slate-200 via-slate-100 to-white rounded-t-[120px] border-t-4 border-x-4 border-slate-300 flex flex-col items-center justify-center shadow-inner">
            <div className="flex gap-2.5 mb-1.5">
              <div className="w-6 h-3 bg-sky-900 rounded-tl-lg transform -rotate-12 border border-sky-950" />
              <div className="w-7 h-3 bg-sky-900 rounded-t-sm border border-sky-950" />
              <div className="w-6 h-3 bg-sky-900 rounded-tr-lg transform rotate-12 border border-sky-950" />
            </div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">
              Cockpit / Front
            </span>
          </div>

          {/* Fuselage Body */}
          <div className="relative bg-white border-x-4 border-slate-300 shadow-xl px-6 sm:px-10 py-5">
            <CabinHeader config={config} />

            <div className="flex flex-col gap-1">
              {rows.map((rowNumber) => (
                <CabinRow
                  key={rowNumber}
                  rowNumber={rowNumber}
                  config={config}
                  seatMap={seatMap}
                  occupiedSeatIds={occupiedSeatIds}
                  assignmentMap={assignmentMap}
                  activePassengerLabel={activePassengerLabel}
                  onSeatClick={handleSeatClick}
                />
              ))}
            </div>

            <div className="mt-8 pt-4 border-t-2 border-dashed border-slate-200 flex items-center justify-center gap-4 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              <span>Lavatory</span>
              <span>•</span>
              <span>Rear Galley</span>
              <span>•</span>
              <span>Lavatory</span>
            </div>
          </div>

          {/* Tail */}
          <div className="w-36 h-10 bg-gradient-to-b from-white to-slate-200 border-b-4 border-x-4 border-slate-300 rounded-b-2xl flex items-center justify-center text-[10px] font-bold text-slate-400 uppercase tracking-widest shadow-xs">
            Aircraft Tail
          </div>
        </div>
      </div>
    </div>
  );
};