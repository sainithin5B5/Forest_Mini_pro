import React from 'react';
import { X, Sun, Wind, Droplets, Compass, ShieldCheck } from 'lucide-react';
import { audioEngine } from '../utils/audioSynth';

export default function WeatherDetailModal({ isOpen, onClose }) {
  const forecast = [
    { day: 'Today', temp: '24°C', cond: 'Sunny/Cloud', uv: '6.8' },
    { day: 'Sun', temp: '25°C', cond: 'Clear Sky', uv: '7.2' },
    { day: 'Mon', temp: '23°C', cond: 'Light Mist', uv: '5.4' },
    { day: 'Tue', temp: '24°C', cond: 'Partly Sunny', uv: '6.5' },
    { day: 'Wed', temp: '26°C', cond: 'Solar Peak', uv: '8.0' },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="hud-panel hud-corner max-w-xl w-full rounded-3xl p-6 relative border border-emerald-400 shadow-[0_0_50px_rgba(16,185,129,0.35)] flex flex-col justify-between font-sans text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={() => {
            audioEngine.playChime('strata');
            onClose();
          }}
          className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-emerald-400 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-emerald-500/30 pb-4">
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/40 text-amber-400 glow-amber-sm">
            <Sun className="w-6 h-6 animate-spin" style={{ animationDuration: '10s' }} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-extrabold text-white">Forest Micro-Climate &amp; Weather</h3>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold border border-amber-500/40">
                24°C STABLE
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Real-time Solar UV Index &amp; Atmospheric Moisture Forecast
            </p>
          </div>
        </div>

        {/* Detailed Metrics */}
        <div className="grid grid-cols-3 gap-3 my-4 font-mono text-xs text-center">
          <div className="hud-card p-3 rounded-xl border border-amber-500/30">
            <span className="text-[10px] text-slate-400 uppercase block">Solar UV Index</span>
            <span className="text-base font-extrabold text-amber-400 mt-0.5 block">6.8 High</span>
          </div>
          <div className="hud-card p-3 rounded-xl border border-cyan-500/30">
            <span className="text-[10px] text-slate-400 uppercase block">Wind Velocity</span>
            <span className="text-base font-extrabold text-cyan-300 mt-0.5 block">12 km/h</span>
          </div>
          <div className="hud-card p-3 rounded-xl border border-emerald-500/30">
            <span className="text-[10px] text-slate-400 uppercase block">Air Pressure</span>
            <span className="text-base font-extrabold text-emerald-300 mt-0.5 block">1013 hPa</span>
          </div>
        </div>

        {/* 5-Day Forecast Grid */}
        <div className="space-y-2 font-mono text-xs">
          <h4 className="text-[10px] text-slate-400 uppercase font-bold">5-Day Micro-Climate Forecast</h4>
          <div className="grid grid-cols-5 gap-2 text-center">
            {forecast.map((f, idx) => (
              <div key={idx} className="hud-card p-2 rounded-xl border border-emerald-500/20">
                <span className="text-[10px] text-slate-400 block font-bold">{f.day}</span>
                <span className="text-sm font-extrabold text-white block mt-0.5">{f.temp}</span>
                <span className="text-[9px] text-emerald-400 block mt-0.5 truncate">{f.cond}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-4 border-t border-emerald-500/30 font-mono text-xs">
          <span className="text-emerald-400 flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Weather Station: NOMINAL</span>
          </span>
          <button
            onClick={() => {
              audioEngine.playChime('nourish');
              onClose();
            }}
            className="px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition-colors shadow"
          >
            ✓ CLOSE FORECAST
          </button>
        </div>

      </div>
    </div>
  );
}
