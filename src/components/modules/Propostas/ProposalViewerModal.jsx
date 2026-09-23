import React, { useState } from 'react';
import { Modal } from '../../common/Modal';
import { useApp } from '../../../context/AppContext';
import { VelliaLogo } from '../../common/VelliaLogo';
import {
  Zap,
  SunMedium,
  CheckCircle2,
  DollarSign,
  Calendar,
  Printer,
  Share2,
  MessageCircle,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Layers,
  ArrowRight
} from 'lucide-react';

export const ProposalViewerModal = ({ isOpen, onClose, proposal }) => {
  const { settings, showToast } = useApp();
  const [isApproving, setIsApproving] = useState(false);

  if (!isOpen || !proposal) return null;

  // Derivações financeiras e técnicas da proposta
  const value = proposal.value || 35000;
  const upfrontDiscountValue = Math.round(value * 0.94); // 6% desconto à vista
  const installmentValue = Math.round((value * 1.35) / 60); // 60 parcelas com juros bancários típicos de 1,29% a.m.

  // Potência estimada a partir do projeto
  const powerMatch = proposal.project.match(/(\d+[,.]?\d*)\s*kWp/i);
  const powerKwp = powerMatch ? powerMatch[1] : '8,5';
  const numericPower = parseFloat(powerKwp.replace(',', '.')) || 8.5;
  const modulesCount = Math.round((numericPower * 1000) / 550);
  const monthlyGeneration = Math.round(numericPower * 135);
  const annualSavings = Math.round(monthlyGeneration * 0.95 * 12);
  const savings25Years = Math.round(annualSavings * 25 * 1.15);

  const handlePrint = () => {
    window.print();
  };

  const handleSendWhatsApp = () => {
    const text = encodeURIComponent(
      `Olá ${proposal.client}! Aqui está o resumo da sua Proposta Comercial Solar:\n\n` +
      `⚡ Projeto: ${proposal.project}\n` +
      `☀️ Potência: ${powerKwp} kWp (${modulesCount} módulos 550W)\n` +
      `💰 Economia estimada: ${proposal.savingsEstimate || 'R$ 850/mês'}\n` +
      `💳 Investimento: ${value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}\n` +
      `🏦 Financiamento em até 60x de R$ ${installmentValue.toLocaleString('pt-BR')}\n\n` +
      `Podemos agendar a vistoria técnica final esta semana?`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleApprove = () => {
    setIsApproving(true);
    setTimeout(() => {
      proposal.status = 'Aprovada';
      showToast(`Proposta de ${proposal.client} marcada como APROVADA!`);
      setIsApproving(false);
      onClose();
    }, 600);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Proposta Comercial Executiva"
      subtitle={`Estudo de Viabilidade Fotovoltaica • Código #${proposal.id}`}
      maxWidth="max-w-4xl"
    >
      <div className="space-y-6 text-slate-200" id="printable-proposal">
        {/* CABEÇALHO WHITE-LABEL DA PROPOSTA */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-[#0C1220] via-[#101726] to-[#0A0D15] border border-[#D4A017]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <VelliaLogo
              systemName={settings.systemName || "Vellia Solar"}
              subName="Private"
            />
          </div>

          <div className="text-right text-xs">
            <span className="text-[10px] font-bold tracking-wider text-[#E8A735] uppercase block">
              Proposta Comercial Fotovoltaica
            </span>
            <span className="text-slate-400 block mt-0.5">
              Emissão: {proposal.date} • Validade: {proposal.validity || '15 dias'}
            </span>
            <span className="text-slate-300 font-semibold block mt-0.5">
              Consultor: {proposal.responsible}
            </span>
          </div>
        </div>

        {/* DADOS DO CLIENTE E DO PROJETO */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-[#121B2F] border border-white/[0.06]">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
              Cliente Beneficiário
            </span>
            <span className="text-sm font-bold text-white block mt-1">
              {proposal.client}
            </span>
            <span className="text-[11px] text-slate-400 mt-0.5 block">
              Conexão em Baixa Tensão (Grupo B)
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#121B2F] border border-white/[0.06]">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
              Dimensionamento do Sistema
            </span>
            <span className="text-sm font-bold text-[#E8A735] font-mono block mt-1 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              {powerKwp} kWp de Potência
            </span>
            <span className="text-[11px] text-slate-400 mt-0.5 block">
              Geração: ~{monthlyGeneration.toLocaleString('pt-BR')} kWh/mês
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#121B2F] border border-white/[0.06]">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
              Economia Mensal Média
            </span>
            <span className="text-sm font-bold text-emerald-400 block mt-1 font-mono">
              {proposal.savingsEstimate || 'R$ 950/mês'}
            </span>
            <span className="text-[11px] text-slate-400 mt-0.5 block">
              Abatimento de até 95% da fatura
            </span>
          </div>
        </div>

        {/* LISTA DE EQUIPAMENTOS HOMOLOGADOS INCLUSOS */}
        <div className="rounded-xl bg-[#0F1626]/80 border border-white/[0.07] p-4">
          <div className="flex items-center gap-2 pb-2.5 border-b border-white/[0.06]">
            <Cpu className="w-4 h-4 text-[#E8A735]" />
            <h4 className="text-xs font-bold text-white tracking-wide uppercase">
              Equipamentos & Engenharia Inclusos (Turn-Key)
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 text-xs">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-white font-semibold block">
                  {modulesCount}x Módulos Fotovoltaicos Monocristalinos 550W
                </span>
                <span className="text-slate-400 text-[11px]">
                  Tecnologia Tier-1 Half-Cell • 25 anos de garantia de eficiência
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-white font-semibold block">
                  Inversor Interativo Inteligente On-Grid com Wi-Fi
                </span>
                <span className="text-slate-400 text-[11px]">
                  Monitoramento em tempo real pelo smartphone • Certificação Inmetro
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-white font-semibold block">
                  Estrutura de Fixação em Alumínio Anodizado
                </span>
                <span className="text-slate-400 text-[11px]">
                  Fixação naval com parafusos em aço inox anti-corrosão
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-white font-semibold block">
                  Engenharia, ART e Homologação na Concessionária
                </span>
                <span className="text-slate-400 text-[11px]">
                  Projeto elétrico completo, vistoria e troca do medidor bidirecional
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* COMPARATIVO FINANCEIRO E ECONOMIA ACUMULADA */}
        <div className="rounded-xl bg-gradient-to-br from-[#121B2F] to-[#0A0D15] border border-[#D4A017]/30 p-5">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#E8A735]" />
              <span className="text-xs font-bold text-white tracking-wide uppercase">
                Projeção Financeira & Retorno
              </span>
            </div>
            <span className="text-[11px] text-slate-400">
              Payback estimado: <strong className="text-white font-mono">~3,2 anos</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 text-xs">
            <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.05]">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Economia em 1 Ano</span>
              <div className="text-lg font-bold text-white font-mono mt-1">
                R$ {annualSavings.toLocaleString('pt-BR')}
              </div>
              <span className="text-[10px] text-emerald-400/90 mt-0.5 block">
                Direto no bolso do cliente
              </span>
            </div>

            <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.05]">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Economia em 25 Anos</span>
              <div className="text-lg font-bold text-emerald-400 font-mono mt-1">
                R$ {savings25Years.toLocaleString('pt-BR')}
              </div>
              <span className="text-[10px] text-slate-400 mt-0.5 block">
                Considerando reajustes energéticos
              </span>
            </div>

            <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.05]">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Garantia Linear de Geração</span>
              <div className="text-lg font-bold text-[#E8A735] font-mono mt-1">
                25 Anos
              </div>
              <span className="text-[10px] text-slate-400 mt-0.5 block">
                Com suporte técnico integral
              </span>
            </div>
          </div>
        </div>

        {/* OPÇÕES DE INVESTIMENTO E FINANCIAMENTO */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Opção À Vista */}
          <div className="p-4 rounded-xl bg-[#121B2F] border border-white/[0.08] hover:border-[#D4A017]/40 transition-all">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white">OPÇÃO À VISTA (DESCONTO ESPECIAL)</span>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                -6% OFF
              </span>
            </div>
            <div className="mt-3 text-2xl font-bold text-white font-mono">
              {upfrontDiscountValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Entrada de 30% na assinatura + saldo após instalação.
            </p>
          </div>

          {/* Opção Financiada */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-[#151E32] to-[#101726] border border-[#D4A017]/50 shadow-md">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#E8A735]">FINANCIAMENTO SOLAR (SEM ENTRADA)</span>
              <span className="text-[10px] font-bold text-[#E8A735] bg-[#D4A017]/20 px-2 py-0.5 rounded">
                Até 60x
              </span>
            </div>
            <div className="mt-3 text-2xl font-bold text-[#E8A735] font-mono">
              60x de R$ {installmentValue.toLocaleString('pt-BR')}
            </div>
            <p className="text-[11px] text-slate-300 mt-1 font-medium">
              *A parcela do financiamento é paga com a própria economia da conta de luz!
            </p>
          </div>
        </div>

        {/* AÇÕES DA PROPOSTA */}
        <div className="pt-3 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#182236] hover:bg-[#202E48] text-slate-200 text-xs font-semibold border border-white/[0.08] transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / PDF</span>
            </button>

            <button
              type="button"
              onClick={handleSendWhatsApp}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 text-xs font-semibold border border-emerald-500/30 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Enviar no WhatsApp</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-slate-400 hover:text-white text-xs font-medium"
            >
              Fechar
            </button>

            <button
              type="button"
              onClick={handleApprove}
              disabled={isApproving || proposal.status === 'Aprovada'}
              style={{
                background: proposal.status === 'Aprovada' ? '#10B981' : 'linear-gradient(180deg, #F3B33D 0%, #D49422 100%)',
              }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg text-slate-950 font-bold text-xs shadow-md hover:brightness-105 transition-all disabled:opacity-80"
            >
              <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
              <span>{proposal.status === 'Aprovada' ? 'Proposta Aprovada' : 'Aprovar Proposta'}</span>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
