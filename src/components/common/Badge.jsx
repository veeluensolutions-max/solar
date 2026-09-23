import React from 'react';

export const Badge = ({ children, variant = 'neutral', size = 'sm' }) => {
  const sizeClasses = {
    xs: 'px-1.5 py-0.5 text-[10px] font-medium tracking-wide',
    sm: 'px-2 py-0.5 text-xs font-medium',
    md: 'px-2.5 py-1 text-xs font-semibold',
  };

  const variantClasses = {
    neutral: 'bg-slate-800/80 text-slate-300 border border-slate-700/60',
    primary: 'bg-[var(--color-primary-light)] text-[var(--color-primary)] border border-[var(--color-primary)]/30',
    success: 'bg-emerald-950/50 text-emerald-400 border border-emerald-800/40',
    warning: 'bg-amber-950/50 text-amber-300 border border-amber-800/40',
    info: 'bg-sky-950/50 text-sky-300 border border-sky-800/40',
    danger: 'bg-rose-950/50 text-rose-300 border border-rose-800/40',
    purple: 'bg-purple-950/50 text-purple-300 border border-purple-800/40',
  };

  return (
    <span
      className={`inline-flex items-center rounded-md font-sans transition-colors duration-150 ${sizeClasses[size] || sizeClasses.sm} ${
        variantClasses[variant] || variantClasses.neutral
      }`}
    >
      {children}
    </span>
  );
};
