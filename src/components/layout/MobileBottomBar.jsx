import React from 'react';
import { LayoutDashboard, UserCheck, Plus, Users, Menu } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MobileBottomBar = () => {
  const { activeTab, setActiveTab, setIsNewLeadModalOpen, setMobileMenuOpen } = useApp();

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-[#0A0D15]/95 backdrop-blur-xl border-t border-white/[0.08] px-3 pt-2 pb-[max(0.6rem,env(safe-area-inset-bottom))] flex items-center justify-around select-none shadow-[0_-10px_30px_rgba(0,0,0,0.6)]">
      {/* Dashboard */}
      <button
        onClick={() => setActiveTab('dashboard')}
        className={`flex flex-col items-center justify-center gap-1 min-w-[54px] py-1 text-[10px] font-medium transition-colors ${
          activeTab === 'dashboard' ? 'text-[#E8A735] font-bold' : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <LayoutDashboard className="w-4 h-4" />
        <span>Dashboard</span>
      </button>

      {/* Leads */}
      <button
        onClick={() => setActiveTab('leads')}
        className={`flex flex-col items-center justify-center gap-1 min-w-[54px] py-1 text-[10px] font-medium transition-colors ${
          activeTab === 'leads' ? 'text-[#E8A735] font-bold' : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <UserCheck className="w-4 h-4" />
        <span>Leads</span>
      </button>

      {/* Botão Central Redondo Dourado com + */}
      <button
        onClick={() => setIsNewLeadModalOpen(true)}
        aria-label="Adicionar Novo Lead"
        style={{
          background: 'linear-gradient(180deg, #F3B33D 0%, #D49422 100%)',
        }}
        className="w-12 h-12 -mt-6 rounded-full flex items-center justify-center text-slate-950 font-black shadow-xl shadow-[#D4A017]/30 border-2 border-[#0A0D15] active:scale-90 transition-transform cursor-pointer"
      >
        <Plus className="w-5 h-5 stroke-[3]" />
      </button>

      {/* Clientes */}
      <button
        onClick={() => setActiveTab('clientes')}
        className={`flex flex-col items-center justify-center gap-1 min-w-[54px] py-1 text-[10px] font-medium transition-colors ${
          activeTab === 'clientes' ? 'text-[#E8A735] font-bold' : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <Users className="w-4 h-4" />
        <span>Clientes</span>
      </button>

      {/* Mais / Menu Hambúrguer */}
      <button
        onClick={() => setMobileMenuOpen(true)}
        className="flex flex-col items-center justify-center gap-1 min-w-[54px] py-1 text-[10px] font-medium text-slate-400 hover:text-white transition-colors"
      >
        <Menu className="w-4 h-4" />
        <span>Mais</span>
      </button>
    </nav>
  );
};
