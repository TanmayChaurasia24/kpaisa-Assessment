import React, { useState, useCallback, type ReactNode } from 'react';
import type { ToastMessage, ToastType } from '../../types/feedback';
import { ToastContext } from './ToastContext';

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const newToast: ToastMessage = { id, type, message };

    setToasts((prev) => [...prev.slice(-3), newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}

      <div
        aria-live="polite"
        className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0"
      >
        {toasts.map((toast) => {
          const styles: Record<ToastType, { bg: string; border: string; icon: string; text: string }> = {
            error: {
              bg: 'bg-red-50 text-red-900',
              border: 'border-red-200',
              icon: '✕',
              text: 'text-red-600',
            },
            warning: {
              bg: 'bg-amber-50 text-amber-900',
              border: 'border-amber-200',
              icon: '⚠',
              text: 'text-amber-600',
            },
            success: {
              bg: 'bg-emerald-50 text-emerald-900',
              border: 'border-emerald-200',
              icon: '✓',
              text: 'text-emerald-600',
            },
            info: {
              bg: 'bg-blue-50 text-blue-900',
              border: 'border-blue-200',
              icon: 'ℹ',
              text: 'text-blue-600',
            },
          };

          const s = styles[toast.type];

          return (
            <div
              key={toast.id}
              role="alert"
              className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border shadow-lg transition-all duration-200 animate-in fade-in slide-in-from-bottom-2 ${s.bg} ${s.border}`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${s.text}`}>
                {s.icon}
              </span>
              <p className="text-xs font-medium leading-relaxed flex-1">{toast.message}</p>
              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                className="text-slate-400 hover:text-slate-600 text-sm leading-none p-0.5 cursor-pointer"
                aria-label="Close notification"
              >
                ✕
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};
