import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { VelliaIconSymbol } from '../../common/VelliaLogo';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  SunMedium,
  CheckCircle2
} from 'lucide-react';

export const LoginScreen = ({ onLoginSuccess }) => {
  const { settings, showToast } = useApp();

  const [email, setEmail] = useState('lucas@veeluensolutions.com');
  const [password, setPassword] = useState('••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
      showToast('Bem-vindo de volta, Lucas Mendes!');
    }, 600);
  };

  const handleQuickDemoAccess = () => {
    setEmail('lucas@veeluensolutions.com');
    setPassword('solar@2026');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
      showToast('Acesso de Demonstração liberado com sucesso!');
    }, 500);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#06080E] flex items-center justify-center p-4 sm:p-6 overflow-hidden select-none font-sans">
      {/* Luzes de Fundo com Blur Intenso (Efeito Glassmorphism & Iluminação Solar) */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#D4A017]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-[420px] h-[420px] bg-[#B87333]/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute -bottom-32 left-1/3 w-80 h-80 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Grade Sutil de Fundo */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Card Central Glassmorphism Ultra-Moderno */}
      <div className="relative w-full max-w-md rounded-3xl bg-[#0D1322]/70 backdrop-blur-2xl border border-white/[0.09] shadow-[0_20px_60px_rgba(0,0,0,0.8)] p-7 sm:p-9 z-10 animate-in fade-in zoom-in-95 duration-300">
        {/* Glow Superior na Borda */}
        <div className="absolute -top-px left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-[#E8A735] to-transparent" />

        {/* Topo do Card: Logotipo Oficial */}
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-[#182032] to-[#0A0E18] border border-[#D4A017]/40 p-2 flex items-center justify-center shadow-xl shadow-black/80 hover:border-[#E8A735] transition-all group">
            <VelliaIconSymbol className="w-10 h-10 group-hover:scale-105 transition-transform" />
          </div>

          <div className="mt-4 flex items-baseline gap-1.5 justify-center">
            <span className="text-xl font-black tracking-wider text-white uppercase font-sans">
              VELLIA
            </span>
            <span className="text-xl font-bold tracking-wider text-[#E8A735] uppercase font-sans">
              SOLAR
            </span>
          </div>

          <span className="text-[11px] font-semibold text-slate-400 tracking-[0.25em] uppercase block mt-0.5">
            {settings.systemName !== 'Vellia Solar Private' ? settings.systemName : 'PRIVATE CRM'}
          </span>

          <p className="text-xs text-slate-400 mt-3 leading-relaxed max-w-xs">
            Acesse seu ecossistema comercial inteligente e acompanhe suas vendas solares.
          </p>
        </div>

        {/* Formulário de Acesso */}
        <form onSubmit={handleLogin} className="mt-7 space-y-4 text-xs">
          {/* Campo de E-mail */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1.5 tracking-wide">
              E-mail ou Usuário
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.email@empresa.com.br"
                className="w-full h-11 rounded-xl bg-[#090D17]/80 border border-white/[0.08] focus:border-[#D4A017] pl-10 pr-4 text-white placeholder-slate-500 focus:outline-none transition-all shadow-inner"
              />
            </div>
          </div>

          {/* Campo de Senha */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-slate-300 font-semibold tracking-wide">
                Senha de Acesso
              </label>
              <button
                type="button"
                onClick={() => showToast('Para o modo demonstrativo, utilize a senha pré-configurada.')}
                className="text-[11px] text-[#E8A735] hover:underline"
              >
                Esqueceu a senha?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Sua senha secreta"
                className="w-full h-11 rounded-xl bg-[#090D17]/80 border border-white/[0.08] focus:border-[#D4A017] pl-10 pr-10 text-white placeholder-slate-500 focus:outline-none transition-all shadow-inner font-mono text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Lembrar-me */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none text-slate-400 hover:text-slate-200">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-3.5 h-3.5 rounded bg-[#090D17] border-white/20 text-[#D4A017] focus:ring-0 cursor-pointer"
              />
              <span className="text-[11px]">Lembrar deste dispositivo</span>
            </label>

            <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Servidor Ativo
            </span>
          </div>

          {/* Botão Principal de Login Dourado com Efeito Luminoso */}
          <div className="pt-2 space-y-2.5">
            <button
              type="submit"
              disabled={isLoading}
              style={{
                background: 'linear-gradient(180deg, #F3B33D 0%, #D49422 100%)',
              }}
              className="w-full h-11 rounded-xl text-slate-950 font-extrabold text-xs tracking-wider uppercase shadow-lg shadow-[#D4A017]/25 hover:brightness-105 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-75"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Autenticando...</span>
                </div>
              ) : (
                <>
                  <span>ACESSAR PLATAFORMA</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </>
              )}
            </button>

            {/* Botão de Acesso Rápido Demonstrativo */}
            <button
              type="button"
              onClick={handleQuickDemoAccess}
              className="w-full h-10 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-300 hover:text-white font-semibold text-xs transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E8A735]" />
              <span>Entrar com 1 Clique (Acesso Demo)</span>
            </button>
          </div>
        </form>

        {/* Rodapé de Segurança e Credenciais */}
        <div className="mt-7 pt-4 border-t border-white/[0.06] text-center space-y-1.5">
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-[#E8A735]" />
            <span>Ambiente Seguro • Criptografia de Ponta a Ponta</span>
          </div>
          <span className="text-[10px] text-slate-500 block">
            Padrão Tecnológico Veeluen Solutions • Versão 1.0.0
          </span>
        </div>
      </div>
    </div>
  );
};
