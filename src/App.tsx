import { useState, useCallback } from 'react';
import { AIRCRAFT_LAYOUT_CONFIGS, type LayoutType } from './types/layout';
import { AirplaneCabin } from './components/airplane/AirplaneCabin';
import { CabinLegend } from './components/airplane/CabinLegend';
import { PassengerSelector } from './components/passengers/PassengerSelector';
import { PassengerList } from './components/passengers/PassengerList';
import { PricingSummary } from './components/pricing/PricingSummary';
import { CabinSkeleton } from './components/feedback/CabinSkeleton';
import { ErrorState } from './components/feedback/ErrorState';
import { useBooking } from './store/BookingContext';
import { useToast } from './components/feedback/ToastContext';

function App() {
  const { state, dispatch } = useBooking();
  const { showToast } = useToast();
  const currentConfig = AIRCRAFT_LAYOUT_CONFIGS[state.layoutType];

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const hasAnySeatAssigned = state.passengers.some((p) => p.assignedSeatId !== null);
  const [pendingLayout, setPendingLayout] = useState<LayoutType | null>(null);

  function handleLayoutSwitchRequest(key: LayoutType) {
    if (key === state.layoutType) return;
    if (hasAnySeatAssigned) {
      setPendingLayout(key);
    } else {
      dispatch({ type: 'SET_LAYOUT', payload: key });
      showToast(`Switched to ${AIRCRAFT_LAYOUT_CONFIGS[key].name}.`, 'info');
    }
  }

  function confirmLayoutSwitch() {
    if (pendingLayout) {
      dispatch({ type: 'SET_LAYOUT', payload: pendingLayout });
      showToast(`Switched to ${AIRCRAFT_LAYOUT_CONFIGS[pendingLayout].name}. All seats were reset.`, 'info');
    }
    setPendingLayout(null);
  }

  const triggerSimulatedLoading = useCallback(() => {
    setIsError(false);
    setIsLoading(true);
    showToast('Simulating cabin and availability fetch...', 'info');
    setTimeout(() => {
      setIsLoading(false);
      showToast('Cabin data loaded successfully.', 'success');
    }, 1500);
  }, [showToast]);

  const triggerSimulatedError = useCallback(() => {
    setIsLoading(false);
    setIsError(true);
    showToast('Simulated connection error triggered.', 'error');
  }, [showToast]);

  const handleRetry = useCallback(() => {
    setIsError(false);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showToast('Cabin data recovered successfully.', 'success');
    }, 1200);
  }, [showToast]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans flex flex-col overflow-x-hidden">
      {pendingLayout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full border border-slate-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 text-xl font-bold">
                ⚠
              </div>
              <h2 className="text-base font-bold text-slate-900">Switch Aircraft Layout?</h2>
            </div>
            <p className="text-xs text-slate-600 mb-5 leading-relaxed">
              Switching to the{' '}
              <strong className="text-slate-900">
                {AIRCRAFT_LAYOUT_CONFIGS[pendingLayout].name}
              </strong>{' '}
              configuration will <strong className="text-red-600 font-bold">clear all currently selected seats</strong>.
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setPendingLayout(null)}
                className="flex-1 px-4 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmLayoutSwitch}
                className="flex-1 px-4 py-2 rounded-lg bg-red-600 text-white text-xs font-semibold hover:bg-red-700 transition-colors cursor-pointer"
              >
                Clear & Switch
              </button>
            </div>
          </div>
        </div>
      )}

      <nav className="bg-white border-b border-slate-200 px-4 sm:px-8 py-3.5 sticky top-0 z-20 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black shadow-sm">
                ✈
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                  Flight Seat Selection
                </h1>
                <p className="text-xs text-slate-500">Interactive Cabin, Passengers & Meals</p>
              </div>
            </div>

            <div className="md:hidden flex items-center gap-1.5">
              <button
                type="button"
                onClick={triggerSimulatedLoading}
                aria-label="Simulate loading"
                className="px-2 py-1 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200"
              >
                ↻ Skeleton
              </button>
              <button
                type="button"
                onClick={triggerSimulatedError}
                aria-label="Simulate error"
                className="px-2 py-1 rounded-md text-[10px] font-semibold bg-red-50 text-red-700 border border-red-200"
              >
                ⚠ Error
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between w-full md:w-auto gap-2.5">
            <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 shadow-inner">
              {(Object.keys(AIRCRAFT_LAYOUT_CONFIGS) as LayoutType[]).map((key) => {
                const config = AIRCRAFT_LAYOUT_CONFIGS[key];
                const isSelected = state.layoutType === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleLayoutSwitchRequest(key)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                    }`}
                  >
                    {config.name.toUpperCase()} ({key})
                  </button>
                );
              })}
            </div>

            <div className="hidden md:inline-flex items-center gap-1.5 border-l pl-2.5 border-slate-200">
              <button
                type="button"
                onClick={triggerSimulatedLoading}
                title="Simulate network loading skeleton"
                disabled={isLoading}
                className="px-2.5 py-1.5 rounded-lg text-[11px] font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer border border-slate-200"
              >
                ↻ Skeleton
              </button>
              <button
                type="button"
                onClick={triggerSimulatedError}
                title="Simulate network error state"
                disabled={isError}
                className="px-2.5 py-1.5 rounded-lg text-[11px] font-semibold bg-red-50 hover:bg-red-100 text-red-700 transition-colors cursor-pointer border border-red-200"
              >
                ⚠ Error
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-6">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="flex-1 w-full flex flex-col items-center min-w-0 order-2 lg:order-1">
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

            {isError ? (
              <ErrorState onRetry={handleRetry} />
            ) : isLoading ? (
              <CabinSkeleton />
            ) : (
              <AirplaneCabin config={currentConfig} />
            )}
          </div>

          <aside className="w-full lg:w-88 xl:w-96 shrink-0 flex flex-col gap-4 order-1 lg:order-2">
            <PassengerSelector />
            <PassengerList />
            <PricingSummary />
          </aside>
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-400">
        Aircraft Cabin Layout System • Built with React, TypeScript & Tailwind CSS
      </footer>
    </div>
  );
}

export default App;
