import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const CommercialChart = () => {
  const [selectedRange, setSelectedRange] = useState('Últimos 6 meses');

  // Dados dos 6 meses do mockup
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];

  // Leads recebidos (linha dourada superior)
  const leadsData = [40, 68, 95, 115, 145, 185];
  // Vendas fechadas (linha azul/cinza inferior)
  const salesData = [18, 28, 42, 58, 75, 98];

  // Coordenadas calculadas para SVG com viewBox "0 0 500 200"
  // Eixo Y vai de 0 a 200 (na tela Y invertido: 200 é base 0, 20 é topo 200)
  const getY = (val) => 180 - (val / 200) * 160;
  const getX = (idx) => 40 + idx * 84;

  const leadsPoints = leadsData.map((val, idx) => `${getX(idx)},${getY(val)}`).join(' ');
  const salesPoints = salesData.map((val, idx) => `${getX(idx)},${getY(val)}`).join(' ');

  // Área preenchida sob a curva dourada
  const areaPoints = `40,180 ${leadsPoints} ${getX(5)},180`;

  return (
    <div className="rounded-2xl bg-[#101622] border border-white/[0.07] p-5 shadow-sm">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between pb-3">
        <h3 className="text-sm font-semibold text-white tracking-wide">
          Desempenho comercial
        </h3>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#161F30] border border-white/[0.06] text-xs text-slate-300 cursor-pointer hover:bg-[#1D2940] transition-colors">
          <span>{selectedRange}</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </div>
      </div>

      {/* Gráfico SVG com linhas e grid */}
      <div className="mt-3 relative">
        <svg viewBox="0 0 500 200" className="w-full h-48 overflow-visible">
          <defs>
            {/* Gradiente dourado suave para a área */}
            <linearGradient id="chartGoldGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D4A017" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#D4A017" stopOpacity="0.0" />
            </linearGradient>

            {/* Brilho dourado */}
            <filter id="glowGold" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Linhas de Grade Horizontais */}
          {[0, 50, 100, 150, 200].map((val) => {
            const y = getY(val);
            return (
              <g key={val}>
                <line
                  x1="35"
                  y1={y}
                  x2="480"
                  y2={y}
                  stroke="rgba(255, 255, 255, 0.05)"
                  strokeDasharray="2 2"
                />
                <text
                  x="25"
                  y={y + 4}
                  fill="#64748B"
                  fontSize="10"
                  textAnchor="end"
                  fontFamily="sans-serif"
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* Área preenchida dourada */}
          <polygon points={areaPoints} fill="url(#chartGoldGrad)" />

          {/* Linha 2: Vendas fechadas (Cinza/Azulado suave) */}
          <polyline
            fill="none"
            stroke="#64748B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={salesPoints}
          />

          {/* Pontos da Linha 2 */}
          {salesData.map((val, idx) => (
            <circle
              key={`sales-${idx}`}
              cx={getX(idx)}
              cy={getY(val)}
              r="3.5"
              fill="#0F172A"
              stroke="#94A3B8"
              strokeWidth="2"
            />
          ))}

          {/* Linha 1: Leads recebidos (Dourado Solar vibrante com glow) */}
          <polyline
            fill="none"
            stroke="#D4A017"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glowGold)"
            points={leadsPoints}
          />

          {/* Pontos da Linha 1 */}
          {leadsData.map((val, idx) => (
            <circle
              key={`leads-${idx}`}
              cx={getX(idx)}
              cy={getY(val)}
              r="4"
              fill="#FBD38D"
              stroke="#D4A017"
              strokeWidth="2"
              className="hover:r-5 transition-all cursor-pointer"
            />
          ))}

          {/* Rótulos dos Meses no Eixo X */}
          {months.map((m, idx) => (
            <text
              key={m}
              x={getX(idx)}
              y="196"
              fill="#94A3B8"
              fontSize="11"
              textAnchor="middle"
              fontFamily="sans-serif"
              fontWeight="500"
            >
              {m}
            </text>
          ))}
        </svg>

        {/* Legenda inferior idêntica à foto */}
        <div className="mt-3 flex items-center justify-center gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4A017]" />
            <span className="text-slate-300">Leads recebidos</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#64748B]" />
            <span className="text-slate-400">Vendas fechadas</span>
          </div>
        </div>
      </div>
    </div>
  );
};
