import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

export const DesignTesting = ({ darkMode, mobile }) => {
  // --- STATE ---
  const [progress, setProgress] = useState(0); // 0 to 100%
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(0.3); // Multiplier
  const requestRef = useRef();

  // --- CONFIGURATION ---
  const PUSH_THRESHOLD = 35;
  const SPEED_MULTIPLIER = speed; // Slow speed for clarity

  // --- THE GAME LOOP ---
  const animate = () => {
    setProgress(prev => {
      if (prev >= 100) {
        setIsPlaying(false);
        return 100;
      }
      return prev + SPEED_MULTIPLIER;
    });
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (isPlaying) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(requestRef.current);
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [isPlaying]);

  // --- PHYSICS CALCULATIONS ---

  // 1. Determine Phase
  const phase = progress < PUSH_THRESHOLD ? 'pushing' : progress >= 100 ? 'stopped' : 'coasting';
  const isPushing = phase === 'pushing';

  // 2. Skater Position (THE FIX)
  const startX = 40;
  const totalDistance = 200; // Total slide distance
  const pushDistanceLimit = 30; // Max pixels body moves while pushing (Arm Limit)

  let movement = 0;

  if (progress <= PUSH_THRESHOLD) {
    // PHASE 1: PUSHING
    // Only move a small amount (0 to 30px) so arm doesn't look like rubber
    movement = (progress / PUSH_THRESHOLD) * pushDistanceLimit;
  } else {
    // PHASE 2: COASTING
    // Move the rest of the distance (30px to 200px)
    const coastProgress = (progress - PUSH_THRESHOLD) / (100 - PUSH_THRESHOLD);
    const remainingDistance = totalDistance - pushDistanceLimit;
    movement = pushDistanceLimit + (coastProgress * remainingDistance);
  }

  const skaterX = startX + movement;

  // 3. Arrow Logic (Force Vectors)
  const rawForce = Math.min(progress / PUSH_THRESHOLD, 1.0);
  const arrowLength = 60 * rawForce;

  // --- THEME ---
  const theme = {
    text: darkMode ? 'text-slate-200' : 'text-slate-800',
    subText: darkMode ? 'text-slate-400' : 'text-slate-500',
    bg: darkMode ? 'bg-slate-900' : 'bg-white',
    panelBg: darkMode ? 'bg-slate-800' : 'bg-slate-50',
    border: darkMode ? 'border-slate-700' : 'border-slate-200',
    wallColor: darkMode ? '#334155' : '#94a3b8',
    groundColor: darkMode ? '#475569' : '#cbd5e1'
  };

  return (
    <div className={`w-full max-w-3xl mx-auto p-4 rounded-xl border shadow-sm ${theme.bg} ${theme.border}`}>

      {/* Header */}
      <div className="mb-6 text-center">
        <h2 className={`text-2xl font-bold ${theme.text}`}>Newton's 3rd Law</h2>
        <p className={`text-sm ${theme.subText}`}>Action & Reaction: The Wall Push</p>
      </div>

      {/* Animation Stage */}
      <div className={`relative w-full h-64 overflow-hidden rounded-lg border ${theme.panelBg} ${theme.border}`}>

        <svg viewBox="0 0 400 200" className="w-full h-full">
          <defs>
            <marker id="arrow-blue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
            </marker>
            <marker id="arrow-red" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
            </marker>
          </defs>

          {/* 1. THE ENVIRONMENT */}
          <rect x="0" y="20" width="20" height="180" fill={theme.wallColor} />
          <line x1="20" y1="20" x2="20" y2="200" stroke={darkMode ? '#1e293b' : '#64748b'} strokeWidth="2" />
          {/* Wall texture */}
          <line x1="0" y1="60" x2="20" y2="60" stroke="rgba(0,0,0,0.1)" />
          <line x1="0" y1="100" x2="20" y2="100" stroke="rgba(0,0,0,0.1)" />
          <line x1="0" y1="140" x2="20" y2="140" stroke="rgba(0,0,0,0.1)" />
          <line x1="0" y1="180" x2="400" y2="180" stroke={theme.groundColor} strokeWidth="4" />

          {/* 2. DYNAMIC ARROWS */}
          <g style={{ opacity: isPushing ? 1 : 0, transition: 'opacity 0.5s ease-out' }}>
            {arrowLength > 2 && (
              <>
                {/* ACTION (Blue) */}
                <line
                  x1="25" y1="110"
                  x2={25 - arrowLength} y2="110"
                  stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow-blue)"
                />
                {arrowLength > 20 && (
                  <text x="35" y="105" fill="#3b82f6" fontSize="10" fontWeight="bold">ACTION</text>
                )}

                {/* REACTION (Red) */}
                <line
                  x1="25" y1="110"
                  x2={25 + arrowLength} y2="110"
                  stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-red)"
                />
                {arrowLength > 20 && (
                  <text x="35" y="130" fill="#ef4444" fontSize="10" fontWeight="bold">REACTION</text>
                )}
              </>
            )}
          </g>

          {/* 3. THE SKATER */}
          <g transform={`translate(${skaterX}, 0)`}>
            {/* Skateboard */}
            <rect x="-15" y="170" width="30" height="4" rx="2" fill="#0f172a" />
            <circle cx="-10" cy="176" r="3" fill="#64748b" />
            <circle cx="10" cy="176" r="3" fill="#64748b" />

            {/* Body */}
            <line x1="-5" y1="170" x2="0" y2="140" stroke={theme.text === 'text-slate-200' ? '#e2e8f0' : '#334155'} strokeWidth="3" />
            <line x1="5" y1="170" x2="0" y2="140" stroke={theme.text === 'text-slate-200' ? '#e2e8f0' : '#334155'} strokeWidth="3" />
            <line x1="0" y1="140" x2="0" y2="100" stroke={theme.text === 'text-slate-200' ? '#e2e8f0' : '#334155'} strokeWidth="4" />
            <circle cx="0" cy="90" r="10" fill={theme.text === 'text-slate-200' ? '#e2e8f0' : '#334155'} />

            {/* Arms (Restricted to Wall Reach) */}
            {isPushing ? (
              // Arm reaches from shoulder (0,110) to wall (20 - skaterX, 110)
              // Since pushDistanceLimit is 30, and initial gap is 20, max arm length is ~50px.
              <line x1="0" y1="110" x2={20 - skaterX} y2="110" stroke={theme.text === 'text-slate-200' ? '#e2e8f0' : '#334155'} strokeWidth="3" />
            ) : (
              // Relaxed arm
              <line x1="0" y1="110" x2="-5" y2="130" stroke={theme.text === 'text-slate-200' ? '#e2e8f0' : '#334155'} strokeWidth="3" />
            )}
          </g>

        </svg>

        {/* Phase Indicator Overlay */}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border shadow-sm transition-colors duration-500
             ${phase === 'pushing'
              ? 'bg-blue-100 text-blue-700 border-blue-200'
              : phase === 'coasting'
                ? 'bg-green-100 text-green-700 border-green-200'
                : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
            {phase === 'pushing' ? '⚡ Pushing' : phase === 'coasting' ? '💨 Coasting' : '⏹ Stopped'}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-6 flex flex-col items-center gap-4">

        {/* Progress Bar */}
        <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden dark:bg-slate-700">
          <div
            className="h-full bg-blue-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          {!isPlaying && progress < 100 ? (
            <button
              onClick={() => setIsPlaying(true)}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold transition-transform active:scale-95"
            >
              <Play size={18} fill="currentColor" />
              {progress === 0 ? "Start Push" : "Resume"}
            </button>
          ) : isPlaying ? (
            <button
              onClick={() => setIsPlaying(false)}
              className="flex items-center gap-2 px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full font-bold transition-transform active:scale-95"
            >
              <Pause size={18} fill="currentColor" />
              Pause
            </button>
          ) : (
            <button
              onClick={() => {
                setIsPlaying(false);
                setProgress(0);
              }}
              className="flex items-center gap-2 px-6 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-full font-bold transition-transform active:scale-95"
            >
              <RotateCcw size={18} />
              Reset
            </button>
          )}

          <div className={`mt-4 flex items-center gap-2 uppercase font-bold text-sm ${darkMode ? 'text-white' : 'text-slate-800'}`}>
            <span>Slow</span>
            <input
              type="range"
              min="0.1" max="1" step="0.1"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className={`w-32 h-2 accent-blue-500 rounded-lg appearance-none cursor-pointer ${darkMode ? 'bg-slate-200' : 'bg-slate-300'}`}
            />
            <span>Fast</span>
          </div>
        </div>

        {/* Teaching Caption */}
        <p className={`text-center text-sm ${theme.subText} max-w-md mt-2 h-10`}>
          {isPushing
            ? progress === 0 ? `Press "Start Push" to push the wall. ` : "Applying Force: Action (Blue) and Reaction (Red) are equal."
            : "No Contact = No Force. The skater keeps moving due to inertia."}
        </p>
      </div>

    </div>
  );
};