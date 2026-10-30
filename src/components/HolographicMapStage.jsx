import React, { useState, useRef } from 'react';
import { 
  RotateCw, 
  ZoomIn, 
  ZoomOut, 
  Layers, 
  Target, 
  Radio, 
  Compass,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { audioEngine } from '../utils/audioSynth';
import { featureDescriptions } from '../utils/featureDescriptions';

export default function HolographicMapStage({ onExplainFeature }) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [activeLayer, setActiveLayer] = useState('all'); // 'all', 'wildlife', 'sensors'
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // 3D Parallax Mouse Tilt Handler
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const tiltX = -(y / rect.height) * 16; // Max 16 deg tilt
    const tiltY = (x / rect.width) * 16;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleRotate = () => {
    setRotationAngle((prev) => (prev + 90) % 360);
    audioEngine.playChime('strata');
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(1.4, prev + 0.15));
    audioEngine.playChime('nourish');
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(0.8, prev - 0.15));
    audioEngine.playChime('strata');
  };

  const handleLayerToggle = () => {
    const layers = ['all', 'wildlife', 'sensors'];
    const nextIdx = (layers.indexOf(activeLayer) + 1) % layers.length;
    setActiveLayer(layers[nextIdx]);
    audioEngine.playChime('time');
  };

  return (
    <div className="hud-panel hud-corner rounded-2xl p-4 border border-emerald-500/40 shadow-2xl relative overflow-hidden flex flex-col justify-between h-full min-h-[520px]">
      
      {/* HUD Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-500/30 pb-3">
        <div>
          <h2 className="font-extrabold text-base sm:text-xl text-white font-sans tracking-wide flex items-center gap-2">
            <span>HOLOGRAPHIC FOREST</span>
            <span className="text-emerald-400 font-mono text-sm">— 3D MAP VIEW</span>
          </h2>
          <p className="text-[11px] font-mono text-emerald-400/80">
            ZONE: NORTH GROVE • GRID E-7 • SCALE: 100m
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <button
            onClick={() => onExplainFeature(featureDescriptions.map_3d)}
            className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/20 flex items-center gap-1"
          >
            <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>Click Map for Guide</span>
          </button>
        </div>
      </div>

      {/* Main 3D Holographic Parallax Container */}
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative my-3 rounded-xl overflow-hidden border border-emerald-500/40 bg-[#030a06] flex-1 flex items-center justify-center group cursor-crosshair perspective-1000"
      >
        
        {/* Holographic Mesh Grid Lines Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.06)_1px,transparent_1px)] bg-[size:25px_25px] pointer-events-none z-10" />

        {/* 3D Holographic Image Render with Parallax Tilt & Smooth Physics */}
        <div 
          className="w-full h-full min-h-[380px] flex items-center justify-center transition-transform duration-200 ease-out relative shadow-2xl"
          style={{ 
            transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${zoomLevel}) rotate(${rotationAngle}deg)`,
          }}
        >
          <img 
            src="/holographic_forest_map.png" 
            alt="3D Holographic Forest Habitation Map"
            className="w-full h-full object-cover rounded-xl opacity-90 group-hover:opacity-100 transition-opacity"
            onClick={() => onExplainFeature(featureDescriptions.map_3d)}
          />

          {/* Target 1: Red Fox RF-023 */}
          {(activeLayer === 'all' || activeLayer === 'wildlife') && (
            <div 
              onClick={(e) => {
                e.stopPropagation();
                onExplainFeature(featureDescriptions.red_fox);
              }}
              className="absolute top-[68%] right-[22%] z-20 cursor-pointer animate-hud-pulse flex items-center gap-1.5 bg-[#07170e]/95 border border-emerald-400 px-2 py-1 rounded text-[10px] font-mono text-emerald-300 shadow-xl glow-emerald-sm hover:scale-110 transition-transform"
            >
              <Target className="w-3 h-3 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
              <span>FOX • ID: RF-023 ❓</span>
            </div>
          )}

          {/* Target 2: Deer D-004 */}
          {(activeLayer === 'all' || activeLayer === 'wildlife') && (
            <div 
              onClick={(e) => {
                e.stopPropagation();
                onExplainFeature(featureDescriptions.deer_herd);
              }}
              className="absolute bottom-[18%] left-[24%] z-20 cursor-pointer animate-hud-pulse flex items-center gap-1.5 bg-[#07170e]/95 border border-emerald-400 px-2 py-1 rounded text-[10px] font-mono text-emerald-300 shadow-xl glow-emerald-sm hover:scale-110 transition-transform"
            >
              <Target className="w-3 h-3 text-cyan-400" />
              <span>DEER • ID: D-004 S-12 ❓</span>
            </div>
          )}

          {/* Target 3: IoT Sensor S-12 */}
          {(activeLayer === 'all' || activeLayer === 'sensors') && (
            <div 
              onClick={(e) => {
                e.stopPropagation();
                onExplainFeature(featureDescriptions.sensor_s12);
              }}
              className="absolute top-[26%] right-[38%] z-20 cursor-pointer flex items-center gap-1 bg-[#04120b]/95 border border-cyan-400 px-2 py-0.5 rounded text-[10px] font-mono text-cyan-300 shadow-xl hover:scale-110 transition-transform"
            >
              <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
              <span>IOT SENSOR NODE S-12 ❓</span>
            </div>
          )}

        </div>

        {/* 3D Tilt Instruction Badge */}
        <div className="absolute top-3 left-3 z-30 bg-black/70 backdrop-blur border border-white/10 px-2.5 py-1 rounded-lg text-[10px] font-mono text-slate-300 pointer-events-none flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-emerald-400" />
          <span>Move cursor to tilt map in 3D</span>
        </div>

      </div>

      {/* Interactive Controls Footer Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-emerald-500/30 font-mono text-xs">
        <span className="text-slate-400 flex items-center gap-1 text-[11px]">
          <Compass className="w-3.5 h-3.5 text-emerald-400" />
          <span>ZONE: NORTH GROVE — GRID E-7</span>
        </span>

        {/* ROTATE | ZOOM | LAYERS Action Buttons */}
        <div className="flex items-center gap-2">
          
          <button
            onClick={handleRotate}
            className="px-3 py-1.5 rounded-lg bg-[#071910] border border-emerald-500/40 text-emerald-300 font-bold hover:bg-emerald-500/20 transition-all flex items-center gap-1 shadow"
            title="Rotate 3D Map Orientation"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>ROTATE</span>
          </button>

          <div className="flex items-center bg-[#071910] border border-emerald-500/40 rounded-lg overflow-hidden">
            <button 
              onClick={handleZoomIn} 
              className="px-2.5 py-1.5 text-emerald-300 hover:bg-emerald-500/20 transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <span className="px-1 text-[10px] text-slate-400 border-x border-emerald-500/20">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button 
              onClick={handleZoomOut} 
              className="px-2.5 py-1.5 text-emerald-300 hover:bg-emerald-500/20 transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={handleLayerToggle}
            className="px-3 py-1.5 rounded-lg bg-[#071910] border border-emerald-500/40 text-cyan-300 font-bold hover:bg-cyan-500/20 transition-all flex items-center gap-1 shadow"
            title="Toggle Map Layers"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>LAYERS</span>
          </button>

        </div>

      </div>

    </div>
  );
}
