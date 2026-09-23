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
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { VelliaLogo } from '../common/VelliaLogo';

export const Sidebar = () => {
  const {
    activeTab,
    setActiveTab,
    sidebarCollapsed,
    setSidebarCollapsed,
    settings,
  } = useApp();

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

  return (
    <aside
      className={`hidden lg:flex flex-col justify-between h-screen sticky top-0 bg-[#0A0D15] border-r border-white/[0.06] transition-all duration-300 z-40 select-none ${
        sidebarCollapsed ? 'w-20' : 'w-60'
      }`}
    >
      {/* Topo / Logo */}
      <div>
        <div className="h-20 flex items-center justify-between px-5 border-b border-white/[0.05]">
          {!sidebarCollapsed ? (
            <VelliaLogo
              systemName={settings.systemName || "Vellia Solar"}
              subName="Private"
            />
          ) : (
            <div className="w-full flex justify-center">
              <VelliaLogo className="w-8 h-8" systemName="" subName="" />
            </div>
          )}

          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1 rounded-md text-slate-500 hover:text-slate-300 hover:bg-white/[0.04] transition-colors ml-1"
            title={sidebarCollapsed ? "Expandir menu" : "Recolher menu"}
          >
            {sidebarCollapsed ? (
              <ChevronRight className="w-3.5 h-3.5" />
            ) : (
              <ChevronLeft className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {/* Menu de Navegação */}
        <nav className="p-3 space-y-1.5 mt-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 group ${
                  isActive
                    ? 'bg-[#151D2C] text-white border border-[#D4A017]/30 shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
                }`}
                title={sidebarCollapsed ? item.label : undefined}
              >
                <Icon
                  className={`w-4 h-4 flex-shrink-0 transition-colors ${
                    isActive
                      ? 'text-[#E8A735]'
                      : 'text-slate-400 group-hover:text-slate-300'
                  }`}
                />
                {!sidebarCollapsed && (
                  <span className="truncate tracking-wide">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Rodapé da Sidebar: Selo DEMONSTRAÇÃO e Versão idênticos ao laptop */}
      <div className="p-4 border-t border-white/[0.05] bg-[#07090F]">
        {!sidebarCollapsed ? (
          <div className="flex flex-col items-start gap-1.5">
            <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold text-[#E8A735] border border-[#D4A017]/40 tracking-wider uppercase bg-[#D4A017]/10">
              DEMONSTRAÇÃO
            </span>
            <span className="text-[11px] text-slate-500 font-mono">
              Vellia Solar Private v1.0.0
            </span>
          </div>
        ) : (
          <div className="flex justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E8A735] animate-pulse" />
          </div>
        )}
      </div>
    </aside>
  );
};
