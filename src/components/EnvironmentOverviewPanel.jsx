import React, { useState } from 'react';
import { 
  Wind, 
  Thermometer, 
  Droplets, 
  Mountain, 
  Activity, 
  Trees, 
  Feather, 
  ChevronRight 
} from 'lucide-react';
import { featureDescriptions } from '../utils/featureDescriptions';
import { audioEngine } from '../utils/audioSynth';

export default function EnvironmentOverviewPanel({ telemetry, onExplainFeature, onOpenBiodiversity }) {
  const [activeTab, setActiveTab] = useState('live');

  const tabs = [
    { id: 'live', label: 'Live Data' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'history', label: 'History' },
  ];

  return (
    <section 
      id="environment" 
      data-scroll-reveal 
      className="reveal-init glass-panel rounded-3xl p-6 border border-emerald-500/30 shadow-2xl space-y-6 h-full flex flex-col justify-between"
    >
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-500/20 pb-4">
        <div>
          <h2 className="font-extrabold text-xl text-white font-sans flex items-center gap-2">
            <span>Environment Overview</span>
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex items-center bg-[#030e09] p-1 rounded-2xl border border-emerald-500/30 text-xs font-mono">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                audioEngine.playChime('strata');
              }}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                activeTab === tab.id
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Circular Gauge Meters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono">
        
        {/* Gauge 1: Air Quality */}
        <div 
          onClick={() => onExplainFeature(featureDescriptions.air_quality)}
          className="glass-card p-4 rounded-2xl border border-emerald-500/30 cursor-pointer hover:border-emerald-400 transition-all group"
        >
          <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
            <svg className="w-16 h-16 transform -rotate-90">
              <circle cx="32" cy="32" r="26" stroke="rgba(255,255,255,0.1)" strokeWidth="5" fill="none" />
              <circle cx="32" cy="32" r="26" stroke="#10b981" strokeWidth="5" fill="none" strokeDasharray="163" strokeDashoffset="16" />
            </svg>
            <span className="absolute text-sm font-extrabold text-white">98</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2 uppercase font-bold">Air Quality</p>
          <p className="text-xs font-bold text-emerald-400 mt-0.5">AQI • Excellent</p>
        </div>

        {/* Gauge 2: Temperature */}
        <div 
          onClick={() => onExplainFeature(featureDescriptions.temperature)}
          className="glass-card p-4 rounded-2xl border border-amber-500/30 cursor-pointer hover:border-amber-400 transition-all group"
        >
          <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
            <svg className="w-16 h-16 transform -rotate-90">
              <circle cx="32" cy="32" r="26" stroke="rgba(255,255,255,0.1)" strokeWidth="5" fill="none" />
              <circle cx="32" cy="32" r="26" stroke="#f59e0b" strokeWidth="5" fill="none" strokeDasharray="163" strokeDashoffset="45" />
            </svg>
            <span className="absolute text-sm font-extrabold text-white">24°C</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2 uppercase font-bold">Temperature</p>
          <p className="text-xs font-bold text-amber-400 mt-0.5">Comfortable</p>
        </div>

        {/* Gauge 3: Humidity */}
        <div 
          onClick={() => onExplainFeature(featureDescriptions.humidity)}
          className="glass-card p-4 rounded-2xl border border-cyan-500/30 cursor-pointer hover:border-cyan-400 transition-all group"
        >
          <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
            <svg className="w-16 h-16 transform -rotate-90">
              <circle cx="32" cy="32" r="26" stroke="rgba(255,255,255,0.1)" strokeWidth="5" fill="none" />
              <circle cx="32" cy="32" r="26" stroke="#06b6d4" strokeWidth="5" fill="none" strokeDasharray="163" strokeDashoffset="65" />
            </svg>
            <span className="absolute text-sm font-extrabold text-white">60%</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2 uppercase font-bold">Humidity</p>
          <p className="text-xs font-bold text-cyan-400 mt-0.5">Optimal</p>
        </div>

        {/* Gauge 4: Soil Moisture */}
        <div 
          onClick={() => onExplainFeature(featureDescriptions.soil_moisture)}
          className="glass-card p-4 rounded-2xl border border-emerald-500/30 cursor-pointer hover:border-emerald-400 transition-all group"
        >
          <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
            <svg className="w-16 h-16 transform -rotate-90">
              <circle cx="32" cy="32" r="26" stroke="rgba(255,255,255,0.1)" strokeWidth="5" fill="none" />
              <circle cx="32" cy="32" r="26" stroke="#34d399" strokeWidth="5" fill="none" strokeDasharray="163" strokeDashoffset="90" />
            </svg>
            <span className="absolute text-sm font-extrabold text-white">{telemetry?.soilHydration || 45}%</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2 uppercase font-bold">Soil Moisture</p>
          <p className="text-xs font-bold text-emerald-400 mt-0.5">Good</p>
        </div>

      </div>

      {/* Bottom 2 Split Cards: Forest Health & Biodiversity */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        
        {/* Forest Health Line Chart (7 Cols) */}
        <div 
          onClick={() => onExplainFeature(featureDescriptions.forest_health)}
          className="md:col-span-7 glass-card p-4 rounded-2xl border border-emerald-500/30 space-y-3 cursor-pointer hover:border-emerald-400 transition-all"
        >
          <div className="flex items-center justify-between font-mono text-xs">
            <span className="text-slate-300 font-bold uppercase">Forest Health</span>
            <span className="text-emerald-400 font-extrabold text-base">92% <span className="text-xs text-slate-400 font-normal">Healthy</span></span>
          </div>

          <div className="relative h-24 w-full overflow-hidden rounded-xl bg-[#030d08] p-2 border border-emerald-500/20">
            <svg className="w-full h-full text-emerald-400 fill-none stroke-current stroke-2">
              <path d="M 0 60 Q 30 30 60 50 T 120 20 T 180 40 T 240 10 T 300 25" />
            </svg>
          </div>
        </div>

        {/* Biodiversity Card (5 Cols) */}
        <div 
          onClick={() => {
            audioEngine.playChime('nourish');
            onOpenBiodiversity && onOpenBiodiversity();
          }}
          className="md:col-span-5 glass-card p-4 rounded-2xl border border-emerald-500/30 flex flex-col justify-between font-mono text-xs cursor-pointer hover:border-emerald-400 transition-all"
        >
          <div>
            <span className="text-slate-400 uppercase text-[10px]">Biodiversity</span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-extrabold text-white">128</span>
              <span className="text-xs text-emerald-400 font-bold">Species</span>
            </div>

            <div className="space-y-1 mt-3 text-[11px] text-slate-300 border-t border-emerald-500/20 pt-2">
              <div className="flex justify-between">
                <span>🦅 Birds</span>
                <span className="font-bold text-white">45</span>
              </div>
              <div className="flex justify-between">
                <span>🌿 Plants</span>
                <span className="font-bold text-white">62</span>
              </div>
              <div className="flex justify-between">
                <span>🦊 Animals</span>
                <span className="font-bold text-white">21</span>
              </div>
            </div>
          </div>

          <button className="w-full mt-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[11px] font-bold hover:bg-emerald-500/20 transition-colors flex items-center justify-center gap-1">
            <span>View Catalog</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </section>
  );
}
