import React from 'react';
import { 
  Users, 
  Calendar, 
  Heart, 
  MessageSquare, 
  Share2, 
  AlertTriangle, 
  ChevronRight 
} from 'lucide-react';
import { audioEngine } from '../utils/audioSynth';

export default function CommunityHubSection({ onOpenEventModal, onOpenReportIssue, onOpenServiceRequest, onOpenShareUpdate }) {
  const events = [
    { title: 'Tree Plantation Drive', date: '24 May 2024', time: '10:00 AM' },
    { title: 'Sustainable Living Workshop', date: '26 May 2024', time: '09:00 AM' },
    { title: 'Community Meetup', date: '28 May 2024', time: '05:00 PM' },
  ];

  return (
    <section 
      id="community" 
      data-scroll-reveal 
      className="reveal-init glass-panel rounded-3xl p-6 border border-emerald-500/30 shadow-2xl space-y-6 h-full flex flex-col justify-between"
    >
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-emerald-500/20 pb-4">
        <div>
          <h2 className="font-extrabold text-xl text-white font-sans flex items-center gap-2">
            <span>Community Hub</span>
          </h2>
        </div>

        <span className="px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-300 font-bold">
          128 ECO RESIDENTS
        </span>
      </div>

      {/* Main 2-Column Split: Events (Left) & Bonfire Gathering Render (Right) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
        
        {/* Left Events List (5 Cols) */}
        <div className="md:col-span-5 space-y-3 font-mono text-xs flex flex-col justify-between">
          <div className="space-y-2">
            <h3 className="text-slate-400 uppercase text-[10px] font-bold">Upcoming Events</h3>

            {events.map((evt, idx) => (
              <div 
                key={idx} 
                onClick={() => {
                  audioEngine.playChime('nourish');
                  onOpenEventModal && onOpenEventModal();
                }}
                className="hud-card p-2.5 rounded-xl border border-emerald-500/30 hover:border-emerald-400 transition-all cursor-pointer"
              >
                <p className="font-bold text-white text-xs">{evt.title}</p>
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>{evt.date}</span>
                  <span className="text-emerald-400">{evt.time}</span>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={() => {
              audioEngine.playChime('strata');
              onOpenEventModal && onOpenEventModal();
            }}
            className="w-full py-2 rounded-xl bg-[#071910] border border-emerald-500/40 text-emerald-300 font-bold text-xs hover:bg-emerald-500/20 transition-all flex items-center justify-center gap-1 mt-2"
          >
            <span>View All Events</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right Bonfire Gathering Render & Stats (7 Cols) */}
        <div 
          onClick={() => {
            audioEngine.playChime('nourish');
            onOpenEventModal && onOpenEventModal();
          }}
          className="md:col-span-7 glass-card p-3 rounded-2xl border border-emerald-500/30 relative overflow-hidden flex flex-col justify-between min-h-[220px] cursor-pointer hover:border-emerald-400 transition-all"
        >
          
          <img 
            src="/community_hub_bonfire.png" 
            alt="Eco-residents bonfire gathering 3D render" 
            className="absolute inset-0 w-full h-full object-cover opacity-80 rounded-2xl"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />

          {/* Stats Overlay Bar */}
          <div className="relative z-10 grid grid-cols-4 gap-1 text-center font-mono text-xs mt-auto bg-black/75 backdrop-blur-md p-2.5 rounded-xl border border-white/10">
            <div>
              <span className="text-[10px] text-slate-400 block">Members</span>
              <span className="font-extrabold text-white text-sm">128</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Active Today</span>
              <span className="font-extrabold text-emerald-400 text-sm">42</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Projects</span>
              <span className="font-extrabold text-cyan-300 text-sm">8</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Success Rate</span>
              <span className="font-extrabold text-amber-400 text-sm">92%</span>
            </div>
          </div>

        </div>

      </div>

      {/* Quick Action Buttons Bar */}
      <div className="pt-2 border-t border-emerald-500/20 flex flex-wrap items-center gap-3 font-mono text-xs">
        <span className="text-slate-400 text-[10px] uppercase">Quick Actions:</span>

        <button 
          onClick={() => {
            audioEngine.playChime('nourish');
            onOpenReportIssue && onOpenReportIssue();
          }}
          className="flex-1 py-2 px-3 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-white hover:border-amber-400 transition-all flex items-center justify-center gap-1.5"
        >
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
          <span>Report Issue</span>
        </button>

        <button 
          onClick={() => {
            audioEngine.playChime('nourish');
            onOpenServiceRequest && onOpenServiceRequest();
          }}
          className="flex-1 py-2 px-3 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-white hover:border-cyan-400 transition-all flex items-center justify-center gap-1.5"
        >
          <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
          <span>Request Service</span>
        </button>

        <button 
          onClick={() => {
            audioEngine.playChime('nourish');
            onOpenShareUpdate && onOpenShareUpdate();
          }}
          className="flex-1 py-2 px-3 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-white hover:border-emerald-400 transition-all flex items-center justify-center gap-1.5"
        >
          <Share2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Share Update</span>
        </button>
      </div>

    </section>
  );
}
