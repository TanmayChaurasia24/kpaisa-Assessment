import React from 'react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Failed to load aircraft cabin layout',
  message = 'We encountered an unexpected error while retrieving live seat availability and pricing. Please check your connection and try again.',
  onRetry,
}) => {
  return (
    <div className="w-full max-w-lg mx-auto py-12 px-6 bg-white border border-red-200 rounded-2xl shadow-sm text-center my-6">
      <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600 text-2xl font-bold">
        ⚠
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-xs text-slate-500 mb-6 max-w-md mx-auto leading-relaxed">
        {message}
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors shadow-sm cursor-pointer"
      >
        <span>↻</span>
        <span>Retry Loading</span>
      </button>
    </div>
  );
};
