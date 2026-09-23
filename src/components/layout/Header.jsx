import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Bell,
  ChevronDown,
  Plus,
  Menu,
  Palette,
  UserCheck,
  KanbanSquare,
  FileText,
  Users,
  CheckCircle,
  X,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CustomizationModal } from '../common/CustomizationModal';

export const Header = () => {
  const {
    setMobileMenuOpen,
    setIsNewLeadModalOpen,
    leads,
    opportunities,
    proposals,
    clients,
    setActiveTab,
    showToast
  } = useApp();

  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const searchRef = useRef(null);
  const notificationRef = useRef(null);

  // Lista de notificações comerciais realistas
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Proposta visualizada',
      desc: 'Carlos Almeida abriu o estudo de 8,5 kWp.',
      time: 'Há 12 min',
      unread: true,
      tab: 'propostas',
    },
    {
      id: 2,
      title: 'Novo lead qualificado',
      desc: 'Beatriz Nogueira cadastrada via Google Ads.',
      time: 'Há 45 min',
      unread: true,
      tab: 'leads',
    },
    {
      id: 3,
      title: 'Visita técnica confirmada',
      desc: 'Fernanda Rocha confirmou visita hoje às 14:30.',
      time: 'Há 2 horas',
      unread: false,
      tab: 'agenda',
    },
  ]);

  // Fechar dropdowns ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(e.target)) {
        setIsNotificationOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Resultados da busca global
  const searchResults = React.useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();

    const leadResults = leads
      .filter(l => l.name.toLowerCase().includes(q) || l.company.toLowerCase().includes(q))
      .slice(0, 3)
      .map(l => ({ id: l.id, title: l.name, sub: l.company, type: 'Lead', tab: 'leads', icon: UserCheck }));

    const oppResults = opportunities
      .filter(o => o.client.toLowerCase().includes(q) || o.type.toLowerCase().includes(q))
      .slice(0, 3)
      .map(o => ({ id: o.id, title: o.client, sub: `${o.power} • R$ ${o.value.toLocaleString('pt-BR')}`, type: 'Oportunidade', tab: 'oportunidades', icon: KanbanSquare }));

    const propResults = proposals
      .filter(p => p.client.toLowerCase().includes(q) || p.project.toLowerCase().includes(q))
      .slice(0, 2)
      .map(p => ({ id: p.id, title: p.client, sub: p.project, type: 'Proposta', tab: 'propostas', icon: FileText }));

    const clientResults = clients
      .filter(c => c.client.toLowerCase().includes(q) || c.city.toLowerCase().includes(q))
      .slice(0, 2)
      .map(c => ({ id: c.id, title: c.client, sub: `${c.power} • ${c.city}`, type: 'Cliente', tab: 'clientes', icon: Users }));

    return [...leadResults, ...oppResults, ...propResults, ...clientResults];
  }, [searchQuery, leads, opportunities, proposals, clients]);

  const handleSelectSearchResult = (tab) => {
    setActiveTab(tab);
    setSearchQuery('');
    setIsSearchOpen(false);
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
    showToast('Todas as notificações foram marcadas como lidas.');
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <>
      <header className="sticky top-0 z-30 h-16 w-full bg-[#080B12]/90 backdrop-blur-md border-b border-white/[0.06] px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Lado Esquerdo: Mobile Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.05]"
            aria-label="Abrir Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Centro: Campo de Busca Global Inteligente e Ativo */}
        <div ref={searchRef} className="flex-1 max-w-md mx-auto hidden sm:block relative">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              placeholder="Buscar no sistema (leads, projetos, valores)..."
              className="w-full h-9 rounded-xl bg-[#101622] border border-white/[0.08] focus:border-[#D4A017] pl-10 pr-8 text-xs text-white placeholder-slate-400 focus:outline-none transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Dropdown de Resultados da Busca */}
          {isSearchOpen && searchQuery.trim() !== '' && (
            <div className="absolute top-full mt-2 inset-x-0 rounded-2xl bg-[#0D121F] border border-white/10 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-white/[0.06] flex items-center justify-between">
                <span>Resultados encontrados</span>
                <span className="text-[#E8A735]">{searchResults.length} itens</span>
              </div>

              <div className="mt-1 max-h-64 overflow-y-auto divide-y divide-white/[0.04]">
                {searchResults.length === 0 ? (
                  <div className="p-4 text-center text-xs text-slate-500">
                    Nenhum resultado para "{searchQuery}"
                  </div>
                ) : (
                  searchResults.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={`${item.type}-${item.id}`}
                        onClick={() => handleSelectSearchResult(item.tab)}
                        className="p-2.5 rounded-xl hover:bg-white/[0.05] transition-colors cursor-pointer flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-lg bg-[#182236] border border-white/[0.06] flex items-center justify-center text-[#E8A735] group-hover:border-[#D4A017]">
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <span className="text-xs font-semibold text-white group-hover:text-[#E8A735] transition-colors block leading-tight">
                              {item.title}
                            </span>
                            <span className="text-[11px] text-slate-400 block mt-0.5">
                              {item.sub}
                            </span>
                          </div>
                        </div>

                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/[0.04] text-slate-300 border border-white/[0.06]">
                          {item.type}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>

        {/* Lado Direito: Ações */}
        <div className="flex items-center gap-4">
          {/* Botão de Personalização Rápida */}
          <button
            onClick={() => setIsCustomModalOpen(true)}
            title="Personalize para o seu cliente"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-medium text-slate-300 hover:text-white transition-all hover:scale-[1.02] active:scale-95"
          >
            <Palette className="w-3.5 h-3.5 text-[#E8A735]" />
            <span className="text-[11px] font-semibold">Personalizar Marca</span>
          </button>

          {/* Sino de Notificação Ativo com Dropdown */}
          <div ref={notificationRef} className="relative">
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.05] transition-colors relative"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#E8A735] animate-ping" />
              )}
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#E8A735]" />
              )}
            </button>

            {/* Painel Flutuante de Notificações */}
            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-[#0D121F] border border-white/10 shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                  <span className="text-xs font-bold text-white tracking-wide">
                    Notificações Comerciais
                  </span>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllNotificationsAsRead}
                      className="text-[10px] text-[#E8A735] hover:underline font-medium"
                    >
                      Marcar lidas
                    </button>
                  )}
                </div>

                <div className="mt-2 space-y-2">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        setActiveTab(n.tab);
                        setIsNotificationOpen(false);
                      }}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                        n.unread
                          ? 'bg-[#141C2E] border-[#D4A017]/30 hover:border-[#D4A017]'
                          : 'bg-white/[0.02] border-white/[0.04] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-white">
                          {n.title}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {n.time}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                        {n.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Perfil do Usuário */}
          <div className="flex items-center gap-2 cursor-pointer select-none group">
            <div className="w-8 h-8 rounded-full bg-slate-700/80 border border-white/10 flex items-center justify-center text-xs font-bold text-amber-200 group-hover:border-[#D4A017] transition-colors">
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

          {/* Botão + Novo Lead Dourado */}
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

      {/* Modal Flutuante de Personalização */}
      <CustomizationModal
        isOpen={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
      />
    </>
  );
};
