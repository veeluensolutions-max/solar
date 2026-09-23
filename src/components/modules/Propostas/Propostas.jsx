import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Badge } from '../../common/Badge';
import { NewProposalModal } from './NewProposalModal';
import { ProposalViewerModal } from './ProposalViewerModal';
import {
  FileText,
  Plus,
  Send,
  CheckCircle2,
  Clock,
  DollarSign,
  AlertTriangle,
  Eye,
  FileEdit,
  ExternalLink
} from 'lucide-react';

export const Propostas = () => {
  const { proposals } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProposalForView, setSelectedProposalForView] = useState(null);

  // Cálculos dos 3 indicadores solicitados
  const openProposalsCount = proposals.filter((p) =>
    ['Enviada', 'Visualizada', 'Negociação', 'Rascunho'].includes(p.status)
  ).length;

  const approvedProposalsCount = proposals.filter((p) => p.status === 'Aprovada').length;

  const inNegotiationValue = proposals
    .filter((p) => ['Negociação', 'Visualizada', 'Enviada'].includes(p.status))
    .reduce((sum, p) => sum + (p.value || 0), 0);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Aprovada':
        return <Badge variant="success">Aprovada</Badge>;
      case 'Negociação':
        return <Badge variant="primary">Negociação</Badge>;
      case 'Visualizada':
        return <Badge variant="info">Visualizada</Badge>;
      case 'Enviada':
        return <Badge variant="warning">Enviada</Badge>;
      case 'Perdida':
        return <Badge variant="danger">Perdida</Badge>;
      case 'Rascunho':
      default:
        return <Badge variant="neutral">Rascunho</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Topo */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white font-sans">
            Propostas Comerciais
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Estudos de viabilidade técnica e propostas executivas enviadas aos clientes (clique para visualizar a proposta completa)
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          style={{
            background: 'linear-gradient(180deg, #F3B33D 0%, #D49422 100%)',
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-slate-950 font-bold text-xs tracking-tight transition-all duration-150 shadow-sm hover:brightness-105 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Nova Proposta</span>
        </button>
      </div>

      {/* Indicadores Solicitados: Propostas abertas, Propostas aprovadas, Valor em negociação */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl bg-[#0F1626]/90 border border-white/[0.07] p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
              Propostas abertas
            </span>
            <Clock className="w-4 h-4 text-sky-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-white">
            {openProposalsCount}
          </div>
          <div className="mt-1 text-[11px] text-slate-500">
            Aguardando resposta do cliente
          </div>
        </div>

        <div className="rounded-xl bg-[#0F1626]/90 border border-white/[0.07] p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
              Propostas aprovadas
            </span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-white">
            {approvedProposalsCount}
          </div>
          <div className="mt-1 text-[11px] text-emerald-400/80 font-medium">
            Prontas para contrato
          </div>
        </div>

        <div className="rounded-xl bg-[#0F1626]/90 border border-white/[0.07] p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
              Valor em negociação
            </span>
            <DollarSign className="w-4 h-4 text-[#E8A735]" />
          </div>
          <div className="mt-2 text-2xl font-bold text-white font-mono">
            {inNegotiationValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })}
          </div>
          <div className="mt-1 text-[11px] text-slate-500">
            Volume ativo no pipeline
          </div>
        </div>
      </div>

      {/* Visualização Mobile em Cards para Smartphone */}
      <div className="sm:hidden space-y-3">
        {proposals.map((prop) => (
          <div
            key={prop.id}
            onClick={() => setSelectedProposalForView(prop)}
            className="p-4 rounded-xl bg-[#0F1626]/90 border border-white/[0.07] space-y-2.5 shadow-sm active:bg-white/[0.02] cursor-pointer"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h4 className="text-sm font-bold text-white leading-tight">
                  {prop.client}
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {prop.project} • {prop.responsible}
                </p>
              </div>
              {getStatusBadge(prop.status)}
            </div>

            <div className="flex items-center justify-between text-xs pt-1 border-t border-white/[0.04]">
              <div>
                <span className="text-[10px] text-slate-500 block">Investimento</span>
                <span className="font-mono font-bold text-white text-sm">
                  {prop.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
              </div>

              {prop.savingsEstimate && (
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block">Economia Estimada</span>
                  <span className="text-[11px] font-semibold text-emerald-400">
                    {prop.savingsEstimate}
                  </span>
                </div>
              )}
            </div>

            <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-white/[0.04]">
              <span>Data: {prop.date}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedProposalForView(prop);
                }}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#162032] text-[#E8A735] font-semibold border border-[#D4A017]/30"
              >
                <span>Ver Proposta</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Tabela Tradicional de Propostas para Desktop e Tablet */}
      <div className="hidden sm:block rounded-xl bg-[#0F1626]/90 border border-white/[0.07] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/[0.06] bg-white/[0.01] text-slate-400 font-medium">
                <th className="py-3.5 px-4">Cliente</th>
                <th className="py-3.5 px-3">Projeto</th>
                <th className="py-3.5 px-3 text-right">Valor</th>
                <th className="py-3.5 px-3">Data</th>
                <th className="py-3.5 px-3">Status</th>
                <th className="py-3.5 px-3">Responsável</th>
                <th className="py-3.5 px-4 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {proposals.map((prop) => (
                <tr
                  key={prop.id}
                  onClick={() => setSelectedProposalForView(prop)}
                  className="hover:bg-white/[0.03] transition-colors group cursor-pointer"
                >
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-white group-hover:text-[#E8A735] transition-colors flex items-center gap-1.5">
                      {prop.client}
                      <Eye className="w-3.5 h-3.5 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </span>
                    {prop.savingsEstimate && (
                      <span className="block text-[11px] text-emerald-400/80 mt-0.5">
                        Economia est.: {prop.savingsEstimate}
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-3 text-slate-300">
                    {prop.project}
                  </td>

                  <td className="py-3.5 px-3 text-right font-mono font-bold text-white">
                    {prop.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </td>

                  <td className="py-3.5 px-3 text-slate-400 text-[11px]">
                    {prop.date}
                  </td>

                  <td className="py-3.5 px-3">
                    {getStatusBadge(prop.status)}
                  </td>

                  <td className="py-3.5 px-3 text-slate-300">
                    {prop.responsible}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProposalForView(prop);
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#162032] hover:bg-[#1E2C44] text-[#E8A735] hover:text-white border border-[#D4A017]/30 text-[11px] font-medium transition-colors"
                    >
                      <span>Ver Proposta</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Nova Proposta */}
      <NewProposalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Visualizador da Proposta Comercial Executiva em 1 Clique */}
      <ProposalViewerModal
        isOpen={!!selectedProposalForView}
        onClose={() => setSelectedProposalForView(null)}
        proposal={selectedProposalForView}
      />
    </div>
  );
};
