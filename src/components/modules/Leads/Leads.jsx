import React, { useState, useMemo } from 'react';
import { useApp } from '../../../context/AppContext';
import { Badge } from '../../common/Badge';
import { WhatsAppModal } from './WhatsAppModal';
import {
  Plus,
  Search,
  MessageCircle,
  Filter,
  Phone,
  Building,
  Calendar,
  MoreVertical,
  CheckCircle,
  Clock,
  UserX
} from 'lucide-react';

export const Leads = () => {
  const { leads, setIsNewLeadModalOpen, updateLeadStatus } = useApp();
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLeadForActions, setSelectedLeadForActions] = useState(null);
  const [selectedLeadForWhatsApp, setSelectedLeadForWhatsApp] = useState(null);

  const filters = ['Todos', 'Novos', 'Em atendimento', 'Qualificados', 'Sem retorno'];

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      // Filtro de status
      if (activeFilter === 'Novos' && lead.status !== 'Novo') return false;
      if (activeFilter === 'Em atendimento' && lead.status !== 'Em atendimento') return false;
      if (activeFilter === 'Qualificados' && lead.status !== 'Qualificado') return false;
      if (activeFilter === 'Sem retorno' && lead.status !== 'Sem retorno') return false;

      // Filtro de busca
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = lead.name.toLowerCase().includes(query);
        const matchesPhone = lead.phone.toLowerCase().includes(query);
        const matchesCompany = lead.company.toLowerCase().includes(query);
        return matchesName || matchesPhone || matchesCompany;
      }

      return true;
    });
  }, [leads, activeFilter, searchQuery]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Novo':
        return <Badge variant="primary">Novo</Badge>;
      case 'Em atendimento':
        return <Badge variant="info">Em atendimento</Badge>;
      case 'Qualificado':
        return <Badge variant="success">Qualificado</Badge>;
      case 'Sem retorno':
        return <Badge variant="danger">Sem retorno</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  const getOriginBadge = (origin) => {
    switch (origin) {
      case 'Instagram':
        return <span className="text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded text-[11px] font-medium">Instagram</span>;
      case 'Google Ads':
      case 'Google':
        return <span className="text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded text-[11px] font-medium">Google Ads</span>;
      case 'Site':
        return <span className="text-slate-300 bg-slate-500/10 px-2 py-0.5 rounded text-[11px] font-medium">Site</span>;
      case 'Indicação':
        return <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded text-[11px] font-medium">Indicação</span>;
      default:
        return <span className="text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded text-[11px] font-medium">{origin}</span>;
    }
  };

  const handleExportCsv = () => {
    const headers = ['ID', 'Nome', 'Empresa', 'Telefone', 'WhatsApp', 'Email', 'Cidade', 'Tipo', 'Origem', 'Conta Mensal (R$)', 'Responsavel', 'Status', 'Data'];
    const rows = filteredLeads.map(l => [
      l.id,
      `"${l.name}"`,
      `"${l.company}"`,
      `"${l.phone}"`,
      `"${l.whatsapp}"`,
      `"${l.email}"`,
      `"${l.city}"`,
      `"${l.clientType}"`,
      `"${l.origin}"`,
      l.monthlyBill,
      `"${l.responsible}"`,
      `"${l.status}"`,
      `"${l.date}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(';'), ...rows.map(r => r.join(';'))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `leads_vellia_solar_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Base de Leads exportada em CSV com sucesso!');
  };

  return (
    <div className="space-y-5">
      {/* Topo da Tela de Leads */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white font-sans">
            Leads
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Gestão, qualificação e direcionamento de novos contatos ({filteredLeads.length} leads listados)
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          {/* Botão Exportar CSV */}
          <button
            type="button"
            onClick={handleExportCsv}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#141C2C] hover:bg-[#1A253A] text-slate-300 hover:text-white border border-white/[0.08] text-xs font-semibold transition-all hover:scale-105 active:scale-95 shadow-sm"
          >
            <span>Exportar CSV</span>
          </button>

          <button
            onClick={() => setIsNewLeadModalOpen(true)}
            style={{
              background: 'linear-gradient(180deg, #F3B33D 0%, #D49422 100%)',
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-slate-950 font-bold text-xs tracking-tight transition-all duration-150 shadow-sm hover:brightness-105 active:scale-95"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Novo Lead</span>
          </button>
        </div>
      </div>

      {/* Barra de Filtros e Busca */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#0F1626]/80 p-3 rounded-xl border border-white/[0.06]">
        {/* Abas de Filtros Solicitadas */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
          {filters.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[var(--color-primary)] text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Campo de Busca Solicitado */}
        <div className="relative min-w-[280px] sm:min-w-[320px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nome, telefone ou empresa"
            className="w-full bg-[#080B12] border border-white/[0.08] focus:border-[var(--color-primary)] rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Tabela de Leads */}
      <div className="rounded-xl bg-[#0F1626]/90 border border-white/[0.07] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/[0.06] bg-white/[0.01] text-slate-400 font-medium">
                <th className="py-3.5 px-4">Nome</th>
                <th className="py-3.5 px-3">Empresa</th>
                <th className="py-3.5 px-3">Telefone</th>
                <th className="py-3.5 px-3">Origem</th>
                <th className="py-3.5 px-3">Responsável</th>
                <th className="py-3.5 px-3">Status</th>
                <th className="py-3.5 px-3">Data</th>
                <th className="py-3.5 px-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-8 text-center text-slate-400">
                    Nenhum lead encontrado com os filtros atuais.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="hover:bg-white/[0.02] transition-colors group"
                  >
                    {/* Nome */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-white group-hover:text-[var(--color-primary)] transition-colors">
                        {lead.name}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {lead.city} • {lead.clientType}
                      </div>
                    </td>

                    {/* Empresa */}
                    <td className="py-3.5 px-3 text-slate-300">
                      {lead.company}
                    </td>

                    {/* Telefone */}
                    <td className="py-3.5 px-3 text-slate-300 font-mono text-[11px]">
                      {lead.phone}
                    </td>

                    {/* Origem */}
                    <td className="py-3.5 px-3">
                      {getOriginBadge(lead.origin)}
                    </td>

                    {/* Responsável */}
                    <td className="py-3.5 px-3 text-slate-300">
                      {lead.responsible}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-3">
                      {getStatusBadge(lead.status)}
                    </td>

                    {/* Data */}
                    <td className="py-3.5 px-3 text-slate-400 text-[11px]">
                      {lead.date}
                    </td>

                    {/* Ações */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Botão Disparador WhatsApp Inteligente */}
                        <button
                          type="button"
                          onClick={() => setSelectedLeadForWhatsApp(lead)}
                          title="Disparar mensagem no WhatsApp com modelos prontos"
                          className="p-1.5 rounded-lg bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30 transition-all hover:scale-105 active:scale-95"
                        >
                          <MessageCircle className="w-3.5 h-3.5 stroke-[2.5]" />
                        </button>

                        {/* Menu de alteração de status rápida */}
                        <div className="relative inline-block text-left">
                          <button
                            onClick={() => setSelectedLeadForActions(selectedLeadForActions === lead.id ? null : lead.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.05] transition-colors"
                            title="Alterar status"
                          >
                            <MoreVertical className="w-3.5 h-3.5" />
                          </button>

                          {selectedLeadForActions === lead.id && (
                            <div className="absolute right-0 mt-1 w-44 rounded-xl bg-[#080B12] border border-white/10 shadow-2xl py-1 z-30 text-xs">
                              <div className="px-3 py-1.5 text-[10px] font-semibold text-slate-500 uppercase border-b border-white/[0.06]">
                                Alterar Status
                              </div>
                              {['Novo', 'Em atendimento', 'Qualificado', 'Sem retorno'].map((st) => (
                                <button
                                  key={st}
                                  onClick={() => {
                                    updateLeadStatus(lead.id, st);
                                    setSelectedLeadForActions(null);
                                  }}
                                  className="w-full text-left px-3 py-1.5 hover:bg-white/[0.06] text-slate-300 transition-colors"
                                >
                                  Marcar como {st}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Disparo de WhatsApp com Modelos */}
      <WhatsAppModal
        isOpen={!!selectedLeadForWhatsApp}
        onClose={() => setSelectedLeadForWhatsApp(null)}
        lead={selectedLeadForWhatsApp}
      />
    </div>
  );
};
