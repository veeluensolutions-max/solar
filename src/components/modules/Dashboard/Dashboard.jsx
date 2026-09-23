import React from 'react';
import { useApp } from '../../../context/AppContext';
import { CommercialChart } from './CommercialChart';
import { SalesFunnel } from './SalesFunnel';
import {
  Users,
  FileText,
  Handshake,
  TrendingUp,
  ArrowUpRight,
  ArrowRight,
  Plus
} from 'lucide-react';

export const Dashboard = () => {
  const { setActiveTab } = useApp();

  // Cards idênticos à imagem de referência
  const kpis = [
    {
      title: 'Leads recebidos',
      value: '482',
      growth: '↑ 12%',
      subtext: 'vs. mês anterior',
      icon: Users,
    },
    {
      title: 'Propostas enviadas',
      value: '176',
      growth: '↑ 8%',
      subtext: 'vs. mês anterior',
      icon: FileText,
    },
    {
      title: 'Vendas fechadas',
      value: '64',
      growth: '↑ 23%',
      subtext: 'vs. mês anterior',
      icon: Handshake,
    },
    {
      title: 'Receita estimada',
      value: 'R$ 1.248.560',
      growth: '↑ 18%',
      subtext: 'vs. mês anterior',
      icon: TrendingUp,
    },
  ];

  // Dados exatos da tabela do mockup
  const opportunitiesData = [
    {
      client: 'Residencial Silva',
      project: 'Sistema Residencial',
      power: '8,4 kWp',
      value: 'R$ 42.000',
      stage: 'Proposta',
      stageColor: 'bg-[#D4A017]/15 text-[#E8A735] border border-[#D4A017]/30',
      date: '15/07/2024',
    },
    {
      client: 'Comercial Almeida',
      project: 'Comércio',
      power: '25,0 kWp',
      value: 'R$ 128.500',
      stage: 'Negociação',
      stageColor: 'bg-blue-500/15 text-blue-400 border border-blue-500/30',
      date: '22/07/2024',
    },
    {
      client: 'Fazenda Boa Vista',
      project: 'Rural',
      power: '75,0 kWp',
      value: 'R$ 310.000',
      stage: 'Qualificação',
      stageColor: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
      date: '30/07/2024',
    },
    {
      client: 'Condomínio Horizonte',
      project: 'Condomínio',
      power: '50,0 kWp',
      value: 'R$ 215.000',
      stage: 'Proposta',
      stageColor: 'bg-[#D4A017]/15 text-[#E8A735] border border-[#D4A017]/30',
      date: '12/08/2024',
    },
    {
      client: 'Indústria Martins',
      project: 'Industrial',
      power: '120,0 kWp',
      value: 'R$ 498.000',
      stage: 'Levantamento',
      stageColor: 'bg-slate-700/40 text-slate-300 border border-slate-600/40',
      date: '20/08/2024',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Topo da Dashboard */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white font-sans">
          Bom dia, Lucas
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          A energia de um futuro melhor começa com boas oportunidades.
        </p>
      </div>

      {/* 4 Cards de Indicadores com Ícones Dourados e Bordas Sutis */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.title}
              className="rounded-2xl bg-[#101622] border border-white/[0.07] p-5 shadow-sm hover:border-[#D4A017]/30 transition-all duration-200 group"
            >
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5 text-[#E8A735]" />
                <span className="text-xs font-normal text-slate-300">
                  {kpi.title}
                </span>
              </div>

              <div className="mt-3 text-2xl lg:text-[26px] font-bold text-white tracking-tight font-sans">
                {kpi.value}
              </div>

              <div className="mt-2.5 flex items-center gap-2 text-xs">
                <span className="inline-flex items-center text-emerald-400 font-semibold bg-emerald-500/10 px-1.5 py-0.5 rounded text-[11px]">
                  {kpi.growth}
                </span>
                <span className="text-slate-500 text-[11px]">{kpi.subtext}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Grid: Gráfico Principal de Desempenho Comercial + Funil de Vendas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        <div className="lg:col-span-2">
          <CommercialChart />
        </div>
        <div className="lg:col-span-1">
          <SalesFunnel />
        </div>
      </div>

      {/* Tabela de Oportunidades em Andamento */}
      <div className="rounded-2xl bg-[#101622] border border-white/[0.07] p-5 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
          <h3 className="text-sm font-semibold text-white tracking-wide">
            Oportunidades em andamento
          </h3>

          <button
            onClick={() => setActiveTab('oportunidades')}
            className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-[#E8A735] transition-colors"
          >
            <span>Ver todas</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Tabela */}
        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/[0.04] text-slate-400 font-normal">
                <th className="py-3 px-3">Cliente</th>
                <th className="py-3 px-3">Projeto</th>
                <th className="py-3 px-3">Potência</th>
                <th className="py-3 px-3">Valor estimado</th>
                <th className="py-3 px-3">Etapa</th>
                <th className="py-3 px-3 text-right">Previsão</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {opportunitiesData.map((row, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-white/[0.02] transition-colors cursor-pointer group"
                  onClick={() => setActiveTab('oportunidades')}
                >
                  <td className="py-3.5 px-3 font-medium text-slate-200 group-hover:text-white">
                    {row.client}
                  </td>
                  <td className="py-3.5 px-3 text-slate-400">
                    {row.project}
                  </td>
                  <td className="py-3.5 px-3 text-slate-300">
                    {row.power}
                  </td>
                  <td className="py-3.5 px-3 text-slate-200 font-mono font-medium">
                    {row.value}
                  </td>
                  <td className="py-3.5 px-3">
                    <span className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-medium ${row.stageColor}`}>
                      {row.stage}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right text-slate-400 font-mono text-[11px]">
                    {row.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
