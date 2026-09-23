import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialMetrics,
  initialOpportunities,
  initialLeads,
  initialClients,
  initialProposals,
  initialSchedule,
  reportStats
} from '../data/mockData';

const AppContext = createContext();

const DEFAULT_SETTINGS = {
  systemName: 'Vellia Solar Private',
  companyName: 'Veeluen Solutions',
  primaryColor: '#C88A32', // Dourado solar
  secondaryColor: '#B87333', // Cobre
  customLogoUrl: '',
};

export const AppProvider = ({ children }) => {
  // Autenticação e tela de login moderna
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedAuth = localStorage.getItem('vellia_solar_auth');
    return savedAuth ? savedAuth === 'true' : false; // Inicia na tela de login bonita
  });

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('vellia_solar_auth', 'true');
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem('vellia_solar_auth', 'false');
  };

  // Tela ativa
  const [activeTab, setActiveTab] = useState('dashboard');

  // Controle de Sidebar mobile e expansão
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Controle de Modais globais
  const [isNewLeadModalOpen, setIsNewLeadModalOpen] = useState(false);
  const [isNewProposalModalOpen, setIsNewProposalModalOpen] = useState(false);
  const [isNewScheduleModalOpen, setIsNewScheduleModalOpen] = useState(false);

  // Estado das Configurações / White-Label
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('vellia_solar_settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  // Leads
  const [leads, setLeads] = useState(() => {
    const saved = localStorage.getItem('vellia_solar_leads');
    return saved ? JSON.parse(saved) : initialLeads;
  });

  // Oportunidades Kanban
  const [opportunities, setOpportunities] = useState(() => {
    const saved = localStorage.getItem('vellia_solar_opportunities');
    return saved ? JSON.parse(saved) : initialOpportunities;
  });

  // Propostas
  const [proposals, setProposals] = useState(() => {
    const saved = localStorage.getItem('vellia_solar_proposals');
    return saved ? JSON.parse(saved) : initialProposals;
  });

  // Clientes
  const [clients, setClients] = useState(() => {
    const saved = localStorage.getItem('vellia_solar_clients');
    return saved ? JSON.parse(saved) : initialClients;
  });

  // Agenda
  const [schedule, setSchedule] = useState(() => {
    const saved = localStorage.getItem('vellia_solar_schedule');
    return saved ? JSON.parse(saved) : initialSchedule;
  });

  // Notificação toast simples
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Atualizar variáveis CSS dinâmicas de acordo com as cores escolhidas
  useEffect(() => {
    document.documentElement.style.setProperty('--color-primary', settings.primaryColor);
    document.documentElement.style.setProperty('--color-primary-hover', adjustBrightness(settings.primaryColor, -15));
    document.documentElement.style.setProperty('--color-primary-light', hexToRgba(settings.primaryColor, 0.16));
    document.documentElement.style.setProperty('--color-secondary', settings.secondaryColor);
    localStorage.setItem('vellia_solar_settings', JSON.stringify(settings));
  }, [settings]);

  // Persistir coleções no localStorage
  useEffect(() => {
    localStorage.setItem('vellia_solar_leads', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem('vellia_solar_opportunities', JSON.stringify(opportunities));
  }, [opportunities]);

  useEffect(() => {
    localStorage.setItem('vellia_solar_proposals', JSON.stringify(proposals));
  }, [proposals]);

  useEffect(() => {
    localStorage.setItem('vellia_solar_clients', JSON.stringify(clients));
  }, [clients]);

  useEffect(() => {
    localStorage.setItem('vellia_solar_schedule', JSON.stringify(schedule));
  }, [schedule]);

  // Funções de manipulação
  const addLead = (newLeadData) => {
    const newId = `lead-${Date.now()}`;
    const newLead = {
      id: newId,
      ...newLeadData,
      date: 'Hoje',
      createdAt: new Date().toISOString(),
    };
    setLeads(prev => [newLead, ...prev]);

    // Também cria automaticamente uma oportunidade no Kanban como 'novo_lead'
    const newOpp = {
      id: `opp-${Date.now()}`,
      client: newLead.name,
      type: newLead.clientType,
      power: calculateEstimatedPower(newLead.monthlyBill),
      value: calculateEstimatedValue(newLead.monthlyBill),
      responsible: newLead.responsible || 'Lucas Mendes',
      timeInStage: 'Recém criado',
      stage: 'novo_lead',
      lastContact: 'Hoje',
      priority: 'Alta',
      notes: newLead.notes || 'Lead cadastrado via sistema.',
    };
    setOpportunities(prev => [newOpp, ...prev]);

    showToast(`Lead "${newLead.name}" cadastrado com sucesso!`);
  };

  const updateLeadStatus = (leadId, newStatus) => {
    setLeads(prev =>
      prev.map(l => (l.id === leadId ? { ...l, status: newStatus } : l))
    );
    showToast('Status do lead atualizado.');
  };

  const moveOpportunity = (oppId, newStage) => {
    setOpportunities(prev =>
      prev.map(opp =>
        opp.id === oppId
          ? { ...opp, stage: newStage, timeInStage: 'Agora' }
          : opp
      )
    );
    showToast('Oportunidade movida no pipeline com sucesso.');
  };

  const addProposal = (newPropData) => {
    const newProp = {
      id: `prop-${Date.now()}`,
      ...newPropData,
      date: 'Hoje',
      validity: '15 dias',
    };
    setProposals(prev => [newProp, ...prev]);
    showToast(`Proposta para "${newProp.client}" registrada.`);
  };

  const addScheduleItem = (newScheduleData) => {
    const item = {
      id: `sch-${Date.now()}`,
      ...newScheduleData,
      status: 'Pendente',
    };
    setSchedule(prev => [...prev, item]);
    showToast('Compromisso adicionado à agenda.');
  };

  const toggleScheduleStatus = (itemId) => {
    setSchedule(prev =>
      prev.map(item => {
        if (item.id === itemId) {
          const nextStatus = item.status === 'Concluído' ? 'Pendente' : 'Concluído';
          showToast(nextStatus === 'Concluído' ? 'Compromisso concluído com sucesso!' : 'Compromisso reaberto como pendente.');
          return { ...item, status: nextStatus };
        }
        return item;
      })
    );
  };

  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    showToast('Identidade visual e preferências atualizadas!');
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
    showToast('Configurações redefinidas para o padrão original.');
  };

  // Helper estimador para solar
  function calculateEstimatedPower(monthlyBill) {
    const bill = parseFloat(monthlyBill) || 800;
    // R$ 800 de conta ~ 800kWh ~ 7kWp
    const kwp = Math.max(2.5, (bill / 110)).toFixed(1);
    return `${kwp.replace('.', ',')} kWp`;
  }

  function calculateEstimatedValue(monthlyBill) {
    const bill = parseFloat(monthlyBill) || 800;
    // R$ 800 de conta ~ sistema de ~R$ 30.000
    const kwp = Math.max(2.5, bill / 110);
    return Math.round(kwp * 3900);
  }

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        activeTab,
        setActiveTab,
        sidebarCollapsed,
        setSidebarCollapsed,
        mobileMenuOpen,
        setMobileMenuOpen,
        isNewLeadModalOpen,
        setIsNewLeadModalOpen,
        isNewProposalModalOpen,
        setIsNewProposalModalOpen,
        isNewScheduleModalOpen,
        setIsNewScheduleModalOpen,
        settings,
        updateSettings,
        resetSettings,
        leads,
        addLead,
        updateLeadStatus,
        opportunities,
        moveOpportunity,
        proposals,
        addProposal,
        clients,
        schedule,
        addScheduleItem,
        toggleScheduleStatus,
        metrics: initialMetrics,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);

// Utilitários auxiliares de cor
function hexToRgba(hex, alpha = 1) {
  if (!hex || !hex.startsWith('#')) return `rgba(200, 138, 50, ${alpha})`;
  let c = hex.substring(1);
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  const num = parseInt(c, 16);
  return `rgba(${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}, ${alpha})`;
}

function adjustBrightness(hex, percent) {
  if (!hex || !hex.startsWith('#')) return hex;
  let num = parseInt(hex.replace('#', ''), 16);
  let amt = Math.round(2.55 * percent);
  let R = (num >> 16) + amt;
  let G = (num >> 8 & 0x00FF) + amt;
  let B = (num & 0x0000FF) + amt;
  return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}
