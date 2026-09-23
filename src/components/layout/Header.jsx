import React, { useState } from 'react';
import { Search, Bell, ChevronDown, Plus, Menu, Palette } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CustomizationModal } from '../common/CustomizationModal';

export const Header = () => {
  const { setMobileMenuOpen, setIsNewLeadModalOpen } = useApp();
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 h-16 w-full bg-[#080B12]/90 backdrop-blur-md border-b border-white/[0.06] px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Lado Esquerdo: Mobile Trigger & Título sutil */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.05]"
            aria-label="Abrir Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Centro: Campo de Busca idêntico à imagem de referência */}
        <div className="flex-1 max-w-md mx-auto hidden sm:block">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar no sistema..."
              className="w-full h-9 rounded-xl bg-[#101622] border border-white/[0.08] focus:border-[#D4A017] pl-10 pr-4 text-xs text-white placeholder-slate-400 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Lado Direito: Notificação, Usuário e Botão + Novo Lead */}
        <div className="flex items-center gap-4">
          {/* Botão para abrir o Modal de Personalização Flutuante da foto */}
          <button
            onClick={() => setIsCustomModalOpen(true)}
            title="Personalize para o seu cliente"
            className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-medium text-slate-300 transition-colors"
          >
            <Palette className="w-3.5 h-3.5 text-[#E8A735]" />
            <span className="text-[11px]">Personalizar Marca</span>
          </button>

          {/* Sino de Notificação */}
          <div className="relative cursor-pointer text-slate-400 hover:text-white transition-colors">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#E8A735]" />
          </div>

          {/* Perfil do Usuário idêntico ao mockup */}
          <div className="flex items-center gap-2 cursor-pointer select-none group">
            <div className="w-8 h-8 rounded-full bg-slate-700/80 border border-white/10 flex items-center justify-center text-xs font-medium text-white">
              L
            </div>
            <div className="hidden sm:block text-left">
              <span className="text-xs font-semibold text-white block leading-tight">
                Lucas
              </span>
              <span className="text-[10px] text-slate-400 block leading-tight">
                Integrador
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 transition-colors hidden sm:block" />
          </div>

          {/* Botão + Novo Lead Dourado Fiel ao Mockup */}
          <button
            onClick={() => setIsNewLeadModalOpen(true)}
            style={{
              background: 'linear-gradient(180deg, #F3B33D 0%, #D49422 100%)',
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-slate-950 font-bold text-xs shadow-sm hover:brightness-105 active:scale-95 transition-all"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Novo Lead</span>
          </button>
        </div>
      </header>

      {/* Modal Flutuante de Personalização exatamente como no mockup */}
      <CustomizationModal
        isOpen={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
      />
    </>
  );
};
