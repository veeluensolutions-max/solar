import React, { useState, useMemo } from 'react';
import { Modal } from '../../common/Modal';
import { useApp } from '../../../context/AppContext';
import {
  Sparkles,
  Zap,
  SunMedium,
  TrendingDown,
  Layers,
  Clock,
  Maximize2,
  FileCheck2,
  HelpCircle
} from 'lucide-react';

export const NewLeadModal = ({ isOpen, onClose }) => {
  const { addLead } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    whatsapp: '',
    email: '',
    city: '',
    company: '',
    clientType: 'Residencial',
    origin: 'Instagram',
    monthlyBill: '1200', // Padrão realista inicial
    observations: '',
    responsible: 'Lucas Mendes',
    status: 'Novo',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // CÁLCULOS DA CALCULADORA SOLAR INTELIGENTE
  const solarEstimates = useMemo(() => {
    const bill = parseFloat(formData.monthlyBill) || 0;
    if (bill <= 0) {
      return null;
    }

    // Parâmetros técnicos solares médios no Brasil
    const avgTariff = 0.92; // R$/kWh médio
    const consumptionKWh = Math.round(bill / avgTariff);
    const hsp = 4.85; // Horas de Sol Pleno (HSP média NE/SE)
    const pr = 0.78; // Performance Ratio

    // Potência necessária (kWp)
    const requiredKwp = (consumptionKWh / 30) / (hsp * pr);
    const moduleWattage = 550; // Módulo de 550W mono PERC/Bifacial
    const modulesCount = Math.max(4, Math.ceil((requiredKwp * 1000) / moduleWattage));
    const finalKwp = Number(((modulesCount * moduleWattage) / 1000).toFixed(2));

    // Área necessária (m²): cada módulo 550W tem ~2.58 m²
    const roofArea = Math.round(modulesCount * 2.6);

    // Geração média mensal (kWh/mês)
    const monthlyGenerationKWh = Math.round(finalKwp * hsp * 30 * pr);

    // Economia anual (R$) considerando 92% de abatimento
    const annualSavings = Math.round(bill * 12 * 0.92);

    // Economia em 25 anos (R$)
    const savings25Years = Math.round(annualSavings * 25 * 1.15); // considerando reajustes tarifários moderados

    // Investimento de referência de mercado (R$)
    const estimatedInvestment = Math.round(finalKwp * 3850);

    // Payback estimado em anos
    const paybackYears = (estimatedInvestment / annualSavings).toFixed(1);

    return {
      consumptionKWh,
      finalKwp: finalKwp.toString().replace('.', ','),
      modulesCount,
      roofArea,
      monthlyGenerationKWh,
      annualSavings,
      savings25Years,
      estimatedInvestment,
      paybackYears: paybackYears.replace('.', ','),
    };
  }, [formData.monthlyBill]);

  const handleApplyEstimateToNotes = () => {
    if (!solarEstimates) return;
    const summary = `Dimensionamento Preliminar Automático:
• Potência: ${solarEstimates.finalKwp} kWp (${solarEstimates.modulesCount} módulos 550W)
• Área estimada de telhado: ~${solarEstimates.roofArea} m²
• Geração média: ~${solarEstimates.monthlyGenerationKWh} kWh/mês
• Economia anual estimada: R$ ${solarEstimates.annualSavings.toLocaleString('pt-BR')}/ano
• Retorno de investimento (Payback): ~${solarEstimates.paybackYears} anos`;

    setFormData(prev => ({
      ...prev,
      observations: prev.observations ? `${prev.observations}\n\n${summary}` : summary,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    addLead({
      name: formData.name,
      phone: formData.phone || '(81) 98765-4321',
      whatsapp: formData.whatsapp || formData.phone?.replace(/\D/g, '') || '81987654321',
      email: formData.email || `${formData.name.toLowerCase().replace(/\s+/g, '.')}@email.com`,
      city: formData.city || 'Recife, PE',
      company: formData.company || (formData.clientType === 'Residencial' ? 'Residencial' : 'Empresa'),
      clientType: formData.clientType,
      origin: formData.origin,
      monthlyBill: parseFloat(formData.monthlyBill) || 1200,
      notes: formData.observations,
      responsible: formData.responsible,
      status: formData.status,
      solarEstimates: solarEstimates,
    });

    // Resetar
    setFormData({
      name: '',
      phone: '',
      whatsapp: '',
      email: '',
      city: '',
      company: '',
      clientType: 'Residencial',
      origin: 'Instagram',
      monthlyBill: '1200',
      observations: '',
      responsible: 'Lucas Mendes',
      status: 'Novo',
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Cadastrar Novo Lead & Dimensionamento"
      subtitle="Cadastre o lead e visualize o pré-dimensionamento fotovoltaico instantâneo."
      maxWidth="max-w-3xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Nome */}
          <div>
            <label className="block text-slate-300 font-medium mb-1.5">
              Nome do Cliente *
            </label>
            <input
              type="text"
              required
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ex: Dr. Carlos Eduardo Silva"
              className="w-full bg-[#121B2F] border border-white/[0.08] focus:border-[#D4A017] rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none transition-colors"
            />
          </div>

          {/* Empresa */}
          <div>
            <label className="block text-slate-300 font-medium mb-1.5">
              Empresa / Razão Social
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Ex: Comercial Boa Viagem ou Residencial"
              className="w-full bg-[#121B2F] border border-white/[0.08] focus:border-[#D4A017] rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none transition-colors"
            />
          </div>

          {/* Telefone */}
          <div>
            <label className="block text-slate-300 font-medium mb-1.5">
              Telefone / WhatsApp
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(81) 98888-7777"
              className="w-full bg-[#121B2F] border border-white/[0.08] focus:border-[#D4A017] rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none transition-colors"
            />
          </div>

          {/* E-mail */}
          <div>
            <label className="block text-slate-300 font-medium mb-1.5">
              E-mail
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="contato@cliente.com.br"
              className="w-full bg-[#121B2F] border border-white/[0.08] focus:border-[#D4A017] rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none transition-colors"
            />
          </div>

          {/* Cidade */}
          <div>
            <label className="block text-slate-300 font-medium mb-1.5">
              Cidade / Estado
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Ex: Recife, PE"
              className="w-full bg-[#121B2F] border border-white/[0.08] focus:border-[#D4A017] rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none transition-colors"
            />
          </div>

          {/* Tipo de cliente */}
          <div>
            <label className="block text-slate-300 font-medium mb-1.5">
              Tipo de Imóvel / Cliente
            </label>
            <select
              name="clientType"
              value={formData.clientType}
              onChange={handleChange}
              className="w-full bg-[#121B2F] border border-white/[0.08] focus:border-[#D4A017] rounded-lg px-3 py-2 text-white focus:outline-none transition-colors"
            >
              <option value="Residencial">Residencial</option>
              <option value="Comercial">Comercial</option>
              <option value="Rural">Rural</option>
              <option value="Industrial">Industrial</option>
            </select>
          </div>

          {/* Origem do lead */}
          <div>
            <label className="block text-slate-300 font-medium mb-1.5">
              Origem do Lead
            </label>
            <select
              name="origin"
              value={formData.origin}
              onChange={handleChange}
              className="w-full bg-[#121B2F] border border-white/[0.08] focus:border-[#D4A017] rounded-lg px-3 py-2 text-white focus:outline-none transition-colors"
            >
              <option value="Instagram">Instagram</option>
              <option value="Facebook">Facebook</option>
              <option value="Google">Google</option>
              <option value="Site">Site</option>
              <option value="Indicação">Indicação</option>
              <option value="Prospecção">Prospecção</option>
              <option value="Outro">Outro</option>
            </select>
          </div>

          {/* Consumo médio mensal com destaque para cálculo */}
          <div>
            <label className="block text-slate-300 font-medium mb-1.5 flex items-center justify-between">
              <span>Conta de Energia Média (R$/mês) *</span>
              <span className="text-[10px] text-[#E8A735] font-semibold">Altera o dimensionamento</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-slate-400 font-semibold">R$</span>
              <input
                type="number"
                name="monthlyBill"
                value={formData.monthlyBill}
                onChange={handleChange}
                placeholder="Ex: 1200"
                className="w-full bg-[#121B2F] border border-[#D4A017]/50 focus:border-[#D4A017] rounded-lg pl-9 pr-3 py-2 text-white font-bold placeholder-slate-500 focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* SEÇÃO DA CALCULADORA SOLAR INTELIGENTE (NOVO RECURSO DE ALTO IMPACTO) */}
        {solarEstimates && (
          <div className="rounded-xl bg-gradient-to-br from-[#121B2E] via-[#0E1624] to-[#0A0E18] border border-[#D4A017]/35 p-4 shadow-lg">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <SunMedium className="w-4 h-4 text-[#E8A735]" />
                <span className="text-xs font-bold text-white tracking-wide">
                  Pré-Dimensionamento Solar Inteligente
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#D4A017]/20 text-[#E8A735] border border-[#D4A017]/30 uppercase">
                  Automático
                </span>
              </div>

              <button
                type="button"
                onClick={handleApplyEstimateToNotes}
                className="text-[11px] font-semibold text-[#E8A735] hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
              >
                <FileCheck2 className="w-3.5 h-3.5" />
                <span>Copiar para Observações</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
              {/* Card 1: Potência */}
              <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                <span className="text-[10px] text-slate-400 block font-medium">Potência Estimada</span>
                <div className="text-base font-bold text-white font-mono mt-0.5 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  {solarEstimates.finalKwp} kWp
                </div>
                <span className="text-[10px] text-slate-500 block mt-0.5">
                  Consumo: ~{solarEstimates.consumptionKWh} kWh/mês
                </span>
              </div>

              {/* Card 2: Painéis & Área */}
              <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                <span className="text-[10px] text-slate-400 block font-medium">Equipamento Sugerido</span>
                <div className="text-base font-bold text-white font-mono mt-0.5">
                  {solarEstimates.modulesCount} painéis
                </div>
                <span className="text-[10px] text-slate-500 block mt-0.5">
                  550W • Área: ~{solarEstimates.roofArea} m²
                </span>
              </div>

              {/* Card 3: Economia Anual */}
              <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                <span className="text-[10px] text-slate-400 block font-medium">Economia Anual Estimada</span>
                <div className="text-base font-bold text-emerald-400 font-mono mt-0.5">
                  R$ {solarEstimates.annualSavings.toLocaleString('pt-BR')}
                </div>
                <span className="text-[10px] text-slate-500 block mt-0.5">
                  25 anos: R$ {solarEstimates.savings25Years.toLocaleString('pt-BR')}
                </span>
              </div>

              {/* Card 4: Retorno / Payback */}
              <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                <span className="text-[10px] text-slate-400 block font-medium">Payback Estimado</span>
                <div className="text-base font-bold text-[#E8A735] font-mono mt-0.5 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#E8A735] flex-shrink-0" />
                  {solarEstimates.paybackYears} anos
                </div>
                <span className="text-[10px] text-slate-500 block mt-0.5">
                  Invest.: ~R$ {solarEstimates.estimatedInvestment.toLocaleString('pt-BR')}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Responsável */}
          <div>
            <label className="block text-slate-300 font-medium mb-1.5">
              Responsável Comercial
            </label>
            <select
              name="responsible"
              value={formData.responsible}
              onChange={handleChange}
              className="w-full bg-[#121B2F] border border-white/[0.08] focus:border-[#D4A017] rounded-lg px-3 py-2 text-white focus:outline-none transition-colors"
            >
              <option value="Lucas Mendes">Lucas Mendes</option>
              <option value="Mariana Costa">Mariana Costa</option>
            </select>
          </div>

          {/* Status Inicial */}
          <div>
            <label className="block text-slate-300 font-medium mb-1.5">
              Status Inicial
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Novo', 'Em atendimento', 'Qualificado'].map((st) => (
                <button
                  type="button"
                  key={st}
                  onClick={() => setFormData(prev => ({ ...prev, status: st }))}
                  className={`py-2 px-2 rounded-lg border text-center font-medium transition-all text-xs ${
                    formData.status === st
                      ? 'bg-[#D4A017]/20 border-[#D4A017] text-[#E8A735] font-bold'
                      : 'bg-[#121B2F] border-white/[0.06] text-slate-400 hover:text-white'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Observações */}
        <div>
          <label className="block text-slate-300 font-medium mb-1.5">
            Observações Comerciais & Técnicas
          </label>
          <textarea
            rows="3"
            name="observations"
            value={formData.observations}
            onChange={handleChange}
            placeholder="Detalhes sobre telhado, padrão de entrada, disjuntores, expectativas do cliente..."
            className="w-full bg-[#121B2F] border border-white/[0.08] focus:border-[#D4A017] rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none transition-colors resize-none font-mono text-[11px]"
          />
        </div>

        {/* Ações */}
        <div className="pt-3 border-t border-white/[0.06] flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.05] font-medium transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            style={{
              background: 'linear-gradient(180deg, #F3B33D 0%, #D49422 100%)',
            }}
            className="px-6 py-2.5 rounded-lg text-slate-950 font-bold tracking-wide transition-all shadow-md hover:brightness-105 flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 stroke-[2.5]" />
            SALVAR LEAD & PROPOSTA
          </button>
        </div>
      </form>
    </Modal>
  );
};
