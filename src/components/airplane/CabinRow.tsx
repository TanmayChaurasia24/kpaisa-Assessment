import React from 'react';
import type { AircraftLayoutConfig } from '../../types/layout';
import type { Seat } from '../../types/seat';
import { SeatItem, type SeatStatus } from './SeatItem';

interface CabinRowProps {
  rowNumber: number;
  config: AircraftLayoutConfig;
  seatMap: Map<string, Seat>;
  occupiedSeatIds: Set<string>;
  assignmentMap: Map<string, string>;
  activePassengerLabel: string;
  onSeatClick: (seatId: string) => void;
}

export const CabinRow = React.memo(function CabinRow({
  rowNumber,
  config,
  seatMap,
  occupiedSeatIds,
  assignmentMap,
  activePassengerLabel,
  onSeatClick,
}: CabinRowProps) {
  const isExitRow = config.exitRows.includes(rowNumber);
  const isWingRow = config.wingRows.includes(rowNumber);

  function getSeatStatus(seatId: string): SeatStatus {
    if (occupiedSeatIds.has(seatId)) return 'occupied';
    const ownerLabel = assignmentMap.get(seatId);
    if (!ownerLabel) return 'available';
    return ownerLabel === activePassengerLabel ? 'selected-mine' : 'selected-other';
  }

  return (
    <div className="relative flex items-center justify-center py-0.5 group/row">
      {isExitRow && (
        <>
          <span className="absolute -left-9 md:-left-11 text-[9px] font-bold text-amber-700 bg-amber-100 border border-amber-300 px-1 py-0.5 rounded shadow-xs uppercase tracking-tighter">
            Exit
          </span>
          <span className="absolute -right-9 md:-right-11 text-[9px] font-bold text-amber-700 bg-amber-100 border border-amber-300 px-1 py-0.5 rounded shadow-xs uppercase tracking-tighter">
            Exit
          </span>
        </>
      )}

      {isWingRow && (
        <>
          <span className="absolute -left-3 w-1.5 h-6 bg-slate-300 rounded-l" title="Wing" />
          <span className="absolute -right-3 w-1.5 h-6 bg-slate-300 rounded-r" title="Wing" />
        </>
      )}

      <div className="flex items-center justify-center">
        {config.groups.map((group, groupIdx) => {
          const isLastGroup = groupIdx === config.groups.length - 1;

          return (
            <React.Fragment key={groupIdx}>
              <div className="flex gap-1.5 md:gap-2">
                {group.map((col) => {
                  const seatId = `${rowNumber}${col}`;
                  const seat = seatMap.get(seatId);
                  if (!seat) return null;

                  const status = getSeatStatus(seatId);
                  const ownerLabel = assignmentMap.get(seatId);

                  return (
                    <SeatItem
                      key={seat.id}
                      seat={seat}
                      status={status}
                      passengerLabel={ownerLabel}
                      onClick={() => onSeatClick(seatId)}
                    />
                  );
                })}
              </div>

              {!isLastGroup && (
                <div className="w-8 md:w-10 flex items-center justify-center select-none">
                  {groupIdx === 0 ? (
                    <span className="text-[11px] font-bold text-slate-500 bg-slate-100 border border-slate-300 w-6 h-6 rounded-full flex items-center justify-center shadow-xs">
                      {rowNumber}
                    </span>
                  ) : (
                    <div className="w-px h-8 border-r border-dashed border-slate-300" />
                  )}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
});
