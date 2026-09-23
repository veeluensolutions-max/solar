import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const MetricCard = ({ title, value, growth, period, icon: Icon, isCurrency = false }) => {
  const formattedValue = isCurrency
    ? typeof value === 'number'
      ? value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
      : value
    : typeof value === 'number'
    ? value.toLocaleString('pt-BR')
    : value;

  return (
    <div className="relative overflow-hidden rounded-xl bg-[#0F1626]/90 border border-white/[0.07] p-5 shadow-sm hover:border-[var(--color-primary)]/40 hover:bg-[#121B2F] transition-all duration-200 group">
      {/* Luz ambiente sutil no canto */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[var(--color-primary)]/5 via-transparent to-transparent pointer-events-none rounded-tr-xl" />

      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-400 tracking-wide uppercase">
          {title}
        </span>
        {Icon && (
          <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-slate-400 group-hover:text-[var(--color-primary)] group-hover:border-[var(--color-primary)]/30 transition-colors">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="mt-3">
        <div className="text-2xl lg:text-[28px] font-bold tracking-tight text-white font-sans">
          {formattedValue}
        </div>
      </div>

      <div className="mt-2.5 flex items-center gap-1.5 text-xs">
        <span className="inline-flex items-center gap-0.5 text-emerald-400 font-semibold bg-emerald-500/10 px-1.5 py-0.5 rounded">
          <ArrowUpRight className="w-3.5 h-3.5" />
          {growth}
        </span>
        <span className="text-slate-500 font-normal">{period}</span>
      </div>
    </div>
  );
};
