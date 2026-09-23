import React from 'react';

export const VelliaIconSymbol = ({ className = "w-9 h-9" }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} flex-shrink-0`}
    >
      <defs>
        {/* Gradiente Dourado Metálico Principal */}
        <linearGradient id="goldVMain" x1="20%" y1="10%" x2="80%" y2="90%">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="25%" stopColor="#F59E0B" />
          <stop offset="60%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#92400E" />
        </linearGradient>

        {/* Gradiente Dourado da Faixa Esquerda Secundária */}
        <linearGradient id="goldVStrip" x1="15%" y1="15%" x2="45%" y2="85%">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="50%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#78350F" />
        </linearGradient>

        {/* Sombra de oclusão da dobra da fita */}
        <linearGradient id="shadowFold" x1="45%" y1="70%" x2="55%" y2="90%">
          <stop offset="0%" stopColor="#451A03" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#78350F" stopOpacity="0.0" />
        </linearGradient>
      </defs>

      {/* Fita 1: Faixa fina esquerda externa paralela */}
      <path
        d="M 22 28 L 33 28 L 47 70 C 44 76 39 79 34 79 C 28 79 23 75 22 69 Z"
        fill="url(#goldVStrip)"
      />

      {/* Fita 2: Corpo principal dobrado do 'V' */}
      <path
        d="M 33 28 L 45 28 L 54 62 L 69 28 L 81 28 L 62 76 C 58 84 50 86 43 84 C 36 82 31 76 30 70 Z"
        fill="url(#goldVMain)"
      />

      {/* Detalhe de dobra e profundidade */}
      <path
        d="M 43 84 C 47 80 50 72 54 62 L 50 73 Z"
        fill="url(#shadowFold)"
      />
    </svg>
  );
};

export const VelliaLogo = ({ className = "w-8 h-8", systemName = "Vellia Solar", subName = "Private" }) => {
  return (
    <div className="flex items-center gap-3">
      {/* Símbolo do V estilizado em caixa squircle com borda dourada idêntica à foto */}
      <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-[#141A28] to-[#0A0D15] border border-[#D4A017]/40 p-1 flex items-center justify-center shadow-lg shadow-black/60 group-hover:border-[#E8A735] transition-all">
        <VelliaIconSymbol className="w-7 h-7" />
      </div>

      <div className="flex flex-col select-none">
        <div className="flex items-baseline gap-1">
          <span className="text-[14px] font-extrabold tracking-wider text-white font-sans uppercase">
            VELLIA
          </span>
          <span className="text-[14px] font-medium tracking-wider text-[#E8A735] font-sans uppercase">
            SOLAR
          </span>
        </div>
        <span className="text-[10px] font-semibold text-slate-400 tracking-[0.2em] uppercase leading-tight -mt-0.5">
          {subName || "Private"}
        </span>
      </div>
    </div>
  );
};
