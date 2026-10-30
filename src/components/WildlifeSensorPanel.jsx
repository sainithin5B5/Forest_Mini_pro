import React from 'react';
import { 
  CheckCircle2, 
  Radio, 
  TrendingUp, 
  HelpCircle 
} from 'lucide-react';
import { featureDescriptions } from '../utils/featureDescriptions';

export default function WildlifeSensorPanel({ onExplainFeature }) {
  return (
    <div className="hud-panel hud-corner rounded-2xl p-4 space-y-5 border border-emerald-500/40 shadow-2xl h-full flex flex-col justify-between">
      
      {/* Header */}
      <div className="border-b border-emerald-500/30 pb-3 flex items-center justify-between">
        <h2 className="font-extrabold text-sm text-emerald-400 tracking-wider font-mono uppercase flex items-center gap-2">
          <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>WILDLIFE &amp; IOT SENSORS</span>
        </h2>
        <span className="text-[10px] font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 px-2 py-0.5 rounded-full flex items-center gap-1">
          <span>Click any card for info</span>
        </span>
      </div>

      {/* 1. WILDLIFE TRACKING */}
      <div className="space-y-2.5">
        <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
          <span>WILDLIFE TRACKING</span>
          <span className="text-[10px] text-emerald-400 font-normal">Click for guide ❓</span>
        </h3>

        {/* Red Fox */}
        <div 
          onClick={() => onExplainFeature(featureDescriptions.red_fox)}
          className="hud-card p-2.5 rounded-xl border border-emerald-500/30 flex items-center justify-between text-xs font-mono cursor-pointer hover:border-emerald-400 transition-all group"
        >
          <div className="flex items-center gap-2.5">
            <span className="text-lg group-hover:scale-125 transition-transform">🦊</span>
            <div>
              <p className="font-bold text-white group-hover:text-emerald-300">Red Fox</p>
              <p className="text-[10px] text-slate-400">RF-023 | Healthy | Location: Sector-3</p>
            </div>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        </div>

        {/* Deer */}
        <div 
          onClick={() => onExplainFeature(featureDescriptions.deer_herd)}
          className="hud-card p-2.5 rounded-xl border border-emerald-500/30 flex items-center justify-between text-xs font-mono cursor-pointer hover:border-emerald-400 transition-all group"
        >
          <div className="flex items-center gap-2.5">
            <span className="text-lg group-hover:scale-125 transition-transform">🦌</span>
            <div>
              <p className="font-bold text-white group-hover:text-emerald-300">Deer</p>
              <p className="text-[10px] text-slate-400">D-004 | Herd: 4 | Location: Sector-2</p>
            </div>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
        </div>

        {/* Avian Species */}
        <div 
          onClick={() => onExplainFeature(featureDescriptions.avian_species)}
          className="hud-card p-2.5 rounded-xl border border-emerald-500/30 flex items-center justify-between text-xs font-mono cursor-pointer hover:border-emerald-400 transition-all group"
        >
          <div className="flex items-center gap-2.5">
            <span className="text-lg group-hover:scale-125 transition-transform">🦅</span>
            <div>
              <p className="font-bold text-white group-hover:text-emerald-300">Avian Species</p>
              <p className="text-[10px] text-slate-400">12 Detected (Robin/Sparrow/Magpie)</p>
            </div>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
        </div>
      </div>

      {/* 2. IOT SENSOR NETWORK */}
      <div className="space-y-2.5 pt-2 border-t border-emerald-500/20">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
            IOT SENSOR NETWORK
          </h3>
          <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" /> 24/24 ONLINE
          </span>
        </div>

        {/* S-12 Treehouse Alpha */}
        <div 
          onClick={() => onExplainFeature(featureDescriptions.sensor_s12)}
          className="hud-card p-2 rounded-xl border border-emerald-500/30 text-xs font-mono flex items-center justify-between cursor-pointer hover:border-cyan-400 transition-all"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="font-bold text-white">S-12 Treehouse Alpha</span>
          </div>
          <span className="text-[10px] text-emerald-300">Battery 82% | Soil+Temp OK</span>
        </div>

        {/* S-07 Canopy Cam */}
        <div 
          onClick={() => onExplainFeature(featureDescriptions.sensor_s07)}
          className="hud-card p-2 rounded-xl border border-emerald-500/30 text-xs font-mono flex items-center justify-between cursor-pointer hover:border-cyan-400 transition-all"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="font-bold text-white">S-07 Canopy Cam</span>
          </div>
          <span className="text-[10px] text-emerald-300">Battery 91% | Motion Detected</span>
        </div>

        {/* S-19 Water Quality */}
        <div 
          onClick={() => onExplainFeature(featureDescriptions.sensor_s19)}
          className="hud-card p-2 rounded-xl border border-emerald-500/30 text-xs font-mono flex items-center justify-between cursor-pointer hover:border-cyan-400 transition-all"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="font-bold text-white">S-19 Water Quality</span>
          </div>
          <span className="text-[10px] text-cyan-300">Battery 76% | pH 6.8</span>
        </div>
      </div>

      {/* 3. FOREST HEALTH INDEX */}
      <div 
        onClick={() => onExplainFeature(featureDescriptions.forest_health)}
        className="space-y-2 pt-2 border-t border-emerald-500/20 font-mono cursor-pointer p-2 rounded-xl hover:bg-emerald-500/10 transition-all"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            FOREST HEALTH INDEX
          </h3>
          <span className="flex items-center gap-1 text-xs font-bold text-emerald-400">
            <TrendingUp className="w-3.5 h-3.5" /> +3.2%
          </span>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-xs text-slate-400 uppercase">CURRENT:</span>
          <span className="text-xl font-extrabold text-emerald-300">87%</span>
        </div>

        {/* Live Line Graph SVG */}
        <div className="hud-card p-3 rounded-xl border border-emerald-500/30 space-y-2">
          <svg className="w-full h-16 text-emerald-400 fill-none stroke-current stroke-2">
            <defs>
              <linearGradient id="healthGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path d="M 0 50 L 30 45 L 60 55 L 90 35 L 120 40 L 150 25 L 180 30 L 210 15 L 240 10" className="stroke-emerald-400" />
            <path d="M 0 50 L 30 45 L 60 55 L 90 35 L 120 40 L 150 25 L 180 30 L 210 15 L 240 10 L 240 65 L 0 65 Z" fill="url(#healthGrad)" stroke="none" />
          </svg>

          <div className="flex justify-between text-[10px] text-slate-400 pt-1 border-t border-emerald-500/20">
            <span>06:00</span>
            <span>09:00</span>
            <span>12:00</span>
            <span>15:00</span>
            <span>18:00</span>
          </div>
        </div>
      </div>

    </div>
  );
}
