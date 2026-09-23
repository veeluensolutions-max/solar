import React, { useState } from 'react';
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
  Plus,
  Calendar,
  ChevronDown,
  Filter,
  UserCheck
} from 'lucide-react';

export const Dashboard = () => {
  const { setActiveTab } = useApp();

  const [selectedPeriod, setSelectedPeriod] = useState('Últimos 30 dias');
  const [selectedSeller, setSelectedSeller] = useState('Toda a Equipe');
  const [periodDropdownOpen, setPeriodDropdownOpen] = useState(false);
  const [sellerDropdownOpen, setSellerDropdownOpen] = useState(false);

  // KPIs dinâmicos calculados de acordo com o período selecionado
  const getKpis = () => {
    switch (selectedPeriod) {
      case 'Últimos 7 dias':
        return [
          { title: 'Leads recebidos', value: selectedSeller === 'Mariana Costa' ? '54' : selectedSeller === 'Lucas Mendes' ? '68' : '122', growth: '↑ 14%', subtext: 'vs. sem. anterior', icon: Users },
          { title: 'Propostas enviadas', value: selectedSeller === 'Mariana Costa' ? '21' : selectedSeller === 'Lucas Mendes' ? '24' : '45', growth: '↑ 10%', subtext: 'vs. sem. anterior', icon: FileText },
          { title: 'Vendas fechadas', value: selectedSeller === 'Mariana Costa' ? '7' : selectedSeller === 'Lucas Mendes' ? '9' : '16', growth: '↑ 28%', subtext: 'vs. sem. anterior', icon: Handshake },
          { title: 'Receita estimada', value: selectedSeller === 'Mariana Costa' ? 'R$ 148.200' : selectedSeller === 'Lucas Mendes' ? 'R$ 174.500' : 'R$ 322.700', growth: '↑ 22%', subtext: 'vs. sem. anterior', icon: TrendingUp },
        ];
      case 'Este trimestre':
        return [
          { title: 'Leads recebidos', value: selectedSeller === 'Mariana Costa' ? '580' : selectedSeller === 'Lucas Mendes' ? '690' : '1.270', growth: '↑ 19%', subtext: 'vs. trim. anterior', icon: Users },
          { title: 'Propostas enviadas', value: selectedSeller === 'Mariana Costa' ? '220' : selectedSeller === 'Lucas Mendes' ? '275' : '495', growth: '↑ 15%', subtext: 'vs. trim. anterior', icon: FileText },
          { title: 'Vendas fechadas', value: selectedSeller === 'Mariana Costa' ? '78' : selectedSeller === 'Lucas Mendes' ? '96' : '174', growth: '↑ 26%', subtext: 'vs. trim. anterior', icon: Handshake },
          { title: 'Receita estimada', value: selectedSeller === 'Mariana Costa' ? 'R$ 1.540.000' : selectedSeller === 'Lucas Mendes' ? 'R$ 1.910.000' : 'R$ 3.450.000', growth: '↑ 24%', subtext: 'vs. trim. anterior', icon: TrendingUp },
        ];
      case 'Ano atual':
        return [
          { title: 'Leads recebidos', value: selectedSeller === 'Mariana Costa' ? '2.140' : selectedSeller === 'Lucas Mendes' ? '2.580' : '4.720', growth: '↑ 32%', subtext: 'vs. ano anterior', icon: Users },
          { title: 'Propostas enviadas', value: selectedSeller === 'Mariana Costa' ? '820' : selectedSeller === 'Lucas Mendes' ? '980' : '1.800', growth: '↑ 21%', subtext: 'vs. ano anterior', icon: FileText },
          { title: 'Vendas fechadas', value: selectedSeller === 'Mariana Costa' ? '290' : selectedSeller === 'Lucas Mendes' ? '345' : '635', growth: '↑ 35%', subtext: 'vs. ano anterior', icon: Handshake },
          { title: 'Receita estimada', value: selectedSeller === 'Mariana Costa' ? 'R$ 5.720.000' : selectedSeller === 'Lucas Mendes' ? 'R$ 6.940.000' : 'R$ 12.660.000', growth: '↑ 38%', subtext: 'vs. ano anterior', icon: TrendingUp },
        ];
      case 'Últimos 30 dias':
      default:
        return [
          { title: 'Leads recebidos', value: selectedSeller === 'Mariana Costa' ? '218' : selectedSeller === 'Lucas Mendes' ? '264' : '482', growth: '↑ 12%', subtext: 'vs. mês anterior', icon: Users },
          { title: 'Propostas enviadas', value: selectedSeller === 'Mariana Costa' ? '79' : selectedSeller === 'Lucas Mendes' ? '97' : '176', growth: '↑ 8%', subtext: 'vs. mês anterior', icon: FileText },
          { title: 'Vendas fechadas', value: selectedSeller === 'Mariana Costa' ? '28' : selectedSeller === 'Lucas Mendes' ? '36' : '64', growth: '↑ 23%', subtext: 'vs. mês anterior', icon: Handshake },
          { title: 'Receita estimada', value: selectedSeller === 'Mariana Costa' ? 'R$ 548.000' : selectedSeller === 'Lucas Mendes' ? 'R$ 700.560' : 'R$ 1.248.560', growth: '↑ 18%', subtext: 'vs. mês anterior', icon: TrendingUp },
        ];
    }
  };

  const kpis = getKpis();

  // Dados da tabela do mockup com filtro por vendedor se selecionado
  const rawOpportunities = [
    {
      client: 'Residencial Silva',
      project: 'Sistema Residencial',
      power: '8,4 kWp',
      value: 'R$ 42.000',
      stage: 'Proposta',
      seller: 'Lucas Mendes',
      stageColor: 'bg-[#D4A017]/15 text-[#E8A735] border border-[#D4A017]/30',
      date: '15/07/2024',
    },
    {
      client: 'Comercial Almeida',
      project: 'Comércio',
      power: '25,0 kWp',
      value: 'R$ 128.500',
      stage: 'Negociação',
      seller: 'Mariana Costa',
      stageColor: 'bg-blue-500/15 text-blue-400 border border-blue-500/30',
      date: '22/07/2024',
    },
    {
      client: 'Fazenda Boa Vista',
      project: 'Rural',
      power: '75,0 kWp',
      value: 'R$ 310.000',
      stage: 'Qualificação',
      seller: 'Lucas Mendes',
      stageColor: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
      date: '30/07/2024',
    },
    {
      client: 'Condomínio Horizonte',
      project: 'Condomínio',
      power: '50,0 kWp',
      value: 'R$ 215.000',
      stage: 'Proposta',
      seller: 'Mariana Costa',
      stageColor: 'bg-[#D4A017]/15 text-[#E8A735] border border-[#D4A017]/30',
      date: '12/08/2024',
    },
    {
      client: 'Indústria Martins',
      project: 'Industrial',
      power: '120,0 kWp',
      value: 'R$ 498.000',
      stage: 'Levantamento',
      seller: 'Lucas Mendes',
      stageColor: 'bg-slate-700/40 text-slate-300 border border-slate-600/40',
      date: '20/08/2024',
    },
  ];

  const opportunitiesData = rawOpportunities.filter(opp => {
    if (selectedSeller === 'Toda a Equipe') return true;
    return opp.seller === selectedSeller;
  });

  return (
    <div className="space-y-6">
      {/* Topo da Dashboard com Filtros Interativos e Vivos */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white font-sans">
            Bom dia, Lucas
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            A energia de um futuro melhor começa com boas oportunidades.
          </p>
        </div>

        {/* Filtros Vivos: Período e Vendedor */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Filtro de Consultor / Vendedor */}
          <div className="relative">
            <button
              onClick={() => {
                setSellerDropdownOpen(!sellerDropdownOpen);
                setPeriodDropdownOpen(false);
              }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#101622] border border-white/[0.08] hover:border-[#D4A017]/40 text-xs font-semibold text-slate-300 hover:text-white transition-all shadow-sm"
            >
              <UserCheck className="w-3.5 h-3.5 text-[#E8A735]" />
              <span>{selectedSeller}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {sellerDropdownOpen && (
              <div className="absolute right-0 mt-1 w-44 rounded-xl bg-[#0D121F] border border-white/10 shadow-2xl py-1 z-30 text-xs animate-in fade-in duration-100">
                {['Toda a Equipe', 'Lucas Mendes', 'Mariana Costa'].map((seller) => (
                  <button
                    key={seller}
                    onClick={() => {
                      setSelectedSeller(seller);
                      setSellerDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 transition-colors ${
                      selectedSeller === seller
                        ? 'bg-[#D4A017]/20 text-[#E8A735] font-bold'
                        : 'text-slate-300 hover:bg-white/[0.05]'
                    }`}
                  >
                    {seller}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Filtro de Período */}
          <div className="relative">
            <button
              onClick={() => {
                setPeriodDropdownOpen(!periodDropdownOpen);
                setSellerDropdownOpen(false);
              }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#101622] border border-white/[0.08] hover:border-[#D4A017]/40 text-xs font-semibold text-slate-300 hover:text-white transition-all shadow-sm"
            >
              <Calendar className="w-3.5 h-3.5 text-[#E8A735]" />
              <span>{selectedPeriod}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {periodDropdownOpen && (
              <div className="absolute right-0 mt-1 w-44 rounded-xl bg-[#0D121F] border border-white/10 shadow-2xl py-1 z-30 text-xs animate-in fade-in duration-100">
                {['Últimos 7 dias', 'Últimos 30 dias', 'Este trimestre', 'Ano atual'].map((period) => (
                  <button
                    key={period}
                    onClick={() => {
                      setSelectedPeriod(period);
                      setPeriodDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 transition-colors ${
                      selectedPeriod === period
                        ? 'bg-[#D4A017]/20 text-[#E8A735] font-bold'
                        : 'text-slate-300 hover:bg-white/[0.05]'
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4 Cards de Indicadores com Micro-animações e Valores Reativos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.title + selectedPeriod + selectedSeller}
              className="rounded-2xl bg-[#101622] border border-white/[0.07] p-5 shadow-sm hover:border-[#D4A017]/50 hover:bg-[#131B2C] hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 group cursor-default animate-in fade-in zoom-in-95"
            >
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5 text-[#E8A735] group-hover:scale-110 transition-transform" />
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
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-white tracking-wide">
              Oportunidades em andamento
            </h3>
            {selectedSeller !== 'Toda a Equipe' && (
              <span className="text-[10px] font-bold text-[#E8A735] bg-[#D4A017]/15 px-2 py-0.5 rounded">
                Filtrado: {selectedSeller}
              </span>
            )}
          </div>

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
              {opportunitiesData.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-6 text-center text-slate-500">
                    Nenhuma oportunidade ativa para o filtro selecionado.
                  </td>
                </tr>
              ) : (
                opportunitiesData.map((row, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-white/[0.02] transition-colors cursor-pointer group"
                    onClick={() => setActiveTab('oportunidades')}
                  >
                    <td className="py-3.5 px-3 font-medium text-slate-200 group-hover:text-white">
                      {row.client}
                      <span className="block text-[10px] text-slate-500 mt-0.5 sm:hidden">
                        Resp: {row.seller}
                      </span>
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
