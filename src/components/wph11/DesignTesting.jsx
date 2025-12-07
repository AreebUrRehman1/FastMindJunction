import React, { useState, useEffect, useRef } from 'react';

export const DesignTesting = () => {
  // --- STATE ---
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // --- REFS ---
  const requestRef = useRef();
  const startTimeRef = useRef(0);
  const pausedTimeRef = useRef(0);

  // --- CONFIG ---
  const WIDTH = 800;
  const HEIGHT = 450;
  const CLIFF_WIDTH = 100;
  const CLIFF_HEIGHT = 150; // Distance from top
  const DURATION = 3.5;     // Seconds to cross screen roughly

  // PHYSICS CONSTANTS (Tuned for visual fit)
  const VELOCITY_X = 180;   // pixels per second
  const GRAVITY = 150;      // pixels per second squared

  // --- PHYSICS ENGINE ---
  const getPosition = (t) => {
    // Horizontal: x = x0 + vx * t
    const x = CLIFF_WIDTH + (VELOCITY_X * t);
    
    // Vertical: y = y0 + vy0 * t + 0.5 * g * t^2
    // Launching horizontally means vy0 = 0
    const y = CLIFF_HEIGHT + (0.5 * GRAVITY * t * t);

    return { x, y };
  };

  // --- ANIMATION LOOP ---
  const animate = (timestamp) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const elapsed = (timestamp - startTimeRef.current + pausedTimeRef.current) / 1000;

    const { x, y } = getPosition(elapsed);

    // Stop if off screen
    if (x > WIDTH - 20 || y > HEIGHT - 20) {
      setIsFinished(true);
      setIsPlaying(false);
      // Clamp to final position
      setTime(elapsed); 
      return;
    }

    setTime(elapsed);
    requestRef.current = requestAnimationFrame(animate);
  };

  // --- CONTROLS ---
  const handleStart = () => {
    if (isFinished) handleReset();
    setIsPlaying(true);
    setIsFinished(false);
    requestRef.current = requestAnimationFrame(animate);
  };

  const handlePause = () => {
    setIsPlaying(false);
    cancelAnimationFrame(requestRef.current);
    pausedTimeRef.current += performance.now() - startTimeRef.current;
    startTimeRef.current = 0;
  };

  const handleReset = () => {
    setIsPlaying(false);
    setIsFinished(false);
    cancelAnimationFrame(requestRef.current);
    startTimeRef.current = 0;
    pausedTimeRef.current = 0;
    setTime(0);
  };

  useEffect(() => {
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  // --- CALCULATE POSITIONS ---
  const pos = getPosition(time);
  
  // Shadows
  const topShadowPos = { x: pos.x, y: 30 }; // Fixed Y at top
  const sideShadowPos = { x: WIDTH - 30, y: pos.y }; // Fixed X at right

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-100 flex flex-col items-center py-8">
      
      <div className="max-w-4xl w-full bg-slate-800 rounded-xl shadow-2xl overflow-hidden border border-slate-700">
        
        {/* HEADER */}
        <div className="bg-slate-950 p-6 flex justify-between items-center border-b border-slate-800">
            <div>
                <h1 className="text-2xl font-bold text-yellow-400">Projectile Motion: The Shadows</h1>
                <p className="text-slate-400 text-sm">Motion decomposed into independent X and Y components</p>
            </div>
            <div className="text-right font-mono text-sm">
                <div className="text-blue-400">
                  {time === 0 ? "Vx = 0 (Ready)" : isFinished ? "Vx = 0 (Stopped)" : "Vx = Constant"}
                </div>
                <div className="text-red-400">
                  {time === 0 ? "Vy = 0 (Ready)" : isFinished ? "Vy = 0 (Stopped)" : "Vy = Accelerating (Gravity)"}
                </div>
            </div>
        </div>

        {/* STAGE */}
        <div className="relative bg-slate-900 overflow-hidden">
            <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full h-auto">
                
                {/* 1. SCENERY */}
                {/* Cliff */}
                <path 
                    d={`M 0 ${HEIGHT} L 0 ${CLIFF_HEIGHT} L ${CLIFF_WIDTH} ${CLIFF_HEIGHT} L ${CLIFF_WIDTH} ${HEIGHT} Z`} 
                    fill="#334155" 
                />
                {/* Ground */}
                <rect x="0" y={HEIGHT-10} width={WIDTH} height="10" fill="#334155" />

                {/* 2. SYNC LINES (The Dotted Connectors) */}
                {/* Vertical Line (Connects Top Shadow to Real Ball) */}
                <line 
                    x1={pos.x} y1={topShadowPos.y} 
                    x2={pos.x} y2={pos.y} 
                    stroke="#3b82f6" strokeWidth="1" strokeDasharray="5,5" opacity="0.6"
                />
                {/* Horizontal Line (Connects Side Shadow to Real Ball) */}
                <line 
                    x1={pos.x} y1={pos.y} 
                    x2={sideShadowPos.x} y2={pos.y} 
                    stroke="#ef4444" strokeWidth="1" strokeDasharray="5,5" opacity="0.6"
                />

                {/* 3. THE SHADOWS */}
                
                {/* Top Shadow (Horizontal Motion) */}
                <circle cx={topShadowPos.x} cy={topShadowPos.y} r="15" fill="#3b82f6" opacity="0.4" />
                <circle cx={topShadowPos.x} cy={topShadowPos.y} r="8" fill="#3b82f6" />
                <text x={topShadowPos.x} y={topShadowPos.y - 20} fill="#3b82f6" fontSize="12" textAnchor="middle">
                  {time === 0 ? "Ready" : isFinished ? "Stopped" : "Constant Speed"}
                </text>

                {/* Side Shadow (Vertical Motion) */}
                <circle cx={sideShadowPos.x} cy={sideShadowPos.y} r="15" fill="#ef4444" opacity="0.4" />
                <circle cx={sideShadowPos.x} cy={sideShadowPos.y} r="8" fill="#ef4444" />
                <text x={sideShadowPos.x - 25} y={sideShadowPos.y + 4} fill="#ef4444" fontSize="12" textAnchor="end">
                  {time === 0 ? "Ready" : isFinished ? "Stopped" : "Accelerating"}
                </text>


                {/* 4. THE REAL BALL (Projectile) */}
                <circle cx={pos.x} cy={pos.y} r="12" fill="#facc15" stroke="white" strokeWidth="2" />

                {/* 5. TRAIL (Optional Visual Flair) */}
                {/* We draw a simple path of the trajectory up to current time */}
                <path 
                    d={`M ${CLIFF_WIDTH} ${CLIFF_HEIGHT} Q ${CLIFF_WIDTH + VELOCITY_X * (time/2)} ${CLIFF_HEIGHT} ${pos.x} ${pos.y}`}
                    fill="none" stroke="#facc15" strokeWidth="2" strokeDasharray="4" opacity="0.3"
                />

            </svg>

            {/* Teaching Context Overlays */}
            <div className="absolute top-20 left-4 w-48 text-xs text-slate-400">
                The Blue Shadow moves steadily because gravity only acts downwards, not sideways.
            </div>
        </div>

        {/* CONTROLS */}
        <div className="p-6 bg-slate-800 border-t border-slate-700 flex justify-center gap-4">
            <button 
                onClick={isPlaying ? handlePause : handleStart}
                className={`font-bold py-3 px-8 rounded-full shadow-lg transition-transform active:scale-95 flex items-center gap-2
                    ${isPlaying ? 'bg-yellow-600 hover:bg-yellow-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white'}`}
            >
                {isPlaying ? "⏸ Pause" : isFinished ? "↺ Replay" : "▶ Launch"}
            </button>

            <button 
                onClick={handleReset}
                className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-6 rounded-full"
            >
                Reset
            </button>
        </div>

      </div>
    </div>
  );
};