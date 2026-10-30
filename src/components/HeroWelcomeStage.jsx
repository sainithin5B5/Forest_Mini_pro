import React from 'react';
import { 
  Sun, 
  Wind, 
  Zap, 
  Droplets, 
  Activity, 
  ArrowRight, 
  Bell, 
  Search 
} from 'lucide-react';
import { featureDescriptions } from '../utils/featureDescriptions';
import { audioEngine } from '../utils/audioSynth';

export default function HeroWelcomeStage({ onExplainFeature, onOpenExploreHabitat, onOpenWeather, onOpenNotifications }) {
  return (
    <section 
      id="dashboard" 
      data-scroll-reveal 
      className="reveal-init relative rounded-3xl overflow-hidden border border-emerald-500/30 shadow-2xl min-h-[460px] flex flex-col justify-between p-6 sm:p-10 group"
    >
      
      {/* 3D Background Render Image */}
      <img 
        src="/forest_habitation_hero.png" 
        alt="Digital Forest Habitation Hero 3D Render" 
        className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-1000 ease-out pointer-events-none"
      />

      {/* Dark Gradient Backdrop Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent pointer-events-none" />

      {/* Top Header Controls Bar */}
      <div className="relative z-10 flex items-center justify-between gap-4">
        
        {/* Search Bar */}
        <div className="relative hidden sm:block w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search habitats, sensors..."
            className="w-full pl-10 pr-4 py-2 rounded-2xl bg-black/50 border border-white/10 text-xs font-mono text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 transition-all backdrop-blur-md"
          />
        </div>

        {/* Weather Pill & Notifications */}
        <div className="flex items-center gap-3">
          
          <div 
            onClick={() => {
              audioEngine.playChime('strata');
              onOpenWeather && onOpenWeather();
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-black/60 border border-white/15 text-xs font-mono text-slate-200 backdrop-blur-md cursor-pointer hover:border-emerald-400 transition-all"
          >
            <Sun className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="font-bold text-white">24°C</span>
            <span className="text-slate-400">Sunny/Cloud</span>
          </div>

          <div 
            onClick={() => {
              audioEngine.playChime('nourish');
              onOpenNotifications && onOpenNotifications();
            }}
            className="p-2.5 rounded-2xl bg-black/60 border border-white/15 text-slate-300 backdrop-blur-md cursor-pointer hover:text-emerald-400 hover:border-emerald-400 transition-all relative"
          >
            <Bell className="w-4.5 h-4.5" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>

        </div>
      </div>

      {/* Center Welcome Headline */}
      <div className="relative z-10 max-w-xl space-y-4 my-8">
        <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider">
          ECO RESIDENTIAL ZONE 01
        </span>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight font-sans">
          Welcome to your <br />
          <span className="text-gradient-biolum">Digital Forest Habitation</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-200 font-normal leading-relaxed">
          Live in harmony with nature through technology. Monitor 3D treehouses, solar energy flow, water harvesting, and wildlife activity in real-time.
        </p>

        <div>
          <button
            onClick={() => {
              audioEngine.playChime('nourish');
              onOpenExploreHabitat();
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-500 text-slate-950 font-bold text-sm hover:bg-emerald-400 transition-all shadow-xl hover:scale-105"
          >
            <span>Explore Habitat</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom 4 Floating Glass Metric Cards */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 font-mono">
        
        {/* Card 1: Air Quality */}
        <div 
          onClick={() => onExplainFeature(featureDescriptions.air_quality)}
          className="glass-card p-3.5 rounded-2xl border border-emerald-500/30 cursor-pointer hover:border-emerald-400 transition-all"
        >
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <Wind className="w-3.5 h-3.5 text-emerald-400" /> Air Quality
            </span>
          </div>
          <p className="text-base font-extrabold text-white mt-1">Excellent</p>
          <p className="text-xs font-bold text-emerald-400 mt-0.5">98 AQI</p>
        </div>

        {/* Card 2: Energy Usage */}
        <div 
          onClick={() => onExplainFeature(featureDescriptions.solar_power)}
          className="glass-card p-3.5 rounded-2xl border border-amber-500/30 cursor-pointer hover:border-amber-400 transition-all"
        >
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-400" /> Energy Usage
            </span>
          </div>
          <p className="text-base font-extrabold text-white mt-1">2.4 kWh</p>
          <p className="text-xs text-amber-400 mt-0.5">Today</p>
        </div>

        {/* Card 3: Water Usage */}
        <div 
          onClick={() => onExplainFeature(featureDescriptions.water_harvest)}
          className="glass-card p-3.5 rounded-2xl border border-cyan-500/30 cursor-pointer hover:border-cyan-400 transition-all"
        >
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <Droplets className="w-3.5 h-3.5 text-cyan-400" /> Water Usage
            </span>
          </div>
          <p className="text-base font-extrabold text-white mt-1">120 L</p>
          <p className="text-xs text-cyan-400 mt-0.5">Today</p>
        </div>

        {/* Card 4: Forest Health */}
        <div 
          onClick={() => onExplainFeature(featureDescriptions.forest_health)}
          className="glass-card p-3.5 rounded-2xl border border-emerald-500/30 cursor-pointer hover:border-emerald-400 transition-all"
        >
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-emerald-400" /> Forest Health
            </span>
          </div>
          <p className="text-base font-extrabold text-white mt-1">Healthy</p>
          <p className="text-xs font-bold text-emerald-400 mt-0.5">92% Score</p>
        </div>

      </div>

    </section>
  );
}
