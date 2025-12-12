import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ArrowDown, Box, Maximize2, Move, ArrowLeft } from 'lucide-react';
import { Checkpoint } from './Checkpoint';

export function DesignTesting({ darkMode }) {
  // --- STATE ---
  const [unlockedIndex, setUnlockedIndex] = useState(0);
  const sectionRefs = useRef([]);
  const navigate = useNavigate();

  // Scroll to new section when unlocked
  useEffect(() => {
    if (unlockedIndex > 0 && sectionRefs.current[unlockedIndex]) {
      setTimeout(() => {
        sectionRefs.current[unlockedIndex].scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }, 100);
    }
  }, [unlockedIndex]);

  // --- CONTENT DATA (Module 3.1) ---
  const content = {
    module: "Module 3.1 • Dynamics",
    title: "3.1 Free Body Diagrams",
    subtitle: "The Map of Forces",
    intro: "Dynamics is the study of *why* things move. To predict motion, we must identify every single push and pull acting on an object. The Free Body Diagram (FBD) is the standard engineer's tool for visualizing these invisible forces.",
    sections: [
      {
        id: "concept",
        title: "Part 1: The Particle Model",
        icon: <Box className="w-6 h-6" />,
        text: "Real objects are complex shapes (cars, planes, people). In Physics, we simplify them into a single dot called a 'Particle'. We assume all mass is concentrated at this one point.",
        comparison: [
          {
            label: "Center of Gravity",
            desc: "The single point where the object's weight appears to act. For a uniform box, it's the geometric center."
          },
          {
            label: "The Diagram",
            desc: "Draw the object as a simple box or dot. All forces must point AWAY from the dot."
          }
        ],
        goldenRule: "Never draw forces acting *on* other objects. Only draw the forces acting ON the object you are studying.",
        // Static Image Placeholder
        imageTag: (
          <div className="mt-4 text-center text-sm opacity-60 italic">

            <br />Simplifying reality into the Particle Model.
          </div>
        ),
        quiz: {
          question: "When drawing a Free Body Diagram for a book resting on a table, which force do you NOT include?",
          options: ["The weight of the book", "The force of the table pushing up", "The force of the book pushing down on the table"],
          correctIndex: 2
        }
      },
      {
        id: "forces",
        title: "Part 2: The Force Checklist",
        icon: <ArrowDown className="w-6 h-6" />,
        text: "Don't guess. Go through this checklist to ensure you haven't missed anything.",
        points: [
          {
            type: "Weight (W = mg)",
            def: "Always points vertically DOWN towards the center of the Earth.",
            examples: "Present on every object with mass."
          },
          {
            type: "Normal Reaction (R)",
            def: "The 'support' force from a surface. Always points PERPENDICULAR (90°) away from the surface.",
            examples: "A table holding up a book."
          },
          {
            type: "Friction / Drag",
            def: "Resistive forces. Always point OPPOSITE to the direction of motion.",
            examples: "Air resistance, grip on the road."
          },
          {
            type: "Tension / Thrust",
            def: "Pulling forces (strings) or driving forces (engines). Point along the line of action.",
            examples: "Rope pulling a sled, jet engine pushing a plane."
          }
        ],
        quiz: {
          question: "A block is sliding down a rough slope. In which direction does the Friction force point?",
          options: ["Down the slope", "Up the slope (Opposite to motion)", "Perpendicular to the slope"],
          correctIndex: 1
        }
      },
      {
        id: "signs",
        title: "Part 3: The Coordinate System (Signs)",
        icon: <Move className="w-6 h-6" />,
        text: "This is the most critical step. Forces are vectors, so Direction = Sign. You must choose which way is 'Positive'.",
        conditions: [
          "Standard Convention: Up is (+), Down is (-). Right is (+), Left is (-).",
          "Adaptive Convention: It is often smarter to define the 'Direction of Acceleration' as Positive.",
          "Example: If a lift is accelerating DOWN, treat Down as (+) and Up as (-). This makes the math easier (a is positive).",
          "Crucial Rule: Once you choose a direction, you must stick to it for ALL vectors (u, v, a, F) in that problem."
        ],
        imageTag: (
          <div className="mt-4 text-center text-sm opacity-60 italic">
            [Image showing the same FBD with two different coordinate systems]
            <br />Both systems are correct, as long as you are consistent.
          </div>
        ),
        quiz: {
          question: "A rocket accelerates upwards. Gravity acts downwards. If you choose 'Up' as positive, what is the sign of Weight (W)?",
          options: ["Positive (+W)", "Negative (-W)", "Zero"],
          correctIndex: 1
        }
      },
      {
        id: "net_force",
        title: "Part 4: The Resultant (Net Force)",
        icon: <Maximize2 className="w-6 h-6" />,
        text: "The 'Net Force' (ΣF) is the vector sum of all forces. This is what actually causes acceleration.",
        equations: [
          {
            name: "Equilibrium (Balanced)",
            type: "a = 0",
            formula: "ΣF = 0 (Up = Down)"
          },
          {
            name: "Accelerating (Unbalanced)",
            type: "a ≠ 0",
            formula: "ΣF = ma (Forward - Back = ma)"
          }
        ],
        goldenRule: "Newton's Second Law: Acceleration happens in the exact same direction as the Net Force.",
        quiz: {
          question: "A car is traveling at a constant velocity of 100 km/h. What is the Net Force acting on it?",
          options: ["Large forward force", "Zero", "Small backward force"],
          correctIndex: 1
        }
      }
    ]
  };

  return (
    <>
      <title>{content.title}</title>
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
        <main className="pt-24 pb-20 px-4 sm:px-6">

          {/* Back Button */}
          <div
            className={`text-blue-600 font-bold rounded-2xl p-2 not-md:mb-6 cursor-pointer ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"} inline-block`}
            onClick={() => navigate(-1)}
          >
            <div className='flex items-center gap-x-3'>
              <ArrowLeft className='w-7 h-7' />
              <div>Back</div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto space-y-12">

            {/* Header Section */}
            <header className="text-center space-y-4 animate-fade-in-up">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase ${darkMode ? 'bg-indigo-900/50 text-indigo-300' : 'bg-indigo-100 text-indigo-700'}`}>
                {content.module}
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                {content.title}
              </h1>
              <p className={`text-xl ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                {content.subtitle}
              </p>
            </header>

            {/* Intro Card */}
            <div className={`p-6 sm:p-8 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
              <p className="text-lg leading-relaxed">
                {content.intro}
              </p>
            </div>

            {/* --- SECTIONS LOOP --- */}
            {content.sections.map((section, idx) => {
              const isUnlocked = idx <= unlockedIndex;
              const isCurrent = idx === unlockedIndex;
              const isLast = idx === content.sections.length - 1;

              if (!isUnlocked) return null;

              return (
                <section
                  key={section.id}
                  ref={el => sectionRefs.current[idx] = el}
                  className={`space-y-6 transition-opacity duration-700 ${isCurrent ? 'opacity-100' : 'opacity-80'}`}
                >
                  {/* Section Header */}
                  <div className="flex items-center space-x-3 pt-4">
                    <div className={`p-2 rounded-lg ${darkMode ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-50 text-indigo-600'}`}>
                      {section.icon}
                    </div>
                    <h2 className="text-2xl font-bold">{section.title}</h2>
                  </div>

                  {/* Main Text */}
                  <p className={`text-lg ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    {section.text}
                  </p>

                  {/* --- LAYOUTS --- */}

                  {/* COMPARISON LAYOUT (Particle Model) */}
                  {section.id === "concept" && (
                    <div className="space-y-4">
                      <div className={`rounded-xl overflow-hidden divide-y ${darkMode ? 'divide-slate-700 border border-slate-700' : 'divide-slate-200 border border-slate-200'}`}>
                        {section.comparison.map((item) => (
                          <div key={item.label} className={`p-4 flex flex-col sm:flex-row gap-4 ${darkMode ? 'bg-slate-800/30' : 'bg-white'}`}>
                            <span className="font-bold sm:w-1/3 shrink-0">{item.label}</span>
                            <span className={`sm:w-2/3 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{item.desc}</span>
                          </div>
                        ))}
                      </div>
                      <div className={`p-4 rounded-l-md border-l-4 ${darkMode ? 'bg-amber-900/20 border-amber-500 text-amber-200' : 'bg-amber-50 border-amber-500 text-amber-800'}`}>
                        <strong className="block uppercase text-xs font-bold tracking-wider mb-1 opacity-70">Golden Rule</strong>
                        {section.goldenRule}
                      </div>
                      {section.imageTag}
                    </div>
                  )}

                  {/* GRID LAYOUT (Force Types) */}
                  {section.id === "forces" && (
                    <div className="grid md:grid-cols-2 gap-4">
                      {section.points.map((pt) => (
                        <div key={pt.type} className={`p-5 rounded-xl border ${darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                          <h3 className={`font-bold text-lg mb-2 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>{pt.type}</h3>
                          <p className="mb-3 text-sm opacity-90">{pt.def}</p>
                          <div className="text-xs font-mono uppercase tracking-wide opacity-60">Examples:</div>
                          <div className="font-medium text-sm">{pt.examples}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* LIST/STEPS LAYOUT (Signs) */}
                  {section.id === "signs" && (
                    <div className={`p-6 rounded-xl border ${darkMode ? 'bg-slate-800/30 border-slate-700' : 'bg-white border-slate-200 shadow-sm'}`}>
                      <ul className="space-y-4">
                        {section.conditions.map((cond, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className={`mt-1.5 w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-xs font-bold ${darkMode ? 'bg-indigo-500 text-white' : 'bg-indigo-600 text-white'}`}>
                              {i + 1}
                            </div>
                            <span>{cond}</span>
                          </li>
                        ))}
                      </ul>
                      {section.imageTag}
                    </div>
                  )}

                  {/* EQUATIONS LAYOUT (Net Force) */}
                  {section.id === "net_force" && (
                    <div className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        {section.equations.map((eq) => (
                          <div key={eq.name} className={`p-5 rounded-xl border text-center ${darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                            <div className="text-sm uppercase tracking-widest opacity-60 mb-2">{eq.type}</div>
                            <div className="text-xl font-serif italic mb-2 font-bold tracking-wide">
                              {eq.formula}
                            </div>
                            <div className="text-xs opacity-50">{eq.name}</div>
                          </div>
                        ))}
                      </div>
                      <div className={`p-4 rounded-l-md border-l-4 ${darkMode ? 'bg-amber-900/20 border-amber-500 text-amber-200' : 'bg-amber-50 border-amber-500 text-amber-800'}`}>
                        <strong className="block uppercase text-xs font-bold tracking-wider mb-1 opacity-70">Golden Rule</strong>
                        {section.goldenRule}
                      </div>
                    </div>
                  )}

                  {/* Checkpoint */}
                  {isCurrent && (
                    <div className="mt-12 mb-20 animate-fade-in-up">
                      <Checkpoint
                        darkMode={darkMode}
                        quiz={section.quiz}
                        isLast={isLast}
                        nextSectionTitle={!isLast ? content.sections[idx + 1].title : 'Finish'}
                        onUnlock={() => setUnlockedIndex(prev => prev + 1)}
                      />
                    </div>
                  )}
                </section>
              );
            })}

          </div>
        </main>
      </div>
    </>
  );
}