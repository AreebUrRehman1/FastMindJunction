import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { AreaChart, TrendingUp, Zap, ArrowLeft, Ruler } from 'lucide-react';
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

  // --- CONTENT DATA (Module 1.4) ---
  const content = {
    module: "Module 1.4 • Kinematics",
    title: "1.4 Decoding Graphs (Slopes & Areas)",
    subtitle: "Extracting Hidden Information",
    intro: "The true power of a graph isn't just its shape. By measuring the 'steepness' (Slope) or the 'space underneath' (Area), we can unlock hidden variables like velocity and displacement without needing a single formula.",
    sections: [
      {
        id: "slope",
        title: "Part 1: The Slope is the Rate",
        icon: <TrendingUp className="w-6 h-6" />,
        text: "The Gradient (Slope) of a line represents the 'Rate of Change'. It tells you how fast the Y-variable is changing compared to the X-variable.",
        comparison: [
          { label: "Slope of s-t Graph", desc: "Calculates Velocity (v). (Change in Position / Time)" },
          { label: "Slope of v-t Graph", desc: "Calculates Acceleration (a). (Change in Speed / Time)" }
        ],
        goldenRule: "Calculation Tip: Gradient = (y₂ - y₁) / (x₂ - x₁). Always pick two points as far apart as possible for accuracy.",
        imageTag: "[Image of calculating slope on a velocity time graph]",
        quiz: {
          question: "You calculate the gradient of a Velocity-Time graph and get a negative number (e.g., -5 m/s²). What does this mean?",
          options: ["The object is moving backwards.", "The object is slowing down (Decelerating).", "The calculation is wrong."],
          correctIndex: 1
        }
      },
      {
        id: "area",
        title: "Part 2: The Area is the Accumulator",
        icon: <AreaChart className="w-6 h-6" />,
        text: "The area trapped between the line and the x-axis represents the 'product' of the axes (Y multiplied by X).",
        equations: [
          { name: "Area under v-t Graph", type: "Equals", formula: "Displacement (s)" },
          { name: "Area under a-t Graph", type: "Equals", formula: "Change in Velocity (Δv)" },
        ],
        insight: "Visual Tip: Split complex shapes into rectangles and triangles. Remember: Area below the X-axis subtracts from your total displacement.",
        imageTag: "[Image of area under velocity time graph calculation]",
        quiz: {
          question: "A Velocity-Time graph is a rectangle 4s wide and 10m/s high. What is the displacement?",
          options: ["2.5 m", "14 m", "40 m"],
          correctIndex: 2
        }
      },
      {
        id: "curves",
        title: "Part 3: Advanced - The Curve Decoder",
        icon: <Zap className="w-6 h-6" />,
        text: "What if the line is curved? A curve means the slope (velocity or acceleration) is changing every instant. You cannot use 'Rise over Run' directly.",
        conditions: [
          "To find the Instantaneous Rate at a specific time 't':",
          "1. Place your ruler at point 't' on the curve.",
          "2. Draw a TANGENT (a straight line that just touches the curve without cutting through it).",
          "3. Calculate the gradient of that straight tangent line."
        ],
        imageTag: "[Image of tangent line drawn on a curved graph to find instantaneous slope]",
        quiz: {
          question: "On a Displacement-Time graph, the curve is getting flatter (less steep). What is happening to the velocity?",
          options: ["Velocity is decreasing (Slowing down).", "Velocity is increasing.", "Velocity is constant."],
          correctIndex: 0
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

                  {/* COMPARISON/RULE LAYOUT (Slope) */}
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
                      {section.imageTag && (
                        <div className="mt-4 text-center text-sm opacity-50 italic">
                          {section.imageTag}
                        </div>
                      )}
                    </div>
                  )}

                  {/* EQUATIONS LAYOUT (Area) */}
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
                      {section.imageTag && (
                        <div className="mt-4 text-center text-sm opacity-50 italic">
                          {section.imageTag}
                        </div>
                      )}
                    </div>
                  )}

                  {/* LIST/STEPS LAYOUT (Curves/Tangents) */}
                  {section.id === "curves" && (
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
                      {section.imageTag && (
                        <div className="mt-4 text-center text-sm opacity-50 italic">
                          {section.imageTag}
                        </div>
                      )}
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