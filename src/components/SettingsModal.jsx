import React, { useState } from 'react';
import { X, Settings, Volume2, Moon, RefreshCw, Database, ShieldCheck, Check } from 'lucide-react';
import { audioEngine } from '../utils/audioSynth';

export default function SettingsModal({ isOpen, onClose }) {
  const [volume, setVolume] = useState(80);
  const [autoRefreshSec, setAutoRefreshSec] = useState(3);
  const [themeMode, setThemeMode] = useState('Bioluminescent Obsidian');
  const [isBackupDone, setIsBackupDone] = useState(false);

  const handleSaveSettings = () => {
    audioEngine.playChime('nourish');
    onClose();
  };

  const handleBackupDB = () => {
    audioEngine.playChime('nourish');
    setIsBackupDone(true);
    setTimeout(() => setIsBackupDone(false), 3000);
  };

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
            <Settings className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-extrabold text-white">System Settings</h3>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold border border-emerald-500/40">
                PREFERENCES
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Customize Audio Synth, Dashboard Themes &amp; SQLite DB Sync
            </p>
          </div>
        </div>

        {/* Settings Body */}
        <div className="space-y-4 my-4 font-mono text-xs">
          
          {/* Audio Volume */}
          <div className="hud-card p-3.5 rounded-2xl border border-emerald-500/30 space-y-2">
            <div className="flex justify-between items-center text-slate-300">
              <span className="flex items-center gap-1.5 font-bold">
                <Volume2 className="w-4 h-4 text-emerald-400" /> Bio Synth Master Volume
              </span>
              <span className="text-emerald-400 font-bold">{volume}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              className="w-full accent-emerald-400 bg-slate-800 rounded-lg cursor-pointer h-2"
            />
          </div>

          {/* Telemetry Auto-Refresh Rate */}
          <div className="hud-card p-3.5 rounded-2xl border border-emerald-500/30 flex items-center justify-between">
            <span className="text-slate-300 font-bold flex items-center gap-1.5">
              <RefreshCw className="w-4 h-4 text-cyan-400" /> Telemetry Sync Rate:
            </span>
            <select
              value={autoRefreshSec}
              onChange={(e) => setAutoRefreshSec(e.target.value)}
              className="bg-[#030e09] border border-emerald-500/40 text-cyan-300 font-bold px-3 py-1.5 rounded-xl focus:outline-none"
            >
              <option value="1">Every 1 Second (High Speed)</option>
              <option value="3">Every 3 Seconds (Balanced)</option>
              <option value="5">Every 5 Seconds (Power Saver)</option>
            </select>
          </div>

          {/* Theme Preset */}
          <div className="hud-card p-3.5 rounded-2xl border border-emerald-500/30 flex items-center justify-between">
            <span className="text-slate-300 font-bold flex items-center gap-1.5">
              <Moon className="w-4 h-4 text-amber-400" /> Dashboard Preset:
            </span>
            <select
              value={themeMode}
              onChange={(e) => setThemeMode(e.target.value)}
              className="bg-[#030e09] border border-amber-500/40 text-amber-300 font-bold px-3 py-1.5 rounded-xl focus:outline-none"
            >
              <option value="Bioluminescent Obsidian">Bioluminescent Obsidian</option>
              <option value="Cyber Emerald HUD">Cyber Emerald HUD</option>
              <option value="Deep Forest Night">Deep Forest Night</option>
            </select>
          </div>

          {/* Database Backup Button */}
          <div className="hud-card p-3.5 rounded-2xl border border-emerald-500/30 flex items-center justify-between">
            <div>
              <span className="text-slate-200 font-bold flex items-center gap-1.5">
                <Database className="w-4 h-4 text-violet-400" /> SQLite Database Backup
              </span>
              <p className="text-[10px] text-slate-400">Export sylvaverse.db snapshot to local storage</p>
            </div>
            <button
              onClick={handleBackupDB}
              className="px-3 py-1.5 rounded-xl bg-violet-500/20 border border-violet-500/40 text-violet-300 font-bold hover:bg-violet-500/30 transition-all flex items-center gap-1"
            >
              {isBackupDone ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Database className="w-3.5 h-3.5" />}
              <span>{isBackupDone ? 'Backed Up!' : 'Backup DB'}</span>
            </button>
          </div>

        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-3 border-t border-emerald-500/30 font-mono text-xs">
          <span className="text-emerald-400 flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Config: SAVED</span>
          </span>
          <button
            onClick={handleSaveSettings}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold hover:scale-105 transition-all shadow-lg"
          >
            ✓ APPLY &amp; CLOSE
          </button>
        </div>

      </div>
    </div>
  );
}
