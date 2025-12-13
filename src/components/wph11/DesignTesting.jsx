import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, RotateCcw, CheckCircle2, XCircle } from 'lucide-react';

export const DesignTesting = () => {
  const [scene, setScene] = useState('flat'); // 'flat' or 'ramp'
  const [placedArrows, setPlacedArrows] = useState({});
  const [feedback, setFeedback] = useState({ msg: 'Drag forces onto the box', type: 'neutral' });
  const boxRef = useRef(null);

  const Forces = [
    { id: 'weight', label: 'Weight (mg)', color: 'bg-blue-500' },
    { id: 'normal', label: 'Normal Force (Fn)', color: 'bg-purple-500' },
    { id: 'friction', label: 'Friction (f)', color: 'bg-red-500' },
    { id: 'tension', label: 'Tension (T)', color: 'bg-orange-500' },
  ];

  // Configuration for correct arrow placements
  // Adjusted for better visual alignment and consistency (e.g., normal starts from 100% bottom, not 30% top)
  const SCENARIOS = {
    flat: {
      rotation: 0,
      zones: {
        weight: { top: '130%', left: '45%', rotation: 0 }, // Straight down
        normal: { top: '30%', left: '47%', rotation: 180 }, // Straight up (from bottom)
        friction: { top: '80%', left: '-5%', rotation: 90 }, // Left along surface
        tension: { top: '80%', left: '95%', rotation: -90 }, // Pulling right
      }
    },
    ramp: {
      rotation: 25, // The box tilts 25 degrees
      zones: {
        // Weight must counter-rotate to stay absolute vertical
        weight: { top: '130%', left: '45%', rotation: 0 },
        // Normal stays perpendicular to the surface (relative rotation 180)
        normal: { top: '30%', left: '45%', rotation: 180 },
        // Friction acts up the ramp
        friction: { top: '80%', left: '-6%', rotation: 90 },
        tension: { top: '75%', left: '95%', rotation: -90 },
      }
    }
  };

  const currentConfig = SCENARIOS[scene];

  // Sub-component for the sidebar items
  const DraggableArrow = ({ force, onDragEnd, isPlaced }) => {
    // If placed, we dim the sidebar item
    if (isPlaced) {
      return (
        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100 opacity-40 cursor-not-allowed">
          <div className={`w-3 h-3 rounded-full ${force.color}`} />
          <span className="font-medium text-slate-400 line-through">{force.label}</span>
        </div>
      );
    }

    return (
      <motion.div
        drag
        dragSnapToOrigin={true} // Bounces back if not handled
        dragElastic={0.2}
        dragMomentum={false}
        whileDrag={{ scale: 1.1, cursor: 'grabbing', zIndex: 50 }}
        whileHover={{ scale: 1.02, backgroundColor: '#f8fafc' }}
        onDragEnd={(e, info) => onDragEnd(e, info, force.id)}
        className="flex items-center gap-3 p-3 rounded-lg bg-white border border-slate-200 shadow-sm cursor-grab active:cursor-grabbing hover:border-blue-200 transition-colors"
      >
        <div className={`w-8 h-8 rounded-full ${force.color} bg-opacity-20 flex items-center justify-center`}>
          <ArrowDown size={16} className={force.color.replace('bg-', 'text-')} />
        </div>
        <span className="font-medium text-slate-700">{force.label}</span>
      </motion.div>
    );
  };

  const handleDragEnd = (event, info, forceId) => {
    const boxRect = boxRef.current.getBoundingClientRect();

    // 🐛 FIX FOR MOBILE/SCROLLING: Adjust the drop point to be viewport-relative
    // Framer Motion's info.point can be document-relative on some mobile browsers.
    const dropPoint = {
      x: info.point.x - (window.scrollX || window.pageXOffset),
      y: info.point.y - (window.scrollY || window.pageYOffset)
    };

    // Check if dropped roughly inside the box area
    // Increased the buffer from 50px to 80px for easier mobile target
    const buffer = 80;
    const isOverBox =
      dropPoint.x >= boxRect.left - buffer &&
      dropPoint.x <= boxRect.right + buffer &&
      dropPoint.y >= boxRect.top - buffer &&
      dropPoint.y <= boxRect.bottom + buffer;

    if (isOverBox) {
      setPlacedArrows(prev => ({ ...prev, [forceId]: true }));
      setFeedback({ msg: `Correct! Added ${Forces.find(f => f.id === forceId).label}.`, type: 'success' });
    } else {
      setFeedback({ msg: 'Missed! Try dragging closer to the box.', type: 'error' });
    }
  };

  const reset = () => {
    setPlacedArrows({});
    setFeedback({ msg: 'Reset complete.', type: 'neutral' });
    setTimeout(() => {
      setFeedback({ msg: 'Drag forces onto the box', type: 'neutral' });
    }, 1000)
  };

  return (
    // ⚙️ Added min-h-screen for better mobile layout stability
    <div className="flex flex-col md:flex-row bg-slate-50 p-8 gap-8 font-sans text-slate-800 min-h-screen">

      {/* SIDEBAR PALETTE */}
      <div className="w-full md:w-64 flex flex-col gap-4 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 z-10">
        <h2 className="text-xl font-bold text-slate-700 mb-2">Force Palette</h2>
        <p className="text-sm text-slate-400 mb-4">Drag these arrows onto the object.</p>

        <div className="flex flex-col gap-3">
          {Forces.map((force) => (
            <DraggableArrow
              key={force.id}
              force={force}
              onDragEnd={handleDragEnd}
              isPlaced={placedArrows[force.id]}
            />
          ))}
        </div>

        <div className="mt-auto pt-6 border-t border-slate-100 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">Scene:</span>
            <div className="flex bg-slate-100 p-1 rounded-lg">
              <button
                onClick={() => { setScene('flat'); reset(); }}
                className={`px-3 py-1 text-xs rounded-md transition-all ${scene === 'flat' ? 'bg-white shadow text-blue-600' : 'text-slate-500'}`}
              >
                Flat
              </button>
              <button
                onClick={() => { setScene('ramp'); reset(); }}
                className={`px-3 py-1 text-xs rounded-md transition-all ${scene === 'ramp' ? 'bg-white shadow text-blue-600' : 'text-slate-500'}`}
              >
                Ramp
              </button>
            </div>
          </div>
          <button
            onClick={reset}
            className="flex items-center justify-center gap-2 w-full py-2 text-sm text-slate-500 hover:bg-slate-50 rounded-lg transition-colors"
          >
            <RotateCcw size={16} /> Reset Diagram
          </button>
        </div>
      </div>

      {/* MAIN CANVAS */}
      <div className="flex-1 relative bg-white rounded-3xl shadow-inner border border-slate-200 flex flex-col items-center justify-center">

        {/* Feedback Toast */}
        <div className={`absolute top-6 px-6 py-2 rounded-full text-sm font-medium shadow-sm transition-colors duration-300 flex items-center gap-2
          ${feedback.type === 'success' ? 'bg-green-100 text-green-700' :
            feedback.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'}`}>
          {feedback.type === 'success' && <CheckCircle2 size={16} />}
          {feedback.type === 'error' && <XCircle size={16} />}
          {feedback.msg}
        </div>

        {/* The Physics World Container */}
        <div className="relative w-full max-w-2xl not-md:mt-30 h-96 flex items-center justify-center overflow-x-hidden">

          {/* The Surface (Table/Ramp) */}
          <motion.div
            className="absolute w-[120%] h-4 bg-slate-800 rounded-full"
            animate={{ rotate: currentConfig.rotation }}
            transition={{ type: "spring", stiffness: 60 }}
            style={{ top: '60%' }}
          />

          {/* The Object (Box) */}
          <motion.div
            ref={boxRef}
            animate={{
              rotate: currentConfig.rotation,
              y: -15 // Sit exactly on the line
            }}
            transition={{ type: "spring", stiffness: 60 }}
            className="relative w-32 h-32 not-md:w-20 not-md:h-20 bg-slate-200 rounded-lg border-2 border-slate-300 shadow-sm z-0"
          >
            {/* Center of Mass Dot */}
            <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-slate-800 rounded-full -translate-x-1/2 -translate-y-1/2 z-20" />

            {/* PLACED ARROWS RENDERED HERE */}
            <AnimatePresence>
              {Object.keys(placedArrows).map((key) => {
                if (!placedArrows[key]) return null;
                const zone = currentConfig.zones[key];
                const forceData = Forces.find(f => f.id === key);

                // Rotation logic for the arrow's graphic
                let arrowRotation = zone.rotation;

                // If the scene is a ramp, the box is rotated. 
                // We need to counter-rotate Weight to keep it vertical, 
                // but the others stay relative to the box's tilt.
                if (scene === 'ramp') {
                  if (key === 'weight') {
                    // Weight is always straight down (0 deg absolute)
                    arrowRotation = 0;
                  } else {
                    // Normal, Friction, Tension rotate with the box 
                    // (already handled by being a child of the rotated box)
                    // but we need to remove the box's rotation from the arrow's rotation prop 
                    // if we want them to appear perpendicular to the surface *inside* the box's coordinate system.
                    // However, since the rotation is applied to the parent (the box), 
                    // the arrow's zone.rotation is what it *should* look like on a flat surface.
                    // The ramp tilt *automatically* rotates it. So we just need to ensure Weight is 0.
                    // I will keep the original zone.rotation values for Normal/Friction/Tension to ensure they are surface-relative.
                    arrowRotation = zone.rotation;
                  }
                }

                return (
                  <motion.div
                    key={key}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute pointer-events-none flex items-center"
                    style={{
                      top: zone.top,
                      left: zone.left,
                      // We apply manual offsets to fine-tune placement
                      x: zone.xOffset,
                      y: zone.yOffset,
                      transformOrigin: '0 0',
                      width: 0, // Zero width so it acts as a point
                      height: 0
                    }}
                  >
                    {/* The Actual Arrow Graphic */}
                    <div
                      className="relative flex flex-col items-center"
                      style={{
                        transform: `rotate(${arrowRotation}deg)`,
                        transformOrigin: 'top center' // Pivot around the attachment point
                      }}
                    >
                      {/* Line */}
                      <div className={`w-1 h-16 ${forceData.color} rounded-full`} />
                      {/* Arrow Head */}
                      <div className={`w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[10px] border-t-${forceData.color.replace('bg-', '')}`} />

                      {/* Label */}
                      <span className={`absolute top-full mt-1 text-xs font-bold ${forceData.color.replace('bg-', 'text-')} whitespace-nowrap`}>
                        {forceData.label}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

          </motion.div>
        </div>

      </div>
    </div>
  );
};