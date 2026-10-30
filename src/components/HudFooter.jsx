import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Download, 
  Wind, 
  Clock 
} from 'lucide-react';

export default function HudFooter() {
  const [utcTime, setUtcTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setUtcTime(now.toUTCString().split(' ')[4] + ' UTC');
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full mt-6 space-y-3 font-mono">
      
      {/* 4 Bottom Status Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        
        {/* Box 1: Alerts */}
        <div className="hud-card p-3 rounded-xl border border-emerald-500/40 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">ALERTS: NONE</span>
            <span className="text-emerald-300 font-semibold text-xs block">All systems nominal</span>
          </div>
        </div>

        {/* Box 2: Data Stream */}
        <div className="hud-card p-3 rounded-xl border border-emerald-500/40 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Download className="w-4 h-4 animate-bounce" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">DATA STREAM: LIVE</span>
            <span className="text-cyan-300 font-bold text-xs block">1.2GB Synced</span>
          </div>
        </div>

        {/* Box 3: Carbon Offset */}
        <div className="hud-card p-3 rounded-xl border border-emerald-500/40 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Wind className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">CARBON OFFSET</span>
            <span className="text-emerald-300 font-bold text-xs block">2.3t CO₂ / month</span>
          </div>
        </div>

        {/* Box 4: Last Sync Live Clock */}
        <div className="hud-card p-3 rounded-xl border border-emerald-500/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">LAST SYNC</span>
              <span className="text-amber-400 font-extrabold text-xs block">{utcTime || '15:42:07 UTC'}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Sub-footer Line */}
      <div className="text-center pt-2 border-t border-emerald-500/20 text-[11px] text-emerald-400/70 tracking-widest uppercase">
        SMART FOREST — DIGITAL HABITATION MONITOR • CSE MINI PROJECT DEMO
      </div>

    </footer>
  );
}
