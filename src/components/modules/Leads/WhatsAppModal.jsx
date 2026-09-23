import React, { useState, useEffect } from 'react';
import { Modal } from '../../common/Modal';
import { MessageCircle, Send, Check, Sparkles, User, Copy } from 'lucide-react';
import { useApp } from '../../../context/AppContext';

export const WhatsAppModal = ({ isOpen, onClose, lead }) => {
  const { updateLeadStatus, showToast } = useApp();

  const [selectedTemplate, setSelectedTemplate] = useState('contato');
  const [customText, setCustomText] = useState('');

  const templates = [
    {
      id: 'contato',
      title: '1. Primeiro Contato',
      desc: 'Abordagem inicial e qualificação do consumo.',
      getText: (l) =>
        `Olá, ${l.name}! Tudo bem? Aqui é o Lucas Mendes da Vellia Solar. Vi que você tem interesse em reduzir a fatura de energia em ${l.city || 'sua região'}. Qual é a média da sua conta de luz hoje para fazermos uma simulação gratuita?`,
    },
    {
      id: 'estudo',
      title: '2. Envio de Estudo Preliminar',
      desc: 'Apresentar a economia de até 95%.',
      getText: (l) =>
        `Olá, ${l.name}! Finalizamos o pré-dimensionamento para seu imóvel (${l.clientType || 'Residencial'}). Projetamos uma economia estimada de até 95% na sua conta com equipamentos Tier-1 de 25 anos de garantia. Podemos conversar 5 minutos sobre os números?`,
    },
    {
      id: 'vistoria',
      title: '3. Agendamento de Vistoria',
      desc: 'Rota técnica presencial gratuita.',
      getText: (l) =>
        `Olá, ${l.name}! Nossa equipe de engenharia estará em ${l.city || 'sua cidade'} esta semana. Gostaria de agendar uma vistoria técnica gratuita para avaliarmos o telhado e o padrão de energia?`,
    },
    {
      id: 'followup',
      title: '4. Follow-up de Fechamento',
      desc: 'Condição especial de financiamento.',
      getText: (l) =>
        `Olá, ${l.name}! Tudo bem? Passando para saber se conseguiu analisar nossa proposta. Conseguimos uma condição especial de financiamento sem entrada onde a parcela fica mais barata que a sua conta de luz atual! Vamos avançar?`,
    },
  ];

  useEffect(() => {
    if (lead) {
      const template = templates.find((t) => t.id === selectedTemplate) || templates[0];
      setCustomText(template.getText(lead));
    }
  }, [lead, selectedTemplate]);

  if (!isOpen || !lead) return null;

  const handleSend = () => {
    const cleanPhone = (lead.whatsapp || lead.phone || '').replace(/\D/g, '');
    const phone = cleanPhone.length <= 11 ? `55${cleanPhone}` : cleanPhone;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(customText)}`;

    // Atualiza status para Em atendimento automaticamente
    if (lead.status === 'Novo') {
      updateLeadStatus(lead.id, 'Em atendimento');
    }

    showToast(`Iniciando conversa no WhatsApp com ${lead.name}...`);
    window.open(url, '_blank');
    onClose();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(customText);
    showToast('Mensagem copiada para a área de transferência!');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Disparo Comercial via WhatsApp"
      subtitle={`Envio de mensagem personalizada para ${lead.name} (${lead.phone})`}
      maxWidth="max-w-xl"
    >
      <div className="space-y-4 text-xs">
        {/* Escolha do Modelo */}
        <div>
          <label className="block text-slate-300 font-bold mb-2">
            Selecione o Modelo de Mensagem
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {templates.map((tpl) => {
              const isSelected = selectedTemplate === tpl.id;
              return (
                <button
                  type="button"
                  key={tpl.id}
                  onClick={() => setSelectedTemplate(tpl.id)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-emerald-950/40 border-emerald-500 text-white shadow-sm'
                      : 'bg-[#121B2F] border-white/[0.06] text-slate-400 hover:text-slate-200 hover:border-white/10'
                  }`}
                >
                  <span className="font-bold text-xs block text-slate-200">
                    {tpl.title}
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    {tpl.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Prévia e Edição da Mensagem */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-slate-300 font-bold">
              Mensagem a ser enviada (editável)
            </label>
            <button
              type="button"
              onClick={handleCopy}
              className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copiar texto</span>
            </button>
          </div>
          <div className="relative">
            <textarea
              rows="5"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              className="w-full bg-[#0B101D] border border-emerald-500/30 rounded-xl p-3 text-slate-200 leading-relaxed focus:outline-none focus:border-emerald-500 transition-colors font-sans text-xs resize-none"
            />
          </div>
          <span className="text-[11px] text-slate-500 block mt-1">
            *Ao clicar em enviar, o status deste lead será atualizado automaticamente para "Em atendimento".
          </span>
        </div>

        {/* Ações */}
        <div className="pt-3 border-t border-white/[0.06] flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-slate-400 hover:text-white text-xs font-medium"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={handleSend}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
          >
            <MessageCircle className="w-4 h-4 stroke-[2.5]" />
            <span>Abrir no WhatsApp</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};
