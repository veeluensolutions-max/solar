import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Badge } from '../../common/Badge';
import { OpportunityDetailModal } from './OpportunityDetailModal';
import {
  GripVertical,
  Plus,
  Zap,
  DollarSign,
  User,
  Clock,
  CheckCircle2,
  ChevronRight,
  Filter,
  Sparkles
} from 'lucide-react';

export const Oportunidades = () => {
  const { opportunities, moveOpportunity, setIsNewLeadModalOpen } = useApp();
  const [draggedOppId, setDraggedOppId] = useState(null);
  const [activeDragOverColumn, setActiveDragOverColumn] = useState(null);
  const [selectedOpp, setSelectedOpp] = useState(null);
  const [mobileActiveStage, setMobileActiveStage] = useState('todos');

  // As 5 colunas obrigatórias
  const columns = [
    { id: 'novo_lead', title: 'NOVO LEAD', color: 'border-slate-600' },
    { id: 'qualificacao', title: 'QUALIFICAÇÃO', color: 'border-sky-500' },
    { id: 'proposta', title: 'PROPOSTA', color: 'border-amber-400' },
    { id: 'negociacao', title: 'NEGOCIAÇÃO', color: 'border-[var(--color-primary)]' },
    { id: 'fechado', title: 'FECHADO', color: 'border-emerald-500' },
  ];

  // Drag handlers
  const handleDragStart = (e, id) => {
    setDraggedOppId(id);
    e.dataTransfer.setData('text/plain', id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, columnId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (activeDragOverColumn !== columnId) {
      setActiveDragOverColumn(columnId);
    }
  };

  const handleDragLeave = () => {
    setActiveDragOverColumn(null);
  };

  const handleDrop = (e, targetColumnId) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain') || draggedOppId;
    if (id) {
      moveOpportunity(id, targetColumnId);
    }
    setDraggedOppId(null);
    setActiveDragOverColumn(null);
  };

  const calculateColumnTotal = (columnId) => {
    return opportunities
      .filter((opp) => opp.stage === columnId)
      .reduce((sum, opp) => sum + (opp.value || 0), 0);
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Topo do Pipeline */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-sans">
            Pipeline Comercial
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Arraste os cards entre as etapas para atualizar o ciclo de vendas
          </p>
        </div>

        <button
          onClick={() => setIsNewLeadModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-slate-950 font-bold text-xs tracking-tight transition-all duration-150 shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Nova Oportunidade</span>
        </button>
      </div>

      {/* Seletor de Etapas Exclusivo para Mobile (Smartphone) */}
      <div className="md:hidden flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        <button
          onClick={() => setMobileActiveStage('todos')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
            mobileActiveStage === 'todos'
              ? 'bg-[var(--color-primary)] text-slate-950'
              : 'bg-white/[0.04] text-slate-400 hover:text-white'
          }`}
        >
          Todas ({opportunities.length})
        </button>
        {columns.map((c) => {
          const count = opportunities.filter((o) => o.stage === c.id).length;
          const isActive = mobileActiveStage === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setMobileActiveStage(c.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-[var(--color-primary)] text-slate-950'
                  : 'bg-white/[0.04] text-slate-400 hover:text-white'
              }`}
            >
              {c.title} ({count})
            </button>
          );
        })}
      </div>

      {/* Grid de Colunas Kanban Adaptado */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 items-start pb-4">
        {columns
          .filter((col) => mobileActiveStage === 'todos' || col.id === mobileActiveStage)
          .map((col) => {
          const colOpportunities = opportunities.filter((opp) => opp.stage === col.id);
          const totalValue = calculateColumnTotal(col.id);
          const isDragOver = activeDragOverColumn === col.id;

          return (
            <div
              key={col.id}
              onDragOver={(e) => handleDragOver(e, col.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, col.id)}
              className={`rounded-xl bg-[#0F1626]/70 border transition-all duration-200 flex flex-col min-h-[460px] p-3 ${
                isDragOver
                  ? 'border-[var(--color-primary)] bg-[var(--color-primary-light)]/20 scale-[1.01]'
                  : 'border-white/[0.06]'
              }`}
            >
              {/* Cabeçalho da Coluna */}
              <div className="pb-3 border-b border-white/[0.06] mb-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold tracking-wider text-slate-300 uppercase">
                    {col.title}
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/[0.06] text-slate-300">
                    {colOpportunities.length}
                  </span>
                </div>

                <div className="mt-1 text-[11px] font-mono text-slate-400">
                  {totalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })}
                </div>
              </div>

              {/* Lista de Cards da Coluna */}
              <div className="space-y-3 flex-1">
                {colOpportunities.length === 0 ? (
                  <div className="h-32 border border-dashed border-white/[0.05] rounded-lg flex items-center justify-center text-slate-500 text-xs">
                    Arraste aqui
                  </div>
                ) : (
                  colOpportunities.map((opp) => {
                    const isBeingDragged = draggedOppId === opp.id;
                    return (
                      <div
                        key={opp.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, opp.id)}
                        onClick={() => setSelectedOpp(opp)}
                        className={`p-3.5 rounded-xl bg-[#121B2F] border border-white/[0.08] hover:border-[#D4A017]/60 hover:bg-[#152038] cursor-pointer active:cursor-grabbing transition-all duration-150 shadow-sm group select-none ${
                          isBeingDragged ? 'opacity-40 scale-95' : 'hover:-translate-y-0.5'
                        }`}
                      >
                        {/* Topo do Card: Cliente e Tipo */}
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-bold text-xs text-white group-hover:text-[#E8A735] transition-colors leading-tight">
                            {opp.client}
                          </span>
                          <span className="text-[10px] font-medium text-slate-400 bg-white/[0.04] px-1.5 py-0.5 rounded">
                            {opp.type}
                          </span>
                        </div>

                        {/* Potência estimada */}
                        <div className="mt-2 flex items-center gap-1.5 text-xs text-amber-300/90 font-medium">
                          <Zap className="w-3.5 h-3.5 text-amber-400" />
                          <span>{opp.power}</span>
                        </div>

                        {/* Valor Estimado */}
                        <div className="mt-1.5 text-sm font-bold text-white font-mono">
                          {opp.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </div>

                        {/* Rodapé: Responsável e Tempo na etapa */}
                        <div className="mt-3 pt-2.5 border-t border-white/[0.05] flex items-center justify-between text-[10px] text-slate-400">
                          <span className="flex items-center gap-1 truncate max-w-[100px]">
                            <User className="w-3 h-3 text-slate-500" />
                            {opp.responsible}
                          </span>
                          <span className="flex items-center gap-1 text-slate-400">
                            <Clock className="w-3 h-3 text-slate-500" />
                            {opp.timeInStage}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal de Detalhes da Oportunidade */}
      <OpportunityDetailModal
        isOpen={!!selectedOpp}
        onClose={() => setSelectedOpp(null)}
        opportunity={selectedOpp}
      />
    </div>
  );
};
