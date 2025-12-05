import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Activity, TrendingUp, AreaChart, GitCommit, ArrowLeft } from 'lucide-react';
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

  // --- CONTENT DATA (Corrected for Physics Accuracy) ---
  const content = {
    module: "Module 1.3 • Mechanics",
    title: "Graphs of Motion",
    subtitle: "Visualizing the Story of Speed",
    intro: "A graph is just a story told in lines. By learning to read the slopes and areas, you can instantly tell if an object is stopped, cruising, or accelerating, without doing a single calculation.",
    sections: [
      {
        id: "types",
        title: "Part 1: The 3 Types of Graphs",
        icon: <Activity className="w-6 h-6" />,
        text: "Always check the Y-axis label first. The shape of the line means completely different things depending on what variable is being plotted.",
        points: [
          {
            type: "Displacement-Time (s-t)",
            def: "Shows CHANGE IN POSITION. How far (and which way) you are from the start.",
            examples: "Horizontal line = Stopped. Diagonal line = Constant Velocity."
          },
          {
            type: "Velocity-Time (v-t)",
            def: "Shows SPEED & DIRECTION. This is the most versatile graph.",
            examples: "Horizontal line = Constant Velocity. Diagonal line = Acceleration."
          },
          {
            type: "Acceleration-Time (a-t)",
            def: "Shows the RATE OF CHANGE of velocity.",
            examples: "Horizontal line at 0 = Constant Velocity. Horizontal line above 0 = Constant Acceleration."
          }
        ],
        quiz: {
          question: "You see a horizontal line on a graph. If the object is moving at a steady 20 m/s, which graph is it?",
          options: ["Displacement-Time", "Acceleration-Time", "Velocity-Time"],
          correctIndex: 2
        }
      },
      {
        id: "slope",
        title: "Part 2: The Slope (Gradient)",
        icon: <TrendingUp className="w-6 h-6" />,
        text: "The steepness (Gradient) allows you to translate one graph into another. Gradient represents the 'Rate of Change'.",
        comparison: [
          { label: "Slope of s-t Graph", desc: "Equals VELOCITY. (Steeper = Faster. Negative Slope = Backward direction)." },
          { label: "Slope of v-t Graph", desc: "Equals ACCELERATION. (Steeper = Rapid change in speed)." }
        ],
        goldenRule: "Golden Rule: A curved line on a Displacement graph means the Velocity is changing (Acceleration is present).",
        // 

        // [Image of displacement vs velocity time graphs comparison]

        quiz: {
          question: "On a Displacement-Time graph, the line is a straight diagonal going downwards. What is the velocity?",
          options: ["Decreasing", "Constant and Negative", "Zero"],
          correctIndex: 1
        }
      },
      {
        id: "shapes",
        title: "Part 3: The 'Shape Dictionary'",
        icon: <GitCommit className="w-6 h-6" />,
        text: "Memorize these shape meanings to analyze motion instantly.",
        conditions: [
          "Horizontal Line on s-t: Object is STATIONARY.",
          "Horizontal Line on v-t: Object has CONSTANT VELOCITY (a = 0).",
          "Diagonal Line ( / ) on v-t: Object has CONSTANT ACCELERATION (Uniform).",
          "Line crossing X-axis on v-t: Object has CHANGED DIRECTION (turned around)."
        ],
        // 

        // [Image of calculating slope on a velocity time graph]

        quiz: {
          question: "A Velocity-Time graph shows a line crossing from positive to negative. What happened at the crossing point?",
          options: ["The object stopped momentarily while turning around", "The object hit a wall", "The object reached max speed"],
          correctIndex: 0
        }
      },
      {
        id: "area",
        title: "Part 4: The Area (The Accumulator)",
        icon: <AreaChart className="w-6 h-6" />,
        text: "The area 'trapped' between the line and the x-axis represents the accumulation of a quantity. This is integration in visual form.",
        equations: [
          { name: "Area under v-t Graph", type: "Equals", formula: "Displacement (s)" },
          { name: "Area under a-t Graph", type: "Equals", formula: "Change in Velocity (Δv)" },
        ],
        insight: "Visual Tip: Areas below the x-axis count as NEGATIVE displacement. If you have equal areas above and below, your total displacement is zero (you are back at the start).",
        // 

        // [Image of area under velocity time graph calculation]

        quiz: {
          question: "To find the total displacement from a Velocity-Time graph, what do you calculate?",
          options: ["The slope of the line", "The y-intercept", "The area between the line and the time axis"],
          correctIndex: 2
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

                  {/* COMPARISON/RULE LAYOUT (Slopes) */}
                  {section.id === "slope" && (
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
                    </div>
                  )}

                  {/* EQUATIONS LAYOUT (Areas) */}
                  {section.id === "area" && (
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
                      <div className={`p-4 rounded-lg text-sm ${darkMode ? 'bg-indigo-900/30 text-indigo-200' : 'bg-indigo-50 text-indigo-800'}`}>
                        {section.insight}
                      </div>
                    </div>
                  )}

                  {/* LIST/STEPS LAYOUT (Shapes Interpretation) */}
                  {section.id === "shapes" && (
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