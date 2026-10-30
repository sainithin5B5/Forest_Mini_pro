import React, { useState } from 'react';
import { X, MessageSquare, CheckCircle2, Send, ShieldCheck } from 'lucide-react';
import { audioEngine } from '../utils/audioSynth';

export default function ServiceRequestModal({ isOpen, onClose }) {
  const [serviceType, setServiceType] = useState('solar');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    audioEngine.playChime('nourish');
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="hud-panel hud-corner max-w-lg w-full rounded-3xl p-6 relative border border-emerald-400 shadow-[0_0_50px_rgba(16,185,129,0.35)] flex flex-col justify-between font-sans text-slate-100">
        
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
          <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 glow-cyan-sm">
            <MessageSquare className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-extrabold text-white">Request Eco Service</h3>
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-mono font-bold border border-cyan-500/40">
                SERVICE ORDER
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Order Maintenance &amp; Environmental Upgrades for Habitat 07
            </p>
          </div>
        </div>

        {isSubmitted ? (
          <div className="py-12 text-center space-y-3 font-mono">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
            <h4 className="text-lg font-bold text-white">Service Request Submitted!</h4>
            <p className="text-xs text-slate-400">Order #SR-8042 assigned to Eco Engineering Team.</p>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="space-y-4 my-4 font-mono text-xs">
            
            <div className="space-y-1.5">
              <label className="text-slate-300 font-bold block">Select Service Category:</label>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="w-full p-3 rounded-xl bg-[#030e09] border border-cyan-500/40 text-cyan-300 font-bold focus:outline-none"
              >
                <option value="solar">☀️ Solar Micro-Grid &amp; Battery Inspection</option>
                <option value="water">💧 Hydro-Purifier Filter Cartridge Replacement</option>
                <option value="structure">🏡 Treehouse Skybridge Cable Safety Check</option>
                <option value="mycelial">🌿 Rhizosphere Sensor Node Calibration</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-300 font-bold block">Additional Instructions (Optional):</label>
              <textarea
                rows="3"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Specify preferred service time or specific notes..."
                className="w-full p-3 rounded-xl bg-[#030e09] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold hover:scale-105 transition-all shadow-lg flex items-center justify-center gap-2 text-sm"
            >
              <Send className="w-4 h-4" />
              <span>SUBMIT SERVICE REQUEST</span>
            </button>

          </form>
        )}

        {/* Footer */}
        <div className="flex justify-between items-center pt-3 border-t border-emerald-500/30 font-mono text-xs">
          <span className="text-cyan-400 flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Eco Team: DISPATCH READY</span>
          </span>
        </div>

      </div>
    </div>
  );
}
