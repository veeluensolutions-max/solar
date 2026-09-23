import React, { useState } from 'react';
import { Modal } from '../../common/Modal';
import { useApp } from '../../../context/AppContext';
import { FileText, Sparkles } from 'lucide-react';

export const NewProposalModal = ({ isOpen, onClose }) => {
  const { addProposal } = useApp();
  const [formData, setFormData] = useState({
    client: '',
    project: '',
    power: '10 kWp',
    value: '',
    responsible: 'Lucas Mendes',
    status: 'Enviada',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.client.trim()) return;

    addProposal({
      client: formData.client,
      project: formData.project || `Residencial ${formData.power}`,
      value: parseFloat(formData.value) || 35000,
      responsible: formData.responsible,
      status: formData.status,
      savingsEstimate: 'R$ 950/mês',
    });

    setFormData({
      client: '',
      project: '',
      power: '10 kWp',
      value: '',
      responsible: 'Lucas Mendes',
      status: 'Enviada',
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Nova Proposta Comercial"
      subtitle="Registre os dados do estudo preliminar e valor orçado."
      maxWidth="max-w-lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block text-slate-300 font-medium mb-1.5">
            Nome do Cliente *
          </label>
          <input
            type="text"
            required
            value={formData.client}
            onChange={(e) => setFormData(p => ({ ...p, client: e.target.value }))}
            placeholder="Ex: Carlos Almeida"
            className="w-full bg-[#121B2F] border border-white/[0.08] focus:border-[var(--color-primary)] rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-medium mb-1.5">
            Descrição do Projeto (Tipo / Potência)
          </label>
          <input
            type="text"
            value={formData.project}
            onChange={(e) => setFormData(p => ({ ...p, project: e.target.value }))}
            placeholder="Ex: Comercial 35 kWp - Bifacial"
            className="w-full bg-[#121B2F] border border-white/[0.08] focus:border-[var(--color-primary)] rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-slate-300 font-medium mb-1.5">
              Valor Proposto (R$)
            </label>
            <input
              type="number"
              value={formData.value}
              onChange={(e) => setFormData(p => ({ ...p, value: e.target.value }))}
              placeholder="Ex: 48500"
              className="w-full bg-[#121B2F] border border-white/[0.08] focus:border-[var(--color-primary)] rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1.5">
              Status Inicial
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData(p => ({ ...p, status: e.target.value }))}
              className="w-full bg-[#121B2F] border border-white/[0.08] focus:border-[var(--color-primary)] rounded-lg px-3 py-2 text-white focus:outline-none"
            >
              <option value="Rascunho">Rascunho</option>
              <option value="Enviada">Enviada</option>
              <option value="Visualizada">Visualizada</option>
              <option value="Negociação">Negociação</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-slate-300 font-medium mb-1.5">
            Responsável
          </label>
          <select
            value={formData.responsible}
            onChange={(e) => setFormData(p => ({ ...p, responsible: e.target.value }))}
            className="w-full bg-[#121B2F] border border-white/[0.08] focus:border-[var(--color-primary)] rounded-lg px-3 py-2 text-white focus:outline-none"
          >
            <option value="Lucas Mendes">Lucas Mendes</option>
            <option value="Mariana Costa">Mariana Costa</option>
          </select>
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
            Salvar Proposta
          </button>
        </div>
      </form>
    </Modal>
  );
};
