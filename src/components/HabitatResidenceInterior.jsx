import React from 'react';
import { 
  Home, 
  Thermometer, 
  Droplets, 
  Wind, 
  Zap, 
  CheckCircle2, 
  Sliders 
} from 'lucide-react';
import { featureDescriptions } from '../utils/featureDescriptions';
import { audioEngine } from '../utils/audioSynth';

export default function HabitatResidenceInterior({ onExplainFeature, onOpenExploreHabitat }) {
  return (
    <section 
      id="habitat-07" 
      data-scroll-reveal 
      className="reveal-init glass-panel rounded-3xl p-6 border border-emerald-500/30 shadow-2xl relative overflow-hidden flex flex-col justify-between"
    >
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-emerald-500/20 pb-4 mb-4">
        <div>
          <h2 className="font-extrabold text-xl text-white font-sans flex items-center gap-2">
            <span>Habitat 07</span>
            <span className="text-emerald-400 font-mono text-xs">• Treehouse Residence</span>
          </h2>
        </div>

        <span className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30 font-bold">
          <CheckCircle2 className="w-3.5 h-3.5" /> RESIDENT ONLINE
        </span>
      </div>

      {/* Main 3D Residence Showcase Grid */}
      <div className="relative rounded-2xl overflow-hidden border border-emerald-500/30 bg-[#040e09] min-h-[320px] flex items-center justify-center group">
        
        {/* Generated 3D Interior Image */}
        <img 
          src="/habitat_interior_master.png" 
          alt="Habitat 07 3D Master Bedroom Residence Interior"
          className="w-full h-full object-cover rounded-2xl opacity-90 group-hover:scale-105 transition-transform duration-700 ease-out cursor-pointer"
          onClick={() => onOpenExploreHabitat && onOpenExploreHabitat()}
        />

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

        {/* Right Habitat Status Controls Card Overlay */}
        <div className="absolute top-4 right-4 bottom-4 w-64 z-30 glass-card p-4 rounded-2xl border border-emerald-500/40 hidden sm:flex flex-col justify-between">
          
          <div className="space-y-3 font-mono text-xs">
            
            <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2">
              <span className="text-[10px] text-slate-400 uppercase">Habitat Status</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/40">
                ACTIVE
              </span>
            </div>

            {/* Metrics */}
            <div className="space-y-2">
              
              <div 
                onClick={() => onExplainFeature(featureDescriptions.temperature)}
                className="flex items-center justify-between text-xs p-1.5 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
              >
                <span className="text-slate-400 flex items-center gap-1">
                  <Thermometer className="w-3.5 h-3.5 text-amber-400" /> Temperature
                </span>
                <span className="text-white font-bold">24°C</span>
              </div>

              <div 
                onClick={() => onExplainFeature(featureDescriptions.humidity)}
                className="flex items-center justify-between text-xs p-1.5 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
              >
                <span className="text-slate-400 flex items-center gap-1">
                  <Droplets className="w-3.5 h-3.5 text-cyan-400" /> Humidity
                </span>
                <span className="text-white font-bold">60%</span>
              </div>

              <div 
                onClick={() => onExplainFeature(featureDescriptions.air_quality)}
                className="flex items-center justify-between text-xs p-1.5 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
              >
                <span className="text-slate-400 flex items-center gap-1">
                  <Wind className="w-3.5 h-3.5 text-emerald-400" /> Air Quality
                </span>
                <span className="text-emerald-300 font-bold">Excellent</span>
              </div>

              <div 
                onClick={() => onExplainFeature(featureDescriptions.solar_power)}
                className="flex items-center justify-between text-xs p-1.5 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
              >
                <span className="text-slate-400 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-amber-400" /> Energy
                </span>
                <span className="text-white font-bold">1.2 kWh <span className="text-[10px] text-amber-400">Solar</span></span>
              </div>

              <div 
                onClick={() => onExplainFeature(featureDescriptions.water_harvest)}
                className="flex items-center justify-between text-xs p-1.5 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
              >
                <span className="text-slate-400 flex items-center gap-1">
                  <Droplets className="w-3.5 h-3.5 text-cyan-400" /> Water
                </span>
                <span className="text-white font-bold">80 L <span className="text-[10px] text-cyan-400">Stored</span></span>
              </div>

            </div>

          </div>

          <button 
            onClick={() => {
              audioEngine.playChime('nourish');
              onOpenExploreHabitat && onOpenExploreHabitat();
            }}
            className="w-full py-2.5 rounded-xl bg-[#081f14] border border-emerald-500/40 text-emerald-300 font-bold text-xs hover:bg-emerald-500/20 transition-colors flex items-center justify-center gap-1.5 font-mono shadow"
          >
            <Sliders className="w-4 h-4 text-emerald-400" />
            <span>Control Systems</span>
          </button>

        </div>

      </div>

    </section>
  );
}
