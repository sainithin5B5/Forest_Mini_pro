import React, { useState } from 'react';
import { X, AlertTriangle, CheckCircle2, Send, ShieldCheck } from 'lucide-react';
import { audioEngine } from '../utils/audioSynth';

export default function ReportIssueModal({ isOpen, onClose }) {
  const [issueType, setIssueType] = useState('sensor');
  const [desc, setDesc] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleIssueSubmit = (e) => {
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
      <div className="hud-panel hud-corner max-w-lg w-full rounded-3xl p-6 relative border border-amber-400 shadow-[0_0_50px_rgba(245,158,11,0.35)] flex flex-col justify-between font-sans text-slate-100">
        
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
            <AlertTriangle className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-extrabold text-white">Report Maintenance Issue</h3>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold border border-amber-500/40">
                TICKET DISPATCH
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Report Infrastructure Anomalies to SylvaVerse Command
            </p>
          </div>
        </div>

        {isSubmitted ? (
          <div className="py-12 text-center space-y-3 font-mono">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
            <h4 className="text-lg font-bold text-white">Issue Ticket Submitted!</h4>
            <p className="text-xs text-slate-400">Ticket #TK-9142 assigned to Field Technician.</p>
          </div>
        ) : (
          <form onSubmit={handleIssueSubmit} className="space-y-4 my-4 font-mono text-xs">
            
            <div className="space-y-1.5">
              <label className="text-slate-300 font-bold block">Select Anomaly Category:</label>
              <select
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
                className="w-full p-3 rounded-xl bg-[#0e0a03] border border-amber-500/40 text-amber-300 font-bold focus:outline-none"
              >
                <option value="sensor">⚠️ Sensor Calibration Loss (Wind / Temp / Soil)</option>
                <option value="water">💧 Water Pressure Fluctuation in Habitat 07</option>
                <option value="lighting">💡 Skybridge Bioluminescent Light Dimming</option>
                <option value="power">⚡ Micro-Grid Inverter Voltage Ripple</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-300 font-bold block">Issue Description:</label>
              <textarea
                rows="3"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Describe the issue observed in the forest habitat..."
                className="w-full p-3 rounded-xl bg-[#0e0a03] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-emerald-500 text-slate-950 font-bold hover:scale-105 transition-all shadow-lg flex items-center justify-center gap-2 text-sm"
            >
              <Send className="w-4 h-4" />
              <span>DISPATCH MAINTENANCE TICKET</span>
            </button>

          </form>
        )}

        {/* Footer */}
        <div className="flex justify-between items-center pt-3 border-t border-amber-500/30 font-mono text-xs">
          <span className="text-amber-400 flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Field Team: STANDBY</span>
          </span>
        </div>

      </div>
    </div>
  );
}
