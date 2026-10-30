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
  HelpCircle 
} from 'lucide-react';
import { audioEngine } from '../utils/audioSynth';
import { featureDescriptions } from '../utils/featureDescriptions';

export default function HudHeader({ 
  timeOfDay, 
  setTimeOfDay, 
  isAudioOn, 
  setIsAudioOn, 
  sporePoints, 
  onOpenMeshModal,
  onExplainFeature 
}) {

  const timeOptions = [
    { id: 'dawn', label: 'Dawn', icon: Sunrise },
    { id: 'day', label: 'Day', icon: Sun },
    { id: 'dusk', label: 'Dusk', icon: Sunset },
    { id: 'night', label: 'Night', icon: Moon }
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
    <header className="w-full mb-4">
      <div className="hud-panel hud-corner rounded-2xl p-3 sm:p-4 flex flex-wrap items-center justify-between gap-4 border border-emerald-500/40 shadow-2xl">
        
        {/* Left: Brand Title */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 glow-emerald-sm">
            <Trees className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="font-extrabold text-sm sm:text-lg tracking-wider text-white uppercase font-sans flex items-center gap-2">
              <span>DIGITAL FOREST HABITATION</span>
              <span className="text-emerald-400 font-bold">•</span>
              <span className="text-emerald-300 font-semibold">SMART FOREST MONITORING</span>
            </h1>
            <p className="text-[11px] font-mono text-emerald-400/80 tracking-widest uppercase">
              Autonomous Cyber-Organic Ecosystem Command Center
            </p>
          </div>
        </div>

        {/* Center: System Status Pill */}
        <div className="hidden lg:flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#03150c] border border-emerald-500/40 text-xs font-mono text-emerald-300 glow-emerald-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="font-bold tracking-wider">SYSTEM: ONLINE</span>
          <span className="text-emerald-500/50">•</span>
          <span className="text-emerald-400">LIVE DATA</span>
        </div>

        {/* Right Controls Engine */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          
          {/* Feature Guide Button */}
          <button
            onClick={() => onExplainFeature(featureDescriptions.spore_points)}
            className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold flex items-center gap-1.5 hover:bg-emerald-500/20 transition-all glow-emerald-sm"
            title="Click for Beginner Explainer Manual"
          >
            <HelpCircle className="w-4 h-4 text-emerald-400" />
            <span>❓ Feature Guide</span>
          </button>

          {/* CSE Mini Project Version Badge */}
          <div className="hidden sm:block px-3 py-1.5 rounded-xl bg-[#0d1612] border border-emerald-500/30 text-[11px] font-mono text-emerald-300 font-bold tracking-wider">
            CSE MINI PROJECT • V1.2.4
          </div>

          {/* Time of Day Switcher */}
          <div className="flex items-center bg-[#030e09] p-1 rounded-xl border border-emerald-500/30 text-xs font-mono">
            {timeOptions.map((item) => {
              const Icon = item.icon;
              const isActive = timeOfDay === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTimeChange(item.id)}
                  title={`Switch to ${item.label} mode`}
                  className={`flex items-center gap-1 px-2 py-1 rounded-lg transition-all ${
                    isActive
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden xl:inline">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Audio Bio-Synth Toggle */}
          <button
            onClick={handleAudioToggle}
            className={`p-2 rounded-xl border text-xs font-mono flex items-center gap-1.5 transition-all ${
              isAudioOn
                ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300 glow-cyan-sm'
                : 'bg-[#030e09] border-emerald-500/30 text-slate-400'
            }`}
            title="Toggle Spatial Audio Bio Synth"
          >
            {isAudioOn ? <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Spore Balance */}
          <div 
            onClick={() => onExplainFeature(featureDescriptions.spore_points)}
            className="flex items-center gap-1.5 bg-[#0e1b14] border border-emerald-500/40 px-3 py-1 rounded-xl text-xs font-mono cursor-pointer hover:border-emerald-400 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-bold text-emerald-300">{sporePoints} SP</span>
          </div>

          {/* Mycelial Network Trigger */}
          <button
            onClick={onOpenMeshModal}
            className="p-2 rounded-xl bg-violet-500/10 border border-violet-500/30 text-violet-300 hover:bg-violet-500/20 transition-all glow-violet-sm"
            title="Mycelial Signal Mesh Diagnostics"
          >
            <Network className="w-4 h-4" />
          </button>

        </div>

      </div>
    </header>
  );
}
