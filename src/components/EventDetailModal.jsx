import React, { useState } from 'react';
import { X, Calendar, MapPin, Users, Check, Clock, ShieldCheck } from 'lucide-react';
import { audioEngine } from '../utils/audioSynth';

export default function EventDetailModal({ isOpen, onClose }) {
  const [rsvpedEvents, setRsvpedEvents] = useState([1]);

  const events = [
    { id: 1, title: 'Tree Plantation Drive', date: '24 May 2024', time: '10:00 AM', loc: 'Sector 02 Nursery', desc: 'Plant bioluminescent redwood saplings with eco-residents and earn +50 Spore Points!' },
    { id: 2, title: 'Sustainable Living Workshop', date: '26 May 2024', time: '09:00 AM', loc: 'Canopy Amphitheater', desc: 'Learn solar micro-grid optimization and hydro-purifier maintenance from environmental engineers.' },
    { id: 3, title: 'Community Bonfire Meetup', date: '28 May 2024', time: '05:00 PM', loc: 'Central Canopy Circle', desc: 'Evening gathering under the starlit forest canopy with bio-synth ambient music and organic tea.' },
  ];

  const toggleRsvp = (id) => {
    if (rsvpedEvents.includes(id)) {
      setRsvpedEvents(rsvpedEvents.filter((item) => item !== id));
    } else {
      setRsvpedEvents([...rsvpedEvents, id]);
      audioEngine.playChime('nourish');
    }
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
            <Calendar className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-extrabold text-white">Community Events &amp; RSVP</h3>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold border border-emerald-500/40">
                UPCOMING
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Eco-Resident Gatherings &amp; Tree Plantation Drives
            </p>
          </div>
        </div>

        {/* Events List */}
        <div className="space-y-3 my-4 font-mono text-xs max-h-[360px] overflow-y-auto pr-1">
          {events.map((evt) => {
            const isAttending = rsvpedEvents.includes(evt.id);
            return (
              <div key={evt.id} className="hud-card p-3.5 rounded-2xl border border-emerald-500/30 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-extrabold text-white text-sm">{evt.title}</h4>
                    <div className="flex items-center gap-3 text-[10px] text-slate-400 mt-0.5">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-emerald-400" /> {evt.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-amber-400" /> {evt.time}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-cyan-400" /> {evt.loc}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleRsvp(evt.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1 ${
                      isAttending
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : 'bg-slate-900 border-white/10 text-slate-300 hover:text-white'
                    }`}
                  >
                    {isAttending ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : null}
                    <span>{isAttending ? 'CONFIRMED' : 'RSVP NOW'}</span>
                  </button>
                </div>

                <p className="text-xs text-slate-300 font-sans leading-relaxed">{evt.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-3 border-t border-emerald-500/30 font-mono text-xs">
          <span className="text-emerald-400 flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{rsvpedEvents.length} Events Confirmed</span>
          </span>
          <button
            onClick={() => {
              audioEngine.playChime('nourish');
              onClose();
            }}
            className="px-6 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-colors shadow"
          >
            ✓ SAVE &amp; CLOSE
          </button>
        </div>

      </div>
    </div>
  );
}
