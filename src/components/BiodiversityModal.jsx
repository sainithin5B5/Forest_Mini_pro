import React, { useState } from 'react';
import { X, Trees, Search, ShieldCheck, Feather, Activity } from 'lucide-react';
import { audioEngine } from '../utils/audioSynth';

export default function BiodiversityModal({ isOpen, onClose }) {
  const [catFilter, setCatFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const speciesList = [
    { id: 1, name: 'Red Fox (Vulpes vulpes)', cat: 'animals', count: '12 Active', status: 'Healthy', loc: 'Sector 03' },
    { id: 2, name: 'Black Bear Herd (Ursus americanus)', cat: 'animals', count: '4 Active', status: 'Protected', loc: 'Sector 04' },
    { id: 3, name: 'Redwood Cedar (Sequoiadendron)', cat: 'plants', count: '62 Trees', status: 'Thriving', loc: 'All Sectors' },
    { id: 4, name: 'Bioluminescent Fern (Polystichum)', cat: 'plants', count: '140 Plants', status: 'Optimal', loc: 'Understory' },
    { id: 5, name: 'Canopy Hummingbird (Selasphorus)', cat: 'birds', count: '28 Birds', status: 'Active', loc: 'Emergent Roof' },
    { id: 6, name: 'Peregrine Falcon (Falco peregrinus)', cat: 'birds', count: '17 Birds', status: 'Protected', loc: 'Sector 01' },
  ];

  const filtered = speciesList.filter((s) => {
    const matchCat = catFilter === 'all' || s.cat === catFilter;
    const matchQ = s.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchQ;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="hud-panel hud-corner max-w-2xl w-full rounded-3xl p-6 relative border border-emerald-400 shadow-[0_0_50px_rgba(16,185,129,0.35)] flex flex-col justify-between font-sans text-slate-100 max-h-[85vh] overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={() => {
            audioEngine.playChime('strata');
            onClose();
          }}
          className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-emerald-400 transition-all z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-emerald-500/30 pb-4">
          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 glow-emerald-sm">
            <Trees className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-extrabold text-white">Forest Biodiversity Catalog</h3>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold border border-emerald-500/40">
                128 SPECIES
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Live Species Tracking &amp; Bio-Acoustic Sensor Index
            </p>
          </div>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="space-y-3 my-3 font-mono text-xs">
          
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by species name (e.g. Red Fox, Redwood, Falcon)..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#030e09] border border-emerald-500/30 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div className="flex items-center gap-2">
            {['all', 'birds', 'plants', 'animals'].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setCatFilter(cat);
                  audioEngine.playChime('strata');
                }}
                className={`px-3 py-1 rounded-xl uppercase transition-all ${
                  catFilter === cat
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                    : 'bg-slate-900 border border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Species List */}
        <div className="flex-1 overflow-y-auto space-y-2 font-mono text-xs pr-1 my-2">
          {filtered.map((s) => (
            <div key={s.id} className="hud-card p-3 rounded-2xl border border-emerald-500/30 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-white text-xs">{s.name}</h4>
                <div className="flex items-center gap-3 text-[10px] text-slate-400 mt-1">
                  <span>Count: <span className="text-emerald-300 font-bold">{s.count}</span></span>
                  <span>Location: <span className="text-cyan-300">{s.loc}</span></span>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/40">
                {s.status}
              </span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-3 border-t border-emerald-500/30 font-mono text-xs">
          <span className="text-emerald-400 flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Bio-Sensors: ACTIVE</span>
          </span>
          <button
            onClick={() => {
              audioEngine.playChime('nourish');
              onClose();
            }}
            className="px-6 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-colors shadow"
          >
            ✓ CLOSE CATALOG
          </button>
        </div>

      </div>
    </div>
  );
}
