import React, { useState, useEffect } from 'react';
import { Network, X, Activity } from 'lucide-react';
import { audioEngine } from '../utils/audioSynth';

export default function MycelialNetworkModal({ isOpen, onClose }) {
  const [logs, setLogs] = useState([
    { id: 1, time: '07:34:02', source: 'Node #89', msg: 'Nutrient Packet (Nitrogen: 42mg) routed to Emergent Layer', status: 'SUCCESS' },
    { id: 2, time: '07:33:58', source: 'Node #12', msg: 'Bio-frequency 432Hz standing wave lock established', status: 'STABLE' },
    { id: 3, time: '07:33:45', source: 'Node #104', msg: 'Rhizosphere Moisture Sync complete (+0.8%)', status: 'OPTIMAL' },
  ]);

  const fetchLogs = async () => {
    try {
      const res = await fetch('/api/mycelial/logs');
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          setLogs(data);
        }
      }
    } catch (e) {}
  };

  useEffect(() => {
    if (!isOpen) return;
    fetchLogs();
    const interval = setInterval(fetchLogs, 3000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel-heavy max-w-3xl w-full rounded-3xl p-6 sm:p-8 relative border border-emerald-500/30 shadow-2xl space-y-6">
        
        {/* Close Button */}
        <button
          onClick={() => {
            onClose();
            audioEngine.playChime('strata');
          }}
          className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-violet-500/10 border border-violet-500/30 text-violet-400">
            <Network className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white font-sans">
              Subterranean Mycelial Signal Network
            </h3>
            <p className="text-xs font-mono text-violet-300">
              SQLite Database Fungal Communication Mesh &amp; Bio-Data Log
            </p>
          </div>
        </div>

        {/* Interactive Simulated Node Status Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
          <div className="bg-[#030d08] border border-emerald-500/30 p-3 rounded-2xl">
            <span className="text-slate-400 text-[10px]">ACTIVE MESH NODES</span>
            <p className="text-lg font-bold text-emerald-400 mt-0.5">1,420 Nodes</p>
          </div>
          <div className="bg-[#030d08] border border-cyan-500/30 p-3 rounded-2xl">
            <span className="text-slate-400 text-[10px]">PACKET LATENCY</span>
            <p className="text-lg font-bold text-cyan-400 mt-0.5">4.2 ms</p>
          </div>
          <div className="bg-[#030d08] border border-violet-500/30 p-3 rounded-2xl">
            <span className="text-slate-400 text-[10px]">HYPHAE BANDWIDTH</span>
            <p className="text-lg font-bold text-violet-400 mt-0.5">98.4 GB/s</p>
          </div>
          <div className="bg-[#030d08] border border-amber-500/30 p-3 rounded-2xl">
            <span className="text-slate-400 text-[10px]">ENCRYPTION</span>
            <p className="text-lg font-bold text-amber-400 mt-0.5">Bio-DNA 512</p>
          </div>
        </div>

        {/* Real-time Data Stream Logs */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-mono text-slate-300 uppercase tracking-widest flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-emerald-400 animate-spin" style={{ animationDuration: '4s' }} />
              <span>Live Express API Signal Packet Stream</span>
            </h4>
            <span className="text-[10px] font-mono text-emerald-400">● DATABASE SYNCED</span>
          </div>

          <div className="bg-[#020805] border border-white/10 rounded-2xl p-4 h-56 overflow-y-auto space-y-2 font-mono text-xs">
            {logs.map((log) => (
              <div key={log.id} className="flex items-start gap-3 p-2 rounded-xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/20 transition-all">
                <span className="text-slate-500 text-[11px] shrink-0">{log.time}</span>
                <span className="text-violet-400 font-bold shrink-0">{log.source}</span>
                <span className="text-slate-300 flex-1">{log.msg}</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] border border-emerald-500/20 font-bold shrink-0">
                  {log.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex justify-end pt-2">
          <button
            onClick={() => {
              audioEngine.playChime('nourish');
              onClose();
            }}
            className="px-6 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors shadow-lg"
          >
            Close Diagnostics
          </button>
        </div>

      </div>
    </div>
  );
}
