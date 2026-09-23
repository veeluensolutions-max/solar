import React, { useState } from 'react';
import { Modal } from '../../common/Modal';
import { useApp } from '../../../context/AppContext';
import { Calendar, Sparkles } from 'lucide-react';

export const NewScheduleModal = ({ isOpen, onClose }) => {
  const { addScheduleItem } = useApp();
  const [formData, setFormData] = useState({
    time: '15:00',
    action: 'Visita técnica',
    client: '',
    type: 'Residencial',
    description: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.client.trim()) return;

    addScheduleItem({
      time: formData.time,
      action: formData.action,
      client: formData.client,
      type: formData.type,
      description: formData.description || 'Compromisso comercial agendado.',
    });

    setFormData({
      time: '15:00',
      action: 'Visita técnica',
      client: '',
      type: 'Residencial',
      description: '',
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Novo Compromisso"
      subtitle="Agende uma ligação, visita técnica, follow-up ou reunião com o cliente."
      maxWidth="max-w-md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-slate-300 font-medium mb-1.5">
              Horário / Data
            </label>
            <input
              type="text"
              required
              value={formData.time}
              onChange={(e) => setFormData(p => ({ ...p, time: e.target.value }))}
              placeholder="Ex: 15:30"
              className="w-full bg-[#121B2F] border border-white/[0.08] focus:border-[var(--color-primary)] rounded-lg px-3 py-2 text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1.5">
              Tipo de Ação
            </label>
            <select
              value={formData.action}
              onChange={(e) => setFormData(p => ({ ...p, action: e.target.value }))}
              className="w-full bg-[#121B2F] border border-white/[0.08] focus:border-[var(--color-primary)] rounded-lg px-3 py-2 text-white focus:outline-none"
            >
              <option value="Ligação">Ligação</option>
              <option value="Enviar proposta">Enviar proposta</option>
              <option value="Visita técnica">Visita técnica</option>
              <option value="Follow-up">Follow-up</option>
              <option value="Reunião de Fechamento">Reunião de Fechamento</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-slate-300 font-medium mb-1.5">
            Nome do Cliente *
          </label>
          <input
            type="text"
            required
            value={formData.client}
            onChange={(e) => setFormData(p => ({ ...p, client: e.target.value }))}
            placeholder="Ex: Ricardo Souza"
            className="w-full bg-[#121B2F] border border-white/[0.08] focus:border-[var(--color-primary)] rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-medium mb-1.5">
            Tipo do Projeto
          </label>
          <input
            type="text"
            value={formData.type}
            onChange={(e) => setFormData(p => ({ ...p, type: e.target.value }))}
            placeholder="Ex: Comercial 30 kWp"
            className="w-full bg-[#121B2F] border border-white/[0.08] focus:border-[var(--color-primary)] rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-medium mb-1.5">
            Observações
          </label>
          <textarea
            rows="2"
            value={formData.description}
            onChange={(e) => setFormData(p => ({ ...p, description: e.target.value }))}
            placeholder="Detalhes ou objetivo do contato..."
            className="w-full bg-[#121B2F] border border-white/[0.08] focus:border-[var(--color-primary)] rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none resize-none"
          />
        </div>

        <div className="pt-3 border-t border-white/[0.06] flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-slate-400 hover:text-white"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-slate-950 font-bold transition-all flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 stroke-[2.5]" />
            Adicionar Compromisso
          </button>
        </div>
      </form>
    </Modal>
  );
};
