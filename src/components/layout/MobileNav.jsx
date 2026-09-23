import React from 'react';
import {
  LayoutDashboard,
  UserCheck,
  KanbanSquare,
  Users,
  FileText,
  Calendar,
  BarChart3,
  Settings,
  X,
  SunMedium,
  Shield
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MobileNav = () => {
  const {
    activeTab,
    setActiveTab,
    mobileMenuOpen,
    setMobileMenuOpen,
    settings,
  } = useApp();

  if (!mobileMenuOpen) return null;

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'leads', label: 'Leads', icon: UserCheck },
    { id: 'oportunidades', label: 'Oportunidades', icon: KanbanSquare },
    { id: 'clientes', label: 'Clientes', icon: Users },
    { id: 'propostas', label: 'Propostas', icon: FileText },
    { id: 'agenda', label: 'Agenda', icon: Calendar },
    { id: 'relatorios', label: 'Relatórios', icon: BarChart3 },
    { id: 'configuracoes', label: 'Configurações', icon: Settings },
  ];

  const handleSelect = (tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 w-72 bg-[#080B12] border-r border-white/[0.08] p-5 flex flex-col justify-between shadow-2xl animate-in slide-in-from-left duration-200">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center text-slate-950 font-black">
                <SunMedium className="w-5 h-5 text-slate-950" />
              </div>
              <div>
                <span className="text-sm font-bold text-white tracking-tight block">
                  {settings.systemName || 'Vellia Solar'}
                </span>
                <span className="text-[10px] font-semibold text-[var(--color-primary)] tracking-widest uppercase block">
                  PRIVATE CRM
                </span>
              </div>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="mt-4 space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[var(--color-primary-light)] text-[var(--color-primary)] font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Rodapé Usuário */}
        <div className="pt-4 border-t border-white/[0.06] flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center font-bold text-xs text-amber-200">
            LM
          </div>
          <div>
            <p className="text-xs font-semibold text-white">Lucas Mendes</p>
            <p className="text-[11px] text-slate-400 flex items-center gap-1">
              <Shield className="w-3 h-3 text-[var(--color-primary)]" />
              Administrador
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
