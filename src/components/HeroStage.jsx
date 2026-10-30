import React from 'react';
import { 
  ShieldCheck, 
  Leaf, 
  Wind, 
  Zap, 
  ArrowRight, 
  Sparkles, 
  Globe2, 
  Cpu, 
  Layers 
} from 'lucide-react';
import { audioEngine } from '../utils/audioSynth';

export default function HeroStage({ sporePoints, onExploreCanopy }) {
  const handleQuickSync = () => {
    audioEngine.playChime('nourish');
  };

  return (
    <section className="relative pt-8 pb-16 px-4 sm:px-8 overflow-hidden">
      
      {/* Background Radial Light Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-emerald-600/15 via-cyan-600/10 to-transparent rounded-full blur-3xl pointer-events-none animate-mesh-slow" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Floating Micro-Status Badges Row */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          
          <div className="flex items-center gap-2 bg-[#051810]/80 border border-emerald-500/30 px-3.5 py-1.5 rounded-full text-xs font-mono text-emerald-300 shadow-lg backdrop-blur-md glow-emerald-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Node #89 Connected</span>
          </div>

          <div className="flex items-center gap-2 bg-[#04161a]/80 border border-cyan-500/30 px-3.5 py-1.5 rounded-full text-xs font-mono text-cyan-300 shadow-lg backdrop-blur-md glow-cyan-sm">
            <Wind className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Net Carbon Offset: <strong className="text-white">+342 MT/yr</strong></span>
          </div>

          <div className="flex items-center gap-2 bg-[#120a1f]/80 border border-violet-500/30 px-3.5 py-1.5 rounded-full text-xs font-mono text-violet-300 shadow-lg backdrop-blur-md glow-violet-sm">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span>Spore Reserve: <strong className="text-white">{sporePoints} SP</strong></span>
          </div>

          <div className="flex items-center gap-2 bg-[#1a1405]/80 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-xs font-mono text-amber-300 shadow-lg backdrop-blur-md glow-amber-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Ecosystem Stability: <strong className="text-emerald-300">99.4%</strong></span>
          </div>

        </div>

        {/* Main Hero Header */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight font-sans">
            Vertical Forest <br className="hidden sm:inline" />
            <span className="text-gradient-biolum drop-shadow-sm">
              Stratification &amp; Habitation
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Welcome to <span className="text-emerald-400 font-semibold">SylvaVerse</span> — a cyber-organic living biosphere. 
            Monitor multi-tier forest canopies, balance IoT environmental telemetry, and cultivate 
            digital arboreal plots in real-time.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            
            <button
              onClick={onExploreCanopy}
              className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold text-sm sm:text-base shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105"
            >
              <Layers className="w-5 h-5 text-slate-950 group-hover:rotate-12 transition-transform" />
              <span>Explore Canopy Strata</span>
              <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="#nursery"
              className="px-6 py-3.5 rounded-2xl bg-[#081a12]/80 border border-emerald-500/30 text-emerald-300 font-semibold text-sm sm:text-base hover:bg-emerald-500/10 hover:border-emerald-500/60 transition-all flex items-center gap-2 backdrop-blur-md"
            >
              <Leaf className="w-5 h-5 text-emerald-400" />
              <span>Adopt &amp; Nourish Plot</span>
            </a>

            <button
              onClick={handleQuickSync}
              className="px-4 py-3.5 rounded-2xl bg-[#0b101c]/80 border border-cyan-500/20 text-cyan-300 text-xs font-mono hover:bg-cyan-500/10 transition-all flex items-center gap-1.5"
              title="Pulse bio frequency generator"
            >
              <Zap className="w-4 h-4 text-cyan-400 animate-bounce" />
              <span>Bio Pulse Sync</span>
            </button>

          </div>

          {/* Biosphere Telemetry Summary Strip */}
          <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="glass-card p-3 rounded-2xl text-center">
              <p className="text-[11px] font-mono text-emerald-400/80 uppercase">Total Strata Height</p>
              <p className="text-xl font-bold font-mono text-white mt-1">75 Meters</p>
            </div>
            <div className="glass-card p-3 rounded-2xl text-center">
              <p className="text-[11px] font-mono text-cyan-400/80 uppercase">Bio-Nodes Active</p>
              <p className="text-xl font-bold font-mono text-white mt-1">1,420 Nodes</p>
            </div>
            <div className="glass-card p-3 rounded-2xl text-center">
              <p className="text-[11px] font-mono text-violet-400/80 uppercase">Endemic Flora</p>
              <p className="text-xl font-bold font-mono text-white mt-1">348 Species</p>
            </div>
            <div className="glass-card p-3 rounded-2xl text-center">
              <p className="text-[11px] font-mono text-amber-400/80 uppercase">Mycelial Flux</p>
              <p className="text-xl font-bold font-mono text-white mt-1">98.2 GHz</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
