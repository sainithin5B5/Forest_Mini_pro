import React, { useState, useEffect } from 'react';
import { 
  TreeDeciduous, 
  Wind, 
  Droplets, 
  Thermometer, 
  TrendingUp, 
  TrendingDown, 
  RefreshCw, 
  Radio 
} from 'lucide-react';
import { audioEngine } from '../utils/audioSynth';

export default function BentoTelemetry() {
  const [telemetry, setTelemetry] = useState({
    canopyDensity: 94.2,
    oxygenFlux: 128.4,
    soilHydration: 78.6,
    coreTemperature: 21.8,
  });

  const [isJitterActive, setIsJitterActive] = useState(true);

  // Fetch initial telemetry from Express API backend
  const fetchTelemetryFromAPI = async () => {
    try {
      const res = await fetch('/api/telemetry');
      if (res.ok) {
        const data = await res.json();
        if (data.current) {
          setTelemetry({
            canopyDensity: data.current.canopy_density,
            oxygenFlux: data.current.oxygen_flux,
            soilHydration: data.current.soil_hydration,
            coreTemperature: data.current.core_temperature,
          });
        }
      }
    } catch (err) {
      console.warn('Backend API offline, using client fallback', err);
    }
  };

  useEffect(() => {
    fetchTelemetryFromAPI();
  }, []);

  // Live Jitter & API Sync Interval
  useEffect(() => {
    if (!isJitterActive) return;
    const interval = setInterval(async () => {
      try {
        const res = await fetch('/api/telemetry/resync', { method: 'POST' });
        if (res.ok) {
          const data = await res.json();
          setTelemetry({
            canopyDensity: data.canopy_density,
            oxygenFlux: data.oxygen_flux,
            soilHydration: data.soil_hydration,
            coreTemperature: data.core_temperature,
          });
          return;
        }
      } catch (e) {}

      // Fallback local jitter if server is restarting
      setTelemetry((prev) => ({
        canopyDensity: Math.min(100, Math.max(80, +(prev.canopyDensity + (Math.random() * 0.4 - 0.2)).toFixed(1))),
        oxygenFlux: Math.min(200, Math.max(90, +(prev.oxygenFlux + (Math.random() * 0.8 - 0.4)).toFixed(1))),
        soilHydration: Math.min(100, Math.max(50, +(prev.soilHydration + (Math.random() * 0.3 - 0.15)).toFixed(1))),
        coreTemperature: Math.min(35, Math.max(15, +(prev.coreTemperature + (Math.random() * 0.2 - 0.1)).toFixed(1))),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [isJitterActive]);

  const handleManualRefresh = async () => {
    audioEngine.playChime('strata');
    try {
      const res = await fetch('/api/telemetry/resync', { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setTelemetry({
          canopyDensity: data.canopy_density,
          oxygenFlux: data.oxygen_flux,
          soilHydration: data.soil_hydration,
          coreTemperature: data.core_temperature,
        });
      }
    } catch (e) {
      setTelemetry({
        canopyDensity: +(94 + Math.random() * 2).toFixed(1),
        oxygenFlux: +(128 + Math.random() * 5).toFixed(1),
        soilHydration: +(78 + Math.random() * 3).toFixed(1),
        coreTemperature: +(21.5 + Math.random() * 1).toFixed(1),
      });
    }
  };

  return (
    <section id="telemetry" className="py-12 px-4 sm:px-8 max-w-7xl mx-auto relative z-10">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest">
            <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>SQLite Database IoT Telemetry API</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
            IoT Environmental Sensor Matrix
          </h2>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsJitterActive(!isJitterActive)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-mono flex items-center gap-2 transition-all ${
              isJitterActive
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                : 'bg-slate-800/50 border-white/10 text-slate-400'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${isJitterActive ? 'bg-emerald-400 animate-ping' : 'bg-slate-500'}`} />
            <span>{isJitterActive ? 'API Stream ACTIVE' : 'Stream PAUSED'}</span>
          </button>

          <button
            onClick={handleManualRefresh}
            className="p-2 rounded-xl bg-[#081a12] border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 transition-all"
            title="Force sensor resync against SQLite DB"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4 Telemetry Bento Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1: Canopy Density */}
        <div className="glass-card p-6 rounded-3xl relative overflow-hidden group hover:border-emerald-500/40">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 text-emerald-400">
              <TreeDeciduous className="w-6 h-6" />
            </div>
            <span className="flex items-center gap-1 text-xs font-mono font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              <TrendingUp className="w-3.5 h-3.5" /> +1.4%
            </span>
          </div>

          <div className="mt-4">
            <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">Canopy Foliage Density</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl sm:text-4xl font-extrabold font-mono text-white">
                {telemetry.canopyDensity}%
              </span>
              <span className="text-xs font-mono text-emerald-400">Nominal</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
            <span className="text-[11px] font-mono text-slate-400">Leaf Index: 6.8 LAI</span>
            <svg className="w-24 h-8 text-emerald-400 stroke-current fill-none stroke-2">
              <path d="M 0 20 Q 15 5 30 18 T 60 12 T 90 6" />
            </svg>
          </div>
        </div>

        {/* Card 2: Oxygen Flux */}
        <div className="glass-card p-6 rounded-3xl relative overflow-hidden group hover:border-cyan-500/40">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-cyan-500/10 rounded-2xl border border-cyan-500/20 text-cyan-400">
              <Wind className="w-6 h-6 animate-pulse" />
            </div>
            <span className="flex items-center gap-1 text-xs font-mono font-medium text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
              <TrendingUp className="w-3.5 h-3.5" /> +3.8%
            </span>
          </div>

          <div className="mt-4">
            <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">Oxygen Output Flux</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl sm:text-4xl font-extrabold font-mono text-white">
                {telemetry.oxygenFlux}
              </span>
              <span className="text-xs font-mono text-cyan-400">kg/h</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
            <span className="text-[11px] font-mono text-slate-400">Pure O₂ Ratio: 99.1%</span>
            <svg className="w-24 h-8 text-cyan-400 stroke-current fill-none stroke-2">
              <path d="M 0 15 Q 20 28 40 10 T 80 18 T 96 8" />
            </svg>
          </div>
        </div>

        {/* Card 3: Soil Hydration */}
        <div className="glass-card p-6 rounded-3xl relative overflow-hidden group hover:border-emerald-500/40">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 text-emerald-400">
              <Droplets className="w-6 h-6" />
            </div>
            <span className="flex items-center gap-1 text-xs font-mono font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              <TrendingUp className="w-3.5 h-3.5" /> +0.9%
            </span>
          </div>

          <div className="mt-4">
            <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">Rhizosphere Moisture</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl sm:text-4xl font-extrabold font-mono text-white">
                {telemetry.soilHydration}%
              </span>
              <span className="text-xs font-mono text-emerald-400">Optimal</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 space-y-1">
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full rounded-full transition-all duration-500" 
                style={{ width: `${telemetry.soilHydration}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-slate-400">
              <span>Dry 0%</span>
              <span>Saturated 100%</span>
            </div>
          </div>
        </div>

        {/* Card 4: Core Temperature */}
        <div className="glass-card p-6 rounded-3xl relative overflow-hidden group hover:border-violet-500/40">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-violet-500/10 rounded-2xl border border-violet-500/20 text-violet-400">
              <Thermometer className="w-6 h-6" />
            </div>
            <span className="flex items-center gap-1 text-xs font-mono font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              <TrendingDown className="w-3.5 h-3.5" /> -0.4%
            </span>
          </div>

          <div className="mt-4">
            <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">Core Canopy Temp</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl sm:text-4xl font-extrabold font-mono text-white">
                {telemetry.coreTemperature}°C
              </span>
              <span className="text-xs font-mono text-violet-400">Stable</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 space-y-1">
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-amber-400 h-full rounded-full transition-all duration-500" 
                style={{ width: `${(telemetry.coreTemperature / 40) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-slate-400">
              <span>0°C</span>
              <span>Target: 22°C</span>
              <span>40°C</span>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}
