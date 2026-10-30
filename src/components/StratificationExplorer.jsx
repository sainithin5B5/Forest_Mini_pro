import React, { useState } from 'react';
import { 
  Sun, 
  CloudSun, 
  Sparkles, 
  Network, 
  CheckCircle2, 
  ArrowUpRight, 
  Zap, 
  Compass, 
  Eye,
  ShieldAlert,
  ChevronRight
} from 'lucide-react';
import { audioEngine } from '../utils/audioSynth';

export default function StratificationExplorer() {
  const [selectedStrataId, setSelectedStrataId] = useState('emergent');
  const [activeHabitant, setActiveHabitant] = useState(null);

  const strataData = [
    {
      id: 'emergent',
      name: 'Emergent Layer',
      altitude: '45m – 75m',
      shortDesc: 'Sun-drenched towering crowns braving high winds and extreme solar radiation.',
      glowColor: 'amber',
      badgeBg: 'bg-amber-500/10 border-amber-500/30 text-amber-300',
      accentGradient: 'from-amber-500/20 via-amber-500/5 to-transparent',
      borderColor: 'border-amber-500/30',
      textColor: 'text-amber-400',
      photonicLight: '98% Direct Solar',
      humidity: '42% Low Relative',
      windSpeed: '28 km/h Gusts',
      coHabitants: [
        { name: 'Apex Solar Hawk', category: 'Fauna', status: 'Nesting Active', icon: '🦅', detail: 'Monitors thermal updrafts above canopy crown.' },
        { name: 'Solaris Harvester Orchid', category: 'Flora', status: 'Bio-PV Photosynthesis', icon: '🌺', detail: 'Converts solar UV directly into bio-electric grid energy.' },
        { name: 'Emergent Monarch Beetle', category: 'Fauna', status: 'Pollinating', icon: '🪲', detail: 'Resistant to intense UV solar radiation.' },
      ],
      sensors: ['Solar Flux Array #7', 'Anemometer Matrix E-1', 'UV Index Sensor'],
      actionLabel: 'Deploy Solar Deflector Mesh',
    },
    {
      id: 'canopy',
      name: 'Upper Canopy Roof',
      altitude: '30m – 45m',
      shortDesc: 'Interlocking leaf ceiling housing 80% of all forest biodiversity.',
      glowColor: 'emerald',
      badgeBg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300',
      accentGradient: 'from-emerald-500/20 via-emerald-500/5 to-transparent',
      borderColor: 'border-emerald-500/30',
      textColor: 'text-emerald-400',
      photonicLight: '75% Filtered Daylight',
      humidity: '68% Balanced',
      windSpeed: '12 km/h Breeze',
      coHabitants: [
        { name: 'Cybernetic Gibbon', category: 'Fauna', status: 'Transiting Nodes', icon: '🐒', detail: 'Navigates high-speed canopy vine bridges.' },
        { name: 'Bioluminescent Fern', category: 'Flora', status: 'Spore Dispersion', icon: '🌿', detail: 'Glows softly at night with emerald illumination.' },
        { name: 'Vapor Spider', category: 'Fauna', status: 'Web Weaving', icon: '🕷️', detail: 'Harvests morning dew droplets for humidity regulation.' },
      ],
      sensors: ['Leaf Area Index Probe', 'Canopy Transpiration Meter', 'Carbon Sink Monitor'],
      actionLabel: 'Activate Canopy Mist Sprayers',
    },
    {
      id: 'understory',
      name: 'Understory Realm',
      altitude: '5m – 20m',
      shortDesc: 'Shaded humid sanctuary dominated by broad-leaved bio-glowing plants.',
      glowColor: 'cyan',
      badgeBg: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300',
      accentGradient: 'from-cyan-500/20 via-cyan-500/5 to-transparent',
      borderColor: 'border-cyan-500/30',
      textColor: 'text-cyan-400',
      photonicLight: '15% Diffuse Light',
      humidity: '88% High Moisture',
      windSpeed: '3 km/h Calm',
      coHabitants: [
        { name: 'Neon Tree Frog', category: 'Fauna', status: 'Vocalizing 432Hz', icon: '🐸', detail: 'Emits low bio-frequencies that calm plant root stress.' },
        { name: 'Phosphor Moss Array', category: 'Flora', status: 'Optic Transmission', icon: '🌱', detail: 'Acts as biological optic fiber guiding light down.' },
        { name: 'Shade Chameleon', category: 'Fauna', status: 'Camouflage Mode', icon: '🦎', detail: 'Dynamic chromatophores sync with ambient bio-light.' },
      ],
      sensors: ['Relative Humidity Probe', 'Acoustic Frequency Sensor', 'Diffused PAR Sensor'],
      actionLabel: 'Engage Diffuse Bio-Lighting',
    },
    {
      id: 'rhizosphere',
      name: 'Rhizosphere & Floor',
      altitude: '0m – 2m',
      shortDesc: 'Subterranean root network, fungal mycelium grid, and nutrient cycle hub.',
      glowColor: 'violet',
      badgeBg: 'bg-violet-500/10 border-violet-500/30 text-violet-300',
      accentGradient: 'from-violet-500/20 via-violet-500/5 to-transparent',
      borderColor: 'border-violet-500/30',
      textColor: 'text-violet-400',
      photonicLight: '2% Bioluminescent Only',
      humidity: '95% Saturated',
      windSpeed: '0 km/h Stagnant',
      coHabitants: [
        { name: 'Mycelial Mesh Node', category: 'Fungal Grid', status: 'Data & Nutrient Packet Flow', icon: '🍄', detail: 'Exchanges nitrogen and signals between all trees.' },
        { name: 'Luminous Earth Beetle', category: 'Fauna', status: 'Soil Aeration', icon: '🪲', detail: 'Breaks down dead biomass into nutrient-rich humus.' },
        { name: 'Deep Taproot Sentinel', category: 'Flora Anchor', status: 'Hydraulic Pumping', icon: '🪵', detail: 'Draws mineral water up from deep aquifer strata.' },
      ],
      sensors: ['Soil pH Sensor Matrix', 'Mycelial Signal Probe', 'Aquifer Depth Gauge'],
      actionLabel: 'Inject Mycelial Nutrient Packet',
    },
  ];

  const activeStrata = strataData.find((s) => s.id === selectedStrataId) || strataData[0];

  const handleSelectStrata = (id) => {
    setSelectedStrataId(id);
    setActiveHabitant(null);
    audioEngine.playChime('strata');
  };

  return (
    <section id="canopy" className="py-16 px-4 sm:px-8 max-w-7xl mx-auto relative z-10">
      
      {/* Section Title */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
          <Compass className="w-3.5 h-3.5" />
          <span>3D Vertical Forest Architecture</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Canopy Stratification Explorer
        </h2>
        <p className="text-slate-400 text-sm sm:text-base">
          Traverse from the sun-drenched Emergent crowns down to the subterranean Mycelial Rhizosphere. 
          Inspect micro-climates, endemic species, and automated bio-controls.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Vertical Strata Selector Column (4 Buttons stacked vertically with altitude connectors) */}
        <div className="lg:col-span-4 space-y-3 relative">
          
          <div className="hidden lg:block absolute left-6 top-8 bottom-8 w-1 bg-gradient-to-b from-amber-500 via-emerald-500 to-violet-500 rounded-full opacity-30 pointer-events-none" />

          {strataData.map((strata) => {
            const isSelected = strata.id === selectedStrataId;
            return (
              <button
                key={strata.id}
                onClick={() => handleSelectStrata(strata.id)}
                className={`w-full text-left p-5 rounded-2xl transition-all duration-300 relative border flex items-center justify-between group ${
                  isSelected
                    ? `${strata.badgeBg} shadow-2xl backdrop-blur-xl scale-[1.02]`
                    : 'bg-[#06150f]/60 border-white/10 text-slate-400 hover:text-slate-200 hover:border-emerald-500/30'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-sm border ${
                    isSelected 
                      ? 'bg-white/10 border-white/20 text-white shadow-inner' 
                      : 'bg-slate-900 border-white/10 text-slate-400'
                  }`}>
                    {strata.altitude.split(' ')[0]}
                  </div>
                  <div>
                    <h3 className={`font-bold text-base ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                      {strata.name}
                    </h3>
                    <span className="text-xs font-mono text-slate-400">{strata.altitude}</span>
                  </div>
                </div>

                <ChevronRight className={`w-5 h-5 transition-transform ${isSelected ? `${strata.textColor} translate-x-1` : 'text-slate-600 group-hover:translate-x-1'}`} />
              </button>
            );
          })}

        </div>

        {/* Spotlight Showcase Card */}
        <div className="lg:col-span-8">
          
          <div className={`glass-card p-6 sm:p-8 rounded-3xl border ${activeStrata.borderColor} relative overflow-hidden transition-all duration-500`}>
            
            {/* Background Glow Overlay */}
            <div className={`absolute -top-24 -right-24 w-80 h-80 bg-gradient-to-br ${activeStrata.accentGradient} rounded-full blur-3xl pointer-events-none`} />

            {/* Showcase Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold border ${activeStrata.badgeBg}`}>
                  ALTITUDE: {activeStrata.altitude}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 font-sans">
                  {activeStrata.name}
                </h3>
                <p className="text-sm text-slate-300 mt-1 max-w-xl">
                  {activeStrata.shortDesc}
                </p>
              </div>

              {/* Action Button */}
              <button
                onClick={() => audioEngine.playChime('nourish')}
                className={`px-4 py-2.5 rounded-xl border text-xs font-mono font-semibold flex items-center gap-2 shadow-lg transition-all hover:scale-105 ${activeStrata.badgeBg}`}
              >
                <Zap className="w-4 h-4" />
                <span>{activeStrata.actionLabel}</span>
              </button>
            </div>

            {/* Environmental Gauges Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
              <div className="bg-[#030e09]/80 border border-white/10 p-4 rounded-2xl">
                <p className="text-xs font-mono text-slate-400">Photonic Light</p>
                <p className="text-lg font-bold font-mono text-white mt-1">{activeStrata.photonicLight}</p>
              </div>
              <div className="bg-[#030e09]/80 border border-white/10 p-4 rounded-2xl">
                <p className="text-xs font-mono text-slate-400">Atmospheric Humidity</p>
                <p className="text-lg font-bold font-mono text-white mt-1">{activeStrata.humidity}</p>
              </div>
              <div className="bg-[#030e09]/80 border border-white/10 p-4 rounded-2xl">
                <p className="text-xs font-mono text-slate-400">Wind Velocity</p>
                <p className="text-lg font-bold font-mono text-white mt-1">{activeStrata.windSpeed}</p>
              </div>
            </div>

            {/* Endemic Co-Habitants List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <Sparkles className={`w-4 h-4 ${activeStrata.textColor}`} />
                  <span>Endemic Co-Habitants ({activeStrata.coHabitants.length})</span>
                </h4>
                <span className="text-[11px] font-mono text-slate-500">Hover for Telemetry</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {activeStrata.coHabitants.map((item, idx) => (
                  <div
                    key={idx}
                    onMouseEnter={() => setActiveHabitant(item)}
                    className="p-4 rounded-2xl bg-[#06150f]/80 border border-white/10 hover:border-emerald-500/40 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{item.icon}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-slate-300">
                        {item.category}
                      </span>
                    </div>
                    <h5 className="font-bold text-sm text-white mt-3 group-hover:text-emerald-400 transition-colors">
                      {item.name}
                    </h5>
                    <p className="text-xs text-emerald-400/80 font-mono mt-0.5">
                      ● {item.status}
                    </p>
                  </div>
                ))}
              </div>

              {/* Active Habitant Detail Drawer */}
              {activeHabitant && (
                <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-start gap-3 animate-fadeIn">
                  <Eye className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h6 className="text-xs font-mono font-bold text-emerald-300">
                      Species Telemetry: {activeHabitant.name}
                    </h6>
                    <p className="text-xs text-slate-300 mt-1">
                      {activeHabitant.detail}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Active IoT Sensors Footer */}
            <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center gap-2 text-[11px] font-mono text-slate-400">
              <span className="text-slate-500">Active Stratum Sensors:</span>
              {activeStrata.sensors.map((sensor, sIdx) => (
                <span key={sIdx} className="bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg text-slate-300">
                  {sensor}
                </span>
              ))}
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
