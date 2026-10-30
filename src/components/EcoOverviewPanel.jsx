import React from 'react';
import { 
  Home, 
  Sun, 
  Droplets, 
  Wind, 
  Mountain, 
  Activity, 
  HelpCircle 
} from 'lucide-react';
import { featureDescriptions } from '../utils/featureDescriptions';

export default function EcoOverviewPanel({ telemetry, onExplainFeature }) {
  return (
    <div className="hud-panel hud-corner rounded-2xl p-4 space-y-5 border border-emerald-500/40 shadow-2xl h-full flex flex-col justify-between">
      
      {/* Title Header */}
      <div className="border-b border-emerald-500/30 pb-3 flex items-center justify-between">
        <h2 className="font-extrabold text-sm text-emerald-400 tracking-wider font-mono uppercase flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-400" />
          <span>ECO HABITATION OVERVIEW</span>
        </h2>
        <span className="text-[10px] font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 px-2 py-0.5 rounded-full flex items-center gap-1">
          <span>Click any card for info</span>
        </span>
      </div>

      {/* 1. HABITATION STATUS */}
      <div className="space-y-3">
        <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
          <span>HABITATION STATUS</span>
          <span className="text-[10px] text-emerald-400 font-normal">Click for guide ❓</span>
        </h3>

        {/* Treehouse Units Box */}
        <div 
          onClick={() => onExplainFeature(featureDescriptions.treehouse_units)}
          className="hud-card p-3 rounded-xl flex items-center justify-between border border-emerald-500/30 cursor-pointer hover:border-emerald-400 transition-all group"
        >
          <div>
            <span className="text-[11px] font-mono text-slate-400 group-hover:text-emerald-300">Treehouse Units:</span>
            <p className="text-base font-extrabold font-mono text-white mt-0.5">
              06 <span className="text-emerald-400 text-xs">ACTIVE</span>
            </p>
          </div>

          <div className="w-12 h-12 rounded-xl bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
            <Home className="w-6 h-6 animate-pulse" />
          </div>
        </div>

        {/* Occupancy Progress */}
        <div 
          onClick={() => onExplainFeature(featureDescriptions.occupancy)}
          className="space-y-1.5 font-mono text-xs cursor-pointer p-2 rounded-xl hover:bg-emerald-500/10 transition-all border border-transparent hover:border-emerald-500/20"
        >
          <div className="flex justify-between text-[11px]">
            <span className="text-slate-400">Occupancy:</span>
            <span className="text-emerald-300 font-bold">12/15 Residents <span className="text-emerald-400">(80%)</span></span>
          </div>
          <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-emerald-500/20">
            <div className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full rounded-full w-[80%]" />
          </div>
        </div>

        {/* Solar Power Status */}
        <div 
          onClick={() => onExplainFeature(featureDescriptions.solar_power)}
          className="space-y-1.5 font-mono text-xs pt-1 cursor-pointer p-2 rounded-xl hover:bg-amber-500/10 transition-all border border-transparent hover:border-amber-500/20"
        >
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-slate-400 flex items-center gap-1">
              <Sun className="w-3.5 h-3.5 text-amber-400" /> Solar Power:
            </span>
            <span className="text-emerald-300 font-bold">1.24 kW • 87%</span>
          </div>
          <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-emerald-500/20">
            <div className="bg-gradient-to-r from-amber-400 to-emerald-400 h-full rounded-full w-[87%]" />
          </div>
        </div>
      </div>

      {/* 2. RESOURCES */}
      <div className="space-y-3 pt-2 border-t border-emerald-500/20">
        <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
          RESOURCES
        </h3>

        {/* Water Harvest Progress */}
        <div 
          onClick={() => onExplainFeature(featureDescriptions.water_harvest)}
          className="space-y-1 font-mono text-xs cursor-pointer p-2 rounded-xl hover:bg-cyan-500/10 transition-all border border-transparent hover:border-cyan-500/20"
        >
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-slate-400 flex items-center gap-1">
              <Droplets className="w-3.5 h-3.5 text-cyan-400" /> Water Harvest:
            </span>
            <span className="text-cyan-300 font-bold">340L / 500L <span className="text-cyan-400">(68%)</span></span>
          </div>
          <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-cyan-500/20">
            <div className="bg-cyan-400 h-full rounded-full w-[68%]" />
          </div>
        </div>

        {/* Air Quality */}
        <div 
          onClick={() => onExplainFeature(featureDescriptions.air_quality)}
          className="hud-card p-2.5 rounded-xl flex items-center justify-between text-xs font-mono cursor-pointer hover:border-emerald-400 transition-all"
        >
          <span className="text-slate-400 flex items-center gap-1.5">
            <Wind className="w-3.5 h-3.5 text-emerald-400" /> Air Quality:
          </span>
          <span className="text-emerald-300 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
            GOOD - AQI 42
          </span>
        </div>

        {/* Soil Moisture */}
        <div 
          onClick={() => onExplainFeature(featureDescriptions.soil_moisture)}
          className="hud-card p-2.5 rounded-xl flex items-center justify-between text-xs font-mono cursor-pointer hover:border-emerald-400 transition-all"
        >
          <span className="text-slate-400 flex items-center gap-1.5">
            <Mountain className="w-3.5 h-3.5 text-amber-400" /> Soil Moisture:
          </span>
          <span className="text-emerald-300 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
            {telemetry?.soilHydration || 45}% Optimal
          </span>
        </div>
      </div>

      {/* 3. ENVIRONMENTAL DATA GRID */}
      <div className="space-y-2 pt-2 border-t border-emerald-500/20">
        <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
          ENVIRONMENTAL DATA
        </h3>

        <div className="grid grid-cols-3 gap-2 text-center font-mono">
          
          <div 
            onClick={() => onExplainFeature(featureDescriptions.temperature)}
            className="hud-card p-2 rounded-xl border border-emerald-500/30 cursor-pointer hover:border-emerald-400 transition-all"
          >
            <span className="text-[10px] text-slate-400 uppercase block">Temp</span>
            <span className="text-xs sm:text-sm font-extrabold text-white mt-0.5 block">
              {telemetry?.coreTemperature || 22.4}°C
            </span>
          </div>

          <div 
            onClick={() => onExplainFeature(featureDescriptions.humidity)}
            className="hud-card p-2 rounded-xl border border-emerald-500/30 cursor-pointer hover:border-cyan-400 transition-all"
          >
            <span className="text-[10px] text-slate-400 uppercase block">Humidity</span>
            <span className="text-xs sm:text-sm font-extrabold text-cyan-300 mt-0.5 block">
              61%
            </span>
          </div>

          <div 
            onClick={() => onExplainFeature(featureDescriptions.co2_capture)}
            className="hud-card p-2 rounded-xl border border-emerald-500/30 cursor-pointer hover:border-emerald-400 transition-all"
          >
            <span className="text-[10px] text-slate-400 uppercase block">CO₂ Capture</span>
            <span className="text-xs sm:text-sm font-extrabold text-emerald-400 mt-0.5 block">
              2.3t/mo
            </span>
          </div>

        </div>
      </div>

    </div>
  );
}
