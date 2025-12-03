import {useState, useEffect, useRef } from 'react';

export const DisplacementVelocityAndAcceleration = () => {
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

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-800">

      {/* MAIN CONTENT */}
      <main className="flex-grow flex flex-col md:flex-row relative border-">
        
        {/* --- LEFT SIDE: SCALAR --- */}
        <section className="w-full md:w-1/2 bg-slate-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
          <div className="absolute top-4 left-4 bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            Scalar Quantity
          </div>

          <h2 className="text-3xl font-bold text-slate-700 mb-8 drop-shadow-sm">Temperature</h2>

          {/* Thermometer SVG */}
          <div className="relative w-32 h-80">
            <svg width="100%" height="100%" viewBox="0 0 100 300">
              {/* Tube Background */}
              <rect x="35" y="20" width="30" height="240" rx="15" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="2" />
              {/* Bulb */}
              <circle cx="50" cy="260" r="30" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="2" />
              
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
              <line x1="35" y1="200" x2="20" y2="200" stroke="#94a3b8" strokeWidth="2" />
              <text x="5" y="205" fontSize="12" fill="#64748b">0</text>
              
              <line x1="35" y1="140" x2="20" y2="140" stroke="#94a3b8" strokeWidth="2" />
              <text x="0" y="145" fontSize="12" fill="#64748b">50</text>
              
              <line x1="35" y1="80" x2="20" y2="80" stroke="#94a3b8" strokeWidth="2" />
              <text x="-5" y="85" fontSize="12" fill="#64748b">100</text>
            </svg>
          </div>

          {/* Value Display */}
          <div className="mt-6 text-center">
            <p className="text-5xl font-mono font-bold transition-colors duration-500" style={{ color: activeColor }}>
              {temp}&deg;C
            </p>
            <p className="text-slate-500 mt-2 text-sm max-w-xs">
              Defined only by <strong>magnitude</strong> (how much). <br />Direction does not exist.
            </p>
          </div>

          {/* Slider */}
          <div className="mt-8 w-64">
            <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Change Temperature</label>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={temp} 
              onChange={(e) => setTemp(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>
        </section>


        {/* --- RIGHT SIDE: VECTOR --- */}
        <section className="w-full md:w-1/2 bg-slate-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
          <div className="absolute top-4 left-4 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            Vector Quantity
          </div>

          <h2 className="text-3xl font-bold text-slate-700 mb-8 drop-shadow-sm">Force</h2>

          {/* Physics Canvas Area */}
          <div className="relative w-full h-80 flex items-center justify-center border border-dashed border-slate-300 rounded-lg bg-white overflow-hidden shadow-sm">
            
            {/* Grid Background */}
            <div className="absolute inset-0 opacity-10" 
                 style={{ 
                   backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', 
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
                   <line x1="100" y1="100" x2="300" y2="100" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" />
                   {/* Bold Blue Arrow */}
                   <line x1="120" y1="100" x2="200" y2="100" stroke="#2563eb" strokeWidth="3" markerEnd="url(#arrowhead)" />
                   <text x="140" y="85" fill="#2563eb" fontWeight="bold" fontSize="16">F (Force)</text>
                </g>

                {/* Archer Body (Top Down View) */}
                <circle cx="100" cy="100" r="15" fill="#475569" />
                <path d="M100 85 L100 115" stroke="#475569" strokeWidth="4" />

                {/* Bow (Fixed shape) */}
                <path d="M100 50 Q 130 100 100 150" fill="none" stroke="#854d0e" strokeWidth="4" strokeLinecap="round" />

                {/* Bow String (Animates based on isDrawn) */}
                <polyline 
                  points={isDrawn ? "100 50, 70 100, 100 150" : "100 50, 100 100, 100 150"} 
                  fill="none" 
                  stroke="#000" 
                  strokeWidth="1"
                  className="transition-all duration-300 ease-out"
                />

                {/* The Arrow (Animates based on isDrawn) */}
                <g className="transition-transform duration-300 ease-out" style={{ transform: isDrawn ? 'translateX(-30px)' : 'translateX(0px)' }}>
                   <line x1="100" y1="100" x2="130" y2="100" stroke="#000" strokeWidth="2" />
                   <polygon points="130 100, 125 97, 125 103" fill="#000" />
                </g>

              </svg>
            </div>

            {/* Compass Helper */}
            <div className="absolute bottom-2 right-2 text-xs text-slate-400 font-mono border border-slate-200 p-1 rounded bg-white">
              Angle: {angle}&deg;
            </div>
          </div>

          {/* Value Display */}
          <div className="mt-4 text-center">
            <p className="text-lg font-medium text-slate-700">
              Force = <span className="text-blue-600 font-bold">150 N</span>
            </p>
            <p className="text-slate-500 text-sm max-w-xs mt-1">
              Defined by <strong>magnitude</strong> (150N) AND <strong>direction</strong> ({getDirectionText(angle)}).
            </p>
          </div>

          {/* Controls */}
          <div className="mt-4 w-full max-w-xs space-y-4">
            {/* Rotation Slider */}
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Direction (Rotate)</label>
                <span className="text-xs text-blue-500 font-bold">{angle}°</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="360" 
                value={angle} 
                onChange={(e) => setAngle(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>

            {/* Action Button */}
            <button 
              onClick={() => setIsDrawn(!isDrawn)}
              className={`w-full py-2 font-bold rounded shadow transition-colors ${
                isDrawn 
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

export const DisplacementVelocityAndAcceleration2 = () => {
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
  
  // Distance: Just the progress value
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
      // Stop exactly at 400
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

  return (
    <div className="min-h-screen text-white font-sans flex flex-col items-center py-8">
      
      {/* Header */}
      <div className="text-center mb-6 max-w-2xl px-4">
        <h1 className="text-3xl font-bold mb-2 text-black">
          Distance vs. Displacement
        </h1>
        <p className="text-slate-500 text-sm">
          <strong>Distance</strong> is the total path traveled (Scalar). <br/>
          <strong>Displacement</strong> is the straight-line change in position (Vector).
        </p>
      </div>

      {/* Main Animation Stage */}
      <div className="relative rounded-xl p-4 pb-20">
        
        <svg width="400" height="400" viewBox="0 0 400 400" className="mx-auto">
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
            fill="none" stroke="#334155" strokeWidth="20" 
          />
          <text x={CENTER_X} y={CENTER_Y} textAnchor="middle" dy="5" fill="#181d24" fontSize="60" fontWeight="bold" opacity="0.6">
            400m
          </text>
          
          {/* Start Line Indicator */}
          <line 
            x1={CENTER_X} y1={CENTER_Y - TRACK_RADIUS - 15} 
            x2={CENTER_X} y2={CENTER_Y - TRACK_RADIUS + 15} 
            stroke="white" strokeWidth="2" strokeDasharray="4"
          />
          <text x={CENTER_X} y={CENTER_Y - TRACK_RADIUS - 25} textAnchor="middle" fill="black" fontSize="10">START / FINISH</text>

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
              {/* Optional: Dashed line to show the 'chord' clearly if arrow is short */}
              {displacementMeters > 50 && (
                 <text x={(startX + runnerX)/2} y={(startY + runnerY)/2} fill="#4ade80" fontSize="12" fontWeight="bold" dy="-10" textAnchor="middle" className="bg-slate-900">
                    d = {Math.round(displacementMeters)}m
                 </text>
              )}
            </g>
          )}

          {/* 4. RUNNER (The Dot) */}
          <circle 
            cx={runnerX} cy={runnerY} r="8" 
            fill="#fff" stroke="#000" strokeWidth="2"
            className="shadow-lg"
          />
        </svg>

        {/* Data Readout Overlay */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between gap-4">
            
            {/* Distance Card */}
            <div className={`flex-1 p-3 rounded-lg border border-yellow-500/30 bg-slate-900/80 backdrop-blur-sm transition-all ${progress >= 400 ? 'ring-2 ring-yellow-500' : ''}`}>
                <div className="text-yellow-400 text-xs font-bold uppercase tracking-wider mb-1">
                    Distance (Path)
                </div>
                <div className="text-2xl font-mono font-bold text-white">
                    {Math.round(distance)}<span className="text-sm text-slate-400">m</span>
                </div>
                <div className="text-xs text-slate-400 mt-1">
                    {progress >= 400 ? "Lap Complete" : "Always Increasing"}
                </div>
            </div>

            {/* Displacement Card */}
            <div className={`flex-1 p-3 rounded-lg border border-green-500/30 bg-slate-900/80 backdrop-blur-sm transition-all ${progress >= 400 ? 'ring-2 ring-red-500' : ''}`}>
                <div className="text-green-400 text-xs font-bold uppercase tracking-wider mb-1">
                    Displacement (Vector)
                </div>
                <div className="text-2xl font-mono font-bold text-white">
                    {progress >= 399 ? "0" : Math.round(displacementMeters)}<span className="text-sm text-slate-400">m</span>
                </div>
                <div className="text-xs text-slate-400 mt-1">
                    {progress >= 399 ? "Back at Origin!" : "Direct path from start"}
                </div>
            </div>

        </div>

      </div>

      {/* Controls */}
      <div className="mt-8 flex gap-4">
        <button 
          onClick={handleStartStop}
          className={`px-8 py-3 rounded-full font-bold shadow-lg transition-transform active:scale-95 ${
            isRunning 
            ? 'bg-red-500 hover:bg-red-600 text-white' 
            : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          {progress >= 400 ? 'Restart Run' : isRunning ? 'Pause' : 'Start Run'}
        </button>

        <button 
          onClick={handleReset}
          className="px-6 py-3 rounded-full font-bold bg-slate-700 hover:bg-slate-600 text-white transition-colors"
        >
          Reset
        </button>
      </div>
      
      {/* Speed Control */}
      <div className="mt-4 flex items-center gap-2 text-slate-500 uppercase font-bold  text-sm">
        <span>Slow</span>
        <input 
            type="range" 
            min="0.5" max="3" step="0.5" 
            value={speed} 
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-32 h-2 bg-slate-200 accent-blue-500 rounded-lg appearance-none cursor-pointer"
        />
        <span>Fast</span>
      </div>

    </div>
  );
};

export const DisplacementVelocityAndAcceleration3 = () => {
  // --- STATE (For Rendering UI) ---
  const [carX, setCarX] = useState(50);
  const [velocity, setVelocity] = useState(0);
  const [acceleration, setAcceleration] = useState(0); 
  const [lightColor, setLightColor] = useState('red'); 
  const [phase, setPhase] = useState('IDLE'); 
  const [isPaused, setIsPaused] = useState(false); // New Pause State
  
  // --- PHYSICS ENGINE (Mutable Ref for Real-time Loop) ---
  const physicsState = useRef({
    x: 50,
    v: 0,
    a: 0,
    phase: 'IDLE',
    light: 'red'
  });

  const requestRef = useRef();

  // --- CONFIG ---
  // SLOW MOTION UPDATE: Reduced values significantly for easier reading
  const MAX_SPEED = 4;       // Was 9
  const ACCEL_RATE = 0.04;   // Was 0.12
  const DECEL_RATE = 0.06;   // Was 0.15
  
  const ROAD_LENGTH = 800; 
  const BRAKING_POINT = ROAD_LENGTH - 350; 

  // --- ANIMATION LOOP ---
  const animate = () => {
    // 1. Get current physical state
    let { x, v, a, phase, light } = physicsState.current;
    
    // 2. Calculate Logic for NEXT frame
    let nextPhase = phase;
    let nextLight = light;
    let nextV = v;
    let nextA = 0;

    // STATE MACHINE
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
        // Check if we hit the braking line
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

    // 3. Update Position
    let nextX = x + nextV;

    // 4. Update Physics Ref
    physicsState.current = {
        x: nextX,
        v: nextV,
        a: nextA,
        phase: nextPhase,
        light: nextLight
    };

    // 5. Sync to React State
    setCarX(nextX);
    setVelocity(nextV);
    setAcceleration(nextA);
    setPhase(nextPhase);
    setLightColor(nextLight);

    // 6. Continue Loop if not finished
    if (nextPhase !== 'FINISHED' && nextPhase !== 'IDLE') {
        requestRef.current = requestAnimationFrame(animate);
    }
  };

  // --- CONTROLS ---
  const startSimulation = () => {
      setIsPaused(false);
      // Reset Physics State
      physicsState.current = {
          x: 50,
          v: 0,
          a: 0,
          phase: 'ACCELERATING',
          light: 'green'
      };
      // Start Loop
      cancelAnimationFrame(requestRef.current); // Safety cancel
      requestRef.current = requestAnimationFrame(animate);
  };

  const togglePause = () => {
    if (phase === 'IDLE' || phase === 'FINISHED') return;

    if (isPaused) {
        // RESUME
        setIsPaused(false);
        requestRef.current = requestAnimationFrame(animate);
    } else {
        // PAUSE
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

  // --- HELPERS FOR VISUALS ---
  const velArrowLength = Math.max(0, velocity * 15); // Increased multiplier slightly since speed is lower
  const accelArrowLength = 50; 

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center font-sans text-slate-800 p-4">
      
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-xl overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="bg-slate-800 text-white p-6 flex justify-between items-center">
            <div>
                <h1 className="text-2xl font-bold">Velocity vs. Acceleration</h1>
                <p className="text-slate-400 text-sm">Observe the direction of arrows during braking.</p>
            </div>
            <div className="text-right">
                <div className="text-xs uppercase tracking-wider text-slate-400 mb-1">Status</div>
                <div className={`font-mono font-bold ${phase === 'BRAKING' ? 'text-red-400' : 'text-green-400'}`}>
                    {isPaused ? "PAUSED" : phase}
                </div>
            </div>
        </div>

        {/* Animation Stage */}
        <div className="relative bg-slate-100 h-96 overflow-hidden border-b border-slate-200">
            
            <svg viewBox={`0 0 ${ROAD_LENGTH} 300`} className="w-full h-full preserve-3d">
                
                {/* 1. SCENERY */}
                {/* Road */}
                <rect x="0" y="200" width={ROAD_LENGTH} height="100" fill="#334155" />
                <line x1="0" y1="250" x2={ROAD_LENGTH} y2="250" stroke="#fff" strokeWidth="2" strokeDasharray="40,40" />
                
                {/* Braking Line Marker */}
                <line x1={BRAKING_POINT} y1="200" x2={BRAKING_POINT} y2="300" stroke="#ef4444" strokeWidth="4" strokeDasharray="10,10" opacity="0.5" />
                <text x={BRAKING_POINT + 10} y="290" fill="#ef4444" fontSize="12" fontWeight="bold" opacity="0.8">Braking Begins (Force -)</text>
                
                {/* Traffic Light 1 (Start) */}
                <g transform="translate(100, 50)">
                    <rect x="-15" y="0" width="30" height="80" rx="5" fill="#1e293b" />
                    <line x1="0" y1="80" x2="0" y2="200" stroke="#64748b" strokeWidth="4" />
                    {/* Lights */}
                    <circle cx="0" cy="20" r="8" fill={lightColor === 'red' && phase === 'IDLE' ? '#ef4444' : '#451a1a'} />
                    <circle cx="0" cy="40" r="8" fill="#422006" />
                    <circle cx="0" cy="60" r="8" fill={lightColor === 'green' ? '#22c55e' : '#064e3b'} />
                </g>

                {/* Traffic Light 2 (End) */}
                <g transform={`translate(${ROAD_LENGTH - 100}, 50)`}>
                    <rect x="-15" y="0" width="30" height="80" rx="5" fill="#1e293b" />
                    <line x1="0" y1="80" x2="0" y2="200" stroke="#64748b" strokeWidth="4" />
                    {/* Lights */}
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
                    
                    {/* Velocity Arrow (Blue, Top) - Show as soon as moving */}
                    {velocity > 0.1 && (
                        <g transform="translate(0, -60)">
                            <text x={velArrowLength / 2} y="-15" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold">Velocity (+)</text>
                            <line x1="0" y1="0" x2={velArrowLength} y2="0" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow-blue)" />
                        </g>
                    )}

                    {/* Acceleration Arrow (Orange, Bottom) */}
                    {acceleration !== 0 && (
                        <g transform="translate(0, 30)">
                             {/* Text Label - Positioned based on direction */}
                            <text x={acceleration > 0 ? accelArrowLength / 2 : -accelArrowLength / 2} y="25" textAnchor="middle" fill="#f97316" fontSize="14" fontWeight="bold">
                                {acceleration > 0 ? "Acceleration (+)" : "Acceleration (-)"}
                            </text>
                            
                            {/* The Arrow */}
                            {acceleration > 0 ? (
                                // Forward Arrow
                                <line x1="0" y1="0" x2={accelArrowLength} y2="0" stroke="#f97316" strokeWidth="2" markerEnd="url(#arrow-orange)" />
                            ) : (
                                // Backward Arrow
                                <line x1="0" y1="0" x2={-accelArrowLength} y2="0" stroke="#f97316" strokeWidth="2" markerEnd="url(#arrow-orange)" />
                            )}
                        </g>
                    )}

                </g>

                {/* Definitions */}
                <defs>
                    <marker id="arrow-blue" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
                        <polygon points="0 0, 12 6, 0 12" fill="#3b82f6" />
                    </marker>
                    <marker id="arrow-orange" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
                        <polygon points="0 0, 12 6, 0 12" fill="#f97316" />
                    </marker>
                </defs>

            </svg>

            {/* Teaching Overlay (Changes with Phase) */}
            <div className="absolute top-4 left-4 right-4 text-center pointer-events-none">
                {isPaused && (
                     <div className="inline-block bg-yellow-100 backdrop-blur px-6 py-3 rounded-full shadow-lg text-yellow-800 font-bold border-2 border-yellow-400 mb-2">
                        ⏸️ PAUSED
                     </div>
                )}
                <div className='block'></div>

                {phase === 'ACCELERATING' && (
                    <div className="inline-block bg-white/90 backdrop-blur px-4 py-2 rounded shadow text-green-700 font-medium border-l-4 border-green-500">
                        Velocity and Acceleration point in the <strong>SAME</strong> direction.<br/>
                        Speed increases.
                    </div>
                )}
                {phase === 'COASTING' && (
                    <div className="inline-block bg-white/90 backdrop-blur px-4 py-2 rounded shadow text-blue-600 font-medium border-l-4 border-blue-500">
                        Constant Velocity. Acceleration is <strong>ZERO</strong> (No Orange Arrow).<br/>
                        Car maintains speed until braking line.
                    </div>
                )}
                {phase === 'BRAKING' && (
                    <div className="inline-block bg-white/90 backdrop-blur px-4 py-2 rounded shadow text-red-600 font-medium border-l-4 border-red-500">
                        Velocity is still forward (+), but Acceleration is backward (-).<br/>
                        They <strong>OPPOSE</strong> each other, causing the car to slow down.
                    </div>
                )}
                {phase === 'FINISHED' && (
                    <div className="inline-block bg-white/90 backdrop-blur px-4 py-2 rounded shadow text-slate-700 font-medium border-l-4 border-slate-500">
                        Car Stopped. Velocity = 0. Acceleration = 0.
                    </div>
                )}
            </div>

        </div>

        {/* Controls */}
        <div className="p-6 border-t border-slate-200 flex justify-center gap-4">
            
            {/* RESET BUTTON */}
            {(phase !== 'IDLE') && (
                <button 
                    onClick={resetSimulation}
                    className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-3 px-8 rounded-full shadow transition-colors"
                >
                    Reset
                </button>
            )}

            {/* PLAY / PAUSE BUTTON */}
            {(phase !== 'IDLE' && phase !== 'FINISHED') && (
                <button 
                    onClick={togglePause}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-8 rounded-full shadow transition-colors flex items-center gap-2"
                >
                    {isPaused ? "▶ Resume" : "⏸ Pause"}
                </button>
            )}

            {/* START BUTTON */}
            {phase === 'IDLE' && (
                <button 
                    onClick={startSimulation}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform active:scale-95 flex items-center gap-2"
                >
                    <span className="text-xl">🚦</span> Go (Start Sequence)
                </button>
            )}

            {phase === 'FINISHED' && (<></>)}
        </div>
        
        {/* Legend */}
        <div className="px-6 pb-6 flex justify-center gap-8 text-sm text-slate-600">
            <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span>Velocity (Direction of Motion)</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange-500 rounded"></div>
                <span>Acceleration (Force applied)</span>
            </div>
        </div>

      </div>
    </div>
  );
};