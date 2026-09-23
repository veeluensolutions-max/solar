import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Badge } from '../../common/Badge';
import { Users, Search, CheckCircle2, Zap, DollarSign, Building } from 'lucide-react';

export const Clientes = () => {
  const { clients } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredClients = clients.filter((c) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      c.client.toLowerCase().includes(q) ||
      c.city.toLowerCase().includes(q) ||
      c.type.toLowerCase().includes(q)
    );
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Cliente ativo':
        return <Badge variant="primary">Cliente ativo</Badge>;
      case 'Concluído':
        return <Badge variant="success">Concluído</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-5">
      {/* Topo */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white font-sans">
            Clientes
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Base de clientes com projetos homologados ou em fase de execução ({filteredClients.length} cadastrados)
          </p>
        </div>

        {/* Busca Rápida */}
        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por cliente, cidade ou tipo..."
            className="w-full bg-[#0F1626] border border-white/[0.08] focus:border-[var(--color-primary)] rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Visualização Mobile em Cards para Smartphone */}
      <div className="sm:hidden space-y-3">
        {filteredClients.length === 0 ? (
          <div className="p-6 text-center text-xs text-slate-400 bg-[#0F1626]/60 rounded-xl border border-white/[0.06]">
            Nenhum cliente cadastrado com os filtros atuais.
          </div>
        ) : (
          filteredClients.map((client) => (
            <div
              key={client.id}
              className="p-4 rounded-xl bg-[#0F1626]/90 border border-white/[0.07] space-y-2.5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="text-sm font-bold text-white leading-tight">
                    {client.client}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {client.type} • {client.city}
                  </p>
                </div>
                {getStatusBadge(client.status)}
              </div>

              <div className="flex items-center justify-between text-xs pt-1 border-t border-white/[0.04]">
                <div>
                  <span className="text-[10px] text-slate-500 block">Projeto</span>
                  <span className="text-slate-300 font-medium">{client.project}</span>
                </div>

                <div>
                  <span className="text-[10px] text-slate-500 block">Potência</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-amber-300">
                    <Zap className="w-3 h-3 text-amber-400" />
                    {client.power}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block">Investimento</span>
                  <span className="font-mono font-bold text-white">
                    {client.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Tabela Tradicional de Clientes para Desktop e Tablet */}
      <div className="hidden sm:block rounded-xl bg-[#0F1626]/90 border border-white/[0.07] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/[0.06] bg-white/[0.01] text-slate-400 font-medium">
                <th className="py-3.5 px-4">Cliente</th>
                <th className="py-3.5 px-3">Tipo</th>
                <th className="py-3.5 px-3">Cidade</th>
                <th className="py-3.5 px-3">Projeto</th>
                <th className="py-3.5 px-3">Potência</th>
                <th className="py-3.5 px-3 text-right">Valor</th>
                <th className="py-3.5 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filteredClients.map((client) => (
                <tr
                  key={client.id}
                  className="hover:bg-white/[0.02] transition-colors group"
                >
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-white group-hover:text-[var(--color-primary)] transition-colors">
                      {client.client}
                    </span>
                    <span className="block text-[11px] text-slate-400 mt-0.5">
                      Instalação: {client.installDate || '2026'}
                    </span>
                  </td>

                  <td className="py-3.5 px-3 text-slate-300">
                    {client.type}
                  </td>

                  <td className="py-3.5 px-3 text-slate-300">
                    {client.city}
                  </td>

                  <td className="py-3.5 px-3 text-slate-300">
                    <span className="font-medium text-slate-200">
                      {client.project}
                    </span>
                    {client.inverter && (
                      <span className="block text-[10px] text-slate-500">
                        {client.inverter}
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-3">
                    <span className="inline-flex items-center gap-1 font-semibold text-amber-300/90">
                      <Zap className="w-3 h-3 text-amber-400" />
                      {client.power}
                    </span>
                  </td>

                  <td className="py-3.5 px-3 text-right font-mono font-bold text-white">
                    {client.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    {getStatusBadge(client.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
