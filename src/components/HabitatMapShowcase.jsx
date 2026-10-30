import React, { useState } from 'react';
import { MapPin, ChevronRight, Layers } from 'lucide-react';
import { audioEngine } from '../utils/audioSynth';

export default function HabitatMapShowcase({ onExplainFeature, onOpenZoneDetails }) {
  const [activeZoneTab, setActiveZoneTab] = useState('all');

  const zoneTabs = [
    { id: 'all', label: 'All Zones' },
    { id: 'residential', label: 'Residential' },
    { id: 'agriculture', label: 'Agriculture' },
    { id: 'conservation', label: 'Conservation' },
    { id: 'utilities', label: 'Utilities' },
  ];

  const zoneDetails = {
    title: 'Residential Zone',
    desc: 'Sustainable glass-domed treehouse homes blended with high canopy nature for peaceful eco-living.',
    habitats: 12,
    population: 48,
    renewableEnergy: '85%',
  };

  const handleTabClick = (id) => {
    setActiveZoneTab(id);
    audioEngine.playChime('strata');
  };

  return (
    <section 
      id="habitat-map" 
      data-scroll-reveal 
      className="reveal-init glass-panel rounded-3xl p-5 sm:p-6 border border-emerald-500/30 shadow-2xl relative flex flex-col justify-between h-full space-y-4 max-w-full overflow-hidden"
    >
      
      {/* Header Bar */}
      <div className="flex flex-col gap-3 border-b border-emerald-500/20 pb-4">
        <div>
          <h2 className="font-extrabold text-xl text-white font-sans flex items-center gap-2">
            <span>Habitat Map</span>
          </h2>
        </div>

        {/* Zone Filter Tabs - Wrapped & Responsive so Utilities NEVER cuts off */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#030e09] p-1.5 rounded-2xl border border-emerald-500/30 text-xs font-mono w-full">
          {zoneTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`px-2.5 py-1.5 rounded-xl transition-all text-xs font-bold ${
                activeZoneTab === tab.id
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Map Canvas Area */}
      <div className="relative rounded-2xl overflow-hidden border border-emerald-500/30 bg-[#040e09] min-h-[240px] sm:min-h-[280px] flex items-center justify-center group w-full">
        
        {/* Background Render */}
        <img 
          src="/holographic_forest_map.png" 
          alt="Habitat Map Aerial View"
          className="w-full h-full object-cover rounded-2xl opacity-85 group-hover:opacity-95 transition-opacity"
        />

        {/* Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.06)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />

        {/* Interactive Zone Markers */}
        
        {/* Residential Zone Badge */}
        {(activeZoneTab === 'all' || activeZoneTab === 'residential') && (
          <div 
            onClick={() => {
              audioEngine.playChime('nourish');
              onOpenZoneDetails && onOpenZoneDetails();
            }}
            className="absolute top-[20%] right-[25%] z-20 animate-bounce flex items-center gap-2 bg-[#051a10]/95 border border-emerald-400 p-2 rounded-xl text-xs font-mono text-emerald-300 shadow-2xl glow-emerald-sm cursor-pointer hover:scale-110 transition-transform max-w-[140px] sm:max-w-none"
          >
            <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
            <div className="overflow-hidden">
              <p className="font-bold text-white truncate">Residential Zone</p>
              <p className="text-[10px] text-emerald-400">12 Habitats</p>
            </div>
          </div>
        )}

        {/* Agriculture Zone Badge */}
        {(activeZoneTab === 'all' || activeZoneTab === 'agriculture') && (
          <div 
            onClick={() => {
              audioEngine.playChime('nourish');
              onOpenZoneDetails && onOpenZoneDetails();
            }}
            className="absolute top-[38%] right-[8%] z-20 flex items-center gap-2 bg-[#051a10]/95 border border-amber-400 p-2 rounded-xl text-xs font-mono text-amber-300 shadow-2xl cursor-pointer hover:scale-110 transition-transform max-w-[140px] sm:max-w-none"
          >
            <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
            <div className="overflow-hidden">
              <p className="font-bold text-white truncate">Agriculture Zone</p>
              <p className="text-[10px] text-amber-400">3 Habitats</p>
            </div>
          </div>
        )}

        {/* Conservation Zone Badge */}
        {(activeZoneTab === 'all' || activeZoneTab === 'conservation') && (
          <div 
            onClick={() => {
              audioEngine.playChime('nourish');
              onOpenZoneDetails && onOpenZoneDetails();
            }}
            className="absolute bottom-[20%] left-[8%] z-20 flex items-center gap-2 bg-[#051a10]/95 border border-cyan-400 p-2 rounded-xl text-xs font-mono text-cyan-300 shadow-2xl cursor-pointer hover:scale-110 transition-transform max-w-[140px] sm:max-w-none"
          >
            <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
            <div className="overflow-hidden">
              <p className="font-bold text-white truncate">Conservation Zone</p>
              <p className="text-[10px] text-cyan-400">6 Habitats</p>
            </div>
          </div>
        )}

        {/* Utilities Zone Badge - Repositioned cleanly inside map view */}
        {(activeZoneTab === 'all' || activeZoneTab === 'utilities') && (
          <div 
            onClick={() => {
              audioEngine.playChime('nourish');
              onOpenZoneDetails && onOpenZoneDetails();
            }}
            className="absolute bottom-[18%] right-[8%] sm:right-[15%] z-20 flex items-center gap-2 bg-[#051a10]/95 border border-violet-400 p-2 rounded-xl text-xs font-mono text-violet-300 shadow-2xl cursor-pointer hover:scale-110 transition-transform max-w-[140px] sm:max-w-none"
          >
            <MapPin className="w-4 h-4 text-violet-400 shrink-0" />
            <div className="overflow-hidden">
              <p className="font-bold text-white truncate">Utilities Zone</p>
              <p className="text-[10px] text-violet-400">5 Habitats</p>
            </div>
          </div>
        )}

      </div>

      {/* Sector Details Card */}
      <div className="glass-card p-4 rounded-2xl border border-emerald-500/40 space-y-3 font-sans relative z-10 bg-[#04150d]/90 w-full">
        
        <div className="flex items-center justify-between font-mono text-xs border-b border-emerald-500/20 pb-2">
          <span className="text-[10px] text-emerald-400 uppercase font-bold tracking-wider">ACTIVE SECTOR</span>
          <span className="text-emerald-300 font-bold">{zoneDetails.renewableEnergy} Renewable</span>
        </div>

        <div>
          <h3 className="text-base font-extrabold text-white">{zoneDetails.title}</h3>
          <p className="text-xs text-slate-300 leading-relaxed mt-1">{zoneDetails.desc}</p>
        </div>

        {/* Metrics Bar */}
        <div className="grid grid-cols-2 gap-3 font-mono text-xs pt-1">
          <div className="bg-[#030d08] p-2.5 rounded-xl border border-white/10 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">Habitats</span>
            <span className="text-sm font-extrabold text-white">{zoneDetails.habitats}</span>
          </div>
          <div className="bg-[#030d08] p-2.5 rounded-xl border border-white/10 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">Population</span>
            <span className="text-sm font-extrabold text-emerald-300">{zoneDetails.population}</span>
          </div>
        </div>

        {/* View Zone Details CTA Button */}
        <button 
          onClick={() => {
            audioEngine.playChime('nourish');
            onOpenZoneDetails && onOpenZoneDetails();
          }}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-extrabold text-xs hover:scale-[1.02] transition-all flex items-center justify-center gap-1.5 shadow-lg glow-emerald-sm font-mono mt-2"
        >
          <Layers className="w-4 h-4" />
          <span>View Zone Details</span>
          <ChevronRight className="w-4 h-4" />
        </button>

      </div>

    </section>
  );
}
