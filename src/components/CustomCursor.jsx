import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [smoothPos, setSmoothPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Track clickable elements for hover expansion
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'SELECT' ||
        target.closest('.cursor-pointer') ||
        target.closest('button') ||
        target.getAttribute('role') === 'button'
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Smooth lerp animation loop for outer ring
  useEffect(() => {
    let animId;
    const updateSmoothPos = () => {
      setSmoothPos((prev) => {
        const dx = pos.x - prev.x;
        const dy = pos.y - prev.y;
        return {
          x: prev.x + dx * 0.22,
          y: prev.y + dy * 0.22,
        };
      });
      animId = requestAnimationFrame(updateSmoothPos);
    };
    animId = requestAnimationFrame(updateSmoothPos);
    return () => cancelAnimationFrame(animId);
  }, [pos]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden hidden md:block">
      
      {/* Outer Smooth Bioluminescent Halo Ring */}
      <div
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-transform duration-150 ease-out ${
          isHovered
            ? 'w-10 h-10 border-cyan-400 bg-cyan-500/20 scale-125 glow-cyan-sm'
            : isClicked
            ? 'w-6 h-6 border-amber-400 bg-amber-500/20 scale-90'
            : 'w-8 h-8 border-emerald-400/60 bg-emerald-500/10'
        }`}
        style={{
          transform: `translate3d(${smoothPos.x}px, ${smoothPos.y}px, 0) translate(-50%, -50%)`,
        }}
      />

      {/* Inner Fast Emerald Core Dot */}
      <div
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-75 ${
          isHovered
            ? 'w-3 h-3 bg-cyan-300 shadow-[0_0_12px_#06b6d4]'
            : 'w-2 h-2 bg-emerald-400 shadow-[0_0_10px_#10b981]'
        }`}
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`,
        }}
      />

    </div>
  );
}
