import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ArrowDown, Wind, TrendingUp, Anchor, ArrowLeft } from 'lucide-react';
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

  // --- CONTENT DATA (Module 3.3) ---
  const content = {
    module: "Module 3.3 • Dynamics",
    title: "3.3 Gravity & Terminal Velocity",
    subtitle: "The Battle Between Weight and Air",
    intro: "Why doesn't a raindrop hit you like a bullet? In a vacuum, objects accelerate forever. In the real world, the air fights back. This lesson explains the journey of a falling object from the moment it drops until it hits its maximum possible speed.",
    sections: [
      {
        id: "gravity_only",
        title: "Part 1: Weight (The Engine)",
        icon: <ArrowDown className="w-6 h-6" />,
        text: "Weight is the force of gravity acting on an object's mass. Unlike mass (which is constant), weight depends on where you are (e.g., Earth vs. Moon).",
        comparison: [
          { 
            label: "Mass (m)", 
            desc: "The amount of 'stuff' in an object. Measured in kg. Constant everywhere." 
          },
          { 
            label: "Weight (W)", 
            desc: "The force of gravity pulling that mass. Measured in Newtons (N). W = mg." 
          }
        ],
        goldenRule: "On Earth, g ≈ 9.81 m/s². This means a 1kg bag of sugar weighs 9.81 Newtons.",
        // Static Image Placeholder
        imageTag: (
          <div className="mt-4 text-center text-sm opacity-60 italic">
            [Image comparing a rock on Earth vs Moon: Same Mass, Different Weight vectors]
            <br/>Mass is invariant; Weight changes with gravity.
          </div>
        ),
        quiz: {
          question: "If you take a 10kg object to deep space where g=0, what happens?",
          options: ["Mass becomes zero", "Weight becomes zero", "Both become zero"],
          correctIndex: 1
        }
      },
      {
        id: "drag_force",
        title: "Part 2: Drag (The Brake)",
        icon: <Wind className="w-6 h-6" />,
        text: "As an object speeds up, it smashes into more air molecules every second. This creates a resistive force called Drag (or Air Resistance).",
        points: [
          {
            type: "Velocity Dependence",
            def: "Drag increases as speed increases. Faster = More Drag.",
            examples: "Sticking your hand out of a car window."
          },
          {
            type: "Area Dependence",
            def: "Drag increases with surface area. Bigger = More Drag.",
            examples: "A parachute vs. a stone."
          }
        ],
        // Static Image Placeholder
        imageTag: (
          <div className="mt-4 text-center text-sm opacity-60 italic">
            [Image showing drag force vector growing as velocity vector grows]
          </div>
        ),
        quiz: {
          question: "At the exact moment an object is dropped (t=0), how big is the drag force?",
          options: ["Equal to Weight", "Maximum", "Zero"],
          correctIndex: 2
        }
      },
      {
        id: "terminal_velocity",
        title: "Part 3: Reaching Terminal Velocity",
        icon: <Anchor className="w-6 h-6" />,
        text: "This is the story of a fall. It happens in three distinct stages.",
        conditions: [
          "Stage 1 (Start): Speed is low. Drag is zero. Resultant Force = Weight. Acceleration = 9.81 m/s².",
          "Stage 2 (Acceleration): Speed rises. Drag rises. Resultant Force (W - D) gets smaller. Acceleration decreases.",
          "Stage 3 (Terminal Velocity): Drag becomes EQUAL to Weight. Resultant Force = 0. Acceleration = 0. Speed is constant."
        ],
        goldenRule: "Terminal Velocity isn't a 'stop'. It's the maximum constant speed where Weight and Drag are perfectly balanced.",
        // Static Image Placeholder
        imageTag: (
          <div className="mt-4 text-center text-sm opacity-60 italic">
            
            <br/>The classic 'Terminal Velocity curve'.
          </div>
        ),
        quiz: {
          question: "A skydiver opens their parachute. What happens immediately?",
          options: ["Drag increases massively, causing upward acceleration (deceleration)", "Weight decreases", "They stop instantly"],
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
                  
                  {/* COMPARISON LAYOUT (Weight) */}
                  {section.id === "gravity_only" && (
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

                  {/* GRID LAYOUT (Drag) */}
                  {section.id === "drag_force" && (
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        {section.points.map((pt) => (
                          <div key={pt.type} className={`p-5 rounded-xl border ${darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                            <h3 className={`font-bold text-lg mb-2 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>{pt.type}</h3>
                            <p className="mb-3 text-sm opacity-90">{pt.def}</p>
                            <div className="text-xs font-mono uppercase tracking-wide opacity-60">Example:</div>
                            <div className="font-medium text-sm">{pt.examples}</div>
                          </div>
                        ))}
                      </div>
                      {section.imageTag}
                    </div>
                  )}

                  {/* LIST/STEPS LAYOUT (Terminal Velocity) */}
                  {section.id === "terminal_velocity" && (
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
                      <div className={`mt-4 p-4 rounded-lg text-sm ${darkMode ? 'bg-indigo-900/30 text-indigo-200' : 'bg-indigo-50 text-indigo-800'}`}>
                        <strong className="block uppercase text-xs font-bold tracking-wider mb-1 opacity-70">Important Note</strong>
                        {section.goldenRule}
                      </div>
                      {section.imageTag}
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