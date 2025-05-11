import React from 'react';
import { Loader2 } from 'lucide-react';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
      <Loader2 className="h-12 w-12 text-blue-600 animate-spin mb-4" />
      <h2 className="text-xl font-semibold text-slate-900">Loading your dashboard...</h2>
      <p className="text-slate-600 mt-2">Preparing your financial insights</p>
    </div>
  );
};

export default Loading;