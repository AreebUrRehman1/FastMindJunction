import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Calculator, Target, LayoutList, ArrowLeft, ArrowRight } from 'lucide-react';
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

  // --- CONTENT DATA (Module 2.3) ---
  const content = {
    module: "Module 2.3 • Vectors & Projectiles",
    title: "2.3 Projectile Problems",
    subtitle: "From Theory to Calculation",
    intro: "Now that we know the rules, it's time to play the game. Projectile problems can look scary, but they always follow the exact same recipe. We will break them down into a 'Vertical Column' and a 'Horizontal Column'.",
    sections: [
      {
        id: "setup",
        title: "Part 1: The Two-Column Method",
        icon: <LayoutList className="w-6 h-6" />,
        text: "Never try to do everything in your head. Start every single problem by drawing a table with two columns. This prevents you from accidentally using a vertical acceleration for a horizontal distance.",
        comparison: [
          {
            label: "Horizontal Column (x)",
            desc: "Velocity is CONSTANT. Acceleration (a) = 0. Range = speed × time."
          },
          {
            label: "Vertical Column (y)",
            desc: "Acceleration (a) = 9.81 m/s² downwards. Use SUVAT equations here."
          }
        ],
        goldenRule: "The variable 't' (Time) is the bridge. It is the ONLY value that is the same in both columns. Find 't' in one column to use it in the other.",
        // Static Image Placeholder
        imageTag: (
          <div className="mt-4 text-center text-sm opacity-60 italic">

            <br />The Standard Projectile Table setup.
          </div>
        ),
        quiz: {
          question: "You are solving a projectile problem. You calculate the time of flight using the vertical data. Can you use this same time value for the horizontal calculation?",
          options: ["No, horizontal time is different", "Yes, time is scalar and universal", "Only if air resistance is zero"],
          correctIndex: 1
        }
      },
      {
        id: "horizontal_launch",
        title: "Part 2: Scenario A - The Horizontal Launch",
        icon: <ArrowRight className="w-6 h-6" />,
        text: "This is when an object rolls off a table or is fired flat from a cliff. It is the simpler version because the initial vertical velocity is zero.",
        conditions: [
          "Vertical Initial Velocity (uᵧ) = 0 m/s (Key Concept!).",
          "Horizontal Initial Velocity (uₓ) = The launch speed.",
          "Acceleration (aᵧ) = 9.81 m/s² (downwards).",
          "Vertical Displacement (sᵧ) = Height of the cliff."
        ],
        // Static Image Placeholder
        imageTag: (
          <div className="mt-4 text-center text-sm opacity-60 italic">

            <br />Note: u_y starts at zero.
          </div>
        ),
        quiz: {
          question: "A ball rolls off a 5m high table at 10 m/s. What is its initial vertical velocity?",
          options: ["10 m/s", "5 m/s", "0 m/s"],
          correctIndex: 2
        }
      },
      {
        id: "angled_launch",
        title: "Part 3: Scenario B - The Angled Launch",
        icon: <Target className="w-6 h-6" />,
        text: "This is the 'classic' projectile, like kicking a football. You must resolve the initial velocity vector first before you can do anything else.",
        equations: [
          {
            name: "Initial Horizontal (uₓ)",
            type: "Constant",
            formula: "u cos θ"
          },
          {
            name: "Initial Vertical (uᵧ)",
            type: "Changes",
            formula: "u sin θ"
          },
          {
            name: "At Max Height",
            type: "Key Fact",
            formula: "vᵧ = 0 m/s"
          }
        ],
        insight: "Sign Convention Tip: Usually, we treat UP as positive. This means uᵧ is positive, but Acceleration (g) is NEGATIVE (-9.81).",
        // Static Image Placeholder
        imageTag: (
          <div className="mt-4 text-center text-sm opacity-60 italic">

          </div>
        ),
        quiz: {
          question: "A cannonball is fired at an angle. At the very peak of its flight, what is its vertical velocity?",
          options: ["Maximum", "9.81 m/s", "Zero"],
          correctIndex: 2
        }
      },
      {
        id: "calculator",
        title: "Part 4: The Strategy Guide",
        icon: <Calculator className="w-6 h-6" />,
        text: "When facing a tough exam question, don't panic. Just follow this algorithm.",
        conditions: [
          "1. Resolve Initial Velocity into Uₓ (cos) and Uᵧ (sin).",
          "2. Set up your Table (Horizontal vs. Vertical).",
          "3. Fill in what you know (Remember: aₓ = 0, aᵧ = -9.81).",
          "4. Solve for Time (t) using the Vertical column.",
          "5. Use 't' to find Range (Horizontal distance)."
        ],
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

                  {/* COMPARISON/RULE LAYOUT (Setup) */}
                  {section.id === "setup" && (
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
                      {/* Image Render */}
                      {section.imageTag}
                    </div>
                  )}

                  {/* LIST/STEPS LAYOUT (Horizontal Launch) */}
                  {section.id === "horizontal_launch" && (
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
                      {/* Image Render */}
                      {section.imageTag}
                    </div>
                  )}

                  {/* EQUATIONS LAYOUT (Angled Launch) */}
                  {section.id === "angled_launch" && (
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
                      {/* Image Render */}
                      {section.imageTag}
                    </div>
                  )}

                  {/* LIST/STEPS LAYOUT (Calculator/Strategy) */}
                  {section.id === "calculator" && (
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