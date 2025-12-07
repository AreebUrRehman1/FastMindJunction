import { useState, useEffect, useRef } from 'react';

export const DisplacementVelocityAndAcceleration = ({ darkMode }) => {
  // --- SCALAR STATE (Thermometer) ---
  const [temp, setTemp] = useState(25);

  // --- VECTOR STATE (Archer) ---
  const [angle, setAngle] = useState(0);
  const [isDrawn, setIsDrawn] = useState(false);

  // --- HELPERS ---

  // Calculate Color based on temperature
  const getTempColor = (t) => {
    if (t > 30) return '#ef4444'; // red-500
    if (t > 15) return '#f59e0b'; // amber-500
    return '#3b82f6'; // blue-500
  };

  // Calculate Mercury position
  // Max height = 120 (at 100°C), Base Y = 200 (at 0°C)
  const mercuryHeight = (temp / 100) * 120;
  const mercuryY = 200 - mercuryHeight;
  const activeColor = getTempColor(temp);

  // Calculate Direction text based on angle
  const getDirectionText = (deg) => {
    // Normalize degree just in case
    const d = deg % 360;
    if (d > 45 && d < 135) return "South";
    if (d >= 135 && d < 225) return "West";
    if (d >= 225 && d < 315) return "North";
    return "East";
  };

  // --- DARK MODE COLORS ---
  const theme = {
    bg: darkMode ? 'bg-slate-900' : 'bg-slate-50',
    textMain: darkMode ? 'text-slate-100' : 'text-slate-800',
    textSub: darkMode ? 'text-slate-400' : 'text-slate-500',
    cardBg: darkMode ? 'bg-slate-800' : 'bg-white',
    cardBorder: darkMode ? 'border-slate-700' : 'border-slate-300',

    // SVG Specifics
    svgFill: darkMode ? '#334155' : '#e2e8f0',      // Thermometer body
    svgStroke: darkMode ? '#475569' : '#cbd5e1',    // Thermometer outline
    tickColor: darkMode ? '#64748b' : '#94a3b8',    // Ticks on thermometer
    gridColor: darkMode ? '#475569' : '#94a3b8',    // Background grid dots
    archerBody: darkMode ? '#cbd5e1' : '#475569',   // Archer person
    dashedLine: darkMode ? '#64748b' : '#94a3b8',
    inputBg: darkMode ? 'bg-slate-700' : 'bg-slate-200'
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${theme.bg} ${theme.textMain}`}>

      {/* MAIN CONTENT */}
      <main className="flex-grow flex flex-col md:flex-row relative">

        {/* --- LEFT SIDE: SCALAR --- */}
        <section className={`w-full md:w-1/2 flex flex-col items-center justify-center p-4 md:p-6 relative overflow-hidden transition-colors duration-300 ${theme.bg}`}>
          <div className={`${darkMode ? 'bg-orange-900 text-orange-200' : 'bg-orange-100 text-orange-800'} absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-colors`}>
            Scalar Quantity
          </div>

          <h2 className={`text-3xl font-bold mb-8 drop-shadow-sm ${darkMode ? 'text-slate-200' : 'text-slate-700'} not-md:mt-10`}>Temperature</h2>

          {/* Thermometer SVG */}
          <div className="relative w-32 h-80">
            <svg width="100%" height="100%" viewBox="0 0 100 300">
              {/* Tube Background */}
              <rect x="35" y="20" width="30" height="240" rx="15" fill={theme.svgFill} stroke={theme.svgStroke} strokeWidth="2" className="transition-all duration-300" />
              {/* Bulb */}
              <circle cx="50" cy="260" r="30" fill={theme.svgFill} stroke={theme.svgStroke} strokeWidth="2" className="transition-all duration-300" />

              {/* Mercury (The Scalar Value) */}
              <rect
                x="40"
                y={mercuryY}
                width="20"
                height={mercuryHeight > 0 ? mercuryHeight : 0.1}
                rx="10"
                fill={activeColor}
                className="transition-all duration-1000 ease-in-out"
              />
              <circle cx="50" cy="260" r="22" fill={activeColor} className="transition-colors duration-1000" />

              {/* Ticks */}
              <line x1="35" y1="200" x2="20" y2="200" stroke={theme.tickColor} strokeWidth="2" />
              <text x="5" y="205" fontSize="12" fill={theme.tickColor}>0</text>

              <line x1="35" y1="140" x2="20" y2="140" stroke={theme.tickColor} strokeWidth="2" />
              <text x="0" y="145" fontSize="12" fill={theme.tickColor}>50</text>

              <line x1="35" y1="80" x2="20" y2="80" stroke={theme.tickColor} strokeWidth="2" />
              <text x="-5" y="85" fontSize="12" fill={theme.tickColor}>100</text>
            </svg>
          </div>

          {/* Value Display */}
          <div className="mt-6 text-center">
            <p className="text-5xl font-mono font-bold transition-colors duration-500" style={{ color: activeColor }}>
              {temp}&deg;C
            </p>
            <p className={`${theme.textSub} mt-2 text-sm max-w-xs transition-colors`}>
              Defined only by <strong>magnitude</strong> (how much). <br />Direction does not exist.
            </p>
          </div>

          {/* Slider */}
          <div className="mt-8 w-64">
            <label className={`text-xs font-bold uppercase block mb-1 ${theme.textSub}`}>Change Temperature</label>
            <input
              type="range"
              min="0"
              max="100"
              value={temp}
              onChange={(e) => setTemp(Number(e.target.value))}
              className={`w-full h-2 rounded-lg appearance-none cursor-pointer accent-blue-500 transition-colors ${theme.inputBg}`}
            />
          </div>
        </section>


        {/* --- RIGHT SIDE: VECTOR --- */}
        <section className={`w-full md:w-1/2 flex flex-col items-center justify-center p-4 md:p-6 relative overflow-hidden transition-colors duration-300 ${theme.bg}  md:border-l ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
          <div className={`${darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'} absolute top-4 left-4 px-3 py-1 not-md:mt-10 rounded-full text-xs font-bold uppercase tracking-wider transition-colors`}>
            Vector Quantity
          </div>

          <h2 className={`text-3xl font-bold mb-8 drop-shadow-sm ${darkMode ? 'text-slate-200' : 'text-slate-700'} not-md:mt-20`}>Force</h2>

          {/* Physics Canvas Area */}
          <div className={`relative w-full max-w-md h-80 flex items-center justify-center border border-dashed rounded-lg overflow-hidden shadow-sm transition-colors duration-300 ${theme.cardBg} ${theme.cardBorder}`}>

            {/* Grid Background */}
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `radial-gradient(${theme.gridColor} 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}>
            </div>

            {/* Archer Container (Rotates based on State) */}
            <div
              className="relative w-64 h-64 flex items-center justify-center transition-transform duration-300 ease-out origin-center"
              style={{ transform: `rotate(${angle}deg)` }}
            >
              {/* SVG Archer */}
              <svg width="200" height="200" viewBox="0 0 200 200" className="overflow-visible">
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#2563eb" />
                  </marker>
                </defs>

                {/* Force Arrow (The Vector) */}
                <g className={`transition-opacity duration-300 ${isDrawn ? 'opacity-100' : 'opacity-0'}`}>
                  {/* Dashed line */}
                  <line x1="100" y1="100" x2="300" y2="100" stroke={theme.dashedLine} strokeWidth="2" strokeDasharray="5,5" />
                  {/* Bold Blue Arrow */}
                  <line x1="120" y1="100" x2="200" y2="100" stroke="#2563eb" strokeWidth="3" markerEnd="url(#arrowhead)" />
                  <text x="140" y="85" fill="#2563eb" fontWeight="bold" fontSize="16">F (Force)</text>
                </g>

                {/* Archer Body (Top Down View) */}
                <circle cx="100" cy="100" r="15" fill={theme.archerBody} className="transition-all duration-300" />
                <path d="M100 85 L100 115" stroke={theme.archerBody} strokeWidth="4" className="transition-all duration-300" />

                {/* Bow (Fixed shape) */}
                <path d="M100 50 Q 130 100 100 150" fill="none" stroke="#854d0e" strokeWidth="4" strokeLinecap="round" />

                {/* Bow String (Animates based on isDrawn) */}
                <polyline
                  points={isDrawn ? "100 50, 70 100, 100 150" : "100 50, 100 100, 100 150"}
                  fill="none"
                  stroke={darkMode ? "#cbd5e1" : "#000"}
                  strokeWidth="1"
                  className="transition-all duration-300 ease-out"
                />

                {/* The Arrow (Animates based on isDrawn) */}
                <g className="transition-transform duration-300 ease-out" style={{ transform: isDrawn ? 'translateX(-30px)' : 'translateX(0px)' }}>
                  <line x1="100" y1="100" x2="130" y2="100" stroke={darkMode ? "#cbd5e1" : "#000"} strokeWidth="2" />
                  <polygon points="130 100, 125 97, 125 103" fill={darkMode ? "#cbd5e1" : "#000"} />
                </g>

              </svg>
            </div>

            {/* Compass Helper */}
            <div className={`absolute bottom-2 right-2 text-xs font-mono border p-1 rounded transition-colors ${darkMode ? 'text-slate-400 border-slate-600 bg-slate-800' : 'text-slate-400 border-slate-200 bg-white'}`}>
              Angle: {angle}&deg;
            </div>
          </div>

          {/* Value Display */}
          <div className="mt-4 text-center">
            <p className={`text-lg font-medium ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>
              Force = <span className="text-blue-500 font-bold">150 N</span>
            </p>
            <p className={`${theme.textSub} text-sm max-w-xs mt-1`}>
              Defined by <strong>magnitude</strong> (150N) AND <strong>direction</strong> ({getDirectionText(angle)}).
            </p>
          </div>

          {/* Controls */}
          <div className="mt-4 w-full max-w-xs space-y-4">
            {/* Rotation Slider */}
            <div>
              <div className="flex justify-between mb-1">
                <label className={`text-xs font-bold uppercase ${theme.textSub}`}>Direction (Rotate)</label>
                <span className="text-xs text-blue-500 font-bold">{angle}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                value={angle}
                onChange={(e) => setAngle(Number(e.target.value))}
                className={`w-full h-2 rounded-lg appearance-none cursor-pointer accent-blue-500 transition-colors ${theme.inputBg}`}
              />
            </div>

            {/* Action Button */}
            <button
              onClick={() => setIsDrawn(!isDrawn)}
              className={`w-full py-2 font-bold rounded shadow transition-colors ${isDrawn
                ? 'bg-slate-600 hover:bg-slate-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
            >
              {isDrawn ? 'Release' : 'Pull Bow (Show Vector)'}
            </button>
          </div>

        </section>
      </main>
    </div>
  );
};

export const DisplacementVelocityAndAcceleration2 = ({ darkMode }) => {
  // Animation State
  const [progress, setProgress] = useState(0); // 0 to 400 (meters)
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1); // Multiplier

  // Ref for animation loop
  const requestRef = useRef();

  // Constants for the visual representation
  const TRACK_RADIUS = 120;
  const CENTER_X = 200;
  const CENTER_Y = 200;
  const TOTAL_DISTANCE = 400; // meters

  // Calculate Runner Position
  // We start at -90deg (Top of circle) which is 1.5 * PI or -0.5 * PI
  const angleRad = (progress / TOTAL_DISTANCE) * 2 * Math.PI - (Math.PI / 2);
  const runnerX = CENTER_X + TRACK_RADIUS * Math.cos(angleRad);
  const runnerY = CENTER_Y + TRACK_RADIUS * Math.sin(angleRad);
  const startX = CENTER_X; // Top center
  const startY = CENTER_Y - TRACK_RADIUS;

  // --- CALCULATIONS ---
  const distance = progress;

  // Displacement: Straight line distance between Start and Runner
  // d = sqrt((x2-x1)^2 + (y2-y1)^2)
  const displacement = Math.sqrt(
    Math.pow(runnerX - startX, 2) + Math.pow(runnerY - startY, 2)
  );

  // Scale displacement from pixels back to "meters" relative to the track size
  // Pixel circumference = 2 * PI * 120 approx 753px = 400m
  // Scale factor = 400 / 753
  const pixelToMeterScale = TOTAL_DISTANCE / (2 * Math.PI * TRACK_RADIUS);
  const displacementMeters = displacement * pixelToMeterScale;

  // --- ANIMATION LOOP ---
  const animate = () => {
    setProgress(prev => {
      if (prev >= TOTAL_DISTANCE) {
        setIsRunning(false);
        return TOTAL_DISTANCE;
      }
      return prev + (0.5 * speed);
    });
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (isRunning) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(requestRef.current);
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [isRunning, speed]);

  // --- HANDLERS ---
  const handleStartStop = () => {
    if (progress >= TOTAL_DISTANCE) {
      setProgress(0);
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setProgress(0);
  };

  // --- DARK MODE THEME ---
  // Note: This component previously forced dark text-white/bg-slate-900 via hardcoding.
  // Now we toggle between a clean light mode and the deep dark mode.
  const theme = {
    bg: darkMode ? 'bg-slate-900' : 'bg-slate-50',
    textMain: darkMode ? 'text-white' : 'text-slate-800',
    textSub: darkMode ? 'text-slate-400' : 'text-slate-500',
    trackStroke: darkMode ? '#334155' : '#cbd5e1',
    startLine: darkMode ? 'white' : '#334155',
    startText: darkMode ? 'white' : '#1e293b',
    cardBg: darkMode ? 'bg-slate-900/80 border-slate-700' : 'bg-white/90 border-slate-200',
    inputBg: darkMode ? 'bg-slate-200' : 'bg-slate-300' // Dark mode usually wants a visible track
  };

  return (
    <div className={`min-h-screen font-sans flex flex-col items-center py-8 transition-colors duration-300 ${theme.bg} ${theme.textMain}`}>

      {/* Header */}
      <div className="text-center mb-6 max-w-2xl px-4">
        <h1 className={`text-3xl font-bold mb-2 ${theme.textMain}`}>
          Distance vs. Displacement
        </h1>
        <p className={`${theme.textSub} text-sm`}>
          <strong>Distance</strong> is the total path traveled (Scalar). <br />
          <strong>Displacement</strong> is the straight-line change in position (Vector).
        </p>
      </div>

      {/* Main Animation Stage */}
      <div className="relative rounded-xl p-4 pb-20 max-w-md">

        <svg width="400" height="400" viewBox="0 0 400 400" className="mx-auto w-full h-auto">
          {/* Definitions for arrow markers */}
          <defs>
            <marker id="arrowhead-green" markerWidth="10" markerHeight="7"
              refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#4ade80" />
            </marker>
          </defs>

          {/* 1. THE TRACK (Background) */}
          <circle
            cx={CENTER_X} cy={CENTER_Y} r={TRACK_RADIUS}
            fill="none" stroke={theme.trackStroke} strokeWidth="20"
            className="transition-colors duration-300"
          />
          <text x={CENTER_X} y={CENTER_Y} textAnchor="middle" dy="5" fill={darkMode ? "#e2e8f0" : "#181d24"} fontSize="60" fontWeight="bold" opacity="0.6">
            400m
          </text>

          {/* Start Line Indicator */}
          <line
            x1={CENTER_X} y1={CENTER_Y - TRACK_RADIUS - 15}
            x2={CENTER_X} y2={CENTER_Y - TRACK_RADIUS + 15}
            stroke={theme.startLine} strokeWidth="2" strokeDasharray="4"
          />
          <text x={CENTER_X} y={CENTER_Y - TRACK_RADIUS - 25} textAnchor="middle" fill={theme.startText} fontSize="10">START / FINISH</text>

          {/* 2. DISTANCE (Yellow Trail) */}
          {/* We use strokeDasharray to simulate the drawing of the circle */}
          <circle
            cx={CENTER_X} cy={CENTER_Y} r={TRACK_RADIUS}
            fill="none"
            stroke="#facc15" // Yellow-400
            strokeWidth="8"
            strokeLinecap="round"
            // Circumference of radius 120 is ~754.
            strokeDasharray={`${(progress / TOTAL_DISTANCE) * (2 * Math.PI * TRACK_RADIUS)} ${(2 * Math.PI * TRACK_RADIUS)}`}
            strokeDashoffset="0"
            // Rotate -90deg so it starts at top
            transform={`rotate(-90 ${CENTER_X} ${CENTER_Y})`}
          />

          {/* 3. DISPLACEMENT (Green Vector Arrow) */}
          {distance > 0 && distance < 400 && (
            <g>
              {/* The Arrow Line */}
              <line
                x1={startX} y1={startY}
                x2={runnerX} y2={runnerY}
                stroke="#4ade80" // Green-400
                strokeWidth="4"
                markerEnd="url(#arrowhead-green)"
              />
              {displacementMeters > 50 && (
                <text x={(startX + runnerX) / 2} y={(startY + runnerY) / 2} fill="#4ade80" fontSize="12" fontWeight="bold" dy="-10" textAnchor="middle" className={darkMode ? "bg-slate-900" : "bg-slate-50"}>
                  d = {Math.round(displacementMeters)}m
                </text>
              )}
            </g>
          )}

          {/* 4. RUNNER (The Dot) */}
          <circle
            cx={runnerX} cy={runnerY} r="8"
            fill={darkMode ? "#fff" : "#2563eb"}
            stroke={darkMode ? "#000" : "#fff"}
            strokeWidth="2"
            className="shadow-lg transition-colors"
          />
        </svg>

        {/* Data Readout Overlay */}
        <div className="absolute not-md:bottom-[-90px] bottom-4 left-4 right-4 flex flex-col md:flex-row justify-between gap-4">

          {/* Distance Card */}
          <div className={`flex-1 p-3 rounded-lg border backdrop-blur-sm transition-all ${theme.cardBg} ${progress >= 400 ? 'ring-2 ring-yellow-500' : 'border-yellow-500/30'}`}>
            <div className="text-yellow-500 text-xs font-bold uppercase tracking-wider mb-1">
              Distance (Path)
            </div>
            <div className={`text-2xl font-mono font-bold ${theme.textMain}`}>
              {Math.round(distance)}<span className={`text-sm ${theme.textSub}`}>m</span>
            </div>
            <div className={`text-xs ${theme.textSub} mt-1`}>
              {progress >= 400 ? "Lap Complete" : "Always Increasing"}
            </div>
          </div>

          {/* Displacement Card */}
          <div className={`flex-1 p-3 rounded-lg border backdrop-blur-sm transition-all ${theme.cardBg} ${progress >= 400 ? 'ring-2 ring-red-500' : 'border-green-500/30'}`}>
            <div className="text-green-500 text-xs font-bold uppercase tracking-wider mb-1">
              Displacement (Vector)
            </div>
            <div className={`text-2xl font-mono font-bold ${theme.textMain}`}>
              {progress >= 399 ? "0" : Math.round(displacementMeters)}<span className={`text-sm ${theme.textSub}`}>m</span>
            </div>
            <div className={`text-xs ${theme.textSub} mt-1`}>
              {progress >= 399 ? "Back at Origin!" : "Direct path from start"}
            </div>
          </div>

        </div>

      </div>

      {/* Controls */}
      <div className="mt-8 not-md:mt-30 flex flex-wrap justify-center gap-4 px-4">
        <button
          onClick={handleStartStop}
          className={`px-8 py-3 rounded-full font-bold shadow-lg transition-transform active:scale-95 ${isRunning
            ? 'bg-red-500 hover:bg-red-600 text-white'
            : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
        >
          {progress >= 400 ? 'Restart Run' : isRunning ? 'Pause' : 'Start Run'}
        </button>

        <button
          onClick={handleReset}
          className={`px-6 py-3 rounded-full font-bold transition-colors ${darkMode ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-slate-200 hover:bg-slate-300 text-slate-700'}`}
        >
          Reset
        </button>
      </div>

      {/* Speed Control */}
      <div className={`mt-4 flex items-center gap-2 uppercase font-bold text-sm ${theme.textSub}`}>
        <span>Slow</span>
        <input
          type="range"
          min="0.5" max="3" step="0.5"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          className={`w-32 h-2 accent-blue-500 rounded-lg appearance-none cursor-pointer ${theme.inputBg}`}
        />
        <span>Fast</span>
      </div>

    </div>
  );
};

export const DisplacementVelocityAndAcceleration3 = ({ darkMode }) => {
  // --- STATE (For Rendering UI) ---
  const [carX, setCarX] = useState(50);
  const [velocity, setVelocity] = useState(0);
  const [acceleration, setAcceleration] = useState(0);
  const [lightColor, setLightColor] = useState('red');
  const [phase, setPhase] = useState('IDLE');
  const [isPaused, setIsPaused] = useState(false);

  // --- PHYSICS ENGINE ---
  const physicsState = useRef({
    x: 50,
    v: 0,
    a: 0,
    phase: 'IDLE',
    light: 'red'
  });
  const requestRef = useRef();

  // --- CONFIG ---
  // We keep the internal coordinate system (800 units wide) for physics calculations
  // but we will scale the visual output using SVG ViewBox.
  const MAX_SPEED = 4;
  const ACCEL_RATE = 0.04;
  const DECEL_RATE = 0.06;
  const ROAD_LENGTH = 800;
  const BRAKING_POINT = ROAD_LENGTH - 350;

  // --- ANIMATION LOOP ---
  const animate = () => {
    let { x, v, a, phase, light } = physicsState.current;
    let nextPhase = phase;
    let nextLight = light;
    let nextV = v;
    let nextA = 0;

    if (phase === 'ACCELERATING') {
      nextA = 1;
      nextV += ACCEL_RATE;
      if (nextV >= MAX_SPEED) {
        nextV = MAX_SPEED;
        nextPhase = 'COASTING';
      }
    }
    else if (phase === 'COASTING') {
      nextA = 0;
      if (x >= BRAKING_POINT) {
        nextPhase = 'BRAKING';
        nextLight = 'red';
      }
    }
    else if (phase === 'BRAKING') {
      nextA = -1;
      nextV -= DECEL_RATE;
      if (nextV <= 0) {
        nextV = 0;
        nextA = 0;
        nextPhase = 'FINISHED';
      }
    }

    let nextX = x + nextV;

    physicsState.current = {
      x: nextX,
      v: nextV,
      a: nextA,
      phase: nextPhase,
      light: nextLight
    };

    setCarX(nextX);
    setVelocity(nextV);
    setAcceleration(nextA);
    setPhase(nextPhase);
    setLightColor(nextLight);

    if (nextPhase !== 'FINISHED' && nextPhase !== 'IDLE') {
      requestRef.current = requestAnimationFrame(animate);
    }
  };

  // --- CONTROLS ---
  const startSimulation = () => {
    setIsPaused(false);
    physicsState.current = {
      x: 50,
      v: 0,
      a: 0,
      phase: 'ACCELERATING',
      light: 'green'
    };
    cancelAnimationFrame(requestRef.current);
    requestRef.current = requestAnimationFrame(animate);
  };

  const togglePause = () => {
    if (phase === 'IDLE' || phase === 'FINISHED') return;
    if (isPaused) {
      setIsPaused(false);
      requestRef.current = requestAnimationFrame(animate);
    } else {
      setIsPaused(true);
      cancelAnimationFrame(requestRef.current);
    }
  };

  const resetSimulation = () => {
    cancelAnimationFrame(requestRef.current);
    setIsPaused(false);
    // Reset UI
    setCarX(50);
    setVelocity(0);
    setAcceleration(0);
    setPhase('IDLE');
    setLightColor('red');
    // Reset Physics
    physicsState.current = {
      x: 50,
      v: 0,
      a: 0,
      phase: 'IDLE',
      light: 'red'
    };
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  const velArrowLength = Math.max(0, velocity * 15);
  const accelArrowLength = 50;

  // --- DARK MODE THEME ---
  const theme = {
    bg: darkMode ? '' : 'bg-slate-50',
    textMain: darkMode ? 'text-slate-100' : 'text-slate-800',
    textSub: darkMode ? 'text-slate-400' : 'text-slate-500', // Adjusted specifically for visibility
    cardBg: darkMode ? 'bg-slate-800' : 'bg-white',
    cardBorder: darkMode ? 'border-slate-700' : 'border-slate-200',
    headerBg: darkMode ? 'bg-slate-950' : 'bg-slate-800',
    roadBg: darkMode ? 'bg-slate-900' : 'bg-slate-100',
    roadRect: darkMode ? '#1e293b' : '#334155',
    roadLines: darkMode ? '#475569' : '#fff',
    overlayBg: darkMode ? 'bg-slate-800' : 'bg-white',
    overlayBorder: darkMode ? 'border-slate-700' : 'border-slate-200'
  };

  return (
    <div className={`flex flex-col items-center justify-center font-sans p-2 sm:p-4 transition-colors duration-300 ${theme.bg} ${theme.textMain}`}>

      <div className={`w-full max-w-4xl rounded-xl shadow-xl overflow-hidden border transition-colors ${theme.cardBg} ${theme.cardBorder}`}>

        {/* Header */}
        <div className={`${theme.headerBg} text-white p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center transition-colors gap-3`}>
          <div>
            <h1 className="text-lg sm:text-2xl font-bold">Velocity vs. Acceleration</h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Observe arrow directions during braking.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto bg-slate-900/50 p-2 rounded-lg sm:bg-transparent sm:p-0 sm:block">
            <div className="text-xs uppercase tracking-wider text-slate-400 sm:mb-1">Status</div>
            <div className={`font-mono font-bold text-sm sm:text-base ${phase === 'BRAKING' ? 'text-red-400' : 'text-green-400'}`}>
              {isPaused ? "PAUSED" : phase}
            </div>
          </div>
        </div>

        {/* Animation Stage - Responsive Wrapper */}
        <div className={`relative w-full border-b transition-colors ${theme.roadBg} ${theme.cardBorder}`}>

          <svg viewBox={`0 0 ${ROAD_LENGTH} 300`} className="w-full h-auto block" preserveAspectRatio="xMidYMid meet">

            {/* 1. SCENERY */}
            {/* Road */}
            <rect x="0" y="200" width={ROAD_LENGTH} height="100" fill={theme.roadRect} className="transition-all" />
            <line x1="0" y1="250" x2={ROAD_LENGTH} y2="250" stroke={theme.roadLines} strokeWidth="2" strokeDasharray="40,40" />

            {/* Braking Line Marker */}
            <line x1={BRAKING_POINT} y1="200" x2={BRAKING_POINT} y2="300" stroke="#ef4444" strokeWidth="4" strokeDasharray="10,10" opacity="0.5" />
            <text x={BRAKING_POINT + 10} y="290" fill="#ef4444" fontSize="14" fontWeight="bold" opacity="0.8">Braking Begins</text>

            {/* Traffic Light 1 (Start) */}
            <g transform="translate(100, 50)">
              <rect x="-15" y="0" width="30" height="80" rx="5" fill="#1e293b" />
              <line x1="0" y1="80" x2="0" y2="200" stroke="#64748b" strokeWidth="4" />
              <circle cx="0" cy="20" r="8" fill={lightColor === 'red' && phase === 'IDLE' ? '#ef4444' : '#451a1a'} />
              <circle cx="0" cy="40" r="8" fill="#422006" />
              <circle cx="0" cy="60" r="8" fill={lightColor === 'green' ? '#22c55e' : '#064e3b'} />
            </g>

            {/* Traffic Light 2 (End) */}
            <g transform={`translate(${ROAD_LENGTH - 100}, 50)`}>
              <rect x="-15" y="0" width="30" height="80" rx="5" fill="#1e293b" />
              <line x1="0" y1="80" x2="0" y2="200" stroke="#64748b" strokeWidth="4" />
              <circle cx="0" cy="20" r="8" fill={lightColor === 'red' && phase !== 'IDLE' ? '#ef4444' : '#451a1a'} />
              <circle cx="0" cy="40" r="8" fill="#422006" />
              <circle cx="0" cy="60" r="8" fill="#064e3b" />
            </g>

            {/* 2. THE CAR GROUP */}
            <g transform={`translate(${carX}, 210)`}>
              {/* Car Body */}
              <path d="M-40,0 L40,0 L40,-20 L20,-35 L-20,-35 L-40,-20 Z" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2" />
              {/* Wheels */}
              <circle cx="-25" cy="0" r="10" fill="#1e293b" />
              <circle cx="25" cy="0" r="10" fill="#1e293b" />
              <circle cx="-25" cy="0" r="4" fill="#94a3b8" />
              <circle cx="25" cy="0" r="4" fill="#94a3b8" />

              {/* 3. VECTORS (Arrows) */}
              {/* Velocity Arrow */}
              {velocity > 0.1 && (
                <g transform="translate(0, -60)">
                  <text x={velArrowLength / 2} y="-15" textAnchor="middle" fill="#3b82f6" fontSize="16" fontWeight="bold">Velocity (+)</text>
                  <line x1="0" y1="0" x2={velArrowLength} y2="0" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow-blue)" />
                </g>
              )}

              {/* Acceleration Arrow */}
              {acceleration !== 0 && (
                <g transform="translate(0, 30)">
                  <text x={acceleration > 0 ? accelArrowLength / 2 : -accelArrowLength / 2} y="25" textAnchor="middle" fill="#f97316" fontSize="16" fontWeight="bold">
                    {acceleration > 0 ? "Accel (+)" : "Accel (-)"}
                  </text>
                  <line
                    x1="0" y1="0"
                    x2={acceleration > 0 ? accelArrowLength : -accelArrowLength}
                    y2="0"
                    stroke="#f97316" strokeWidth="2" markerEnd="url(#arrow-orange)"
                  />
                </g>
              )}
            </g>

            {/* Marker Definitions */}
            <defs>
              <marker id="arrow-blue" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
                <polygon points="0 0, 12 6, 0 12" fill="#3b82f6" />
              </marker>
              <marker id="arrow-orange" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
                <polygon points="0 0, 12 6, 0 12" fill="#f97316" />
              </marker>
            </defs>
          </svg>

          {/* Desktop Overlay: Floats on top (hidden on mobile) */}
          <div className="hidden md:block absolute top-4 left-4 right-4 text-center pointer-events-none">
            {isPaused && (
              <div className="inline-block bg-yellow-100 backdrop-blur px-6 py-3 rounded-full shadow-lg text-yellow-800 font-bold border-2 border-yellow-400 mb-2">
                ⏸️ PAUSED
              </div>
            )}
            <div className='block'></div>
            {phase === 'ACCELERATING' && (
              <div className={`inline-block backdrop-blur px-3 py-1 text-sm rounded shadow ${darkMode ? "text-green-400" : "text-green-700"} font-medium border-l-4 border-green-500 bg-white/10`}>
                Velocity and Acceleration point in the <strong>SAME</strong> direction. Speed increases.
              </div>
            )}
            {phase === 'COASTING' && (
              <div className={`inline-block backdrop-blur px-3 py-1 text-sm rounded shadow ${darkMode ? "text-blue-400" : "text-blue-700"} font-medium border-l-4 border-blue-500 bg-white/10`}>
                Constant Velocity. Acceleration is <strong>ZERO</strong>.
              </div>
            )}
            {phase === 'BRAKING' && (
              <div className={`inline-block backdrop-blur px-3 py-1 text-sm rounded shadow ${darkMode ? "text-red-500" : "text-red-700"} font-medium border-l-4 border-red-500 bg-white/10`}>
                Velocity is (+), Acceleration is (-) (deceleration) . They <strong>OPPOSE</strong> each other.
              </div>
            )}
            {phase === 'FINISHED' && (
              <div className={`inline-block backdrop-blur px-3 py-1 text-sm rounded shadow font-medium border-l-4 border-slate-500 bg-white/10`}>
                Car Stopped. Velocity = 0. Acceleration = 0.
              </div>
            )}
          </div>
        </div>

        {/* Mobile/Tablet Info Card: Shown below animation (hidden on desktop) */}
        {/* This ensures text doesn't cover the small car on mobile screens */}
        <div className={`md:hidden p-4 border-b ${theme.cardBorder} ${theme.overlayBg}`}>
          {isPaused && (
            <div className="mb-2 text-yellow-500 font-bold text-sm text-center">⏸️ SIMULATION PAUSED</div>
          )}

          {phase === 'IDLE' && <p className="text-center text-sm text-slate-500">Press Start to begin.</p>}

          {phase === 'ACCELERATING' && (
            <div className={`p-3 text-sm rounded border-l-4 border-green-500 ${theme.cardBg} shadow-sm`}>
              <p className="font-bold text-green-500 mb-1">Accelerating</p>
              Velocity and Acceleration point in the <strong>SAME</strong> direction. Speed increases.
            </div>
          )}
          {phase === 'COASTING' && (
            <div className={`p-3 text-sm rounded border-l-4 border-blue-500 ${theme.cardBg} shadow-sm`}>
              <p className="font-bold text-blue-500 mb-1">Coasting</p>
              Constant Velocity. Acceleration is <strong>ZERO</strong> (No Orange Arrow).
            </div>
          )}
          {phase === 'BRAKING' && (
            <div className={`p-3 text-sm rounded border-l-4 border-red-500 ${theme.cardBg} shadow-sm`}>
              <p className="font-bold text-red-500 mb-1">Braking</p>
              Velocity is forward (+), but Acceleration is backward (deceleration) (-). They <strong>OPPOSE</strong> each other.
            </div>
          )}
          {phase === 'FINISHED' && (
            <div className={`p-3 text-sm rounded border-l-4 border-slate-500 ${theme.cardBg} shadow-sm`}>
              <p className="font-bold text-slate-500 mb-1">Stopped</p>
              Car Stopped. Velocity = 0. Acceleration = 0.
            </div>
          )}
        </div>

        {/* Controls */}
        <div className={`p-4 sm:p-6 flex flex-wrap justify-center gap-3 sm:gap-4 transition-colors ${theme.bg}`}>

          {/* RESET BUTTON */}
          {(phase !== 'IDLE') && (
            <button
              onClick={resetSimulation}
              className="flex-1 sm:flex-none bg-slate-500 hover:bg-slate-600 text-white font-bold py-3 px-6 rounded-lg sm:rounded-full shadow transition-colors text-sm sm:text-base"
            >
              Reset
            </button>
          )}

          {/* PLAY / PAUSE BUTTON */}
          {(phase !== 'IDLE' && phase !== 'FINISHED') && (
            <button
              onClick={togglePause}
              className="flex-1 sm:flex-none bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg sm:rounded-full shadow transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              {isPaused ? "▶ Resume" : "⏸ Pause"}
            </button>
          )}

          {/* START BUTTON */}
          {phase === 'IDLE' && (
            <button
              onClick={startSimulation}
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg sm:rounded-full shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <span className="text-xl">🚦</span> Start
            </button>
          )}
        </div>

        {/* Legend */}
        <div className={`px-4 pb-4 pt-2 flex flex-wrap justify-center gap-4 sm:gap-8 text-xs sm:text-sm ${theme.textSub} ${theme.bg}`}>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
            <span>Velocity (Motion)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-500 rounded-sm"></div>
            <span>Acceleration (Force)</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export const TheSUVATEquations = ({ darkMode }) => {
  // --- STATE ---
  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(false);
  const [finishedA, setFinishedA] = useState(false);
  const [finishedB, setFinishedB] = useState(false);

  // We use state for rendering positions/arrows to the UI
  const [stateA, setStateA] = useState({ x: 0, v: 0, a: 0 });
  const [stateB, setStateB] = useState({ x: 0, v: 0, a: 0 });

  // --- PHYSICS CONFIG ---
  const TRACK_WIDTH = 800;
  const FINISH_LINE = 700;

  // Total Frames for simulation (approx 6-7 seconds at 60fps)
  const TOTAL_FRAMES = 380;

  // Track A: Uniform Acceleration to reach 700px in 380 frames
  // d = 0.5 * a * t^2  => 700 = 0.5 * a * 380^2 
  // 1400 = a * 144400 => a ≈ 0.0097
  const ACCEL_A = 0.0097;

  // Track B: Scripted "Events" to result in roughly same finish time
  const physicsRef = useRef({
    frame: 0,
    a: { x: 0, v: 0 },
    b: { x: 0, v: 0 }
  });

  const requestRef = useRef();

  // --- ANIMATION LOOP ---
  const animate = () => {
    const phys = physicsRef.current;

    // 1. UPDATE TRACK A (Uniform)
    // v = u + at
    if (phys.a.x < FINISH_LINE) {
      phys.a.v += ACCEL_A;
      phys.a.x += phys.a.v;
    }

    // 2. UPDATE TRACK B (Non-Uniform / Erratic)
    let accelB = 0;

    if (phys.b.x < FINISH_LINE) {
      const t = phys.frame;

      // Phase 1: Slow Start (0 - 100 frames)
      if (t < 100) {
        accelB = 0.005;
      }
      // Phase 2: HUGE BOOST (100 - 140 frames)
      else if (t >= 100 && t < 140) {
        accelB = 0.08; // High Jerk
      }
      // Phase 3: Coasting (140 - 280 frames)
      else if (t >= 140 && t < 280) {
        accelB = 0; // Constant Velocity
      }
      // Phase 4: Final Sprint (280+ frames)
      else {
        accelB = 0.025;
      }

      phys.b.v += accelB;
      phys.b.x += phys.b.v;
    }

    // 3. Increment Frame
    phys.frame++;

    // 4. Update React State for Render
    setStateA({
      x: Math.min(phys.a.x, FINISH_LINE),
      v: phys.a.v,
      a: phys.a.x >= FINISH_LINE ? 0 : ACCEL_A
    });

    setStateB({
      x: Math.min(phys.b.x, FINISH_LINE),
      v: phys.b.v,
      a: phys.b.x >= FINISH_LINE ? 0 : accelB
    });

    // 5. Check Finish Conditions
    if (phys.a.x >= FINISH_LINE) setFinishedA(true);
    if (phys.b.x >= FINISH_LINE) setFinishedB(true);

    // 6. Continue Loop
    if (phys.a.x < FINISH_LINE || phys.b.x < FINISH_LINE) {
      requestRef.current = requestAnimationFrame(animate);
    }
  };

  // --- CONTROLS ---
  const handleStart = () => {
    setStarted(true);
    setPaused(false);
    requestRef.current = requestAnimationFrame(animate);
  };

  const togglePause = () => {
    if (paused) {
      setPaused(false);
      requestRef.current = requestAnimationFrame(animate);
    } else {
      setPaused(true);
      cancelAnimationFrame(requestRef.current);
    }
  };

  const handleReset = () => {
    cancelAnimationFrame(requestRef.current);
    setStarted(false);
    setPaused(false);
    setFinishedA(false);
    setFinishedB(false);
    setStateA({ x: 0, v: 0, a: 0 });
    setStateB({ x: 0, v: 0, a: 0 });
    physicsRef.current = { frame: 0, a: { x: 0, v: 0 }, b: { x: 0, v: 0 } };
  };

  useEffect(() => {
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  // --- RENDER HELPERS ---
  const arrowScaleA = stateA.v * 15;
  const arrowScaleB = stateB.v * 15;

  const getLabelB = (accel) => {
    if (accel === 0) return "Coasting (a=0)";
    if (accel > 0.05) return "BOOST (High a)";
    if (accel > 0.02) return "Sprint (Catch Up)";
    return "Slow Start";
  };

  // --- DARK MODE THEME ---
  const theme = {
    bg: darkMode ? 'bg-slate-900' : 'bg-slate-50',
    textMain: darkMode ? 'text-slate-100' : 'text-slate-800',
    textSub: darkMode ? 'text-slate-400' : 'text-slate-500',
    cardBg: darkMode ? 'bg-slate-800' : 'bg-white',
    cardBorder: darkMode ? 'border-slate-700' : 'border-slate-200',
    simulationBg: darkMode ? 'bg-slate-900' : 'bg-slate-100',
    svgBg: darkMode ? 'bg-slate-800' : 'bg-white',
    svgBorder: darkMode ? '#475569' : '#cbd5e1',
    lineStroke: darkMode ? '#334155' : '#e2e8f0',
    textLabel: darkMode ? '#94a3b8' : '#334155',
    finishText: darkMode ? '#64748b' : '#94a3b8',
    panelA: darkMode ? 'bg-blue-900/30 border-blue-800 text-blue-300' : 'bg-blue-50 border-blue-200 text-blue-800',
    panelB: darkMode ? 'bg-red-900/30 border-red-800 text-red-300' : 'bg-red-50 border-red-200 text-red-800',
    panelSub: darkMode ? 'text-blue-200' : 'text-blue-700',
    panelSubRed: darkMode ? 'text-red-200' : 'text-red-700'
  };

  return (
    <div className={`min-h-screen font-sans p-2 sm:p-4 flex flex-col items-center transition-colors duration-300 ${theme.bg} ${theme.textMain}`}>

      <div className={`w-full max-w-5xl rounded-xl shadow-xl overflow-hidden border transition-colors ${theme.cardBg} ${theme.cardBorder}`}>

        {/* Header */}
        <div className={`p-4 sm:p-6 border-b transition-colors ${darkMode ? 'bg-slate-950 border-slate-700' : 'bg-slate-900 border-slate-700'} text-white`}>
          <h1 className="text-xl sm:text-2xl font-bold">When can we use SUVAT?</h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Comparing <strong>Uniform Acceleration</strong> (Formulas work) vs. <strong>Non-Uniform Acceleration</strong> (Formulas fail).
          </p>
        </div>

        {/* SIMULATION AREA */}
        <div className={`relative p-2 sm:p-6 overflow-hidden transition-colors ${theme.simulationBg}`}>

          <svg
            viewBox={`0 0 ${TRACK_WIDTH} 400`}
            className={`w-full h-auto rounded-lg border shadow-inner transition-colors ${theme.svgBg}`}
            style={{ borderColor: theme.svgBorder }}
            preserveAspectRatio="xMidYMid meet"
          >

            {/* GLOBAL: Finish Line */}
            <line x1={FINISH_LINE} y1="20" x2={FINISH_LINE} y2="380" stroke={theme.svgBorder} strokeWidth="4" strokeDasharray="10,5" />
            <text x={FINISH_LINE + 10} y="40" fill={theme.finishText} fontSize="14" fontWeight="bold">FINISH</text>

            {/* --- TRACK A (TOP) --- */}
            <g transform="translate(0, 100)">
              {/* Track Labels */}
              <text x="20" y="-60" fill={theme.textLabel} fontSize="20" fontWeight="bold">Track A: Uniform</text>
              <text x="20" y="-35" fill="#16a34a" fontSize="16" fontWeight="bold">✅ SUVAT OK</text>

              {/* Lane */}
              <line x1="0" y1="0" x2={TRACK_WIDTH} y2="0" stroke={theme.lineStroke} strokeWidth="2" />

              {/* PARTICLE A */}
              <g transform={`translate(${stateA.x}, 0)`}>
                <circle r="15" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2" />
                <text x="-5" y="5" fill="white" fontSize="10" fontWeight="bold">A</text>

                {/* Velocity Vector A */}
                <line
                  x1="0" y1="0"
                  x2={arrowScaleA} y2="0"
                  stroke="#2757a8"
                  strokeWidth="3"
                  markerEnd="url(#arrow-blue)"
                  opacity={stateA.v > 0.1 ? 1 : 0}
                />
                {stateA.v > 0.1 && (
                  <text x={arrowScaleA / 2} y="-25" textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="bold">
                    Smooth V
                  </text>
                )}
              </g>

              {/* Checkmark (Only on finish) */}
              {finishedA && (
                <g transform={`translate(${FINISH_LINE + 50}, 0)`}>
                  <circle r="20" fill="#22c55e" />
                  <path d="M-8 0 L-2 6 L8 -6" stroke="white" strokeWidth="4" fill="none" />
                </g>
              )}
            </g>


            {/* --- TRACK B (BOTTOM) --- */}
            <g transform="translate(0, 300)">
              {/* Track Labels */}
              <text x="20" y="-60" fill={theme.textLabel} fontSize="20" fontWeight="bold">Track B: Non-Uniform</text>
              <text x="20" y="-35" fill="#dc2626" fontSize="16" fontWeight="bold">❌ SUVAT FAILS</text>

              {/* Lane */}
              <line x1="0" y1="0" x2={TRACK_WIDTH} y2="0" stroke={theme.lineStroke} strokeWidth="2" />

              {/* PARTICLE B */}
              <g transform={`translate(${stateB.x}, 0)`}>
                <circle r="15" fill="#ef4444" stroke="#b91c1c" strokeWidth="2" />
                <text x="-5" y="5" fill="white" fontSize="10" fontWeight="bold">B</text>

                {/* Velocity Vector B */}
                <line
                  x1="0" y1="0"
                  x2={arrowScaleB} y2="0"
                  stroke="#c93838"
                  strokeWidth="3"
                  markerEnd="url(#arrow-red)"
                  opacity={stateB.v > 0.1 ? 1 : 0}
                />
                {stateB.v > 0.1 && (
                  <text x={arrowScaleB / 2} y="-25" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="bold">
                    {getLabelB(stateB.a)}
                  </text>
                )}
              </g>

              {/* Cross (Only on finish) */}
              {finishedB && (
                <g transform={`translate(${FINISH_LINE + 50}, 0)`}>
                  <circle r="20" fill="#ef4444" />
                  <path d="M-6 -6 L6 6 M6 -6 L-6 6" stroke="white" strokeWidth="4" fill="none" />
                </g>
              )}
            </g>

            {/* DEFS for markers */}
            <defs>
              <marker id="arrow-blue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#2757a8" />
              </marker>
              <marker id="arrow-red" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#c93838" />
              </marker>
            </defs>

          </svg>

          {/* Teaching Context (Stacked on mobile, Grid on desktop) */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-3 sm:p-4 rounded-lg border transition-colors ${theme.panelA}`}>
              <h3 className="font-bold mb-1 text-sm sm:text-base">Track A (Uniform)</h3>
              <p className={`text-xs sm:text-sm ${theme.panelSub}`}>
                Acceleration is <strong>constant</strong>. The velocity vector grows steadily.
                Calculable using: <br />
                <span className={`font-mono px-2 py-1 rounded inline-block mt-1 ${darkMode ? 'bg-blue-900/50' : 'bg-blue-100'}`}>s = ut + ½at²</span>
              </p>
            </div>
            <div className={`p-3 sm:p-4 rounded-lg border transition-colors ${theme.panelB}`}>
              <h3 className="font-bold mb-1 text-sm sm:text-base">Track B (Non-Uniform)</h3>
              <p className={`text-xs sm:text-sm ${theme.panelSubRed}`}>
                Acceleration <strong>changes</strong> (Boosts, Coasting). The velocity vector jumps erratically.
                SUVAT equations give the <strong>wrong answer</strong> here.
              </p>
            </div>
          </div>

        </div>

        {/* Controls */}
        <div className={`p-4 sm:p-6 border-t flex flex-wrap sm:flex-nowrap justify-center gap-3 sm:gap-4 transition-colors ${theme.bg} ${theme.cardBorder}`}>
          {!started || (finishedA && finishedB) ? (
            <button
              onClick={finishedA ? handleReset : handleStart}
              className={`w-full sm:w-auto font-bold py-3 px-8 rounded-lg sm:rounded-full shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 ${darkMode ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-white'}`}
            >
              {finishedA ? "↺ Reset Simulation" : "▶ Start Comparison"}
            </button>
          ) : (
            <>
              <button
                onClick={togglePause}
                className={`w-full sm:w-auto font-bold py-3 px-8 rounded-lg sm:rounded-full shadow transition-colors flex items-center justify-center gap-2 ${paused ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-yellow-500 hover:bg-yellow-600 text-white'}`}
              >
                {paused ? "▶ Resume" : "⏸ Pause"}
              </button>
              <button
                onClick={handleReset}
                className={`w-full sm:w-auto font-bold py-3 px-6 rounded-lg sm:rounded-full transition-colors ${darkMode ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-slate-300 hover:bg-slate-400 text-slate-800'}`}
              >
                Reset
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export const GraphsOfMotion = ({ darkMode, mobile }) => {
  // --- STATE ---
  const [currentTime, setCurrentTime] = useState(0); // 0 to 10 seconds
  const [velocity, setVelocity] = useState(0);       // m/s
  const [carX, setCarX] = useState(0);               // position units
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Graph Data Points: Array of {x, y} for SVG path
  const [graphPoints, setGraphPoints] = useState([]);

  // --- REFS ---
  const requestRef = useRef();
  const startTimeRef = useRef(0);
  const pausedTimeRef = useRef(0);

  // --- CONFIG ---
  const DURATION = 10; // seconds
  const MAX_VELOCITY = 30; // m/s (for graph scaling)
  const TRACK_LENGTH = 800; // pixels

  // --- PHYSICS ENGINE ---
  // Calculates state based on specific time t
  const calculatePhysics = (t) => {
    let v = 0;
    let cue = "";
    let phase = "";

    // PHASE 1: STOPPED (0s to 2s)
    if (t < 2) {
      v = 0;
      cue = "Velocity is 0";
      phase = "stopped";
    }
    // PHASE 2: ACCELERATION (2s to 5s)
    else if (t >= 2 && t < 5) {
      // Linearly increase from 0 to 30 over 3 seconds
      // v = u + at -> v = 0 + 10 * (t-2)
      v = 10 * (t - 2);
      cue = "Speeding Up = Slope UP";
      phase = "accel";
    }
    // PHASE 3: CRUISING (5s to 8s)
    else if (t >= 5 && t < 8) {
      // Constant 30
      v = 30;
      cue = "Constant Speed = Flat Line";
      phase = "cruise";
    }
    // PHASE 4: BRAKING (8s to 10s)
    else if (t >= 8 && t <= 10) {
      // Decrease from 30 to 0 over 2 seconds
      // v = u + at -> v = 30 - 15 * (t-8)
      v = 30 - 15 * (t - 8);
      if (v < 0) v = 0;
      cue = "Slowing Down = Slope DOWN";
      phase = "brake";
    }
    // FINISHED
    else {
      v = 0;
      cue = "Journey Complete";
      phase = "finished";
    }

    return { v, cue, phase };
  };

  // --- ANIMATION LOOP ---
  const animate = (timestamp) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;

    // Calculate elapsed time (seconds)
    const elapsed = (timestamp - startTimeRef.current + pausedTimeRef.current) / 1000;

    if (elapsed >= DURATION) {
      setCurrentTime(DURATION);
      setIsFinished(true);
      setIsPlaying(false);
      // Ensure final graph point hits 0
      updateSimulation(DURATION);
      return;
    }

    updateSimulation(elapsed);
    requestRef.current = requestAnimationFrame(animate);
  };

  const updateSimulation = (t) => {
    const { v, cue, phase } = calculatePhysics(t);

    // Update Car Position (Integrating velocity roughly for visual)
    setCarX(prev => prev + (v * 0.15)); // Scaling factor for screen width

    setCurrentTime(t);
    setVelocity(v);

    // Update Graph
    setGraphPoints(prev => [...prev, { t: t, v: v }]);
  };

  // --- CONTROLS ---
  const handleStart = () => {
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

    // Reset Refs
    startTimeRef.current = 0;
    pausedTimeRef.current = 0;

    // Reset State
    setCurrentTime(0);
    setVelocity(0);
    setCarX(0);
    setGraphPoints([{ t: 0, v: 0 }]);
  };

  // Cleanup
  useEffect(() => {
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  // --- RENDER HELPERS ---
  const { cue, phase } = calculatePhysics(currentTime);

  // Convert points array to SVG path string
  const getSvgPath = () => {
    if (graphPoints.length === 0) return "";

    const width = 800;
    const height = 200;

    const path = graphPoints.map((p, i) => {
      const x = (p.t / DURATION) * width;
      const y = height - ((p.v / MAX_VELOCITY) * height); // Invert Y
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');

    return path;
  };

  // Car Visual Logic
  const carVisualX = Math.min(carX, 680); // Stop before edge
  const trackLength = 800;
  const carLeftPercent = (carX / trackLength) * 100;
  const isBraking = phase === 'brake';
  const isAccelerating = phase === 'accel';

  // LOGIC FIX: Reset tilt if finished, otherwise use braking tilt
  const carRotation = (isBraking && !isFinished) ? 3 : isAccelerating ? -1 : 0;

  // --- DARK MODE THEME ---
  const theme = {
    textMain: darkMode ? 'text-slate-100' : 'text-slate-800',
    cardBg: darkMode ? 'bg-slate-800' : 'bg-white',
    cardBorder: darkMode ? 'border-slate-700' : 'border-slate-200',
    headerBg: darkMode ? 'bg-slate-950' : 'bg-slate-900',
    // Sky/World section
    skyBg: darkMode ? 'bg-slate-900 border-slate-700' : 'bg-sky-100 border-slate-300',
    cloudOpacity: darkMode ? '0.1' : '0.3', // Dim clouds at night
    roadFill: darkMode ? '#1e293b' : '#475569',
    roadLine: darkMode ? '#94a3b8' : '#facc15',
    // Graph Section
    graphBg: darkMode ? 'bg-slate-950' : 'bg-slate-900',
    // Controls
    controlsBg: darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200',
    resetBtn: darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-700 hover:bg-slate-800',
  };

  return (
    <div className={`font-sans ${theme.textMain} flex flex-col items-center py-6 transition-colors duration-300`}>

      <div className={`max-w-4xl w-full ${theme.cardBg} rounded-xl shadow-2xl overflow-hidden border ${theme.cardBorder} transition-colors`}>

        {/* HEADER */}
        <div className={`${theme.headerBg} text-white p-4 flex justify-between items-center transition-colors`}>
          <h1 className="text-xl font-bold">Velocity-Time Graph</h1>
          <div className="flex gap-4 text-sm font-mono">
            <span>Time: {currentTime.toFixed(2)}s</span>
            <span className="text-blue-400">Vel: {velocity.toFixed(1)} m/s</span>
          </div>
        </div>

        {/* --- PART 1: REAL WORLD (TOP) --- */}
        {mobile ? (
          <div className={`relative ${theme.skyBg} border-b-4 transition-colors`}>

            {/* preserveAspectRatio="xMidYMid slice" ensures it covers the area nicely */}
            <svg viewBox={`0 0 ${TRACK_LENGTH} 200`} className="w-full h-auto block">

              {/* 1. SCENERY */}
              <text x="50" y="50" fontSize="60" opacity={theme.cloudOpacity} fill="currentColor">☁️</text>
              <text x="250" y="80" fontSize="50" opacity={theme.cloudOpacity} fill="currentColor">☁️</text>
              <text x="700" y="40" fontSize="60" opacity={theme.cloudOpacity} fill="currentColor">☁️</text>

              {/* 2. THE ROAD */}
              <rect x="0" y="136" width={TRACK_LENGTH} height="64" fill={theme.roadFill} className="transition-colors" />
              {/* Road Line */}
              <line x1="0" y1="168" x2={TRACK_LENGTH} y2="168" stroke={theme.roadLine} strokeWidth="2" strokeDasharray="20,20" opacity="0.5" />

              {/* 3. THE CAR GROUP */}
              {/* We move the whole group using your calculated carVisualX */}
              <g transform={`translate(${carVisualX}, 130) rotate(${carRotation}, 50, 40)`}>

                {/* Brake Light Glow (Your Pulse Effect) */}
                {(isBraking && !isFinished) && (
                  <circle cx="10" cy="30" r="10" fill="#ef4444" opacity="0.6">
                    <animate attributeName="opacity" values="0.6;0.2;0.6" dur="0.5s" repeatCount="indefinite" />
                  </circle>
                )}

                {/* STOPPED Label (Your Badge) */}
                {isFinished && (
                  <g transform="translate(50, -30)" className='animate-pulse'>
                    <rect x="-43" y="-40" width="70" height="20" rx="4" fill="white" stroke="#1e293b" strokeWidth="2" />
                    <text x="-8" y="-25" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1e293b">STOPPED</text>
                  </g>
                )}

                {/* Your Car Shape */}
                <g transform="scale(0.8)"> {/* Scaled slightly to fit 800px world better */}
                  <rect x="8" y="20" width="4" height="12" fill={(isBraking && !isFinished) ? "#ff2222" : "#7f1d1d"} rx="1" />
                  <path d="M10 40 L10 20 L25 10 L75 10 L90 20 L90 40 Z" fill="#ef4444" stroke="#991b1b" strokeWidth="2" />
                  <circle cx="25" cy="40" r="8" fill="#1e293b" />
                  <circle cx="75" cy="40" r="8" fill="#1e293b" />
                  <circle cx="25" cy="40" r="3" fill="#94a3b8" />
                  <circle cx="75" cy="40" r="3" fill="#94a3b8" />
                </g>

                {/* Speedometer (Floating above car) */}
                <g transform="translate(10, -35)">
                  <rect x="0" y="0" width="60" height="25" rx="4" fill="rgba(0,0,0,0.8)" stroke="rgba(255,255,255,0.2)" />
                  <text x="30" y="10" textAnchor="middle" fill="#94a3b8" fontSize="8" style={{ textTransform: 'uppercase' }}>Speed</text>
                  <text x="30" y="22" textAnchor="middle" fill={isBraking ? "#ef4444" : "#38bdf8"} fontSize="12" fontWeight="bold" fontFamily="monospace">
                    {Math.round(velocity)}
                  </text>
                </g>
              </g>

              {/* Phase Label Overlay (Centered in World) */}
              <g transform="translate(400, 20)">
                <rect x="-100" y="0" width="200" height="24" rx="12" fill={
                  phase === 'stopped' ? '#e2e8f0' :
                    phase === 'accel' ? '#dcfce7' :
                      phase === 'cruise' ? '#dbeafe' : '#fee2e2'
                } stroke="none" />
                <text x="0" y="17" textAnchor="middle" fontSize="12" fontWeight="bold" fill={
                  phase === 'stopped' ? '#475569' :
                    phase === 'accel' ? '#15803d' :
                      phase === 'cruise' ? '#1d4ed8' : '#b91c1c'
                } style={{ textTransform: 'uppercase' }}>
                  PHASE: {phase}
                </text>
              </g>
            </svg>
          </div>
        ) : (
          <div className={`relative h-48 overflow-hidden border-b-4 transition-colors ${theme.skyBg}`}>

            {/* Scenery: Clouds */}
            <div className={`absolute top-4 left-10 text-6xl opacity-${darkMode ? '10' : '20'}`}>☁️</div>
            <div className={`absolute top-8 left-60 text-5xl opacity-${darkMode ? '10' : '30'}`}>☁️</div>
            <div className={`absolute top-2 right-20 text-6xl opacity-${darkMode ? '10' : '20'}`}>☁️</div>

            {/* The Road */}
            <div className="absolute bottom-0 w-full h-16" style={{ backgroundColor: darkMode ? '#334155' : '#475569' }}>
              <div className="w-full h-full border-t-2 border-b-2 border-white/20 flex items-center">
                <div className="w-full border-t-2 border-dashed" style={{ borderColor: darkMode ? '#64748b' : 'rgba(250, 204, 21, 0.5)' }}></div>
              </div>
            </div>

            {/* The Car */}
            <div
              className="absolute bottom-4 transition-transform duration-200 ease-out"
              style={{
                // Updated Transform: Uses carRotation variable calculated above
                transform: `translateX(${carVisualX}px) rotate(${carRotation}deg)`,
                transformOrigin: 'bottom center'
              }}
            >
              {/* Brake Light Glow Effect (Only visible when braking AND NOT FINISHED) */}
              {(isBraking && !isFinished) && (
                <div className="absolute top-[22px] -left-1 w-6 h-3 bg-red-500 rounded-full blur-[4px] opacity-80 animate-pulse"></div>
              )}

              {/* STOPPED LABEL - Appears when finished */}
              {isFinished && (
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/90 px-2 py-1 rounded border-2 border-slate-800 text-slate-800 font-bold text-xs shadow-md animate-pulse">
                  STOPPED
                </div>
              )}

              {/* Simple SVG Car */}
              <svg width="80" height="40" viewBox="0 0 100 50">
                {/* Brake Light (Physical part) */}
                <rect x="8" y="20" width="4" height="12" fill={(isBraking && !isFinished) ? "#ff2222" : "#7f1d1d"} rx="1" />

                {/* Car Body */}
                <path d="M10 40 L10 20 L25 10 L75 10 L90 20 L90 40 Z" fill="#ef4444" stroke="#991b1b" strokeWidth="2" />

                {/* Wheels */}
                <circle cx="25" cy="40" r="8" fill="#1e293b" />
                <circle cx="75" cy="40" r="8" fill="#1e293b" />
                <circle cx="25" cy="40" r="3" fill="#94a3b8" />
                <circle cx="75" cy="40" r="3" fill="#94a3b8" />
              </svg>

              {/* Speedometer Floating Above Car */}
              <div className="absolute -top-12 left-0 w-20 bg-black/80 text-white text-xs p-1 rounded text-center border border-white/20 backdrop-blur-sm">
                <div className="text-[10px] text-slate-400 uppercase">Speed</div>
                <div className={`font-mono font-bold text-lg ${isBraking ? 'text-red-500' : 'text-blue-400'}`}>
                  {Math.round(velocity)}
                </div>
              </div>
            </div>

            {/* Phase Label Overlay (World) */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2">
              <div className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm 
                    ${phase === 'stopped' ? 'bg-slate-200 text-slate-600' :
                  phase === 'accel' ? 'bg-green-100 text-green-700' :
                    phase === 'cruise' ? 'bg-blue-100 text-blue-700' :
                      'bg-red-100 text-red-700'}`}>
                Current Phase: {phase.toUpperCase()}
              </div>
            </div>
          </div>
        )}

        {/* --- PART 2: GRAPH WORLD (BOTTOM) --- */}
        <div className={`relative h-85 ${theme.graphBg} px-16 pt-16 pb-0 not-md:h-auto not-md:p-6 transition-colors`}>

          {/* Graph Grid/Axes */}
          <svg viewBox="0 0 800 200" className="w-full h-full overflow-visible">
            {/* Grid Lines (Vertical - Time) */}
            {[0, 2, 5, 8, 10].map(t => {
              const x = (t / DURATION) * 800;
              return (
                <g key={t}>
                  <line x1={x} y1="0" x2={x} y2="200" stroke="#334155" strokeWidth="1" strokeDasharray="4" />
                  <text x={x} y="220" fill="#64748b" fontSize="12" textAnchor="middle">{t}s</text>
                </g>
              );
            })}

            {/* Grid Lines (Horizontal - Velocity) */}
            {[0, 10, 20, 30].map(val => {
              const y = 200 - ((val / MAX_VELOCITY) * 200);
              return (
                <g key={val}>
                  <line x1="0" y1={y} x2="800" y2={y} stroke="#334155" strokeWidth="1" strokeDasharray="4" opacity="0.5" />
                  {val > 0 && <text x="-10" y={y + 4} fill="#64748b" fontSize="10" textAnchor="end">{val}</text>}
                </g>
              );
            })}

            {/* Labels */}
            <text x="400" y="240" fill="#94a3b8" fontSize="14" textAnchor="middle" fontWeight="bold">Time (s)</text>
            <text x="-40" y="100" fill="#94a3b8" fontSize="14" textAnchor="middle" fontWeight="bold" transform="rotate(-90 -40 100)">Velocity (m/s)</text>

            {/* THE LIVE GRAPH LINE */}
            <path
              d={getSvgPath()}
              fill="none"
              stroke="#38bdf8" // Sky blue 
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* The "Pen" (Current Point) */}
            {graphPoints.length > 0 && (() => {
              const lastPt = graphPoints[graphPoints.length - 1];
              const cx = (lastPt.t / DURATION) * 800;
              const cy = 200 - ((lastPt.v / MAX_VELOCITY) * 200);
              return (
                <circle cx={cx} cy={cy} r="6" fill="#fff" stroke="#38bdf8" strokeWidth="3" />
              );
            })()}

          </svg>

          {/* Dynamic Cue Card */}
          {mobile ? (
            <div className="w-full mt-10 md:mt-0 md:absolute md:top-6 md:right-6 md:w-64">
              <div className={`p-4 rounded-lg shadow-lg border-l-4 transition-all duration-300
                    ${phase === 'stopped' ? 'bg-slate-800 border-slate-500 text-slate-300' :
                  phase === 'accel' ? 'bg-slate-800 border-green-500 text-green-400' :
                    phase === 'cruise' ? 'bg-slate-800 border-blue-500 text-blue-400' :
                      'bg-slate-800 border-red-500 text-red-400'}`}>
                <h3 className="font-bold text-sm uppercase mb-1">Graph Interpretation</h3>
                <p className="text-lg font-bold">{cue}</p>
              </div>
            </div>
          ) : (
            <div className="absolute top-6 right-6">
              <div className={`p-4 rounded-lg shadow-lg border-l-4 transition-all duration-300
                    ${phase === 'stopped' ? 'bg-slate-800 border-slate-500 text-slate-300' :
                  phase === 'accel' ? 'bg-slate-800 border-green-500 text-green-400' :
                    phase === 'cruise' ? 'bg-slate-800 border-blue-500 text-blue-400' :
                      'bg-slate-800 border-red-500 text-red-400'}`}>
                <h3 className="font-bold text-sm uppercase mb-1">Graph Interpretation</h3>
                <p className="text-lg font-bold">{cue}</p>
              </div>
            </div>)}
        </div>

        {/* CONTROLS */}
        <div className={`p-4 border-t flex justify-center gap-4 transition-colors ${theme.controlsBg}`}>
          {!isPlaying && !isFinished ? (
            <button
              onClick={handleStart}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform active:scale-95 flex items-center gap-2"
            >
              {currentTime > 0 ? "▶ Resume" : "▶ Start Simulation"}
            </button>
          ) : isPlaying ? (
            <button
              onClick={handlePause}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-8 rounded-full shadow transition-colors flex items-center gap-2"
            >
              ⏸ Pause
            </button>
          ) : (
            <button
              onClick={handleReset}
              className={`${theme.resetBtn} text-white font-bold py-3 px-8 rounded-full shadow transition-colors flex items-center gap-2`}
            >
              ↺ Reset
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export const DecodingGraphs = ({ darkMode, mobile }) => {
  // --- STATE ---
  const [time, setTime] = useState(0); // 0 to 10 seconds
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSlopeTriangle, setShowSlopeTriangle] = useState(true);

  // --- REFS ---
  const requestRef = useRef();
  const startTimeRef = useRef(0);
  const pausedTimeRef = useRef(0);

  // --- CONFIG ---
  const DURATION = 10;
  const MAX_TIME = 10;
  const MAX_DISP = 100; // y = x^2, so at x=10, y=100

  // SVG DIMENSIONS (Responsive Logic)
  // On mobile, we reduce logical width (zooming in) and adjust aspect ratio
  const WIDTH = mobile ? 400 : 800;
  const HEIGHT = mobile ? 350 : 400; // Taller on mobile for better visibility
  const PADDING = mobile ? 40 : 60;

  // DRAWING AREA
  const GRAPH_W = WIDTH - PADDING * 2;
  const GRAPH_H = HEIGHT - PADDING * 2;

  // --- MATH HELPERS ---

  // The Function: s = t^2 (Parabola)
  const getDisplacement = (t) => t * t;

  // The Derivative: v = 2t (Linear)
  const getVelocity = (t) => 2 * t;

  // Coordinate mappers
  const mapX = (t) => PADDING + (t / MAX_TIME) * GRAPH_W;
  const mapY = (s) => (HEIGHT - PADDING) - (s / MAX_DISP) * GRAPH_H;

  // --- ANIMATION LOOP ---
  const animate = (timestamp) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const elapsed = (timestamp - startTimeRef.current + pausedTimeRef.current) / 1000;

    // Loop physics speed: 1 real second = 1 graph second
    if (elapsed >= DURATION) {
      setTime(DURATION);
      setIsPlaying(false);
      startTimeRef.current = 0;
      pausedTimeRef.current = 0;
      return;
    }

    setTime(elapsed);
    requestRef.current = requestAnimationFrame(animate);
  };

  // --- CONTROLS ---
  const handleStart = () => {
    if (time >= DURATION) {
      setTime(0);
      pausedTimeRef.current = 0;
    }
    setIsPlaying(true);
    requestRef.current = requestAnimationFrame(animate);
  };

  const handlePause = () => {
    setIsPlaying(false);
    cancelAnimationFrame(requestRef.current);
    if (startTimeRef.current > 0) {
      pausedTimeRef.current += performance.now() - startTimeRef.current;
      startTimeRef.current = 0;
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    cancelAnimationFrame(requestRef.current);
    setTime(0);
    startTimeRef.current = 0;
    pausedTimeRef.current = 0;
  };

  const handleScrub = (e) => {
    handlePause();
    const newTime = Number(e.target.value);
    setTime(newTime);
    pausedTimeRef.current = newTime * 1000;
  };

  useEffect(() => {
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  // --- CALCULATE RENDER VISUALS ---
  const currentS = getDisplacement(time);
  const currentV = getVelocity(time);

  const cx = mapX(time);
  const cy = mapY(currentS);

  // Tangent Calculation
  const delta = 0.1;
  const x1 = mapX(time);
  const y1 = mapY(time * time);
  const x2 = mapX(time + delta);
  const y2 = mapY((time + delta) ** 2);

  const angleRad = Math.atan2(y1 - y2, x2 - x1);
  const angleDeg = angleRad * (180 / Math.PI);

  // Scaled Visual Constants
  const tangentLength = mobile ? 80 : 150; // Shorter tangent line on mobile
  const fontSizeMain = mobile ? "12" : "10";
  const fontSizeLabel = mobile ? "14" : "12";
  const strokeWidthMain = mobile ? "3" : "4";

  // Generate the Curve Path
  const generatePath = () => {
    let d = `M ${mapX(0)} ${mapY(0)}`;
    for (let t = 0; t <= 10; t += 0.1) {
      d += ` L ${mapX(t)} ${mapY(t * t)}`;
    }
    return d;
  };

  // Theme Constants
  const theme = {
    cardBg: darkMode ? 'bg-slate-800' : 'bg-white',
    textMain: darkMode ? 'text-slate-100' : 'text-slate-800',
    textSub: darkMode ? 'text-slate-400' : 'text-slate-500',
    gridLine: darkMode ? '#334155' : '#e2e8f0', // slate-700 : slate-200
    gridText: darkMode ? '#94a3b8' : '#94a3b8',
    curve: '#3b82f6', // Blue-500
    tangent: '#f59e0b', // Amber-500
    triangle: '#ef4444' // Red-500
  };

  return (
    <div className={`font-sans ${theme.textMain} flex flex-col items-center py-4 sm:py-8`}>

      <div className={`max-w-4xl w-full ${theme.cardBg} rounded-xl shadow-2xl overflow-hidden border ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}>

        {/* HEADER */}
        <div className={`${darkMode ? 'bg-slate-950' : 'bg-slate-900'} text-white p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4`}>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Slope = Velocity</h1>
            <p className="text-slate-400 text-xs sm:text-sm">Visualizing Instantaneous Velocity</p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto bg-slate-800/50 p-2 rounded-lg sm:bg-transparent sm:p-0">
            <div className="text-xs uppercase text-slate-400">Slope (v)</div>
            <div className="font-mono text-xl sm:text-2xl font-bold text-yellow-400 ml-auto sm:ml-2">
              {currentV.toFixed(1)} <span className="text-sm text-yellow-600">m/s</span>
            </div>
          </div>
        </div>

        {/* GRAPH STAGE */}
        <div className={`relative ${darkMode ? 'bg-slate-900' : 'bg-slate-100'} p-2 sm:p-4 overflow-hidden select-none`}>

          <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className={`w-full h-auto ${theme.cardBg} rounded border ${darkMode ? 'border-slate-700' : 'border-slate-200'} shadow-inner`} preserveAspectRatio="xMidYMid meet">

            {/* GRID */}
            {/* Y-Axis Grid */}
            {[0, 25, 50, 75, 100].map(val => (
              <g key={val}>
                <line x1={PADDING} y1={mapY(val)} x2={WIDTH - PADDING} y2={mapY(val)} stroke={theme.gridLine} strokeWidth="1" />
                <text x={PADDING - (mobile ? 5 : 10)} y={mapY(val) + 4} textAnchor="end" fontSize={fontSizeMain} fill={theme.gridText}>{val}</text>
              </g>
            ))}
            {/* X-Axis Grid */}
            {[0, 2, 4, 6, 8, 10].map(val => (
              <g key={val}>
                <line x1={mapX(val)} y1={HEIGHT - PADDING} x2={mapX(val)} y2={PADDING} stroke={theme.gridLine} strokeWidth="1" />
                <text x={mapX(val)} y={HEIGHT - PADDING + (mobile ? 15 : 20)} textAnchor="middle" fontSize={fontSizeMain} fill={theme.gridText}>{val}</text>
              </g>
            ))}

            {/* AXIS LABELS */}
            <text x={WIDTH / 2} y={HEIGHT - (mobile ? 5 : 10)} textAnchor="middle" fontWeight="bold" fontSize={fontSizeLabel} fill={theme.textSub}>Time (s)</text>
            <text x={mobile ? 10 : 15} y={HEIGHT / 2} textAnchor="middle" fontWeight="bold" fontSize={fontSizeLabel} fill={theme.textSub} transform={`rotate(-90 ${mobile ? 10 : 15} ${HEIGHT / 2})`}>Displacement (m)</text>

            {/* THE CURVE */}
            <path d={generatePath()} fill="none" stroke={theme.curve} strokeWidth={strokeWidthMain} strokeLinecap="round" />

            {/* SLOPE TRIANGLE (Ghost) */}
            {showSlopeTriangle && time < 9.5 && time > 0.5 && (
              <g opacity="0.6">
                {/* Run Line */}
                <line
                  x1={cx} y1={cy}
                  x2={cx + (mobile ? 40 : 60)} y2={cy}
                  stroke={theme.gridText} strokeWidth="1" strokeDasharray="4"
                />
                {/* Rise Line */}
                <line
                  x1={cx + (mobile ? 40 : 60)} y1={cy}
                  x2={cx + (mobile ? 40 : 60)} y2={cy - (Math.tan(angleRad) * (mobile ? 40 : 60))}
                  stroke={theme.triangle} strokeWidth="2"
                />
              </g>
            )}

            {/* THE TANGENT "SEESAW" */}
            <g transform={`translate(${cx}, ${cy}) rotate(${-angleDeg})`}>
              {/* Tangent Line */}
              <line x1={-tangentLength} y1="0" x2={tangentLength} y2="0" stroke={theme.tangent} strokeWidth={mobile ? "2" : "3"} opacity="0.8" />
              {/* Weights */}
              <circle cx={-tangentLength} cy="0" r={mobile ? "2" : "3"} fill={theme.tangent} />
              <circle cx={tangentLength} cy="0" r={mobile ? "2" : "3"} fill={theme.tangent} />
            </g>

            {/* THE POINT (SURFER) */}
            <circle cx={cx} cy={cy} r={mobile ? "6" : "8"} fill={theme.tangent} stroke={theme.cardBg} strokeWidth="3" className="shadow-lg" />

            {/* FLOATING LABEL (Smart Positioning for Mobile) */}
            {/* On mobile, we move the label slightly differently so it doesn't clip */}
            <g transform={`translate(${cx - (mobile ? 50 : 60)}, ${cy - (mobile ? 35 : 40)})`}>
              <rect width={mobile ? "100" : "120"} height={mobile ? "25" : "30"} rx="4" fill="rgba(30, 41, 59, 0.9)" />
              <text x={mobile ? "50" : "60"} y={mobile ? "17" : "20"} textAnchor="middle" fill="white" fontSize={fontSizeMain} fontWeight="bold">
                v = {currentV.toFixed(1)}
              </text>
              <path d={`M ${mobile ? 50 : 60} ${mobile ? 25 : 30} L ${mobile ? 50 : 60} ${mobile ? 35 : 40}`} stroke="rgba(30, 41, 59, 0.9)" strokeWidth="2" />
            </g>

          </svg>

          {/* CONTEXT OVERLAYS (Stacked on Mobile) */}
          {/* On mobile, we show these below the graph instead of floating inside */}
          {!mobile && (
            <>
              <div className="absolute top-8 left-20 pointer-events-none">
                <div className={`transition-opacity duration-500 ${time < 2 ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded shadow text-sm font-bold border border-blue-300">
                    Flat Curve = v ≈ 0
                  </div>
                </div>
              </div>

              <div className="absolute bottom-20 right-20 pointer-events-none">
                <div className={`transition-opacity duration-500 ${time > 8 ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="bg-red-100 text-red-800 px-3 py-1 rounded shadow text-sm font-bold border border-red-300">
                    Steep Curve = High v
                  </div>
                </div>
              </div>
            </>
          )}

        </div>

        {/* MOBILE CONTEXT BAR */}
        {mobile && (
          <div className="flex border-b border-slate-200 text-center">
            <div className={`flex-1 p-2 text-xs font-bold ${time < 2 ? 'bg-blue-100 text-blue-700' : 'bg-slate-50 text-slate-300'}`}>
              Flat = Slow
            </div>
            <div className={`flex-1 p-2 text-xs font-bold ${time > 8 ? 'bg-red-100 text-red-700' : 'bg-slate-50 text-slate-300'}`}>
              Steep = Fast
            </div>
          </div>
        )}

        {/* CONTROLS */}
        <div className={`p-4 sm:p-6 ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'} border-t`}>

          {/* Scrubber */}
          <div className="mb-4 sm:mb-6">
            <label className={`text-xs font-bold ${theme.textSub} uppercase mb-2 block`}>
              Surf the curve (Manual Control)
            </label>
            <input
              type="range"
              min="0" max="10" step="0.01"
              value={time}
              onChange={handleScrub}
              className={`w-full h-3 sm:h-2 rounded-lg appearance-none cursor-pointer accent-blue-600 ${darkMode ? 'bg-slate-700' : 'bg-slate-300'}`}
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex gap-3 w-full sm:w-auto">
              <button
                onClick={isPlaying ? handlePause : handleStart}
                className={`flex-1 sm:flex-none font-bold py-3 px-8 rounded-full shadow transition-all active:scale-95 flex items-center justify-center gap-2
                            ${isPlaying ? 'bg-yellow-500 hover:bg-yellow-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
              >
                {isPlaying ? "⏸ Pause" : time >= DURATION ? "↺ Replay" : "▶ Start"}
              </button>

              <button
                onClick={handleReset}
                className={`flex-1 sm:flex-none font-bold py-3 px-6 rounded-full transition-colors ${darkMode ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-slate-200 hover:bg-slate-300 text-slate-700'}`}
              >
                Reset
              </button>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start">
              <input
                type="checkbox"
                id="showTriangle"
                checked={showSlopeTriangle}
                onChange={(e) => setShowSlopeTriangle(e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
              />
              <label htmlFor="showTriangle" className={`text-sm font-medium cursor-pointer select-none ${theme.textMain}`}>
                Show Slope Triangle
              </label>
            </div>
          </div>
        </div>

      </div>

      <div className={`max-w-4xl w-full p-4 mt-5 rounded-lg text-sm ${darkMode ? 'bg-indigo-900/30 text-indigo-200' : 'bg-indigo-50 text-indigo-800'}`}>
        The readout shows the Perfect Mathematical Value. Your job with the ruler is to get as close to that number as humanly possible. If you get <strong>8.4 m/s</strong> and the screen says <strong>8.2 m/s</strong>, you did a great job estimating!
      </div>
    </div>
  );
};

export const VectorMath = ({ darkMode, mobile }) => {
  // --- STATE ---
  const [angle, setAngle] = useState(0); // Degrees 0 to 90
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(0.5); // Animation speed multiplier

  // --- REFS ---
  const requestRef = useRef();

  // --- CONFIG ---
  // Responsive Drawing Constants
  const SVG_SIZE = mobile ? 285 : 400;
  const VECTOR_LENGTH = mobile ? 220 : 280; // Shorter on mobile to fit screen
  const ORIGIN_X = 0;
  const ORIGIN_Y = mobile ? 280 : 360; // Shift up slightly on mobile

  // --- MATH HELPERS ---
  const toRad = (deg) => (deg * Math.PI) / 180;

  // Calculate coordinates
  // Note: SVG Y-axis is inverted (0 is top), so we subtract from ORIGIN_Y
  const rad = toRad(angle);
  const tipX = ORIGIN_X + VECTOR_LENGTH * Math.cos(rad);
  const tipY = ORIGIN_Y - VECTOR_LENGTH * Math.sin(rad);

  // Component Lengths (Normalized 0-1 for labels, Pixels for drawing)
  const compX_Norm = Math.cos(rad);
  const compY_Norm = Math.sin(rad);

  const compX_Px = VECTOR_LENGTH * compX_Norm;
  const compY_Px = VECTOR_LENGTH * compY_Norm;

  // --- ANIMATION LOOP ---
  const animate = () => {
    setAngle(prev => {
      let next = prev + (0.5 * speed);
      if (next >= 90) {
        setIsPlaying(false);
        return 90;
      }
      return next;
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
  }, [isPlaying, speed]);

  // --- CONTROLS ---
  const handlePlayPause = () => {
    if (angle >= 90) setAngle(0); // Auto-restart if finished
    setIsPlaying(!isPlaying);
  };

  const handleScrub = (e) => {
    setIsPlaying(false);
    setAngle(Number(e.target.value));
  };

  const handleReset = () => {
    setIsPlaying(false);
    setAngle(0);
  };

  // --- TEXT LABELS LOGIC ---
  const getContextLabel = () => {
    if (angle < 2) return "Horizontal MAX";
    if (angle > 88) return "Vertical MAX";
    if (Math.abs(angle - 45) < 2) return "Equal Components";
    return "Resolving...";
  };

  // Theme Colors
  const theme = {
    cardBg: darkMode ? 'bg-slate-800' : 'bg-white',
    border: darkMode ? 'border-slate-700' : 'border-slate-200',
    textMain: darkMode ? 'text-slate-100' : 'text-slate-800',
    textSub: darkMode ? 'text-slate-400' : 'text-slate-500',
    svgBg: darkMode ? '#0f172a' : '#1e293b', // Always dark for graph contrast
    controlsBg: darkMode ? 'bg-slate-900' : 'bg-slate-50'
  };

  return (
    <div className={`font-sans ${theme.textMain} flex flex-col items-center py-4 sm:py-8`}>

      <div className={`max-w-4xl w-full ${theme.cardBg} rounded-xl shadow-2xl overflow-hidden border ${theme.border}`}>

        {/* HEADER */}
        <div className={`${darkMode ? 'bg-slate-950' : 'bg-slate-900'} text-white p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2`}>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Vector Resolution</h1>
            <p className="text-slate-400 text-xs sm:text-sm">Breaking a force into X and Y components</p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto bg-slate-800/50 p-2 rounded-lg sm:bg-transparent sm:p-0">
            <div className="text-xs uppercase text-slate-400">Status</div>
            <div className={`font-bold font-mono text-base sm:text-lg transition-colors duration-300 ml-auto sm:ml-2
                    ${angle < 2 ? 'text-blue-400' : angle > 88 ? 'text-red-400' : Math.abs(angle - 45) < 2 ? 'text-purple-400' : 'text-yellow-400'}
                `}>
              {getContextLabel()}
            </div>
          </div>
        </div>

        {/* VISUALIZATION STAGE */}
        <div className={`relative ${theme.svgBg}  pt-10 pb-20 pl-8 md:p-13 flex justify-center overflow-hidden`}>

          <svg width={SVG_SIZE} height={SVG_SIZE} viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`} className="overflow-visible" preserveAspectRatio="xMidYMid meet">

            {/* 1. GRID & AXES */}
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#334155" strokeWidth="1" />
              </pattern>
              <marker id="arrow-yellow" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto">
                <path d="M0,0 L0,6 L9,3 z" fill="#fbbf24" />
              </marker>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Axes */}
            <line x1={ORIGIN_X} y1={ORIGIN_Y} x2={SVG_SIZE - 20} y2={ORIGIN_Y} stroke="#94a3b8" strokeWidth="2" /> {/* X Axis */}
            <line x1={ORIGIN_X} y1={ORIGIN_Y} x2={ORIGIN_X} y2={20} stroke="#94a3b8" strokeWidth="2" />  {/* Y Axis */}
            <text x={SVG_SIZE - 20} y={ORIGIN_Y + 20} fill="#94a3b8" fontSize="12" fontWeight="bold">x</text>
            <text x={ORIGIN_X - 20} y="30" fill="#94a3b8" fontSize="12" fontWeight="bold">y</text>

            {/* 2. PROJECTION LINES (Dashed) */}
            <path
              d={`M ${tipX} ${tipY} L ${tipX} ${ORIGIN_Y}`}
              stroke="#3b82f6"
              strokeWidth="1"
              strokeDasharray="4"
              opacity="0.5"
            />
            <path
              d={`M ${tipX} ${tipY} L ${ORIGIN_X} ${tipY}`}
              stroke="#ef4444"
              strokeWidth="1"
              strokeDasharray="4"
              opacity="0.5"
            />

            {/* 3. COMPONENTS (Bars) */}

            {/* BLUE BAR (X-Component) */}
            <line
              x1={ORIGIN_X} y1={ORIGIN_Y + 5}
              x2={ORIGIN_X + compX_Px} y2={ORIGIN_Y + 5}
              stroke="#3b82f6" strokeWidth={mobile ? "4" : "6"} strokeLinecap="round"
            />

            {/* RED BAR (Y-Component) */}
            <line
              x1={ORIGIN_X - 5} y1={ORIGIN_Y}
              x2={ORIGIN_X - 5} y2={ORIGIN_Y - compY_Px}
              stroke="#ef4444" strokeWidth={mobile ? "4" : "6"} strokeLinecap="round"
            />

            {/* 4. MAIN VECTOR (Yellow) */}
            <line
              x1={ORIGIN_X} y1={ORIGIN_Y}
              x2={tipX} y2={tipY}
              stroke="#fbbf24" strokeWidth={mobile ? "4" : "6"}
              markerEnd="url(#arrow-yellow)"
            />

            {/* 5. ANGLE ARC */}
            {angle > 5 && (
              <path
                d={`M ${ORIGIN_X + 40} ${ORIGIN_Y} A 40 40 0 0 0 ${ORIGIN_X + 40 * Math.cos(rad)} ${ORIGIN_Y - 40 * Math.sin(rad)}`}
                fill="none" stroke="#fbbf24" strokeWidth="2" opacity="0.6"
              />
            )}
            {angle > 10 && (
              <text x={ORIGIN_X + 50} y={ORIGIN_Y - 15} fill="#fbbf24" fontSize="12">
                {Math.round(angle)}°
              </text>
            )}

            {/* 6. DYNAMIC LABELS ON GRAPH */}

            {/* Cosine Label */}
            <text
              x={ORIGIN_X + compX_Px / 2}
              y={ORIGIN_Y + (mobile ? 20 : 25)}
              fill="#3b82f6"
              textAnchor="middle"
              fontWeight="bold"
              fontSize={mobile ? "12" : "14"}
            >
              cos {Math.round(angle)}° = {compX_Norm.toFixed(2)}
            </text>

            {/* Sine Label */}
            <text
              x={ORIGIN_X - 15}
              y={ORIGIN_Y - compY_Px / 2}
              fill="#ef4444"
              textAnchor="end"
              dominantBaseline="middle"
              fontWeight="bold"
              fontSize={mobile ? "12" : "14"}
              transform={`rotate(-90, ${ORIGIN_X - 15}, ${ORIGIN_Y - compY_Px / 2})`}
            >
              sin {Math.round(angle)}° = {compY_Norm.toFixed(2)}
            </text>

          </svg>
        </div>

        {/* MATH CONTEXT (Visible on Mobile now too) */}
        <div className={`flex justify-around p-3 text-xs sm:text-sm font-mono border-t ${theme.border} ${theme.controlsBg}`}>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
            <span className={theme.textSub}>x = R·cos(θ)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
            <span className={theme.textSub}>y = R·sin(θ)</span>
          </div>
        </div>

        {/* CONTROLS */}
        <div className={`${theme.controlsBg} p-4 sm:p-6 border-t ${theme.border}`}>

          {/* Scrubber */}
          <div className="mb-6">
            <div className={`flex justify-between text-xs font-bold ${theme.textSub} uppercase mb-2`}>
              <span>0° (Flat)</span>
              <span>90° (Vertical)</span>
            </div>
            <input
              type="range"
              min="0" max="90" step="0.1"
              value={angle}
              onChange={handleScrub}
              className={`w-full h-4 sm:h-3 rounded-lg appearance-none cursor-pointer accent-yellow-500 ${darkMode ? 'bg-slate-700' : 'bg-slate-200'}`}
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <button
              onClick={handlePlayPause}
              className={`w-full sm:w-auto font-bold py-3 px-8 rounded-full shadow transition-all active:scale-95 flex items-center justify-center gap-2 text-white
                            ${isPlaying ? 'bg-slate-600 hover:bg-slate-700' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {isPlaying ? "⏸ Pause" : angle >= 90 ? "↺ Replay" : "▶ Animate Rotation"}
            </button>

            <button
              onClick={handleReset}
              className={`w-full sm:w-auto border font-bold py-3 px-6 rounded-full transition-colors 
              ${darkMode ? 'bg-slate-800 border-slate-600 text-slate-300 hover:bg-slate-700' : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'}`}
            >
              Reset (0°)
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export const ProjectileMotionPrinciples = ({ darkMode, mobile }) => {
  // --- STATE ---
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // --- REFS ---
  const requestRef = useRef();
  const startTimeRef = useRef(0);
  const pausedTimeRef = useRef(0);

  // --- CONFIG ---
  // We keep the logical dimensions constant (800x450) so physics calculations remain consistent.
  // The SVG viewBox handles the scaling for mobile screens.
  const WIDTH = 800;
  const HEIGHT = 450;
  const CLIFF_WIDTH = 100;
  const CLIFF_HEIGHT = 150; // Distance from top

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

  // --- RESPONSIVE SCALING ---
  // Increase visual sizes on mobile because the 800px scene is shrunk down
  const textScale = mobile ? 22 : 14;
  const radiusScale = mobile ? 18 : 12;
  const shadowRadius = mobile ? 24 : 15;

  // --- DARK MODE THEME ---
  const theme = {
    // Container & Text
    textMain: darkMode ? 'text-slate-100' : 'text-slate-800',
    textSub: darkMode ? 'text-slate-400' : 'text-slate-500',

    // Main Card
    cardBg: darkMode ? 'bg-slate-800' : 'bg-white',
    cardBorder: darkMode ? 'border-slate-700' : 'border-slate-200',

    // Header
    headerBg: darkMode ? 'bg-slate-950' : 'bg-slate-900', // Keep dark header for contrast in both modes or customize
    headerBorder: darkMode ? 'border-slate-800' : 'border-slate-200',

    // Simulation Stage
    stageBg: darkMode ? 'bg-slate-900' : 'bg-sky-50',
    cliffFill: darkMode ? '#334155' : '#94a3b8',
    groundFill: darkMode ? '#334155' : '#64748b',
    syncLineStroke: darkMode ? '#fff' : '#475569',

    // Shadows & Visuals
    shadowOpacity: darkMode ? 0.4 : 0.3,

    // Info Cards
    infoBg: darkMode ? 'bg-slate-900/50' : 'bg-slate-100',
    infoTextBlue: darkMode ? 'text-blue-400' : 'text-blue-600',
    infoTextRed: darkMode ? 'text-red-400' : 'text-red-600',

    // Mobile Card
    mobileCardBg: darkMode ? 'bg-slate-800' : 'bg-white',
    mobileCardBorder: darkMode ? 'border-slate-700' : 'border-slate-200',
    mobileText: darkMode ? 'text-slate-300' : 'text-slate-600',

    // Controls
    controlsBg: darkMode ? 'bg-slate-800' : 'bg-slate-50',
    controlsBorder: darkMode ? 'border-slate-700' : 'border-slate-200',
    resetBtn: darkMode ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-slate-200 hover:bg-slate-300 text-slate-700',
  };

  return (
    <div className={`font-sans ${theme.textMain} flex flex-col items-center py-4 sm:py-8 transition-colors duration-300`}>

      <div className={`max-w-4xl w-full ${theme.cardBg} rounded-xl shadow-2xl overflow-hidden border ${theme.cardBorder} transition-colors`}>

        {/* HEADER */}
        <div className={`${theme.headerBg} p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center border-b ${theme.headerBorder} gap-4 transition-colors`}>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-yellow-400">Projectile Motion</h1>
            <p className="text-slate-400 text-xs sm:text-sm">X and Y components act independently</p>
          </div>
          <div className={`text-left sm:text-right font-mono text-xs sm:text-sm ${theme.infoBg} p-2 rounded w-full sm:w-auto transition-colors`}>
            <div className={`${theme.infoTextBlue} font-bold`}>
              {time === 0 ? "Vx = 0 (Ready)" : isFinished ? "Vx = 0 (Stopped)" : "Vx = Constant"}
            </div>
            <div className={`${theme.infoTextRed} font-bold mt-1`}>
              {time === 0 ? "Vy = 0 (Ready)" : isFinished ? "Vy = 0 (Stopped)" : "Vy = Accelerating"}
            </div>
          </div>
        </div>

        {/* STAGE */}
        <div className={`relative ${theme.stageBg} overflow-hidden transition-colors duration-300`}>
          {/* Responsive SVG: preserves 800x450 ratio but fills width */}
          <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full h-auto block" preserveAspectRatio="xMidYMid meet">

            {/* 1. SCENERY */}
            {/* Cliff */}
            <path
              d={`M 0 ${HEIGHT} L 0 ${CLIFF_HEIGHT} L ${CLIFF_WIDTH} ${CLIFF_HEIGHT} L ${CLIFF_WIDTH} ${HEIGHT} Z`}
              fill={theme.cliffFill}
              className="transition-colors duration-300"
            />
            {/* Ground */}
            <rect x="0" y={HEIGHT - 10} width={WIDTH} height="10" fill={theme.groundFill} className="transition-colors duration-300" />

            {/* 2. SYNC LINES (The Dotted Connectors) */}
            {/* Vertical Line */}
            <line
              x1={pos.x} y1={topShadowPos.y}
              x2={pos.x} y2={pos.y}
              stroke={theme.syncLineStroke} strokeWidth="2" strokeDasharray="8,8" opacity="0.3"
            />
            {/* Horizontal Line */}
            <line
              x1={pos.x} y1={pos.y}
              x2={sideShadowPos.x} y2={pos.y}
              stroke={theme.syncLineStroke} strokeWidth="2" strokeDasharray="8,8" opacity="0.3"
            />

            {/* 3. THE SHADOWS */}

            {/* Top Shadow (Horizontal Motion) */}
            <g>
              <circle cx={topShadowPos.x} cy={topShadowPos.y} r={shadowRadius} fill="#3b82f6" opacity={theme.shadowOpacity} />
              <circle cx={topShadowPos.x} cy={topShadowPos.y} r={radiusScale * 0.7} fill="#3b82f6" />
              <text x={topShadowPos.x} y={topShadowPos.y + (mobile ? 40 : -20)} fill="#3b82f6" fontSize={textScale} fontWeight="bold" textAnchor="middle">
                {time === 0 ? "Ready" : isFinished ? "Stopped" : "Constant Speed"}
              </text>
            </g>

            {/* Side Shadow (Vertical Motion) */}
            <g>
              <circle cx={sideShadowPos.x} cy={sideShadowPos.y} r={shadowRadius} fill="#ef4444" opacity={theme.shadowOpacity} />
              <circle cx={sideShadowPos.x} cy={sideShadowPos.y} r={radiusScale * 0.7} fill="#ef4444" />
              {/* Smart positioning for label so it doesn't get cut off */}
              <text x={sideShadowPos.x - (mobile ? 40 : 25)} y={sideShadowPos.y + 4} fill="#ef4444" fontSize={textScale} fontWeight="bold" textAnchor="end">
                {time === 0 ? "Ready" : isFinished ? "Stopped" : "Accelerating"}
              </text>
            </g>

            {/* 4. THE REAL BALL (Projectile) */}
            <circle cx={pos.x} cy={pos.y} r={radiusScale} fill="#facc15" stroke="white" strokeWidth="2" />

            {/* 5. TRAIL */}
            <path
              d={`M ${CLIFF_WIDTH} ${CLIFF_HEIGHT} Q ${CLIFF_WIDTH + VELOCITY_X * (time / 2)} ${CLIFF_HEIGHT} ${pos.x} ${pos.y}`}
              fill="none" stroke="#facc15" strokeWidth="3" strokeDasharray="6" opacity="0.5"
            />

          </svg>

          {mobile ? (
            <>
            </>
          ) : (
            <>
              {/* Teaching Context Overlays */}
              < div className={`absolute top-20 left-4 w-48 text-xs ${theme.textSub}`}>
                The Blue Shadow moves steadily because gravity only acts downwards, not sideways.
              </div>
            </>
          )}
        </div>

        {/* Mobile Info Card (Stacks below graph) */}
        <div className={`md:hidden p-4 ${theme.mobileCardBg} border-t ${theme.mobileCardBorder} transition-colors`}>
          <div className="flex items-start gap-3">
            <div className="mt-1 w-3 h-3 rounded-full bg-blue-500 shrink-0"></div>
            <p className={`text-sm ${theme.mobileText}`}>
              The <strong>Blue Shadow</strong> (Horizontal) moves at a constant speed because gravity does not affect horizontal motion.
            </p>
          </div>
        </div>

        {/* CONTROLS */}
        <div className={`p-4 sm:p-6 ${theme.controlsBg} border-t ${theme.controlsBorder} flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 transition-colors`}>
          <button
            onClick={isPlaying ? handlePause : handleStart}
            className={`w-full sm:w-auto font-bold py-3 px-8 rounded-full shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2
                    ${isPlaying ? 'bg-yellow-600 hover:bg-yellow-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white'}`}
          >
            {isPlaying ? "⏸ Pause" : isFinished ? "↺ Replay" : "▶ Launch Projectile"}
          </button>

          <button
            onClick={handleReset}
            className={`w-full sm:w-auto font-bold py-3 px-6 rounded-full transition-colors ${theme.resetBtn}`}
          >
            Reset
          </button>
        </div>

      </div>
    </div >
  );
};