import React from 'react';
import { 
  Trees, 
  Sun, 
  Moon, 
  Sunset, 
  Sunrise, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Network, 
  Activity, 
  Layers, 
  Sprout 
} from 'lucide-react';
import { audioEngine } from '../utils/audioSynth';

export default function Navbar({ 
  timeOfDay, 
  setTimeOfDay, 
  isAudioOn, 
  setIsAudioOn, 
  sporePoints, 
  onOpenMeshModal 
}) {

  const timeOptions = [
    { id: 'dawn', label: 'Dawn', icon: Sunrise, color: 'hover:text-amber-400 border-amber-500/20' },
    { id: 'day', label: 'Day', icon: Sun, color: 'hover:text-emerald-400 border-emerald-500/20' },
    { id: 'dusk', label: 'Dusk', icon: Sunset, color: 'hover:text-violet-400 border-violet-500/20' },
    { id: 'night', label: 'Night', icon: Moon, color: 'hover:text-cyan-400 border-cyan-500/20' }
  ];

  const handleAudioToggle = () => {
    const newState = audioEngine.toggle();
    setIsAudioOn(newState);
  };

  const handleTimeChange = (id) => {
    setTimeOfDay(id);
    audioEngine.playChime('time');
  };

  return (
    <header className="sticky top-0 z-50 px-4 sm:px-8 py-3 w-full">
      <nav className="max-w-7xl mx-auto glass-nav rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between shadow-2xl transition-all border border-white/10">
        
        {/* Brand Badge */}
        <div className="flex items-center gap-3">
          <div className="relative group flex items-center justify-center">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300 animate-pulse-glow" />
            <div className="relative bg-[#04120b] border border-emerald-500/30 text-emerald-400 p-2 rounded-xl flex items-center justify-center shadow-inner">
              <Trees className="w-5 h-5 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white font-sans">
                Sylva<span className="text-gradient-emerald">Verse</span>
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono tracking-wider bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 rounded-full font-semibold">
                BIOSPHERE v2.4
              </span>
            </div>
            <p className="text-[11px] text-emerald-400/70 font-mono hidden md:block">
              Virtual Ecosystem & Stratification Node
            </p>
          </div>
        </div>

        {/* Quick Nav Anchor Links */}
        <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
          <a href="#telemetry" className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span>Telemetry</span>
          </a>
          <a href="#canopy" className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>Canopy Explorer</span>
          </a>
          <a href="#nursery" className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors">
            <Sprout className="w-4 h-4 text-emerald-400" />
            <span>Tree Nursery</span>
          </a>
        </div>

        {/* Controls Engine: Time of Day, Audio, Spore Reserve */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Time of Day Switcher */}
          <div className="flex items-center bg-[#020b07]/80 p-1 rounded-xl border border-white/10 text-xs font-mono">
            {timeOptions.map((item) => {
              const Icon = item.icon;
              const isActive = timeOfDay === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTimeChange(item.id)}
                  title={`Switch to ${item.label} atmosphere`}
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg transition-all ${
                    isActive
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : ''}`} />
                  <span className="hidden sm:inline font-sans">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Spatial Audio Bio-Frequency Toggle */}
          <button
            onClick={handleAudioToggle}
            className={`p-2.5 rounded-xl border transition-all flex items-center gap-2 text-xs font-mono ${
              isAudioOn
                ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300 glow-cyan-sm'
                : 'bg-[#020b07]/80 border-white/10 text-slate-400 hover:text-slate-200'
            }`}
            title={isAudioOn ? 'Mute Bio-Harmonics' : 'Enable Spatial Bio-Frequency'}
          >
            {isAudioOn ? (
              <>
                <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span className="hidden xl:inline text-cyan-300">Bio Synth Active</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4" />
                <span className="hidden xl:inline text-slate-400">Audio Muted</span>
              </>
            )}
          </button>

          {/* Spore Reserve Badge */}
          <div className="flex items-center gap-2 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1.5 rounded-xl">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
            <div className="flex flex-col text-right">
              <span className="text-[10px] text-emerald-400/80 uppercase font-mono tracking-wider">Spore Points</span>
              <span className="text-xs font-mono font-bold text-emerald-300">{sporePoints} SP</span>
            </div>
          </div>

          {/* Mesh Network Modal Trigger */}
          <button
            onClick={onOpenMeshModal}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-mono hover:bg-violet-500/20 transition-all glow-violet-sm"
          >
            <Network className="w-3.5 h-3.5" />
            <span>Mycelial Mesh</span>
          </button>

        </div>

      </nav>
    </header>
  );
}
