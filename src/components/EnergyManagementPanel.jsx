import React from 'react';
import { Sun, BatteryCharging, Home, ArrowRight, Zap } from 'lucide-react';
import { featureDescriptions } from '../utils/featureDescriptions';
import { audioEngine } from '../utils/audioSynth';

export default function EnergyManagementPanel({ onExplainFeature, onOpenEnergyModal }) {
  return (
    <section 
      id="energy" 
      data-scroll-reveal 
      className="reveal-init glass-panel rounded-3xl p-6 border border-emerald-500/30 shadow-2xl space-y-6 h-full flex flex-col justify-between"
    >
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-emerald-500/20 pb-4">
        <div>
          <h2 className="font-extrabold text-xl text-white font-sans flex items-center gap-2">
            <span>Energy Management</span>
          </h2>
        </div>

        <button 
          onClick={() => {
            audioEngine.playChime('nourish');
            onOpenEnergyModal && onOpenEnergyModal();
          }}
          className="px-3 py-1 rounded-xl bg-[#030e09] border border-amber-500/30 text-xs font-mono text-amber-300 font-bold hover:bg-amber-500/20 transition-all"
        >
          Grid Control ▼
        </button>
      </div>

      {/* Top 3 Summary Metrics */}
      <div className="grid grid-cols-3 gap-3 font-mono text-xs text-center">
        
        <div 
          onClick={() => {
            audioEngine.playChime('nourish');
            onOpenEnergyModal && onOpenEnergyModal();
          }}
          className="glass-card p-3 rounded-2xl border border-emerald-500/30 cursor-pointer hover:border-emerald-400 transition-all"
        >
          <span className="text-[10px] text-slate-400 uppercase block">Total Generation</span>
          <span className="text-base sm:text-lg font-extrabold text-emerald-400 mt-0.5 block">12.8 kWh</span>
          <span className="text-[10px] text-slate-400">Today</span>
        </div>

        <div 
          onClick={() => {
            audioEngine.playChime('nourish');
            onOpenEnergyModal && onOpenEnergyModal();
          }}
          className="glass-card p-3 rounded-2xl border border-amber-500/30 cursor-pointer hover:border-amber-400 transition-all"
        >
          <span className="text-[10px] text-slate-400 uppercase block">Total Consumption</span>
          <span className="text-base sm:text-lg font-extrabold text-amber-400 mt-0.5 block">8.4 kWh</span>
          <span className="text-[10px] text-slate-400">Today</span>
        </div>

        <div 
          onClick={() => {
            audioEngine.playChime('nourish');
            onOpenEnergyModal && onOpenEnergyModal();
          }}
          className="glass-card p-3 rounded-2xl border border-cyan-500/30 cursor-pointer hover:border-cyan-400 transition-all"
        >
          <span className="text-[10px] text-slate-400 uppercase block">Renewable Usage</span>
          <span className="text-base sm:text-lg font-extrabold text-cyan-300 mt-0.5 block">85%</span>
          <span className="text-[10px] text-slate-400">This Month</span>
        </div>

      </div>

      {/* Animated Energy Flow Node Diagram */}
      <div 
        onClick={() => {
          audioEngine.playChime('nourish');
          onOpenEnergyModal && onOpenEnergyModal();
        }}
        className="hud-card p-4 rounded-2xl border border-emerald-500/30 space-y-3 font-mono cursor-pointer hover:border-amber-400 transition-all"
      >
        <div className="flex items-center justify-between text-xs border-b border-emerald-500/20 pb-2">
          <span className="text-slate-300 font-bold uppercase flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-400 animate-bounce" /> Energy Flow Network
          </span>
          <span className="text-[10px] text-emerald-400">● REAL-TIME TRANSFER</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2 relative">
          
          {/* Node 1: Solar */}
          <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-[#04140b] border border-amber-500/40 w-full sm:w-28">
            <Sun className="w-6 h-6 text-amber-400 animate-spin" style={{ animationDuration: '10s' }} />
            <span className="text-xs font-bold text-white mt-1">Solar</span>
            <span className="text-[11px] text-amber-400 font-bold">7.2 kWh</span>
          </div>

          {/* Flow Arrow 1 */}
          <div className="flex items-center text-emerald-400 animate-pulse">
            <ArrowRight className="w-5 h-5 hidden sm:block" />
          </div>

          {/* Node 2: Storage Battery */}
          <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-[#04140b] border border-emerald-500/40 w-full sm:w-28 glow-emerald-sm">
            <BatteryCharging className="w-6 h-6 text-emerald-400 animate-pulse" />
            <span className="text-xs font-bold text-white mt-1">Storage</span>
            <span className="text-[11px] text-emerald-400 font-bold">3.6 kWh</span>
          </div>

          {/* Flow Arrow 2 */}
          <div className="flex items-center text-emerald-400 animate-pulse">
            <ArrowRight className="w-5 h-5 hidden sm:block" />
          </div>

          {/* Node 3: Consumption */}
          <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-[#04140b] border border-cyan-500/40 w-full sm:w-28">
            <Home className="w-6 h-6 text-cyan-400" />
            <span className="text-xs font-bold text-white mt-1">Consumption</span>
            <span className="text-[11px] text-cyan-300 font-bold">8.4 kWh</span>
          </div>

        </div>
      </div>

      {/* Usage Trends Area Line Chart */}
      <div className="hud-card p-3 rounded-2xl border border-emerald-500/30 space-y-2 font-mono text-xs">
        <div className="flex justify-between items-center">
          <span className="text-slate-400 text-[11px] uppercase font-bold">Usage Trends</span>
          <span className="text-[10px] text-emerald-400">Peak: 14:00</span>
        </div>

        <svg className="w-full h-16 text-emerald-400 fill-none stroke-current stroke-2">
          <path d="M 0 55 L 40 45 L 80 50 L 120 20 L 160 30 L 200 15 L 240 25 L 280 40 T 320 50" />
        </svg>

        <div className="flex justify-between text-[10px] text-slate-400 pt-1 border-t border-emerald-500/20">
          <span>00:00</span>
          <span>04:00</span>
          <span>08:00</span>
          <span>12:00</span>
          <span>16:00</span>
          <span>20:00</span>
        </div>
      </div>

    </section>
  );
}
