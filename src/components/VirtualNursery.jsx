import React, { useState, useEffect } from 'react';
import { 
  Sprout, 
  Droplets, 
  Sparkles, 
  Trees, 
  Zap 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioEngine } from '../utils/audioSynth';

export default function VirtualNursery({ sporePoints, setSporePoints }) {
  const [plots, setPlots] = useState([]);
  const [activePlotId, setActivePlotId] = useState('plot-904');
  const [floatingText, setFloatingText] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch plots from SQLite Database via API backend
  const fetchPlots = async () => {
    try {
      const res = await fetch('/api/plots');
      if (res.ok) {
        const data = await res.json();
        setPlots(data);
        if (data.length > 0 && !data.find((p) => p.id === activePlotId)) {
          setActivePlotId(data[0].id);
        }
      }
    } catch (err) {
      console.warn('API error fetching plots, falling back', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlots();
  }, []);

  const activePlot = plots.find((p) => p.id === activePlotId) || plots[0] || {
    id: 'plot-904',
    name: 'Ancient Redwood Plot #SYL-904',
    species: 'Sequoiadendron Giganteum',
    stage: 'Ancient Sentinel',
    growth: 78.4,
    hydration: 84.0,
    mycelialSync: 92.5,
    icon: '🌲',
    adoptedDate: '2026-04-12',
    sporesGenerated: 480,
  };

  const triggerFloatingText = (text, color = 'emerald') => {
    setFloatingText({ text, color, id: Date.now() });
    setTimeout(() => setFloatingText(null), 1600);
  };

  // Nourish Canopy Action
  const handleNourish = async () => {
    audioEngine.playChime('nourish');

    try {
      const res = await fetch(`/api/plots/${activePlotId}/nourish`, { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setPlots((prev) =>
          prev.map((p) =>
            p.id === activePlotId
              ? {
                  ...p,
                  growth: data.growth,
                  hydration: data.hydration,
                  stage: data.stage,
                  stageLevel: data.stageLevel,
                  sporesGenerated: data.sporesGenerated,
                }
              : p
          )
        );
        setSporePoints(data.newSporeBalance);

        if (data.growth === 100) {
          confetti({
            particleCount: 90,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#10b981', '#06b6d4', '#f59e0b'],
          });
        }

        triggerFloatingText('+8% Growth | +25 SP Saved to DB', 'emerald');
        return;
      }
    } catch (e) {}

    // Fallback if API offline
    setPlots((prevPlots) =>
      prevPlots.map((plot) => {
        if (plot.id === activePlotId) {
          return {
            ...plot,
            growth: Math.min(100, +(plot.growth + 8.0).toFixed(1)),
            hydration: Math.min(100, +(plot.hydration + 4.0).toFixed(1)),
            sporesGenerated: plot.sporesGenerated + 25,
          };
        }
        return plot;
      })
    );
    setSporePoints((sp) => sp + 25);
    triggerFloatingText('+8% Growth | +25 SP', 'emerald');
  };

  // Mist Soil Action
  const handleMistSoil = async () => {
    audioEngine.playChime('strata');

    try {
      const res = await fetch(`/api/plots/${activePlotId}/mist`, { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setPlots((prev) =>
          prev.map((p) => (p.id === activePlotId ? { ...p, hydration: data.hydration } : p))
        );
        setSporePoints(data.newSporeBalance);
        triggerFloatingText('+12% Hydration | +10 SP Saved to DB', 'cyan');
        return;
      }
    } catch (e) {}

    setPlots((prevPlots) =>
      prevPlots.map((plot) => {
        if (plot.id === activePlotId) {
          return { ...plot, hydration: Math.min(100, +(plot.hydration + 12.0).toFixed(1)) };
        }
        return plot;
      })
    );
    setSporePoints((sp) => sp + 10);
    triggerFloatingText('+12% Hydration | +10 SP', 'cyan');
  };

  // Root Pulse Action
  const handlePulseRootMesh = async () => {
    audioEngine.playChime('time');

    try {
      const res = await fetch(`/api/plots/${activePlotId}/pulse`, { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setPlots((prev) =>
          prev.map((p) => (p.id === activePlotId ? { ...p, mycelialSync: data.mycelialSync } : p))
        );
        setSporePoints(data.newSporeBalance);
        triggerFloatingText('+5% Mycelial Sync | +15 SP Saved to DB', 'violet');
        return;
      }
    } catch (e) {}

    setPlots((prevPlots) =>
      prevPlots.map((plot) => {
        if (plot.id === activePlotId) {
          return { ...plot, mycelialSync: Math.min(100, +(plot.mycelialSync + 5.0).toFixed(1)) };
        }
        return plot;
      })
    );
    setSporePoints((sp) => sp + 15);
    triggerFloatingText('+5% Mycelial Sync | +15 SP', 'violet');
  };

  // Adopt New Plot
  const handleAdoptPlot = async () => {
    try {
      const res = await fetch('/api/plots/adopt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `Bioluminescent Cedar #SYL-${Math.floor(100 + Math.random() * 899)}`,
          species: 'Cedrus Biolumina',
          icon: '🪴',
        }),
      });

      if (res.ok) {
        const newPlot = await res.json();
        setPlots((prev) => [...prev, newPlot]);
        setActivePlotId(newPlot.id);
        setSporePoints(newPlot.newSporeBalance);
        audioEngine.playChime('nourish');
        triggerFloatingText('Plot Saved to Database!', 'emerald');
        return;
      }
    } catch (e) {}

    // Local fallback
    const newId = `plot-${Math.floor(100 + Math.random() * 899)}`;
    const newPlot = {
      id: newId,
      name: `Bioluminescent Cedar #${newId.toUpperCase()}`,
      species: 'Cedrus Biolumina',
      stage: 'Sprouting Sapling',
      stageLevel: 1,
      growth: 10.0,
      hydration: 90.0,
      mycelialSync: 85.0,
      icon: '🪴',
      adoptedDate: 'Just Now',
      sporesGenerated: 0,
    };
    setPlots((prev) => [...prev, newPlot]);
    setActivePlotId(newId);
    audioEngine.playChime('nourish');
    triggerFloatingText('New Plot Adopted!', 'emerald');
  };

  return (
    <section id="nursery" className="py-16 px-4 sm:px-8 max-w-7xl mx-auto relative z-10">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
          <Sprout className="w-3.5 h-3.5" />
          <span>Full-Stack SQLite Database Garden</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Adopt a Plot Virtual Tree Nursery
        </h2>
        <p className="text-slate-400 text-sm sm:text-base">
          Sponsor digital tree plots stored in the SQLite database, optimize hydration cycles, and earn Spore Points.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Plot Selector List (Left Column) */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
            Your Database Adopted Plots ({plots.length})
          </h3>

          {plots.map((plot) => {
            const isSelected = plot.id === activePlotId;
            return (
              <div
                key={plot.id}
                onClick={() => {
                  setActivePlotId(plot.id);
                  audioEngine.playChime('strata');
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                  isSelected
                    ? 'bg-emerald-950/40 border-emerald-500/40 shadow-xl glow-emerald-sm scale-[1.02]'
                    : 'bg-[#06150f]/60 border-white/10 hover:border-emerald-500/20 text-slate-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{plot.icon}</span>
                  <div>
                    <h4 className={`font-bold text-sm ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                      {plot.name}
                    </h4>
                    <p className="text-xs text-emerald-400/80 font-mono mt-0.5">
                      {plot.stage} • {plot.growth}%
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono text-slate-500">Yield</span>
                  <p className="text-xs font-mono font-bold text-amber-400">+{plot.sporesGenerated} SP</p>
                </div>
              </div>
            );
          })}

          {/* Adopt New Plot CTA Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-transparent border border-emerald-500/20 text-center space-y-2">
            <p className="text-xs font-mono text-emerald-300">Need more canopy offset capacity?</p>
            <button
              onClick={handleAdoptPlot}
              className="w-full py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors shadow-lg"
            >
              + Adopt New Digital Plot (Cost: 100 SP)
            </button>
          </div>
        </div>

        {/* Main Adopted Plot Card Showcase */}
        <div className="lg:col-span-8">
          
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-emerald-500/30 relative overflow-hidden">
            
            {/* Floating Reward Particle Popup */}
            {floatingText && (
              <div className="absolute top-6 right-6 z-20 animate-bounce bg-emerald-500 text-slate-950 px-4 py-2 rounded-xl font-mono font-extrabold text-xs shadow-2xl">
                {floatingText.text}
              </div>
            )}

            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-4xl shadow-inner">
                  {activePlot.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[10px] font-mono uppercase font-bold">
                      {activePlot.stage}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">Adopted: {activePlot.adoptedDate}</span>
                  </div>
                  <h3 className="text-2xl font-extrabold text-white mt-1 font-sans">
                    {activePlot.name}
                  </h3>
                  <p className="text-xs font-mono text-emerald-400 italic">
                    {activePlot.species}
                  </p>
                </div>
              </div>

              <div className="bg-[#030e09] border border-white/10 px-4 py-2 rounded-2xl text-right">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Spore Generation</span>
                <p className="text-lg font-mono font-extrabold text-amber-400">+{activePlot.sporesGenerated} SP</p>
              </div>
            </div>

            {/* Interactive Progress Gauges */}
            <div className="space-y-6 my-6">
              
              {/* Maturation Growth Progress */}
              <div>
                <div className="flex justify-between items-center text-xs font-mono mb-2">
                  <span className="text-slate-300 flex items-center gap-1.5 font-semibold">
                    <Trees className="w-4 h-4 text-emerald-400" />
                    <span>Canopy Maturation Stage</span>
                  </span>
                  <span className="text-emerald-400 font-bold">{activePlot.growth}%</span>
                </div>
                <div className="w-full bg-slate-900 h-3.5 rounded-full p-0.5 border border-emerald-500/20 relative overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-emerald-500 via-cyan-400 to-amber-400 h-full rounded-full transition-all duration-700 glow-emerald-sm"
                    style={{ width: `${activePlot.growth}%` }}
                  />
                </div>
              </div>

              {/* Hydration & Mycelial Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Hydration */}
                <div className="bg-[#030e09]/80 border border-white/10 p-4 rounded-2xl space-y-2">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Droplets className="w-3.5 h-3.5 text-cyan-400" /> Hydration Level
                    </span>
                    <span className="text-cyan-300 font-bold">{activePlot.hydration}%</span>
                  </div>
                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-cyan-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${activePlot.hydration}%` }}
                    />
                  </div>
                </div>

                {/* Mycelial Connectivity */}
                <div className="bg-[#030e09]/80 border border-white/10 p-4 rounded-2xl space-y-2">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-violet-400" /> Mycelial Grid Sync
                    </span>
                    <span className="text-violet-300 font-bold">{activePlot.mycelialSync}%</span>
                  </div>
                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-violet-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${activePlot.mycelialSync}%` }}
                    />
                  </div>
                </div>

              </div>

            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-4">
              
              <button
                onClick={handleNourish}
                className="flex-1 min-w-[180px] py-3.5 px-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-slate-950 font-bold text-sm shadow-xl hover:shadow-emerald-500/25 transition-all hover:scale-105 flex items-center justify-center gap-2"
              >
                <Sprout className="w-5 h-5 text-slate-950" />
                <span>Nourish Canopy (+8%)</span>
              </button>

              <button
                onClick={handleMistSoil}
                className="flex-1 min-w-[160px] py-3.5 px-5 rounded-2xl bg-[#061a1e] border border-cyan-500/40 text-cyan-300 font-bold text-sm hover:bg-cyan-500/10 transition-all flex items-center justify-center gap-2 glow-cyan-sm"
              >
                <Droplets className="w-5 h-5 text-cyan-400" />
                <span>Mist Soil (+12%)</span>
              </button>

              <button
                onClick={handlePulseRootMesh}
                className="py-3.5 px-5 rounded-2xl bg-[#120a1f] border border-violet-500/40 text-violet-300 font-mono font-bold text-sm hover:bg-violet-500/10 transition-all flex items-center justify-center gap-2 glow-violet-sm"
              >
                <Zap className="w-4 h-4 text-violet-400" />
                <span>Root Pulse</span>
              </button>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
