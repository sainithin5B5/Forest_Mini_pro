import React from 'react';
import { X, User, Home, Award, Sparkles, ShieldCheck, Heart, Wind } from 'lucide-react';
import { audioEngine } from '../utils/audioSynth';

export default function UserProfileModal({ isOpen, onClose, sporePoints }) {
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

        {/* Header Profile Badge */}
        <div className="flex items-center gap-4 border-b border-emerald-500/30 pb-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500/30 to-cyan-500/30 border border-emerald-400 flex items-center justify-center text-emerald-300 font-extrabold text-2xl shadow-inner glow-emerald-sm">
            AS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-extrabold text-white">Aarav Sharma</h3>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold border border-emerald-500/40">
                ECO RESIDENT
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Resident ID: #SYL-RES-9042 • Joined April 2026
            </p>
          </div>
        </div>

        {/* Profile Stats Grid */}
        <div className="grid grid-cols-2 gap-3 my-4 font-mono text-xs">
          
          <div className="hud-card p-3.5 rounded-2xl border border-emerald-500/30">
            <span className="text-[10px] text-slate-400 uppercase flex items-center gap-1">
              <Home className="w-3.5 h-3.5 text-emerald-400" /> Assigned Treehouse
            </span>
            <p className="text-sm font-bold text-white mt-1">Habitat 07 Suite</p>
            <span className="text-[10px] text-emerald-400">Canopy Elevation: 42m</span>
          </div>

          <div className="hud-card p-3.5 rounded-2xl border border-amber-500/30">
            <span className="text-[10px] text-slate-400 uppercase flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-amber-400" /> Guardian Rank
            </span>
            <p className="text-sm font-bold text-amber-300 mt-1">Elder Sentinel</p>
            <span className="text-[10px] text-amber-400">Tier 4 Certified</span>
          </div>

          <div className="hud-card p-3.5 rounded-2xl border border-cyan-500/30">
            <span className="text-[10px] text-slate-400 uppercase flex items-center gap-1">
              <Wind className="w-3.5 h-3.5 text-cyan-400" /> CO₂ Offset Impact
            </span>
            <p className="text-sm font-bold text-cyan-300 mt-1">14.8 Metric Tons</p>
            <span className="text-[10px] text-cyan-400">Lifetime Contribution</span>
          </div>

          <div className="hud-card p-3.5 rounded-2xl border border-violet-500/30">
            <span className="text-[10px] text-slate-400 uppercase flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-violet-400" /> Spore Points
            </span>
            <p className="text-sm font-bold text-violet-300 mt-1">{sporePoints || 240} SP</p>
            <span className="text-[10px] text-violet-400">SQLite DB Balance</span>
          </div>

        </div>

        {/* Resident Bio-Key Badge */}
        <div className="p-3 rounded-2xl bg-[#03140b] border border-emerald-500/30 font-mono text-xs flex items-center justify-between">
          <span className="text-slate-300 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Bio-Key Clearance Level:
          </span>
          <span className="text-emerald-300 font-bold bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/40">
            FULL CANOPY ACCESS
          </span>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-4 border-t border-emerald-500/30 font-mono text-xs">
          <button
            onClick={() => {
              audioEngine.playChime('nourish');
              onClose();
            }}
            className="px-6 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-colors shadow"
          >
            ✓ CLOSE RESIDENT PROFILE
          </button>
        </div>

      </div>
    </div>
  );
}
