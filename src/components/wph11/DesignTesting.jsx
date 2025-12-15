import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Pause } from 'lucide-react';

export const DesignTesting = () => {
  // --- State Configuration ---
  const [force, setForce] = useState(50); // Newtons (10-100)
  const [mass, setMass] = useState(5);    // kg (1-10)
  const [isRunning, setIsRunning] = useState(false);

  // Physics State (kept in refs for smooth animation loop without re-renders)
  const physicsState = useRef({
    position: 0, // pixels
    velocity: 0, // pixels per frame
    lastTime: 0
  });

  // We need a state to force re-render the position for the UI to update
  const [positionX, setPositionX] = useState(0);

  // Constants
  const PIXELS_PER_METER = 20; // Scale: 20px = 1 meter
  const RINK_LENGTH = 800;     // Total length of the track in pixels

  // Derived Values
  const acceleration = (force / mass).toFixed(2); // a = F/m

  // --- The Physics Engine ---
  useEffect(() => {
    let animationFrameId;

    const loop = (time) => {
      if (!isRunning) return;

      const state = physicsState.current;

      // Calculate Delta Time (in seconds) roughly
      // For simplicity in this demo, we treat each frame as a fixed time step
      // to avoid complex dt calculations that might jitter on some screens.
      const dt = 0.016; // approx 60fps (16ms)

      // Physics Formulas:
      // a = F / m
      // v_new = v_old + (a * dt)
      // x_new = x_old + (v * dt)

      const currentAccel = force / mass;

      // Update Velocity (scaling up accel for visual effect)
      // Multiplier 50 is just to make the movement visible on screen size
      state.velocity += currentAccel * dt * 50;

      // Update Position
      state.position += state.velocity * dt;

      // Wall Collision Check
      if (state.position >= RINK_LENGTH - 50) { // -50 accounts for puck width roughly
        state.position = RINK_LENGTH - 50;
        state.velocity = 0;
        setIsRunning(false); // Stop simulation
      }

      // Sync to React State for render
      setPositionX(state.position);

      animationFrameId = requestAnimationFrame(loop);
    };

    if (isRunning) {
      animationFrameId = requestAnimationFrame(loop);
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [isRunning, force, mass]);

  const handleReset = () => {
    setIsRunning(false);
    physicsState.current = { position: 0, velocity: 0, lastTime: 0 };
    setPositionX(0);
  };

  const togglePlay = () => {
    if (positionX >= RINK_LENGTH - 50) {
      handleReset(); // Auto-reset if at end
      setTimeout(() => setIsRunning(true), 50);
    } else {
      setIsRunning(!isRunning);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 font-sans p-4">

      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">

        {/* --- Header & Math Display --- */}
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-50/50">
          <div>
            <h2 className="text-xl font-bold text-slate-800">The Newton Slider</h2>
            <p className="text-sm text-slate-400">Interactive F = ma Lab</p>
          </div>

          {/* Math Card */}
          <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-xl shadow-sm border border-slate-200">
            <div className="text-center">
              <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Force</div>
              <div className="text-xl font-bold text-red-500">{force} N</div>
            </div>
            <div className="text-2xl text-slate-300">/</div>
            <div className="text-center">
              <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Mass</div>
              <div className="text-xl font-bold text-blue-500">{mass} kg</div>
            </div>
            <div className="text-2xl text-slate-300">=</div>
            <div className="text-center">
              <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Acceleration</div>
              <div className="text-xl font-bold text-green-500">{acceleration} m/s²</div>
            </div>
          </div>
        </div>

        {/* --- The Rink (Animation Stage) --- */}
        <div className="relative w-full h-80 bg-slate-50 overflow-hidden group">

          {/* Grid Lines for reference */}
          <div className="absolute inset-0"
            style={{ backgroundImage: 'linear-gradient(to right, #e2e8f0 1px, transparent 1px)', backgroundSize: '100px 100%' }}>
          </div>
          <div className="absolute bottom-0 w-full border-b-2 border-slate-300"></div>

          {/* THE PUCK ACTOR */}
          <div
            className="absolute bottom-20 transition-transform duration-75 ease-linear will-change-transform"
            style={{
              transform: `translateX(${positionX}px)`,
              // We center the elements relative to the position
            }}
          >
            {/* 1. The Puck Body */}
            {/* Scale changes based on Mass */}
            <div
              className="relative rounded-full shadow-2xl border-4 border-slate-700 flex items-center justify-center transition-all duration-300"
              style={{
                width: `${40 + (mass * 8)}px`, // Base 40px + 8px per kg
                height: `${40 + (mass * 8)}px`,
                backgroundColor: mass > 5 ? '#475569' : '#94a3b8', // Darker (Iron) vs Lighter (Styrofoam)
              }}
            >
              <span className="text-white text-[10px] font-bold opacity-50">m</span>
            </div>

            {/* 2. Force Vector (Red) */}
            {/* Length changes based on Force */}
            <div className="absolute top-1/2 left-1/2 -translate-y-1/2 z-10 pointer-events-none transition-all duration-300">
              <div
                className="h-1 bg-red-500 flex items-center rounded-r-full opacity-80"
                style={{ width: `${force * 2.5}px` }}
              >
                <span className="absolute -top-5 left-2 text-xs font-bold text-red-500">F</span>
                {/* Arrowhead */}
                <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[10px] border-l-red-500 ml-auto translate-x-1" />
              </div>
            </div>

            {/* 3. Acceleration Vector (Green) */}
            {/* Length changes based on Calculated Acceleration */}
            <div className="absolute bottom-full left-1/2 mb-2 z-10 pointer-events-none transition-all duration-300">
              <div
                className="h-1 bg-green-500 flex items-center rounded-r-full shadow-[0_0_10px_rgba(34,197,94,0.4)]"
                style={{ width: `${(force / mass) * 10}px` }}
              >
                <span className="absolute -top-5 left-2 text-xs font-bold text-green-500">a</span>
                {/* Arrowhead */}
                <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[10px] border-l-green-500 ml-auto translate-x-1" />
              </div>
            </div>

          </div>
        </div>

        {/* --- Controls Section --- */}
        <div className="p-8 bg-white border-t border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">

            {/* Force Slider */}
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <label className="font-bold text-slate-700 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div> Push Force
                </label>
                <span className="text-sm font-mono bg-slate-100 px-2 py-1 rounded text-slate-600">{force} N</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={force}
                onChange={(e) => setForce(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-500"
              />
              <p className="text-xs text-slate-400">Controls the red vector length.</p>
            </div>

            {/* Mass Slider */}
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <label className="font-bold text-slate-700 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-slate-500"></div> Object Mass
                </label>
                <span className="text-sm font-mono bg-slate-100 px-2 py-1 rounded text-slate-600">{mass} kg</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={mass}
                onChange={(e) => setMass(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-500"
              />
              <p className="text-xs text-slate-400 flex justify-between">
                <span>Styrofoam (1kg)</span>
                <span>Iron (10kg)</span>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-end">
              <button
                onClick={handleReset}
                className="p-4 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors font-bold"
              >
                <RotateCcw size={20} />
              </button>

              <button
                onClick={togglePlay}
                className={`flex-1 flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-white shadow-lg transition-all transform active:scale-95
                  ${isRunning ? 'bg-orange-500 hover:bg-orange-600' : 'bg-blue-600 hover:bg-blue-700'}`}
              >
                {isRunning ? (
                  <> <Pause fill="currentColor" /> Pause </>
                ) : (
                  <> <Play fill="currentColor" /> GO </>
                )}
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};