import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Settings, X, Upload, Cloud, Check } from 'lucide-react';

export const CustomizationModal = ({ isOpen, onClose }) => {
  const { settings, updateSettings } = useApp();

  const [companyName, setCompanyName] = useState(settings.systemName || 'Vellia Solar Private');
  const [primaryColor, setPrimaryColor] = useState(settings.primaryColor || '#D4A017');
  const [logoPreview, setLogoPreview] = useState(settings.customLogoUrl || '');

  if (!isOpen) return null;

  const handleApply = (e) => {
    e.preventDefault();
    updateSettings({
      systemName: companyName,
      companyName: companyName,
      primaryColor: primaryColor,
      customLogoUrl: logoPreview,
    });
    onClose();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Card Flutuante igualzinho ao mockup */}
      <div className="relative w-full max-w-[420px] rounded-2xl bg-[#111622] border border-white/10 shadow-2xl p-6 text-slate-100 z-10 animate-in zoom-in-95 duration-200">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <Settings className="w-5 h-5 text-slate-300" />
            <h3 className="text-sm font-semibold text-white tracking-wide">
              Personalize para o seu cliente
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Campos */}
        <form onSubmit={handleApply} className="mt-5 space-y-4 text-xs">
          {/* Logo da empresa */}
          <div className="space-y-1.5">
            <label className="text-slate-300 font-medium block">
              Logo da empresa
            </label>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-10 rounded-lg bg-[#0A0D14] border border-white/[0.08] flex items-center justify-center text-slate-400 overflow-hidden">
                {logoPreview ? (
                  <img src={logoPreview} alt="Logo" className="h-7 w-auto object-contain" />
                ) : (
                  <Cloud className="w-5 h-5 text-slate-500" />
                )}
              </div>
              <input
                type="file"
                id="custom-logo-input"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
              <label
                htmlFor="custom-logo-input"
                className="px-4 py-2 rounded-lg bg-[#182030] hover:bg-[#202B40] text-slate-200 font-medium cursor-pointer border border-white/[0.08] transition-colors h-10 flex items-center justify-center"
              >
                Alterar
              </label>
            </div>
          </div>

          {/* Nome da empresa */}
          <div className="space-y-1.5">
            <label className="text-slate-300 font-medium block">
              Nome da empresa
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Vellia Solar Private"
              className="w-full h-10 rounded-lg bg-[#0A0D14] border border-white/[0.08] px-3 text-white focus:outline-none focus:border-[#D4A017] transition-colors"
            />
          </div>

          {/* Cor principal */}
          <div className="space-y-1.5">
            <label className="text-slate-300 font-medium block">
              Cor principal
            </label>
            <div className="flex items-center gap-2.5 h-10 rounded-lg bg-[#0A0D14] border border-white/[0.08] px-3">
              <input
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="w-6 h-6 rounded-full cursor-pointer bg-transparent border-0 p-0"
              />
              <span
                style={{ backgroundColor: primaryColor }}
                className="w-5 h-5 rounded-full flex-shrink-0"
              />
              <input
                type="text"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="bg-transparent border-none text-slate-200 font-mono text-xs uppercase focus:outline-none w-full"
              />
            </div>
          </div>

          {/* Botão Dourado idêntico à referência */}
          <div className="pt-2">
            <button
              type="submit"
              style={{
                background: 'linear-gradient(180deg, #E5A93C 0%, #C88A32 100%)',
              }}
              className="w-full py-2.5 rounded-lg text-slate-950 font-bold text-xs tracking-wide shadow-md hover:brightness-105 active:scale-[0.99] transition-all"
            >
              Aplicar personalização
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
