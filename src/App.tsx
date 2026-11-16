import { useState } from 'react';
import { AIRCRAFT_LAYOUT_CONFIGS, type LayoutType } from './types/layout';
import { AirplaneCabin } from './components/airplane/AirplaneCabin';
import { CabinLegend } from './components/airplane/CabinLegend';
import { PassengerSelector } from './components/passengers/PassengerSelector';
import { PassengerList } from './components/passengers/PassengerList';
import { useBooking } from './store/BookingContext';

function App() {
  const { state, dispatch } = useBooking();
  const currentConfig = AIRCRAFT_LAYOUT_CONFIGS[state.layoutType];

  const hasAnySeatAssigned = state.passengers.some((p) => p.assignedSeatId !== null);
  const [pendingLayout, setPendingLayout] = useState<LayoutType | null>(null);

  function handleLayoutSwitchRequest(key: LayoutType) {
    if (key === state.layoutType) return;
    if (hasAnySeatAssigned) {
      // Prompt user first
      setPendingLayout(key);
    } else {
      dispatch({ type: 'SET_LAYOUT', payload: key });
    }
  }

  function confirmLayoutSwitch() {
    if (pendingLayout) {
      dispatch({ type: 'SET_LAYOUT', payload: pendingLayout });
    }
    setPendingLayout(null);
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans flex flex-col">
      {/* ── Confirmation Modal ── */}
      {pendingLayout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full border border-slate-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 text-xl font-bold">
                ⚠
              </div>
              <h2 className="text-base font-bold text-slate-900">Switch Aircraft Layout?</h2>
            </div>
            <p className="text-sm text-slate-600 mb-5">
              Switching to the{' '}
              <span className="font-semibold text-slate-900">
                {AIRCRAFT_LAYOUT_CONFIGS[pendingLayout].name}
              </span>{' '}
              configuration will <span className="text-red-600 font-semibold">clear all currently selected seats</span>.
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setPendingLayout(null)}
                className="flex-1 px-4 py-2 rounded-lg border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmLayoutSwitch}
                className="flex-1 px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-colors cursor-pointer"
              >
                Clear & Switch
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Navigation */}
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
              <p className="text-xs text-slate-500">Interactive Passenger & Seat Management</p>
            </div>
          </div>

          {/* Layout switcher */}
          <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 shadow-inner">
            {(Object.keys(AIRCRAFT_LAYOUT_CONFIGS) as LayoutType[]).map((key) => {
              const config = AIRCRAFT_LAYOUT_CONFIGS[key];
              const isSelected = state.layoutType === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleLayoutSwitchRequest(key)}
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

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="w-full lg:w-72 shrink-0 flex flex-col gap-4">
            <PassengerSelector />
            <PassengerList />
          </aside>

          {/* Airplane Cabin */}
          <div className="flex-1 flex flex-col items-center">
            <div className="w-full max-w-xl text-center mb-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-medium">
                <span>Model: {currentConfig.aircraftModel.toUpperCase()}</span>
                <span>•</span>
                <span>{currentConfig.totalRows} Rows</span>
                <span>•</span>
                <span>{currentConfig.groups.flat().length} Seats / Row</span>
              </div>
            </div>

            <div className="w-full max-w-xl mb-4">
              <CabinLegend />
            </div>

            <AirplaneCabin config={currentConfig} />
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-400">
        Aircraft Cabin Layout System • Built with React & Tailwind CSS
      </footer>
    </div>
  );
}

export default App;