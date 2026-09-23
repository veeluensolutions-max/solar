import React, { useState } from 'react';
import { Modal } from '../../common/Modal';
import { useApp } from '../../../context/AppContext';
import {
  Zap,
  DollarSign,
  User,
  Clock,
  ArrowRight,
  MessageCircle,
  FileCheck2,
  CheckCircle2,
  Calendar,
  Building,
  Save,
  Sparkles
} from 'lucide-react';

export const OpportunityDetailModal = ({ isOpen, onClose, opportunity }) => {
  const { moveOpportunity, showToast, setActiveTab, setIsNewProposalModalOpen } = useApp();

  const [currentStage, setCurrentStage] = useState(opportunity?.stage || 'novo_lead');
  const [notes, setNotes] = useState(opportunity?.notes || '');
  const [newNote, setNewNote] = useState('');

  if (!isOpen || !opportunity) return null;

  const stages = [
    { id: 'novo_lead', title: 'Novo Lead' },
    { id: 'qualificacao', title: 'Qualificação' },
    { id: 'proposta', title: 'Proposta' },
    { id: 'negociacao', title: 'Negociação' },
    { id: 'fechado', title: 'Fechado' },
  ];

  const handleStageChange = (newStage) => {
    setCurrentStage(newStage);
    moveOpportunity(opportunity.id, newStage);
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    const formatted = `${notes ? notes + '\n' : ''}[${new Date().toLocaleDateString('pt-BR')}] ${newNote.trim()}`;
    setNotes(formatted);
    opportunity.notes = formatted;
    setNewNote('');
    showToast('Anotação comercial salva na oportunidade.');
  };

  const handleOpenWhatsApp = () => {
    const text = encodeURIComponent(
      `Olá ${opportunity.client}! Tudo bem? Aqui é o ${opportunity.responsible} da Vellia Solar. Passando para alinhar os detalhes do seu projeto de ${opportunity.power} (${opportunity.type}). Podemos conversar?`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleGenerateProposal = () => {
    onClose();
    setActiveTab('propostas');
    showToast(`Redirecionando para emitir proposta de ${opportunity.client}...`);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={opportunity.client}
      subtitle={`Gestão do Pipeline • ${opportunity.type} • Potência: ${opportunity.power}`}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-5 text-xs text-slate-200">
        {/* Etapas do Pipeline (Controle de Status com 1 clique) */}
        <div>
          <label className="block text-slate-400 font-semibold mb-2 uppercase tracking-wider text-[10px]">
            Etapa Atual no Funil Comercial
          </label>
          <div className="grid grid-cols-5 gap-1.5 p-1.5 bg-[#0D121F] rounded-xl border border-white/[0.06]">
            {stages.map((st) => {
              const isCurrent = currentStage === st.id;
              return (
                <button
                  type="button"
                  key={st.id}
                  onClick={() => handleStageChange(st.id)}
                  className={`py-2 px-1 rounded-lg text-center font-bold text-[10px] tracking-wide transition-all ${
                    isCurrent
                      ? 'bg-gradient-to-r from-[#F3B33D] to-[#D49422] text-slate-950 shadow-md scale-[1.02]'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {st.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Métricas e Dados da Oportunidade */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl bg-[#121B2F] border border-white/[0.06]">
            <span className="text-[10px] text-slate-400 block font-medium">Potência Fotovoltaica</span>
            <div className="text-sm font-bold text-white font-mono mt-1 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              {opportunity.power}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#121B2F] border border-white/[0.06]">
            <span className="text-[10px] text-slate-400 block font-medium">Valor Estimado</span>
            <div className="text-sm font-bold text-[#E8A735] font-mono mt-1">
              {opportunity.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#121B2F] border border-white/[0.06]">
            <span className="text-[10px] text-slate-400 block font-medium">Responsável</span>
            <div className="text-sm font-bold text-white mt-1 truncate">
              {opportunity.responsible}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#121B2F] border border-white/[0.06]">
            <span className="text-[10px] text-slate-400 block font-medium">Tempo na Etapa</span>
            <div className="text-sm font-bold text-slate-300 font-mono mt-1 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {opportunity.timeInStage}
            </div>
          </div>
        </div>

        {/* Histórico e Anotações Comerciais */}
        <div>
          <label className="block text-slate-300 font-bold mb-1.5">
            Anotações & Próximos Passos
          </label>
          <div className="p-3 rounded-xl bg-[#0D121F] border border-white/[0.08] max-h-32 overflow-y-auto font-mono text-[11px] text-slate-300 whitespace-pre-wrap leading-relaxed">
            {notes || 'Nenhuma observação registrada nesta oportunidade.'}
          </div>

          <form onSubmit={handleAddNote} className="mt-2 flex items-center gap-2">
            <input
              type="text"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Adicionar nova anotação comercial..."
              className="flex-1 h-9 rounded-xl bg-[#121B2F] border border-white/[0.08] focus:border-[#D4A017] px-3 text-xs text-white placeholder-slate-500 focus:outline-none"
            />
            <button
              type="submit"
              className="h-9 px-3.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white font-semibold text-xs transition-colors flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5 text-[#E8A735]" />
              <span>Salvar Nota</span>
            </button>
          </form>
        </div>

        {/* Ações Rápidas de Fechamento */}
        <div className="pt-3 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleOpenWhatsApp}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 font-bold border border-emerald-500/30 transition-all hover:scale-105 active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Falar no WhatsApp</span>
            </button>

            <button
              type="button"
              onClick={handleGenerateProposal}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#182236] hover:bg-[#202E48] text-[#E8A735] font-bold border border-[#D4A017]/30 transition-all hover:scale-105 active:scale-95"
            >
              <FileCheck2 className="w-4 h-4" />
              <span>Gerar Proposta Oficial</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-slate-400 hover:text-white font-semibold transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </Modal>
  );
};
