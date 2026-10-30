import React from 'react';
import { X, HelpCircle, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { audioEngine } from '../utils/audioSynth';

export default function FeatureExplainerModal({ feature, onClose }) {
  if (!feature) return null;

  const handleClose = () => {
    audioEngine.playChime('strata');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="hud-panel hud-corner max-w-xl w-full rounded-3xl p-6 relative border border-emerald-400 shadow-[0_0_40px_rgba(16,185,129,0.3)] space-y-5 text-slate-100 font-sans">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-emerald-400 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-2xl shadow-inner glow-emerald-sm">
            {feature.icon || '🌿'}
          </div>
          <div>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[10px] font-mono font-bold uppercase tracking-wider">
              {feature.category || 'System Feature Explainer'}
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">
              {feature.title}
            </h3>
          </div>
        </div>

        {/* 1. What is this? (Simple terms) */}
        <div className="hud-card p-4 rounded-2xl border border-emerald-500/30 space-y-1.5 bg-[#03130b]">
          <h4 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-emerald-400" />
            <span>What is this? (Simple Explanation)</span>
          </h4>
          <p className="text-sm text-slate-200 leading-relaxed font-sans">
            {feature.simpleWhat}
          </p>
        </div>

        {/* 2. Why it matters for the forest */}
        <div className="hud-card p-4 rounded-2xl border border-cyan-500/30 space-y-1.5 bg-[#031317]">
          <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Why it Matters for the Forest</span>
          </h4>
          <p className="text-xs sm:text-sm text-cyan-100 leading-relaxed font-sans">
            {feature.whyItMatters}
          </p>
        </div>

        {/* 3. Live Status Value */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-white/10 font-mono text-xs">
          <span className="text-slate-400 flex items-center gap-1 text-[11px]">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Live System Status:</span>
          </span>
          <span className="text-emerald-300 font-bold">{feature.statusValue}</span>
        </div>

        {/* Bottom CTA */}
        <div className="flex justify-end pt-1">
          <button
            onClick={handleClose}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold text-xs hover:scale-105 transition-all shadow-lg font-mono"
          >
            ✓ GOT IT! CLOSE EXPLAINER
          </button>
        </div>

      </div>
    </div>
  );
}
