import React from 'react';
import { reportStats } from '../../../data/mockData';
import {
  TrendingUp,
  PieChart,
  BarChart,
  AlertOctagon,
  Percent,
  CheckCircle,
  HelpCircle
} from 'lucide-react';

export const Relatorios = () => {
  return (
    <div className="space-y-6">
      {/* Topo */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white font-sans">
          Relatórios & Inteligência Comercial
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Visão consolidada da conversão, canais de aquisição e motivos de objeção
        </p>
      </div>

      {/* Destaque Principal Solicitado: Taxa de conversão 13,3% */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl bg-gradient-to-br from-[#121B2F] to-[#0A101D] border border-[var(--color-primary)]/40 p-5 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-primary-light)] blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
              Taxa de Conversão
            </span>
            <Percent className="w-5 h-5 text-[var(--color-primary)]" />
          </div>
          <div className="mt-3 text-4xl font-extrabold text-white tracking-tight font-sans">
            {reportStats.conversionRate}
          </div>
          <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
            De cada 100 leads qualificados recebidos, aproximadamente 13 se tornam contratos assinados.
          </p>
        </div>

        <div className="rounded-xl bg-[#0F1626]/90 border border-white/[0.07] p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Ticket Médio
            </span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-3 text-3xl font-bold text-white font-mono">
            {reportStats.avgTicket}
          </div>
          <p className="text-xs text-slate-400 mt-1.5">
            Valor médio contratado por instalação fotovoltaica.
          </p>
        </div>

        <div className="rounded-xl bg-[#0F1626]/90 border border-white/[0.07] p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Ciclo Médio de Fechamento
            </span>
            <CheckCircle className="w-4 h-4 text-sky-400" />
          </div>
          <div className="mt-3 text-3xl font-bold text-white">
            {reportStats.cycleDays}
          </div>
          <p className="text-xs text-slate-400 mt-1.5">
            Do primeiro contato até a assinatura e homologação.
          </p>
        </div>
      </div>

      {/* Grid: Leads por Origem + Motivos de Perda */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card 1: LEADS POR ORIGEM */}
        <div className="rounded-xl bg-[#0F1626]/90 border border-white/[0.07] p-5 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">
                Leads por origem
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Canais de aquisição de maior volume
              </p>
            </div>
            <PieChart className="w-4 h-4 text-slate-400" />
          </div>

          <div className="mt-5 space-y-4">
            {reportStats.leadsByOrigin.map((origin) => (
              <div key={origin.source}>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-semibold text-slate-200">
                    {origin.source}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-[11px] font-mono">
                      {origin.count} leads
                    </span>
                    <span className="font-bold text-white">
                      {origin.percentage}%
                    </span>
                  </div>
                </div>

                <div className="h-2 w-full bg-white/[0.04] rounded-full overflow-hidden">
                  <div
                    style={{
                      width: `${origin.percentage}%`,
                      backgroundColor: origin.color,
                    }}
                    className="h-full rounded-full transition-all duration-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card 2: MOTIVOS DE PERDA */}
        <div className="rounded-xl bg-[#0F1626]/90 border border-white/[0.07] p-5 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">
                Motivos de perda
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Principais objeções comerciais relatadas
              </p>
            </div>
            <AlertOctagon className="w-4 h-4 text-rose-400" />
          </div>

          <div className="mt-5 space-y-4">
            {reportStats.lostReasons.map((item, idx) => (
              <div key={item.reason}>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-semibold text-slate-200">
                    {item.reason}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-[11px] font-mono">
                      {item.count} propostas
                    </span>
                    <span className="font-bold text-rose-300">
                      {item.percentage}%
                    </span>
                  </div>
                </div>

                <div className="h-2 w-full bg-white/[0.04] rounded-full overflow-hidden">
                  <div
                    style={{ width: `${item.percentage}%` }}
                    className={`h-full rounded-full transition-all duration-500 ${
                      idx === 0 ? 'bg-rose-500' : 'bg-slate-500/80'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
