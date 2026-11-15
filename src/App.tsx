import { useState } from 'react';
import { AIRCRAFT_LAYOUT_CONFIGS, type LayoutType } from './types/layout';
import { AirplaneCabin } from './components/airplane/AirplaneCabin';
import { CabinLegend } from './components/airplane/CabinLegend';

function App() {
  const [layoutType, setLayoutType] = useState<LayoutType>('3-2');
  const currentConfig = AIRCRAFT_LAYOUT_CONFIGS[layoutType];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans flex flex-col">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-slate-200 px-4 sm:px-8 py-3.5 sticky top-0 z-20 shadow-xs">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black shadow-sm">
              ✈
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                Flight Seat Selection
              </h1>
              <p className="text-xs text-slate-500">
                Interactive Cabin Layout Preview
              </p>
            </div>
          </div>

          {/* Aircraft Layout Configuration Switcher */}
          <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 shadow-inner">
            {(Object.keys(AIRCRAFT_LAYOUT_CONFIGS) as LayoutType[]).map((key) => {
              const config = AIRCRAFT_LAYOUT_CONFIGS[key];
              const isSelected = layoutType === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setLayoutType(key)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer ${isSelected
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                    }`}
                >
                  {config.name.toUpperCase()} ({key})
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 flex flex-col items-center">
        {/* Aircraft Info Banner */}
        <div className="w-full max-w-xl text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-medium mb-2">
            <span>Model: {currentConfig.aircraftModel.toUpperCase()}</span>
            <span>•</span>
            <span>{currentConfig.totalRows} Rows</span>
            <span>•</span>
            <span>{currentConfig.groups.flat().length} Seats / Row</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            {currentConfig.name} Cabin
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Review the seating arrangement and seat categories below.
          </p>
        </div>

        {/* Legend */}
        <div className="w-full max-w-xl mb-4">
          <CabinLegend />
        </div>

        {/* Render Airplane Cabin */}
        <div className="w-full">
          <AirplaneCabin config={currentConfig} />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-400">
        Aircraft Cabin Layout System • Built with React & Tailwind CSS
      </footer>
    </div>
  );
}

export default App;
