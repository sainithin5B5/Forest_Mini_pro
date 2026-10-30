import React, { useState } from 'react';
import { X, Zap, Sun, BatteryCharging, Home, ArrowRight, ShieldCheck, Power, RefreshCw } from 'lucide-react';
import { audioEngine } from '../utils/audioSynth';

export default function EnergyManagementModal({ isOpen, onClose }) {
  const [batteryMode, setBatteryMode] = useState('Auto Balance');
  const [gridEfficiency, setGridEfficiency] = useState(94.8);

  const handleBoostEfficiency = () => {
    setGridEfficiency(99.2);
    audioEngine.playChime('nourish');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="hud-panel hud-corner max-w-2xl w-full rounded-3xl p-6 relative border border-amber-400 shadow-[0_0_50px_rgba(245,158,11,0.35)] flex flex-col justify-between font-sans text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={() => {
            audioEngine.playChime('strata');
            onClose();
          }}
          className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-amber-400 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-amber-500/30 pb-4">
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/40 text-amber-400 glow-amber-sm">
            <Zap className="w-6 h-6 animate-bounce" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-extrabold text-white">Solar Micro-Grid Control Center</h3>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold border border-amber-500/40">
                85% RENEWABLE
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Real-time Solar Photovoltaic Generation &amp; Battery Storage Grid
            </p>
          </div>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-3 gap-3 my-4 font-mono text-xs text-center">
          <div className="hud-card p-3.5 rounded-2xl border border-amber-500/30">
            <span className="text-[10px] text-slate-400 uppercase block">Solar Photovoltaic</span>
            <span className="text-lg font-extrabold text-amber-400 mt-1 block">12.8 kWh</span>
            <span className="text-[10px] text-amber-500">6 Panels Online</span>
          </div>

          <div className="hud-card p-3.5 rounded-2xl border border-emerald-500/30">
            <span className="text-[10px] text-slate-400 uppercase block">Storage Battery</span>
            <span className="text-lg font-extrabold text-emerald-400 mt-1 block">87% Charge</span>
            <span className="text-[10px] text-emerald-500">50 kWh LiFePO4</span>
          </div>

          <div className="hud-card p-3.5 rounded-2xl border border-cyan-500/30">
            <span className="text-[10px] text-slate-400 uppercase block">Grid Efficiency</span>
            <span className="text-lg font-extrabold text-cyan-300 mt-1 block">{gridEfficiency}%</span>
            <span className="text-[10px] text-cyan-500">Pure Sine Wave</span>
          </div>
        </div>

        {/* Grid Control Actions */}
        <div className="space-y-3 font-mono text-xs">
          
          <div className="hud-card p-3.5 rounded-2xl border border-amber-500/30 flex items-center justify-between">
            <span className="text-slate-200 font-bold flex items-center gap-1.5">
              <Power className="w-4 h-4 text-amber-400" /> Battery Discharge Profile:
            </span>
            <select
              value={batteryMode}
              onChange={(e) => {
                setBatteryMode(e.target.value);
                audioEngine.playChime('time');
              }}
              className="bg-[#0e0a03] border border-amber-500/40 text-amber-300 font-bold px-3 py-1.5 rounded-xl focus:outline-none"
            >
              <option value="Auto Balance">Auto Balance (Recommended)</option>
              <option value="Peak Solar Priority">Peak Solar Priority</option>
              <option value="Off-Grid Reserve Mode">Off-Grid Reserve Mode</option>
            </select>
          </div>

          <button
            onClick={handleBoostEfficiency}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-emerald-500 text-slate-950 font-bold hover:scale-105 transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>BOOST MICRO-GRID FREQUENCY HARMONICS</span>
          </button>

        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-4 border-t border-amber-500/30 font-mono text-xs">
          <span className="text-amber-400 flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Micro-Grid Status: 100% NOMINAL</span>
          </span>
          <button
            onClick={() => {
              audioEngine.playChime('nourish');
              onClose();
            }}
            className="px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition-colors shadow"
          >
            ✓ CLOSE GRID CONTROL
          </button>
        </div>

      </div>
    </div>
  );
}
