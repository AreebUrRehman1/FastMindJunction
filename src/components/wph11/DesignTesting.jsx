import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Activity, GitCommit, TrendingUp, MonitorPlay, ArrowLeft } from 'lucide-react';
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

  // --- CONTENT DATA (Module 1.3) ---
  const content = {
    module: "Module 1.3 • Kinematics",
    title: "1.3 Drawing Graphs of Motion",
    subtitle: "Telling the Story of Motion in Lines",
    intro: "Before we calculate anything, we must learn to 'read' the lines. A single glance at the shape of a graph tells you if an object is stopped, cruising, or crashing—but only if you check the axis labels first.",
    sections: [
      {
        id: "types",
        title: "Part 1: The Three Storytellers",
        icon: <Activity className="w-6 h-6" />,
        text: "In Physics, the same motion looks completely different depending on which graph you use. Always check the Y-axis first.",
        points: [
          {
            type: "Displacement-Time (s-t)",
            def: "Plots POSITION. Tells you 'Where is it?'",
            examples: "Up = Moving Away. Down = Coming Back. Flat = Stopped."
          },
          {
            type: "Velocity-Time (v-t)",
            def: "Plots SPEED & DIRECTION. Tells you 'How fast?'",
            examples: "This is the most useful graph. Flat (non-zero) = Constant Speed."
          },
          {
            type: "Acceleration-Time (a-t)",
            def: "Plots THE PUSH. Tells you 'How is speed changing?'",
            examples: "Usually looks like steps or blocks."
          }
        ],
        quiz: {
          question: "You see a horizontal line on a graph. The object is moving at 100 km/h. Which graph is it?",
          options: ["Displacement-Time", "Velocity-Time", "Acceleration-Time (at zero)"],
          correctIndex: 1
        }
      },
      {
        id: "dictionary",
        title: "Part 2: The Shape Dictionary",
        icon: <GitCommit className="w-6 h-6" />,
        text: "Memorize how these three basic shapes translate into motion.",
        comparison: [
          { label: "Horizontal Line (-)", desc: "Means 'Constant'. On s-t: Stopped. On v-t: Constant Velocity." },
          { label: "Diagonal Line (/)", desc: "Means 'Changing at a steady rate'. On s-t: Constant Velocity. On v-t: Constant Acceleration." },
          { label: "Curved Line ( )", desc: "Means 'Changing rate'. On s-t: Acceleration. On v-t: Non-uniform Acceleration." }
        ],
        goldenRule: "Visual Tip: 'Steeper' always means 'More Intense'. Steeper s-t = Faster. Steeper v-t = Harder Acceleration.",
        // Image tag for context
        imageTag: "",
        quiz: {
          question: "A Displacement-Time graph shows a curve getting steeper and steeper. What is happening?",
          options: ["The object is slowing down.", "The object is accelerating (speeding up).", "The object is climbing a hill."],
          correctIndex: 1
        }
      },
      {
        id: "scenarios",
        title: "Part 3: Real World Translation",
        icon: <TrendingUp className="w-6 h-6" />,
        text: "Let's translate real-world scenarios into graph shapes.",
        conditions: [
          "Scenario A: Red Light (Stopped). -> s-t is Flat. v-t is Zero.",
          "Scenario B: Highway Cruise (Constant Speed). -> s-t is Diagonal. v-t is Flat (High up).",
          "Scenario C: Drag Race (Acceleration). -> s-t is Curved (Smiling). v-t is Diagonal.",
          "Scenario D: Braking (Deceleration). -> s-t is Curved (Frowning). v-t is Diagonal Down."
        ],
        quiz: {
          question: "A car brakes to a stop. What does the Velocity-Time graph look like?",
          options: ["A line sloping down to the x-axis.", "A horizontal line.", "A curved line going up."],
          correctIndex: 0
        }
      },
      {
        id: "animation_cue",
        title: "Part 4: Visualizing the Link",
        icon: <MonitorPlay className="w-6 h-6" />,
        text: "To truly understand this, we need to see the object move and the graph draw itself simultaneously.",
        // This is where your requested animation goes
        animationCue: (
          <div className={`p-6 rounded-xl border-2 border-dashed text-center ${darkMode ? 'border-indigo-500/50 bg-indigo-500/10' : 'border-indigo-300 bg-indigo-50'}`}>
            <span className="font-mono text-sm opacity-70 block mb-2">ANIMATION SLOT</span>
            <p className="font-bold text-lg">The Synced-Story Split Screen</p>
            <p className="text-sm opacity-80 mt-2 max-w-md mx-auto">
              Top: A car driving, stopping, and speeding up. <br />
              Bottom: A pen drawing the v-t graph in real-time, matching the car's motion.
            </p>
          </div>
        ),
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

                  {/* GRID LAYOUT (Graph Types) */}
                  {section.id === "types" && (
                    <div className="grid md:grid-cols-3 gap-4">
                      {section.points.map((pt) => (
                        <div key={pt.type} className={`p-5 rounded-xl border ${darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                          <h3 className={`font-bold text-lg mb-2 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>{pt.type}</h3>
                          <p className="mb-3 text-sm opacity-90">{pt.def}</p>
                          <div className="text-xs font-mono opacity-60">{pt.examples}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* COMPARISON/RULE LAYOUT (Dictionary) */}
                  {section.id === "dictionary" && (
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
                      {/* Image Placeholder */}
                      {section.imageTag && (
                        <div className="mt-4 text-center text-sm opacity-50 italic">
                          {section.imageTag}
                        </div>
                      )}
                    </div>
                  )}

                  {/* LIST/STEPS LAYOUT (Scenarios) */}
                  {section.id === "scenarios" && (
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
                    </div>
                  )}

                  {/* ANIMATION BOX */}
                  {section.animationCue && (
                    <div className="my-8 animate-fade-in-up">
                      {section.animationCue}
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