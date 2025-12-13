import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Scale, Activity, Zap, ArrowLeft, ArrowRight } from 'lucide-react';
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

  // --- CONTENT DATA (Module 3.2) ---
  const content = {
    module: "Module 3.2 • Dynamics",
    title: "3.2 Newton's First & Second Laws",
    subtitle: "The Rules of Reality",
    intro: "Now that we can draw forces, we need to know what they actually DO. Sir Isaac Newton gave us three laws that explain almost all motion in the universe. In this lesson, we focus on the first two: Inertia and Acceleration.",
    sections: [
      {
        id: "first_law",
        title: "Part 1: Newton's First Law (Inertia)",
        icon: <Scale className="w-6 h-6" />,
        text: "Objects are lazy. They want to keep doing exactly what they are already doing. If you leave them alone (Balanced Forces), they won't change.",
        comparison: [
          { 
            label: "Condition", 
            desc: "Resultant Force (ΣF) is ZERO." 
          },
          { 
            label: "Result", 
            desc: "Acceleration is ZERO. The object either stays at rest OR moves at a constant velocity in a straight line." 
          }
        ],
        goldenRule: "Common Trap: 'Constant Velocity' requires ZERO net force. You don't need a forward force to keep moving; you only need it to overcome friction.",
        // Static Image Placeholder
        imageTag: (
          <div className="mt-4 text-center text-sm opacity-60 italic">
            
            <br/>Both have zero net force, even though one is moving fast.
          </div>
        ),
        quiz: {
          question: "A spaceship is drifting through deep space at 10,000 km/h with its engines OFF. What is the net force acting on it?",
          options: ["10,000 N", "Zero", "It depends on the mass"],
          correctIndex: 1
        }
      },
      {
        id: "second_law",
        title: "Part 2: Newton's Second Law (Acceleration)",
        icon: <Zap className="w-6 h-6" />,
        text: "What happens when forces are NOT balanced? The object changes its speed or direction. This 'change' is what we call Acceleration.",
        equations: [
          { 
            name: "The Formula", 
            type: "Vector Equation", 
            formula: "ΣF = ma" 
          },
          { 
            name: "In Words", 
            type: "Meaning", 
            formula: "Resultant Force = Mass × Acceleration" 
          }
        ],
        insight: "Crucial: The acceleration 'a' always points in the exact same direction as the Resultant Force 'ΣF'.",
        // Static Image Placeholder
        imageTag: (
          <div className="mt-4 text-center text-sm opacity-60 italic">
            [Image showing F, m, and a relationship triangle]
            <br/>More Force = More Acceleration. More Mass = Less Acceleration.
          </div>
        ),
        quiz: {
          question: "You push a 10kg box with 50N of force. Friction resists with 20N. What is the acceleration?",
          options: ["5 m/s²", "3 m/s²", "2 m/s²"],
          correctIndex: 1
        }
      },
      {
        id: "problem_solving",
        title: "Part 3: Solving Dynamics Problems",
        icon: <Activity className="w-6 h-6" />,
        text: "Don't panic when you see a complex diagram. Just follow the 'F=ma' recipe.",
        conditions: [
          "1. Draw the Free Body Diagram (FBD).",
          "2. Choose your positive direction (usually the direction of motion).",
          "3. Write 'ΣF = ma'.",
          "4. Replace 'ΣF' with (Forward Forces - Backward Forces).",
          "5. Solve for 'a' or 'F'."
        ],
        quiz: {
          question: "A lift is accelerating UPWARDS. Which force is larger?",
          options: ["Tension (Up)", "Weight (Down)", "They are equal"],
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
                  
                  {/* COMPARISON/RULE LAYOUT (First Law) */}
                  {section.id === "first_law" && (
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

                  {/* EQUATIONS LAYOUT (Second Law) */}
                  {section.id === "second_law" && (
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

                  {/* LIST/STEPS LAYOUT (Problem Solving) */}
                  {section.id === "problem_solving" && (
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