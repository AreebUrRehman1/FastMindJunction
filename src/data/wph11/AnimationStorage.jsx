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