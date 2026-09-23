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
  AlertCircle
} from 'lucide-react';

export const Agenda = () => {
  const { schedule } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Separar compromissos de hoje e futuros
  const todayItems = schedule.filter((s) => !s.time.includes('Amanhã') && !s.time.includes('/'));
  const upcomingItems = schedule.filter((s) => s.time.includes('Amanhã') || s.time.includes('/'));

  const getActionIcon = (action) => {
    switch (action) {
      case 'Ligação':
        return <PhoneCall className="w-4 h-4 text-sky-400" />;
      case 'Enviar proposta':
        return <FileCheck className="w-4 h-4 text-[var(--color-primary)]" />;
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
            Reuniões, visitas técnicas, ligações e follow-ups agendados
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-slate-950 font-bold text-xs tracking-tight transition-all duration-150 shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Novo compromisso</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Seção 1: HOJE (Destaque Principal Solicitado) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <h2 className="text-sm font-bold text-white tracking-wide uppercase">
                Hoje
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-medium">
              {todayItems.length} atividades programadas
            </span>
          </div>

          <div className="space-y-3">
            {todayItems.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-[#0F1626]/90 border border-white/[0.07] hover:border-[var(--color-primary)]/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
              >
                <div className="flex items-start gap-3.5">
                  {/* Horário */}
                  <div className="w-16 px-2.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-center flex-shrink-0">
                    <span className="text-sm font-bold text-white font-mono block">
                      {item.time}
                    </span>
                  </div>

                  {/* Conteúdo */}
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getActionBadgeVariant(item.action)}>
                        {item.action}
                      </Badge>
                      <span className="text-sm font-bold text-white group-hover:text-[var(--color-primary)] transition-colors">
                        {item.client}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 mt-1">
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
                  <span className="text-[11px] text-slate-500 font-medium px-2 py-1 rounded bg-white/[0.03]">
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
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
                    <span className="text-[11px] text-amber-400 font-mono">
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
