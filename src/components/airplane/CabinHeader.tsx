import React from 'react';
import type { AircraftLayoutConfig } from '../../types/layout';

interface CabinHeaderProps {
  config: AircraftLayoutConfig;
}

export const CabinHeader: React.FC<CabinHeaderProps> = ({ config }) => {
  return (
    <div className="sticky top-0 z-10 flex items-center justify-center pb-2 pt-1 mb-2 border-b border-slate-200 bg-white/95 backdrop-blur-xs">
      {config.groups.map((group, groupIdx) => {
        const isLastGroup = groupIdx === config.groups.length - 1;

        return (
          <React.Fragment key={groupIdx}>
            <div className="flex gap-1.5 md:gap-2">
              {group.map((col) => (
                <div
                  key={col}
                  className="min-w-[38px] w-9 md:w-10 text-center font-bold text-xs text-slate-500 uppercase tracking-wider"
                >
                  {col}
                </div>
              ))}
            </div>

            {!isLastGroup && (
              <div className="w-8 md:w-10 text-center text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
                {groupIdx === 0 ? 'Row' : ''}
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
