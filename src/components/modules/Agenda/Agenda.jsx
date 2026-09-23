import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Badge } from '../../common/Badge';
import { NewScheduleModal } from './NewScheduleModal';
import {
  Calendar,
  Clock,
  PhoneCall,
  FileCheck,
  MapPin,
  MessageSquare,
  Plus,
  CheckCircle2,
  Circle,
  AlertCircle
} from 'lucide-react';

export const Agenda = () => {
  const { schedule, toggleScheduleStatus } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Separar compromissos de hoje e futuros
  const todayItems = schedule.filter((s) => !s.time.includes('Amanhã') && !s.time.includes('/'));
  const upcomingItems = schedule.filter((s) => s.time.includes('Amanhã') || s.time.includes('/'));

  const getActionIcon = (action) => {
    switch (action) {
      case 'Ligação':
        return <PhoneCall className="w-4 h-4 text-sky-400" />;
      case 'Enviar proposta':
        return <FileCheck className="w-4 h-4 text-[#E8A735]" />;
      case 'Visita técnica':
        return <MapPin className="w-4 h-4 text-emerald-400" />;
      case 'Follow-up':
      default:
        return <MessageSquare className="w-4 h-4 text-amber-400" />;
    }
  };

  const getActionBadgeVariant = (action) => {
    switch (action) {
      case 'Ligação':
        return 'info';
      case 'Enviar proposta':
        return 'primary';
      case 'Visita técnica':
        return 'success';
      case 'Follow-up':
      default:
        return 'warning';
    }
  };

  return (
    <div className="space-y-6">
      {/* Topo */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white font-sans">
            Agenda Comercial
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Reuniões, visitas técnicas, ligações e follow-ups agendados (clique no círculo para concluir)
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
          <span>Novo compromisso</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Seção 1: HOJE */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <h2 className="text-sm font-bold text-white tracking-wide uppercase">
                Hoje
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-medium">
              {todayItems.filter(i => i.status !== 'Concluído').length} pendentes • {todayItems.filter(i => i.status === 'Concluído').length} concluídos
            </span>
          </div>

          <div className="space-y-3">
            {todayItems.map((item) => {
              const isDone = item.status === 'Concluído';
              return (
                <div
                  key={item.id}
                  onClick={() => toggleScheduleStatus(item.id)}
                  className={`p-4 rounded-xl border transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group cursor-pointer ${
                    isDone
                      ? 'bg-[#0B101D]/60 border-white/[0.04] opacity-60'
                      : 'bg-[#0F1626]/90 border-white/[0.07] hover:border-[#D4A017]/40 hover:bg-[#121B2E]'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    {/* Botão de Checkbox Animado */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleScheduleStatus(item.id);
                      }}
                      className="mt-0.5 text-slate-500 hover:text-emerald-400 transition-colors flex-shrink-0"
                    >
                      {isDone ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 animate-in zoom-in-50 duration-150" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-600 group-hover:text-slate-400" />
                      )}
                    </button>

                    {/* Horário */}
                    <div className="w-16 px-2 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] text-center flex-shrink-0">
                      <span className="text-xs font-bold text-white font-mono block">
                        {item.time}
                      </span>
                    </div>

                    {/* Conteúdo */}
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getActionBadgeVariant(item.action)}>
                          {item.action}
                        </Badge>
                        <span className={`text-sm font-bold text-white group-hover:text-[#E8A735] transition-colors ${
                          isDone ? 'line-through text-slate-400' : ''
                        }`}>
                          {item.client}
                        </span>
                      </div>

                      <p className={`text-xs text-slate-400 mt-1 ${isDone ? 'line-through text-slate-500' : ''}`}>
                        {item.description}
                      </p>
                      {item.type && (
                        <span className="text-[11px] text-amber-300/80 font-medium mt-1 inline-block">
                          {item.type}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded ${
                      isDone
                        ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40'
                        : 'bg-white/[0.03] text-slate-400 border border-white/[0.06]'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Seção 2: PRÓXIMOS COMPROMISSOS */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white tracking-wide uppercase">
              Próximos compromissos
            </h2>
            <Calendar className="w-4 h-4 text-slate-400" />
          </div>

          <div className="space-y-3">
            {upcomingItems.length === 0 ? (
              <div className="p-4 rounded-xl bg-[#0F1626]/60 border border-white/[0.06] text-center text-xs text-slate-500">
                Nenhum compromisso futuro agendado.
              </div>
            ) : (
              upcomingItems.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl bg-[#0F1626]/70 border border-white/[0.06] hover:border-white/[0.12] transition-colors"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-200">
                      {item.client}
                    </span>
                    <span className="text-[11px] text-[#E8A735] font-mono">
                      {item.time}
                    </span>
                  </div>
                  <div className="mt-1.5 flex items-center gap-2">
                    <Badge variant={getActionBadgeVariant(item.action)}>
                      {item.action}
                    </Badge>
                    <span className="text-xs text-slate-400 truncate">
                      {item.type}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <NewScheduleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
