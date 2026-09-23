import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  Palette,
  Building2,
  Users,
  GitBranch,
  CheckCircle,
  Upload,
  RefreshCw,
  Sparkles,
  ShieldCheck,
  Check
} from 'lucide-react';

export const Configuracoes = () => {
  const { settings, updateSettings, resetSettings } = useApp();

  const [activeTab, setActiveTab] = useState('identidade');

  // Estado local do form
  const [systemName, setSystemName] = useState(settings.systemName);
  const [companyName, setCompanyName] = useState(settings.companyName);
  const [primaryColor, setPrimaryColor] = useState(settings.primaryColor);
  const [secondaryColor, setSecondaryColor] = useState(settings.secondaryColor);
  const [logoPreview, setLogoPreview] = useState(settings.customLogoUrl || '');

  // Presets refinados de cores premium para empresas de energia solar
  const colorPresets = [
    { name: 'Dourado Solar (Original)', color: '#C88A32', secondary: '#B87333' },
    { name: 'Âmbar Premium', color: '#D97706', secondary: '#92400E' },
    { name: 'Azul Fotovoltaico', color: '#2563EB', secondary: '#1D4ED8' },
    { name: 'Esmeralda Sustentável', color: '#059669', secondary: '#047857' },
    { name: 'Cobre Industrial', color: '#B87333', secondary: '#78350F' },
    { name: 'Grafite Executivo', color: '#64748B', secondary: '#334155' },
  ];

  const handleApplyPreset = (preset) => {
    setPrimaryColor(preset.color);
    setSecondaryColor(preset.secondary);
    updateSettings({
      primaryColor: preset.color,
      secondaryColor: preset.secondary,
    });
  };

  const handleSaveIdentity = (e) => {
    e.preventDefault();
    updateSettings({
      systemName,
      companyName,
      primaryColor,
      secondaryColor,
      customLogoUrl: logoPreview,
    });
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Topo */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white font-sans">
            Configurações
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Personalize a identidade da sua integradora, usuários e fluxos comerciais
          </p>
        </div>

        <button
          onClick={resetSettings}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/[0.08] hover:bg-white/[0.04] text-slate-400 hover:text-white text-xs transition-colors self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Restaurar Padrão</span>
        </button>
      </div>

      {/* Navegação entre seções solicitadas: Empresa, Usuários, Funil comercial, Status, Identidade visual */}
      <div className="flex items-center gap-2 border-b border-white/[0.06] overflow-x-auto pb-2">
        {[
          { id: 'identidade', label: 'Identidade da Empresa (White-label)', icon: Palette },
          { id: 'empresa', label: 'Empresa', icon: Building2 },
          { id: 'usuarios', label: 'Usuários & Permissões', icon: Users },
          { id: 'funil', label: 'Funil Comercial', icon: GitBranch },
          { id: 'status', label: 'Status & Regras', icon: CheckCircle },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[var(--color-primary-light)] text-[var(--color-primary)] border border-[var(--color-primary)]/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Conteúdo da Aba Ativa */}
      {activeTab === 'identidade' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Formulário de Identidade */}
          <div className="lg:col-span-2 rounded-xl bg-[#0F1626]/90 border border-white/[0.07] p-6 shadow-sm space-y-6">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Identidade da Empresa & Marca Própria
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Demonstre aos seus clientes que o sistema pertence integralmente à sua empresa. Todas as cores e nomes atualizam instantaneamente.
              </p>
            </div>

            <form onSubmit={handleSaveIdentity} className="space-y-5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Nome do Sistema */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">
                    Nome do Sistema (Ex: Solar Prime CRM)
                  </label>
                  <input
                    type="text"
                    value={systemName}
                    onChange={(e) => setSystemName(e.target.value)}
                    placeholder="Vellia Solar Private"
                    className="w-full bg-[#121B2F] border border-white/[0.08] focus:border-[var(--color-primary)] rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none transition-colors"
                  />
                </div>

                {/* Nome da Empresa */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">
                    Razão Social / Nome Fantasia
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Veeluen Solutions"
                    className="w-full bg-[#121B2F] border border-white/[0.08] focus:border-[var(--color-primary)] rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Seletor de Paleta / Presets de Cores */}
              <div>
                <label className="block text-slate-300 font-semibold mb-2">
                  Paleta de Cor Principal (Destaque do CRM)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {colorPresets.map((preset) => {
                    const isSelected = primaryColor.toLowerCase() === preset.color.toLowerCase();
                    return (
                      <button
                        type="button"
                        key={preset.name}
                        onClick={() => handleApplyPreset(preset)}
                        className={`p-2.5 rounded-lg border text-left flex items-center gap-2.5 transition-all ${
                          isSelected
                            ? 'bg-white/[0.06] border-[var(--color-primary)] text-white'
                            : 'bg-[#121B2F] border-white/[0.06] text-slate-400 hover:text-white hover:border-white/[0.12]'
                        }`}
                      >
                        <span
                          style={{ backgroundColor: preset.color }}
                          className="w-4 h-4 rounded-full flex-shrink-0 shadow-sm"
                        />
                        <span className="text-[11px] font-medium truncate">
                          {preset.name}
                        </span>
                        {isSelected && (
                          <Check className="w-3.5 h-3.5 ml-auto text-[var(--color-primary)]" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Color Pickers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">
                    Cor Principal (Hexadecimal)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-9 h-9 rounded-lg bg-transparent cursor-pointer border border-white/[0.1] p-0.5"
                    />
                    <input
                      type="text"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="flex-1 bg-[#121B2F] border border-white/[0.08] rounded-lg px-3 py-2 text-white font-mono uppercase focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">
                    Cor Secundária (Acentos e Cobre)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      className="w-9 h-9 rounded-lg bg-transparent cursor-pointer border border-white/[0.1] p-0.5"
                    />
                    <input
                      type="text"
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      className="flex-1 bg-[#121B2F] border border-white/[0.08] rounded-lg px-3 py-2 text-white font-mono uppercase focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Upload da Logo */}
              <div className="pt-2">
                <label className="block text-slate-300 font-semibold mb-1.5">
                  Upload da Logo da Empresa
                </label>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-[#121B2F] border border-dashed border-white/[0.1]">
                  {logoPreview ? (
                    <img
                      src={logoPreview}
                      alt="Logo Preview"
                      className="w-14 h-14 rounded-lg object-contain bg-black/40 p-2 border border-white/10"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-400">
                      <Upload className="w-6 h-6" />
                    </div>
                  )}

                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      id="logo-upload"
                      className="hidden"
                      onChange={handleLogoUpload}
                    />
                    <label
                      htmlFor="logo-upload"
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-white text-xs font-semibold cursor-pointer transition-colors"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Selecionar imagem PNG/SVG</span>
                    </label>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Formatos recomendados: SVG ou PNG transparente (até 2MB).
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-slate-950 font-bold transition-all shadow-sm flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 stroke-[2.5]" />
                  <span>Aplicar Identidade Visual</span>
                </button>
              </div>
            </form>
          </div>

          {/* Card Lateral: Mensagem de Posicionamento do Produto */}
          <div className="space-y-4">
            <div className="rounded-xl bg-gradient-to-b from-[#101828] to-[#0A0E18] border border-[var(--color-primary)]/30 p-6 shadow-xl relative overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-[var(--color-primary-light)] border border-[var(--color-primary)]/40 flex items-center justify-center text-[var(--color-primary)] mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>

              <h4 className="text-base font-bold text-white tracking-tight">
                {systemName || 'VELLIA SOLAR PRIVATE'}
              </h4>

              <div className="mt-3 space-y-1 text-sm font-semibold text-slate-300">
                <p className="text-[var(--color-primary)]">Seu sistema.</p>
                <p className="text-white">Sua marca.</p>
                <p className="text-slate-400">Seu processo.</p>
              </div>

              <p className="text-xs text-slate-400 mt-4 leading-relaxed">
                Tecnologia feita para acompanhar o crescimento da sua integradora solar.
              </p>

              <div className="mt-6 pt-4 border-t border-white/[0.08] text-[11px] text-slate-400">
                Padrão corporativo Veeluen Solutions com arquitetura expansível para novos módulos, integrações de inversores e APIs financeiras.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Outras Abas Minimalistas */}
      {activeTab === 'empresa' && (
        <div className="rounded-xl bg-[#0F1626]/90 border border-white/[0.07] p-6 text-xs text-slate-300 space-y-3">
          <h3 className="text-sm font-bold text-white">Dados Corporativos da Integradora</h3>
          <p className="text-slate-400">Configure os dados de faturamento, CNPJ e contato da integradora.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-3 rounded-lg bg-[#121B2F] border border-white/[0.06]">
              <span className="text-slate-500 block text-[11px]">Empresa</span>
              <span className="font-semibold text-white">{companyName}</span>
            </div>
            <div className="p-3 rounded-lg bg-[#121B2F] border border-white/[0.06]">
              <span className="text-slate-500 block text-[11px]">Segmento</span>
              <span className="font-semibold text-white">Energia Solar Fotovoltaica</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'usuarios' && (
        <div className="rounded-xl bg-[#0F1626]/90 border border-white/[0.07] p-6 text-xs text-slate-300 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Equipe Comercial</h3>
            <span className="text-slate-400">2 usuários ativos</span>
          </div>
          <div className="space-y-2">
            <div className="p-3 rounded-lg bg-[#121B2F] border border-white/[0.06] flex items-center justify-between">
              <div>
                <span className="font-bold text-white block">Lucas Mendes</span>
                <span className="text-slate-400 text-[11px]">lucas@veeluensolutions.com • Administrador</span>
              </div>
              <span className="text-emerald-400 text-xs font-semibold">Ativo</span>
            </div>
            <div className="p-3 rounded-lg bg-[#121B2F] border border-white/[0.06] flex items-center justify-between">
              <div>
                <span className="font-bold text-white block">Mariana Costa</span>
                <span className="text-slate-400 text-[11px]">mariana@veeluensolutions.com • Consultora Comercial</span>
              </div>
              <span className="text-emerald-400 text-xs font-semibold">Ativo</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'funil' && (
        <div className="rounded-xl bg-[#0F1626]/90 border border-white/[0.07] p-6 text-xs text-slate-300 space-y-3">
          <h3 className="text-sm font-bold text-white">Etapas do Funil de Vendas</h3>
          <p className="text-slate-400">O pipeline comercial está estruturado nas 5 etapas ágeis padrão: Novo Lead, Qualificação, Proposta, Negociação e Fechado.</p>
        </div>
      )}

      {activeTab === 'status' && (
        <div className="rounded-xl bg-[#0F1626]/90 border border-white/[0.07] p-6 text-xs text-slate-300 space-y-3">
          <h3 className="text-sm font-bold text-white">Classificação & Tags</h3>
          <p className="text-slate-400">Tags inteligentes ativadas para controle de lead sem retorno, propostas abertas e homologações ativas.</p>
        </div>
      )}
    </div>
  );
};
