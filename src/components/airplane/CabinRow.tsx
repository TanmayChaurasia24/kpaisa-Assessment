import React from 'react';
import type { AircraftLayoutConfig } from '../../types/layout';
import type { Seat } from '../../types/seat';
import { SeatItem } from './SeatItem';

interface CabinRowProps {
  rowNumber: number;
  config: AircraftLayoutConfig;
  seatMap: Map<string, Seat>;
}

export const CabinRow: React.FC<CabinRowProps> = ({ rowNumber, config, seatMap }) => {
  const isExitRow = config.exitRows.includes(rowNumber);
  const isWingRow = config.wingRows.includes(rowNumber);

  return (
    <div className="relative flex items-center justify-center py-1 group/row">
      {/* Emergency Exit Row Indicators on the fuselage edge */}
      {isExitRow && (
        <>
          <span
            aria-label="Emergency Exit"
            className="absolute -left-9 md:-left-11 text-[9px] font-bold text-amber-700 bg-amber-100 border border-amber-300 px-1 py-0.5 rounded shadow-xs uppercase tracking-tighter"
          >
            Exit
          </span>
          <span
            aria-label="Emergency Exit"
            className="absolute -right-9 md:-right-11 text-[9px] font-bold text-amber-700 bg-amber-100 border border-amber-300 px-1 py-0.5 rounded shadow-xs uppercase tracking-tighter"
          >
            Exit
          </span>
        </>
      )}

      {/* Subtle Wing marker on the edges */}
      {isWingRow && (
        <>
          <span className="absolute -left-3 w-1.5 h-6 bg-slate-300 rounded-l" title="Wing Section" />
          <span className="absolute -right-3 w-1.5 h-6 bg-slate-300 rounded-r" title="Wing Section" />
        </>
      )}

      {/* Seat Groups separated by Aisles */}
      <div className="flex items-center justify-center">
        {config.groups.map((group, groupIdx) => {
          const isLastGroup = groupIdx === config.groups.length - 1;

          return (
            <React.Fragment key={groupIdx}>
              {/* Group of seats */}
              <div className="flex gap-1.5 md:gap-2">
                {group.map((col) => {
                  const seatId = `${rowNumber}${col}`;
                  const seat = seatMap.get(seatId);
                  if (!seat) return null;
                  return <SeatItem key={seat.id} seat={seat} />;
                })}
              </div>

              {/* Aisle Spacer between groups */}
              {!isLastGroup && (
                <div className="w-8 md:w-10 flex items-center justify-center select-none">
                  {/* Row number displayed in the first aisle */}
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
};

