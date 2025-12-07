import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Ruler, CornerUpLeft, PlusCircle, ArrowLeft } from 'lucide-react';
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

  // --- CONTENT DATA (Module 2.1) ---
  const content = {
    module: "Module 2.1 • Vectors & Projectiles",
    title: "2.1 Vector Math",
    subtitle: "Resolving and Resulting 2D Motion",
    intro: "Vectors are the language of two-dimensional motion. We can't solve physics problems by just adding numbers; we must use geometry. This module teaches you the two fundamental vector skills: breaking them down and adding them up.",
    sections: [
      {
        id: "resolving",
        title: "Part 1: The Art of Resolving (Breaking Down)",
        icon: <CornerUpLeft className="w-6 h-6" />,
        text: "Resolving a vector means breaking it into two perpendicular components (usually horizontal and vertical). We do this because the motion in the x-direction is independent of the motion in the y-direction.",
        comparison: [
          {
            label: "Horizontal Component (Fx)",
            desc: "The side adjacent to the angle θ. Calculated using F cos θ."
          },
          {
            label: "Vertical Component (Fy)",
            desc: "The side opposite the angle θ. Calculated using F sin θ."
          }
        ],
        goldenRule: "Always draw a right-angled triangle. If the angle θ is measured from the horizontal, use Cosine for the horizontal and Sine for the vertical.",
        // Static Image Placeholder
        imageTag: (
          <div className="mt-4 text-center text-sm opacity-60 italic">

            <br />A vector F split into horizontal (F cos θ) and vertical (F sin θ) parts.
          </div>
        ),
        quiz: {
          question: "A force of 10 N acts at 30° to the horizontal. Which component uses sin(30°)?",
          options: ["Horizontal (Fx)", "Vertical (Fy)", "Both components"],
          correctIndex: 1
        }
      },
      {
        id: "resultant",
        title: "Part 2: Finding the Resultant (Adding Up)",
        icon: <PlusCircle className="w-6 h-6" />,
        text: "The resultant vector is the single vector that replaces all other vectors. This is the net effect of multiple forces or displacements acting on an object.",
        equations: [
          {
            name: "Magnitude (Size)",
            type: "Pythagoras' Theorem",
            formula: "R = √(Rₓ² + Rᵧ²)"
          },
          {
            name: "Direction (Angle)",
            type: "Trigonometry",
            formula: "θ = tan⁻¹(Rᵧ / Rₓ)"
          }
        ],
        insight: "Key Insight: You can only add or subtract vectors directly if they are parallel (on the same axis). Therefore, always resolve them first!",
        // Static Image Placeholder
        imageTag: (
          <div className="mt-4 text-center text-sm opacity-60 italic">
            [Image of vector addition head to tail method]
            <br />Adding vectors head-to-tail to find the Resultant (R).
          </div>
        ),
        quiz: {
          question: "Two perpendicular forces, 3 N (East) and 4 N (North), act on an object. What is the magnitude of the resultant force?",
          options: ["1 N", "7 N", "5 N"],
          correctIndex: 2
        }
      },
      {
        id: "methods",
        title: "Part 3: Calculation vs. Drawing",
        icon: <Ruler className="w-6 h-6" />,
        text: "The syllabus requires you to be able to find the resultant and components using both methods, especially when vectors are NOT at 90 degrees to each other.",
        conditions: [
          "Calculation: Used for accuracy, especially when vectors are perpendicular (using Pythagoras/SOH CAH TOA).",
          "Drawing (Scale Diagram): Used to find the resultant of two vectors at ANY angle (e.g., 60°). Requires a ruler and protractor.",
          "Vector Addition Rule: The resultant always goes from the start of the first vector (tail) to the end of the last vector (head)."
        ],
        quiz: {
          question: "When adding two non-perpendicular vectors graphically, what method is used?",
          options: ["Tail-to-tail method", "Scale diagram (head-to-tail)", "The component method only"],
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

                  {/* COMPARISON/RULE LAYOUT (Resolving) */}
                  {section.id === "resolving" && (
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

                  {/* EQUATIONS LAYOUT (Resultant) */}
                  {section.id === "resultant" && (
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

                  {/* LIST/STEPS LAYOUT (Methods) */}
                  {section.id === "methods" && (
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