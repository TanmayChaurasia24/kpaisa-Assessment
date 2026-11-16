import React from 'react';

export const CabinSkeleton: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center py-6 px-4 animate-pulse">
      <div className="w-48 h-20 bg-slate-200 rounded-t-[100px] border-4 border-slate-300 flex items-center justify-center mb-0">
        <div className="w-20 h-4 bg-slate-300 rounded" />
      </div>

      <div className="bg-white border-x-4 border-slate-300 shadow-md px-8 py-6 rounded-b-2xl w-full max-w-lg flex flex-col items-center gap-3">
        <div className="flex gap-4 pb-3 border-b border-slate-200 w-full justify-center">
          <div className="w-24 h-4 bg-slate-200 rounded" />
          <div className="w-8 h-4 bg-slate-100 rounded" />
          <div className="w-16 h-4 bg-slate-200 rounded" />
        </div>

        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="flex items-center gap-2 py-1 justify-center w-full">
            <div className="flex gap-2">
              <div className="w-9 h-10 bg-slate-200 rounded-t-lg rounded-b" />
              <div className="w-9 h-10 bg-slate-200 rounded-t-lg rounded-b" />
              <div className="w-9 h-10 bg-slate-200 rounded-t-lg rounded-b" />
            </div>

            <div className="w-8 flex justify-center">
              <div className="w-5 h-5 rounded-full bg-slate-200" />
            </div>

            <div className="flex gap-2">
              <div className="w-9 h-10 bg-slate-200 rounded-t-lg rounded-b" />
              <div className="w-9 h-10 bg-slate-200 rounded-t-lg rounded-b" />
            </div>
          </div>
        ))}
      </div>

      <div className="w-32 h-8 bg-slate-200 border-b-4 border-x-4 border-slate-300 rounded-b-xl mt-0" />
    </div>
  );
};
