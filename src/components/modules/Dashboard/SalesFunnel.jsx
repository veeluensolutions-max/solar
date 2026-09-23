import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const SalesFunnel = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Este mês');

  // As 5 etapas da imagem de referência
  const stages = [
    { count: '482', label: 'Leads', color: '#E8A735' },
    { count: '268', label: 'Qualificação', color: '#D49422' },
    { count: '176', label: 'Proposta', color: '#B57418' },
    { count: '89', label: 'Negociação', color: '#8F5310' },
    { count: '64', label: 'Fechadas', color: '#683A09' },
  ];

  return (
    <div className="rounded-2xl bg-[#101622] border border-white/[0.07] p-5 shadow-sm h-full flex flex-col justify-between">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between pb-3">
        <h3 className="text-sm font-semibold text-white tracking-wide">
          Funil de Vendas
        </h3>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#161F30] border border-white/[0.06] text-xs text-slate-300 cursor-pointer hover:bg-[#1D2940] transition-colors">
          <span>{selectedPeriod}</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </div>
      </div>

      {/* Geometria do Funil com Trapézios e Valores ao Lado */}
      <div className="my-auto py-2 flex items-center justify-between gap-4">
        {/* Lado Esquerdo: Funil SVG com trapézios empilhados */}
        <div className="w-[140px] sm:w-[160px] flex-shrink-0">
          <svg viewBox="0 0 160 140" className="w-full h-auto overflow-visible">
            {/* Camada 1: Leads (Topo mais largo) */}
            <polygon
              points="10,5 150,5 136,30 24,30"
              fill="#E8A735"
              className="hover:opacity-90 transition-opacity cursor-pointer"
            />
            {/* Camada 2: Qualificação */}
            <polygon
              points="26,33 134,33 122,58 38,58"
              fill="#D49422"
              className="hover:opacity-90 transition-opacity cursor-pointer"
            />
            {/* Camada 3: Proposta */}
            <polygon
              points="40,61 120,61 108,86 52,86"
              fill="#B57418"
              className="hover:opacity-90 transition-opacity cursor-pointer"
            />
            {/* Camada 4: Negociação */}
            <polygon
              points="54,89 106,89 96,114 64,114"
              fill="#8F5310"
              className="hover:opacity-90 transition-opacity cursor-pointer"
            />
            {/* Camada 5: Fechadas (Base estreita) */}
            <polygon
              points="66,117 94,117 87,138 73,138"
              fill="#683A09"
              className="hover:opacity-90 transition-opacity cursor-pointer"
            />
          </svg>
        </div>

        {/* Lado Direito: Valores e Nomes alinhados com cada camada */}
        <div className="flex-1 flex flex-col justify-between h-[135px] text-xs">
          {stages.map((stage) => (
            <div key={stage.label} className="flex items-center gap-3">
              <span className="font-bold text-white font-mono w-8 text-right">
                {stage.count}
              </span>
              <span className="text-slate-400 font-medium truncate">
                {stage.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-2 text-[10px] text-slate-500 text-center">
        Atualização em tempo real da esteira de conversão
      </div>
    </div>
  );
};
