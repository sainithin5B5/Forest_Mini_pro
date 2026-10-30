import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Trees, 
  Zap, 
  Droplets, 
  Users, 
  CheckCircle2, 
  Activity, 
  Layers, 
  ShieldCheck 
} from 'lucide-react';
import { audioEngine } from '../utils/audioSynth';

export default function ZoneDetailsModal({ isOpen, onClose }) {
  const [activeZoneTab, setActiveZoneTab] = useState('residential');

  const zones = {
    residential: {
      name: 'Residential Zone 01',
      desc: 'Sustainable glass-domed treehouses nestled high in the forest canopy for eco-living.',
      habitats: 12,
      population: 48,
      renewableEnergy: '85% Solar',
      co2Capture: '2.3t / month',
      waterCapacity: '500L Reservoir',
      sensors: ['S-12 Treehouse Alpha', 'S-07 Canopy Cam', 'S-04 Temperature Probe'],
      projects: ['Treehouse Skybridge Expansion', 'Smart Solar Roof Upgrades'],
    },
    agriculture: {
      name: 'Agriculture Zone',
      desc: 'Vertical aeroponic greenhouse domes cultivating organic berries, vegetables, and medicinal plants.',
      habitats: 3,
      population: 12,
      renewableEnergy: '90% Solar + Hydro',
      co2Capture: '1.8t / month',
      waterCapacity: '800L Reservoir',
      sensors: ['S-15 Nutrient Probe', 'S-22 Soil Moisture Sensor'],
      projects: ['Aeroponic Vertical Tower Expansion', 'Beekeeping Bio-Shield'],
    },
    conservation: {
      name: 'Conservation Zone',
      desc: 'Strictly protected old-growth forest sanctuary dedicated to wildlife tracking and biodiversity protection.',
      habitats: 6,
      population: 8,
      renewableEnergy: '100% Solar Off-Grid',
      co2Capture: '4.5t / month',
      waterCapacity: '1,200L Stream Catchment',
      sensors: ['S-07 Wildlife Cam', 'S-[09] Bio-Acoustic Microphone'],
      projects: ['Red Fox Habitat Protection', 'Old-Growth Redwood Monitoring'],
    },
    utilities: {
      name: 'Utilities Zone',
      desc: 'Central energy storage battery bank, water filtration center, and mycelial signal transmitter hub.',
      habitats: 5,
      population: 6,
      renewableEnergy: '95% Hybrid Micro-Grid',
      co2Capture: '1.1t / month',
      waterCapacity: '2,500L Main Tank',
      sensors: ['S-19 Water Quality Probe', 'S-31 High-Voltage Battery Sensor'],
      projects: ['Battery Storage Expansion (50kWh)', 'Subterranean Mycelial Node Boost'],
    },
  };

  const activeZone = zones[activeZoneTab] || zones.residential;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="hud-panel hud-corner max-w-3xl w-full rounded-3xl p-6 sm:p-8 relative border border-emerald-400 shadow-[0_0_50px_rgba(16,185,129,0.35)] flex flex-col justify-between font-sans text-slate-100">
        
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
        <div className="flex items-center gap-3 border-b border-emerald-500/30 pb-4">
          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 glow-emerald-sm">
            <Layers className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                Sector Zone Analytics &amp; Details
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold border border-emerald-500/40">
                ECO GRID
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Comprehensive Sector Infrastructure &amp; Environmental Telemetry
            </p>
          </div>
        </div>

        {/* Zone Filter Tabs Bar */}
        <div className="flex flex-wrap items-center gap-2 my-4 font-mono text-xs">
          {Object.keys(zones).map((key) => (
            <button
              key={key}
              onClick={() => {
                setActiveZoneTab(key);
                audioEngine.playChime('strata');
              }}
              className={`px-3 py-1.5 rounded-xl transition-all uppercase ${
                activeZoneTab === key
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold shadow glow-emerald-sm'
                  : 'bg-slate-900 border border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              {zones[key].name.split(' ')[0]} Zone
            </button>
          ))}
        </div>

        {/* Zone Details Body */}
        <div className="space-y-4 font-mono text-xs my-2">
          
          <div className="hud-card p-4 rounded-2xl border border-emerald-500/40 bg-[#03140b] space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-extrabold text-white">{activeZone.name}</h4>
              <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                STATUS: NOMINAL
              </span>
            </div>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">{activeZone.desc}</p>
          </div>

          {/* 4 Metric Summary Boxes */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            
            <div className="hud-card p-3 rounded-xl border border-emerald-500/30">
              <span className="text-[10px] text-slate-400 uppercase block">Habitats</span>
              <span className="text-base font-bold text-white mt-0.5 block">{activeZone.habitats} Units</span>
            </div>

            <div className="hud-card p-3 rounded-xl border border-emerald-500/30">
              <span className="text-[10px] text-slate-400 uppercase block">Population</span>
              <span className="text-base font-bold text-emerald-300 mt-0.5 block">{activeZone.population} Residents</span>
            </div>

            <div className="hud-card p-3 rounded-xl border border-emerald-500/30">
              <span className="text-[10px] text-slate-400 uppercase block">Renewable Mix</span>
              <span className="text-base font-bold text-amber-400 mt-0.5 block">{activeZone.renewableEnergy}</span>
            </div>

            <div className="hud-card p-3 rounded-xl border border-emerald-500/30">
              <span className="text-[10px] text-slate-400 uppercase block">CO₂ Capture</span>
              <span className="text-base font-bold text-cyan-300 mt-0.5 block">{activeZone.co2Capture}</span>
            </div>

          </div>

          {/* Sensors & Active Projects */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            
            <div className="hud-card p-3 rounded-xl border border-emerald-500/30 space-y-2">
              <span className="text-slate-400 text-[10px] uppercase font-bold flex items-center gap-1">
                <Activity className="w-3.5 h-3.5 text-emerald-400" /> Active Zone Sensors
              </span>
              <div className="space-y-1">
                {activeZone.sensors.map((s, idx) => (
                  <div key={idx} className="p-1.5 rounded bg-white/5 text-[11px] text-emerald-300 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="hud-card p-3 rounded-xl border border-emerald-500/30 space-y-2">
              <span className="text-slate-400 text-[10px] uppercase font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> Active Conservation Projects
              </span>
              <div className="space-y-1">
                {activeZone.projects.map((p, idx) => (
                  <div key={idx} className="p-1.5 rounded bg-white/5 text-[11px] text-cyan-300 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>{p}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Modal Footer */}
        <div className="flex justify-end pt-3 border-t border-emerald-500/30 font-mono text-xs">
          <button
            onClick={() => {
              audioEngine.playChime('nourish');
              onClose();
            }}
            className="px-6 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-colors shadow"
          >
            ✓ CLOSE ZONE ANALYTICS
          </button>
        </div>

      </div>
    </div>
  );
}
