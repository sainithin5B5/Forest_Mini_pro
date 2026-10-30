import React, { useState } from 'react';
import { 
  X, 
  Home, 
  Thermometer, 
  Sun, 
  Droplets, 
  Wind, 
  Zap, 
  Sliders, 
  Users, 
  CheckCircle2, 
  Sparkles, 
  Power, 
  ShieldCheck 
} from 'lucide-react';
import { audioEngine } from '../utils/audioSynth';

export default function ExploreHabitatModal({ isOpen, onClose }) {
  const [selectedHabitatId, setSelectedHabitatId] = useState('habitat-07');
  const [roomTemp, setRoomTemp] = useState(24);
  const [skylightTint, setSkylightTint] = useState('Clear 100%');
  const [isPurifierActive, setIsPurifierActive] = useState(true);
  const [isSolarBypass, setIsSolarBypass] = useState(false);

  const habitatsData = {
    'habitat-01': {
      name: 'Habitat 01 — Alpha Treehouse',
      zone: 'North Grove Sector',
      height: '35 Meters',
      residents: ['Devin Vance', 'Sarah Jenkins'],
      image: '/forest_habitation_hero.png',
      solarKw: '1.45 kW',
      battery: '92%',
      waterL: '110 L',
      aqi: 'AQI 38 (Pure)',
    },
    'habitat-07': {
      name: 'Habitat 07 — Canopy Master Suite',
      zone: 'Residential Zone 01',
      height: '42 Meters',
      residents: ['Aarav Sharma (Eco Resident)', 'Maya Patel', 'Liam Vance', 'Zoe Lin'],
      image: '/habitat_interior_master.png',
      solarKw: '1.24 kW',
      battery: '87%',
      waterL: '80 L',
      aqi: 'AQI 42 (Excellent)',
    },
    'habitat-12': {
      name: 'Habitat 12 — Crown Baobab Villa',
      zone: 'Upper Canopy Roof',
      height: '50 Meters',
      residents: ['Elena Rostova', 'Kenji Sato', 'Amara Okafor'],
      image: '/habitat_interior_master.png',
      solarKw: '1.80 kW',
      battery: '95%',
      waterL: '140 L',
      aqi: 'AQI 35 (Optimal)',
    },
  };

  const activeHabitat = habitatsData[selectedHabitatId] || habitatsData['habitat-07'];

  const handleTempChange = (delta) => {
    const newTemp = Math.min(28, Math.max(18, roomTemp + delta));
    setRoomTemp(newTemp);
    audioEngine.playChime('strata');
  };

  const handleTintToggle = () => {
    const tints = ['Clear 100%', 'Warm Filter 50%', 'Electrochromic Night Shield'];
    const next = tints[(tints.indexOf(skylightTint) + 1) % tints.length];
    setSkylightTint(next);
    audioEngine.playChime('time');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="hud-panel hud-corner max-w-4xl w-full rounded-3xl p-6 sm:p-8 relative border border-emerald-400 shadow-[0_0_50px_rgba(16,185,129,0.35)] flex flex-col justify-between max-h-[90vh] overflow-y-auto font-sans text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={() => {
            audioEngine.playChime('strata');
            onClose();
          }}
          className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-emerald-400 transition-all z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-500/30 pb-5">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 glow-emerald-sm">
              <Home className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                  Explore Treehouse Habitat
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold border border-emerald-500/40">
                  3D CONTROL CENTER
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Interactive Residence Control System &amp; Environmental Telemetry
              </p>
            </div>
          </div>

          {/* Habitat Selector Dropdown */}
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-slate-400 text-[11px] uppercase">Select Unit:</span>
            <select
              value={selectedHabitatId}
              onChange={(e) => {
                setSelectedHabitatId(e.target.value);
                audioEngine.playChime('strata');
              }}
              className="bg-[#030e09] border border-emerald-500/40 text-emerald-300 font-bold px-3 py-1.5 rounded-xl focus:outline-none focus:border-emerald-400"
            >
              <option value="habitat-01">Habitat 01 — Alpha Treehouse</option>
              <option value="habitat-07">Habitat 07 — Canopy Suite</option>
              <option value="habitat-12">Habitat 12 — Crown Villa</option>
            </select>
          </div>
        </div>

        {/* Main Content Grid: 3D Render (Left) & Controls/Roster (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-6">
          
          {/* Left 3D View Render Showcase (7 Cols) */}
          <div className="lg:col-span-7 glass-card p-4 rounded-2xl border border-emerald-500/40 relative overflow-hidden flex flex-col justify-between min-h-[340px]">
            
            <img 
              src={activeHabitat.image} 
              alt={activeHabitat.name}
              className="absolute inset-0 w-full h-full object-cover rounded-2xl opacity-90"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

            {/* Top Badge */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold">
                {activeHabitat.zone}
              </span>
              <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold">
                Elevation: {activeHabitat.height}
              </span>
            </div>

            {/* Bottom Floating Telemetry Overlay */}
            <div className="relative z-10 grid grid-cols-4 gap-2 font-mono text-center text-xs bg-black/80 backdrop-blur-md p-3 rounded-xl border border-white/10 mt-auto">
              <div>
                <span className="text-[10px] text-slate-400 block">SOLAR POWER</span>
                <span className="font-extrabold text-amber-400">{activeHabitat.solarKw}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">BATTERY</span>
                <span className="font-extrabold text-emerald-400">{activeHabitat.battery}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">WATER STORED</span>
                <span className="font-extrabold text-cyan-300">{activeHabitat.waterL}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">AIR QUALITY</span>
                <span className="font-extrabold text-emerald-300">{activeHabitat.aqi.split(' ')[0]}</span>
              </div>
            </div>

          </div>

          {/* Right Interactive Controls & Resident Roster (5 Cols) */}
          <div className="lg:col-span-5 space-y-4 font-mono text-xs">
            
            {/* Environmental Controls Card */}
            <div className="hud-card p-4 rounded-2xl border border-emerald-500/40 space-y-3">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-emerald-400" /> Room Controls
                </span>
                <span className="text-[10px] text-emerald-500">LIVE SYNCED</span>
              </h4>

              {/* Temperature Adjuster */}
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/80 border border-white/10">
                <span className="text-slate-300 flex items-center gap-1">
                  <Thermometer className="w-3.5 h-3.5 text-amber-400" /> Climate Temp:
                </span>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleTempChange(-1)} className="w-6 h-6 rounded bg-slate-800 text-white font-bold hover:bg-emerald-500 hover:text-slate-950 transition-colors">-</button>
                  <span className="font-extrabold text-white text-sm">{roomTemp}°C</span>
                  <button onClick={() => handleTempChange(1)} className="w-6 h-6 rounded bg-slate-800 text-white font-bold hover:bg-emerald-500 hover:text-slate-950 transition-colors">+</button>
                </div>
              </div>

              {/* Skylight Glass Tint Switch */}
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/80 border border-white/10">
                <span className="text-slate-300 flex items-center gap-1">
                  <Sun className="w-3.5 h-3.5 text-amber-400" /> Skylight Tint:
                </span>
                <button
                  onClick={handleTintToggle}
                  className="px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold hover:bg-amber-500/20 transition-all text-[11px]"
                >
                  {skylightTint}
                </button>
              </div>

              {/* Air Purifier Toggle */}
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/80 border border-white/10">
                <span className="text-slate-300 flex items-center gap-1">
                  <Wind className="w-3.5 h-3.5 text-emerald-400" /> Hydro-Purifier:
                </span>
                <button
                  onClick={() => {
                    setIsPurifierActive(!isPurifierActive);
                    audioEngine.playChime('nourish');
                  }}
                  className={`px-2.5 py-1 rounded text-[11px] font-bold border transition-all ${
                    isPurifierActive
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-slate-800 text-slate-400 border-white/10'
                  }`}
                >
                  {isPurifierActive ? 'ACTIVE' : 'STANDBY'}
                </button>
              </div>

              {/* Solar Battery Switch */}
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/80 border border-white/10">
                <span className="text-slate-300 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-cyan-400" /> Battery Grid:
                </span>
                <button
                  onClick={() => {
                    setIsSolarBypass(!isSolarBypass);
                    audioEngine.playChime('time');
                  }}
                  className={`px-2.5 py-1 rounded text-[11px] font-bold border transition-all ${
                    isSolarBypass
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                      : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  }`}
                >
                  {isSolarBypass ? 'BYPASS MODE' : 'SOLAR AUTO'}
                </button>
              </div>

            </div>

            {/* Resident Roster Card */}
            <div className="hud-card p-4 rounded-2xl border border-emerald-500/40 space-y-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-cyan-400" /> Occupant Roster ({activeHabitat.residents.length})
                </span>
              </h4>

              <div className="space-y-1.5 pt-1 text-slate-200">
                {activeHabitat.residents.map((resident, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-1.5 rounded-lg bg-white/5 text-xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>{resident}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Modal Footer */}
        <div className="flex justify-between items-center pt-3 border-t border-emerald-500/30 font-mono text-xs">
          <span className="text-emerald-400 flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Habitat Diagnostics: 100% NOMINAL</span>
          </span>

          <button
            onClick={() => {
              audioEngine.playChime('nourish');
              onClose();
            }}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold hover:scale-105 transition-all shadow-lg"
          >
            ✓ CLOSE HABITATION CONTROL
          </button>
        </div>

      </div>
    </div>
  );
}
