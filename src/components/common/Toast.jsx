import React from 'react';
import { CheckCircle2, Info, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Toast = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-[#0F172A] border border-[var(--color-primary)]/40 shadow-xl text-slate-100 animate-in slide-in-from-bottom-5 duration-200">
      <CheckCircle2 className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0" />
      <span className="text-sm font-medium text-slate-200">{toastMessage.message}</span>
    </div>
  );
};
