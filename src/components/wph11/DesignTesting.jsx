import React, { useState, useEffect } from 'react';
import { Moon, Sun, ArrowRight, BookOpen, Activity, Zap, PlayCircle } from 'lucide-react';

export const DesignTesting = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle Dark Mode
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Content Data
  const content = {
    title: "1.1 Displacement, Velocity & Acceleration",
    subtitle: "Speaking the Language of Motion",
    intro: "Before we can predict where a rocket lands or how fast a car crashes, we need to agree on the language we use to describe moving things. In Physics, \"how far\" and \"how fast\" can mean two very different things depending on whether you care about the direction.",
    sections: [
      {
        id: "part1",
        title: "Part 1: Scalars vs. Vectors",
        icon: <Activity className="w-6 h-6" />,
        text: "Everything we measure in mechanics falls into two teams: Scalars and Vectors.",
        points: [
          {
            type: "Scalar",
            def: "Simple. They only have a magnitude (a size or amount). They don’t care which way you are pointing.",
            examples: "Mass, Time, Energy, Temperature, Distance, Speed"
          },
          {
            type: "Vector",
            def: "Precise. They have both a magnitude AND a direction.",
            examples: "Force, Displacement, Velocity, Acceleration, Momentum"
          }
        ],
        animationCue: "Animation Placeholder: Split screen showing a Thermometer (Scalar) vs an Archer's Arrow (Vector)."
      },
      {
        id: "part2",
        title: "Part 2: Distance vs. Displacement",
        icon: <BookOpen className="w-6 h-6" />,
        text: "This is the most common trap for beginners.",
        comparison: [
          { label: "Distance (Scalar)", desc: "The total ground you covered. If you walk in a circle, your distance is the length of your path." },
          { label: "Displacement (Vector)", desc: "The straight-line 'shortcut' from start to finish. It includes the direction." }
        ],
        goldenRule: "If you start and finish at the exact same spot, your Displacement is ZERO, even if you ran a marathon to get there.",
        animationCue: "Animation Placeholder: Runner on a circular track. Distance trail accumulates, but Displacement arrow shrinks to zero at the finish line."
      },
      {
        id: "part3",
        title: "Part 3: Speed vs. Velocity",
        icon: <Zap className="w-6 h-6" />,
        text: "Just like distance and displacement, these two are twins with a major difference.",
        equations: [
          { name: "Speed", type: "Scalar", formula: "Speed = Distance / Time" },
          { name: "Velocity", type: "Vector", formula: "Velocity = Displacement / Time" }
        ],
        insight: "Key Insight: You can have a constant speed but a changing velocity (e.g., a car on a roundabout)."
      },
      {
        id: "part4",
        title: "Part 4: Acceleration",
        icon: <ArrowRight className="w-6 h-6" />,
        text: "Acceleration is not just 'speeding up.' In Physics, acceleration is a vector defined as the rate of change of velocity.",
        formulaHighlight: "a = (v - u) / t",
        conditions: [
          "You speed up.",
          "You slow down (deceleration).",
          "You change direction (even if speed stays constant!)."
        ],
        animationCue: "Animation Placeholder: Traffic Light. Car speeding up (+ acceleration) vs braking (- acceleration)."
      }
    ]
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* --- Navigation / Header --- */}
      <nav className={`fixed w-full z-10 backdrop-blur-md border-b transition-colors duration-300 ${isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-slate-200'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-lg ${isDarkMode ? 'bg-indigo-600 text-white' : 'bg-indigo-600 text-white'}`}>
              F
            </div>
            <span className="font-bold text-xl tracking-tight">FastMind<span className="text-indigo-500">Junction</span></span>
          </div>
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-slate-800 text-slate-400 hover:text-white' : 'hover:bg-slate-100 text-slate-600 hover:text-slate-900'}`}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </nav>

      {/* --- Main Content --- */}
      <main className="pt-24 pb-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto space-y-12">

          {/* Header Section */}
          <header className="text-center space-y-4 animate-fade-in-up">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase ${isDarkMode ? 'bg-indigo-900/50 text-indigo-300' : 'bg-indigo-100 text-indigo-700'}`}>
              Module 1.1 • Mechanics
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              {content.title}
            </h1>
            <p className={`text-xl ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {content.subtitle}
            </p>
          </header>

          {/* Intro Card */}
          <div className={`p-6 sm:p-8 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <p className="text-lg leading-relaxed">
              {content.intro}
            </p>
          </div>

          {/* Sections Loop */}
          {content.sections.map((section, idx) => (
            <section key={section.id} className="space-y-6">
              
              {/* Section Header */}
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-50 text-indigo-600'}`}>
                  {section.icon}
                </div>
                <h2 className="text-2xl font-bold">{section.title}</h2>
              </div>

              {/* Main Text */}
              <p className={`text-lg ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                {section.text}
              </p>

              {/* Specific Layouts based on Section ID */}
              
              {/* Part 1: Scalars vs Vectors */}
              {section.id === "part1" && (
                <div className="grid md:grid-cols-2 gap-4">
                  {section.points.map((pt) => (
                    <div key={pt.type} className={`p-5 rounded-xl border ${isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                      <h3 className={`font-bold text-lg mb-2 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>{pt.type}</h3>
                      <p className="mb-3 text-sm opacity-90">{pt.def}</p>
                      <div className="text-xs font-mono uppercase tracking-wide opacity-60">Examples:</div>
                      <div className="font-medium text-sm">{pt.examples}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Part 2: Distance vs Displacement */}
              {section.id === "part2" && (
                <div className="space-y-4">
                  <div className={`rounded-xl overflow-hidden divide-y ${isDarkMode ? 'divide-slate-700 border border-slate-700' : 'divide-slate-200 border border-slate-200'}`}>
                    {section.comparison.map((item) => (
                      <div key={item.label} className={`p-4 flex flex-col sm:flex-row gap-4 ${isDarkMode ? 'bg-slate-800/30' : 'bg-white'}`}>
                        <span className="font-bold sm:w-1/3 shrink-0">{item.label}</span>
                        <span className={`sm:w-2/3 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{item.desc}</span>
                      </div>
                    ))}
                  </div>
                  {/* Golden Rule Callout */}
                  <div className={`p-4 rounded-l-md border-l-4 ${isDarkMode ? 'bg-amber-900/20 border-amber-500 text-amber-200' : 'bg-amber-50 border-amber-500 text-amber-800'}`}>
                    <strong className="block uppercase text-xs font-bold tracking-wider mb-1 opacity-70">Golden Rule</strong>
                    {section.goldenRule}
                  </div>
                </div>
              )}

              {/* Part 3: Speed vs Velocity */}
              {section.id === "part3" && (
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {section.equations.map((eq) => (
                       <div key={eq.name} className={`p-5 rounded-xl border text-center ${isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                         <div className="text-sm uppercase tracking-widest opacity-60 mb-2">{eq.type}</div>
                         <div className="text-xl font-serif italic mb-2">
                            {eq.name === "Speed" ? (
                                <span>Speed = <span className="opacity-70">dist</span> / <span className="opacity-70">time</span></span>
                            ) : (
                                <span>Velocity = <span className="opacity-70">disp</span> / <span className="opacity-70">time</span></span>
                            )}
                         </div>
                       </div>
                    ))}
                  </div>
                  <div className={`p-4 rounded-lg text-sm ${isDarkMode ? 'bg-indigo-900/30 text-indigo-200' : 'bg-indigo-50 text-indigo-800'}`}>
                    {section.insight}
                  </div>
                </div>
              )}

              {/* Part 4: Acceleration */}
              {section.id === "part4" && (
                <div className={`p-6 rounded-xl border ${isDarkMode ? 'bg-slate-800/30 border-slate-700' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <div className="text-center mb-6">
                    <div className="text-3xl font-serif italic font-bold">
                        a = <span className="inline-block relative top-[-10px] mx-1 border-b border-current">v - u</span>
                        <span className="relative top-[10px] -ml-[30px]">t</span>
                    </div>
                    <p className="mt-4 text-sm opacity-60">(v = final velocity, u = initial velocity, t = time)</p>
                  </div>
                  <ul className="space-y-2">
                    {section.conditions.map((cond, i) => (
                        <li key={i} className="flex items-start gap-2">
                            <div className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${isDarkMode ? 'bg-indigo-400' : 'bg-indigo-600'}`} />
                            <span>{cond}</span>
                        </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Animation Placeholder Area */}
              {section.animationCue && (
                <div className={`relative group w-full aspect-video rounded-xl border-2 border-dashed flex items-center justify-center p-8 text-center transition-all
                    ${isDarkMode ? 'border-slate-700 bg-slate-900/50 hover:border-indigo-500/50' : 'border-slate-300 bg-slate-50 hover:border-indigo-300'}`}>
                  
                  <div className="space-y-3 opacity-60 group-hover:opacity-100 transition-opacity">
                    <PlayCircle className="w-12 h-12 mx-auto" strokeWidth={1.5} />
                    <div className="font-mono text-xs uppercase tracking-widest">Animation Canvas</div>
                    <p className="text-sm font-medium max-w-md mx-auto">{section.animationCue}</p>
                    <p className="text-xs opacity-50">(Your custom React animation component goes here)</p>
                  </div>

                </div>
              )}

            </section>
          ))}

        </div>
      </main>
    </div>
  );
};