import React, { useState } from 'react';
import { 
  Trees, 
  LayoutDashboard, 
  Map, 
  Activity, 
  Zap, 
  Droplets, 
  Users, 
  Bot, 
  Settings, 
  HelpCircle,
  Menu,
  X
} from 'lucide-react';
import { audioEngine } from '../utils/audioSynth';

export default function SidebarNav({ activeTab, setActiveTab, onOpenHelp, onOpenAi, onOpenSettings, onOpenUserProfile }) {
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'habitat-map', label: 'Habitat Map', icon: Map },
    { id: 'environment', label: 'Environment', icon: Activity },
    { id: 'energy', label: 'Energy', icon: Zap, isEnergy: true },
    { id: 'water', label: 'Water', icon: Droplets, isWater: true },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'ai-assistant', label: 'AI Assistant', icon: Bot, isAi: true },
    { id: 'settings', label: 'Settings', icon: Settings, isSettings: true },
  ];

  const handleNavClick = (item) => {
    if (item.isAi) {
      audioEngine.playChime('nourish');
      onOpenAi && onOpenAi();
      setIsOpenMobile(false);
      return;
    }
    if (item.isSettings) {
      audioEngine.playChime('nourish');
      onOpenSettings && onOpenSettings();
      setIsOpenMobile(false);
      return;
    }

    setActiveTab(item.id);
    audioEngine.playChime('strata');
    setIsOpenMobile(false);
    
    // Smooth scroll to section
    const targetEl = document.getElementById(item.id);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpenMobile(!isOpenMobile)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 rounded-2xl bg-[#081a12]/90 border border-emerald-500/40 text-emerald-400 backdrop-blur-md shadow-2xl"
      >
        {isOpenMobile ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Floating Sidebar Navigation */}
      <aside className={`fixed top-4 left-4 bottom-4 w-64 z-40 glass-panel rounded-3xl p-5 border border-emerald-500/30 flex flex-col justify-between transition-all duration-300 ${
        isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        
        {/* Top Brand Logo */}
        <div className="space-y-6">
          <div 
            onClick={() => handleNavClick({ id: 'dashboard' })}
            className="flex items-center gap-3 px-2 cursor-pointer hover:opacity-90 transition-opacity"
          >
            <div className="p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 glow-emerald-sm">
              <Trees className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h1 className="font-extrabold text-sm text-white tracking-wide font-sans">
                Digital Forest
              </h1>
              <p className="text-[11px] font-mono text-emerald-400">Habitation v2.4</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-medium text-xs sm:text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold shadow-lg glow-emerald-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Profile Badge & Help Manual */}
        <div className="space-y-3 pt-4 border-t border-emerald-500/20">
          
          <button
            onClick={onOpenHelp}
            className="w-full py-2.5 px-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold flex items-center justify-center gap-2 hover:bg-emerald-500/20 transition-all"
          >
            <HelpCircle className="w-4 h-4 text-emerald-400" />
            <span>❓ Feature Guide</span>
          </button>

          <div 
            onClick={() => {
              audioEngine.playChime('nourish');
              onOpenUserProfile && onOpenUserProfile();
            }}
            className="p-3 rounded-2xl bg-[#04120b] border border-emerald-500/30 flex items-center gap-3 cursor-pointer hover:border-emerald-400 transition-all"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300 font-bold text-xs">
              AS
            </div>
            <div className="overflow-hidden">
              <p className="font-bold text-xs text-white truncate">Aarav Sharma</p>
              <p className="text-[10px] font-mono text-emerald-400 truncate">Eco Resident</p>
            </div>
          </div>

        </div>

      </aside>
    </>
  );
}
