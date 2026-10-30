import React from 'react';
import { X, Bell, ShieldCheck, Sun, Sparkles, Wind, Check } from 'lucide-react';
import { audioEngine } from '../utils/audioSynth';

export default function NotificationsModal({ isOpen, onClose }) {
  const notifications = [
    { id: 1, title: 'Nourishment Milestone', msg: 'Ancient Redwood Plot #SYL-904 reached 78.4% Maturation! (+25 SP awarded)', time: '10 mins ago', type: 'reward' },
    { id: 2, title: 'Solar Power Peak', msg: 'Solar grid output reached 1.24 kW at 87% battery efficiency in Residential Zone 01.', time: '25 mins ago', type: 'solar' },
    { id: 3, title: 'Wildlife Tracking Update', msg: 'Red Fox (RF-023) spotted in Sector-3. Health status nominal.', time: '1 hour ago', type: 'fauna' },
    { id: 4, title: 'Rainwater Harvest Alert', msg: 'Water harvest reservoir reached 340L capacity (68% full).', time: '2 hours ago', type: 'water' },
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
          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 glow-emerald-sm">
            <Bell className="w-6 h-6 animate-bounce" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-extrabold text-white">System Notifications</h3>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold border border-emerald-500/40">
                4 NEW
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Live Eco-System Alerts &amp; Nursery Rewards
            </p>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3 my-4 font-mono text-xs max-h-[350px] overflow-y-auto pr-1">
          {notifications.map((n) => (
            <div key={n.id} className="hud-card p-3 rounded-2xl border border-emerald-500/30 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-white text-xs">{n.title}</h4>
                  <span className="text-[10px] text-slate-400">{n.time}</span>
                </div>
                <p className="text-xs text-slate-300 font-sans mt-1 leading-relaxed">{n.msg}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-3 border-t border-emerald-500/30 font-mono text-xs">
          <span className="text-emerald-400 flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>All Alerts Cleared</span>
          </span>
          <button
            onClick={() => {
              audioEngine.playChime('nourish');
              onClose();
            }}
            className="px-6 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-colors shadow"
          >
            ✓ DISMISS ALL
          </button>
        </div>

      </div>
    </div>
  );
}
