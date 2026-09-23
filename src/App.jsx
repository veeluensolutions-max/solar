import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { MobileNav } from './components/layout/MobileNav';
import { MobileBottomBar } from './components/layout/MobileBottomBar';
import { Toast } from './components/common/Toast';

import { LoginScreen } from './components/modules/Auth/LoginScreen';

import { Dashboard } from './components/modules/Dashboard/Dashboard';
import { Leads } from './components/modules/Leads/Leads';
import { Oportunidades } from './components/modules/Oportunidades/Oportunidades';
import { Clientes } from './components/modules/Clientes/Clientes';
import { Propostas } from './components/modules/Propostas/Propostas';
import { Agenda } from './components/modules/Agenda/Agenda';
import { Relatorios } from './components/modules/Relatorios/Relatorios';
import { Configuracoes } from './components/modules/Configuracoes/Configuracoes';

import { NewLeadModal } from './components/modules/Leads/NewLeadModal';

const MainContent = () => {
  const { isAuthenticated, login, activeTab, isNewLeadModalOpen, setIsNewLeadModalOpen } = useApp();

  // Se não estiver autenticado, exibe a tela de login moderna com glassmorphism
  if (!isAuthenticated) {
    return (
      <>
        <LoginScreen onLoginSuccess={login} />
        <Toast />
      </>
    );
  }

  const renderModule = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'leads':
        return <Leads />;
      case 'oportunidades':
        return <Oportunidades />;
      case 'clientes':
        return <Clientes />;
      case 'propostas':
        return <Propostas />;
      case 'agenda':
        return <Agenda />;
      case 'relatorios':
        return <Relatorios />;
      case 'configuracoes':
        return <Configuracoes />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#07090E] text-slate-100">
      {/* Sidebar Desktop */}
      <Sidebar />

      {/* Menu Drawer Mobile */}
      <MobileNav />

      {/* Área Central / Conteúdo Principal */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto animate-in fade-in duration-150">
          {renderModule()}
        </main>
      </div>

      {/* Barra de Navegação Inferior Mobile idêntica à referência do smartphone */}
      <MobileBottomBar />

      {/* Modal Global de Novo Lead */}
      <NewLeadModal
        isOpen={isNewLeadModalOpen}
        onClose={() => setIsNewLeadModalOpen(false)}
      />

      {/* Notificação Toast */}
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
