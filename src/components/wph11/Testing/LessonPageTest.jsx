import { useState, useRef, useEffect } from 'react';
import { ArrowRight, BookOpen, Activity, Zap, CheckCircle, Lock, AlertCircle } from 'lucide-react';
import { DisplacementVelocityAndAcceleration, DisplacementVelocityAndAcceleration2, DisplacementVelocityAndAcceleration3 } from './AnimationStorage';
import { LessonHeader } from '../../LessonHeader';

// --- CHECKPOINT COMPONENT ---
// This acts as the "Gatekeeper" between sections
const Checkpoint = ({ darkMode, quiz, onUnlock, nextSectionTitle, isLast }) => {
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState('idle'); // idle, error, success

  const handleCheck = () => {
    if (selected === null) return;

    if (selected === quiz.correctIndex) {
      setStatus('success');
      setTimeout(() => {
        onUnlock(); // Trigger the unlock after a brief success animation
      }, 800);
    } else {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 1500); // Reset error state
    }
  };

  if (isLast) return (
    <div className={`p-8 rounded-2xl text-center border-2 border-dashed ${darkMode ? 'border-green-500/30 bg-green-500/10' : 'border-green-200 bg-green-50'}`}>
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500 text-white mb-4 shadow-lg shadow-green-500/30">
        <CheckCircle size={32} />
      </div>
      <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Lesson Complete!</h3>
      <p className={darkMode ? 'text-slate-400' : 'text-slate-600'}>You've mastered the basics of motion.</p>
    </div>
  );

  return (
    <div className={`relative overflow-hidden p-6 sm:p-8 rounded-2xl border-2 transition-all duration-300 ${status === 'error'
      ? 'border-red-500/50 bg-red-500/5'
      : status === 'success'
        ? 'border-green-500 bg-green-500/10'
        : darkMode ? 'border-indigo-500/30 bg-slate-900' : 'border-indigo-100 bg-white shadow-xl shadow-indigo-100/50'
      }`}>

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-2 rounded-lg ${darkMode ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-100 text-indigo-600'}`}>
          <Lock size={20} />
        </div>
        <div>
          <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-slate-900'}`}>Checkpoint</h3>
          <p className={`text-xs uppercase tracking-wider ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>Unlock: {nextSectionTitle}</p>
        </div>
      </div>

      {/* Question */}
      <div className="mb-6">
        <p className={`text-lg font-medium mb-4 ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
          {quiz.question}
        </p>

        <div className="grid gap-3">
          {quiz.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => setSelected(idx)}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${selected === idx
                ? darkMode
                  ? 'border-indigo-500 bg-indigo-500/20 text-white'
                  : 'border-indigo-600 bg-indigo-50 text-indigo-900 ring-2 ring-indigo-600/20'
                : darkMode
                  ? 'border-slate-700 bg-slate-800/50 hover:bg-slate-800 text-slate-400'
                  : 'border-slate-200 bg-slate-50 hover:bg-white text-slate-600'
                }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${selected === idx
                  ? 'border-indigo-500 bg-indigo-500'
                  : 'border-slate-400'
                  }`}>
                  {selected === idx && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
                <span>{opt}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between">
        <div className={`text-sm flex items-center gap-2 ${status === 'error' ? 'text-red-500 opacity-100' : 'opacity-0'} transition-opacity`}>
          <AlertCircle size={16} />
          <span>Not quite! Try again.</span>
        </div>

        <button
          onClick={handleCheck}
          disabled={selected === null || status === 'success'}
          className={`px-8 py-3 rounded-xl font-bold transition-all transform active:scale-95 ${status === 'success'
            ? 'bg-green-500 text-white'
            : selected === null
              ? darkMode ? 'bg-slate-800 text-slate-600 cursor-not-allowed' : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/30'
            }`}
        >
          {status === 'success' ? 'Unlocked!' : 'Continue'}
        </button>
      </div>

      {/* Success Overlay (Flash) */}
      {status === 'success' && (
        <div className="absolute inset-0 flex items-center justify-center bg-green-500/10 backdrop-blur-sm z-10 animate-in fade-in duration-300">
          <div className="bg-white text-green-600 p-4 rounded-full shadow-2xl transform scale-125">
            <CheckCircle size={48} />
          </div>
        </div>
      )}

    </div>
  );
};


export function LessonPageTest({ darkMode, darkModeControl }) {
  // --- STATE ---
  const [unlockedIndex, setUnlockedIndex] = useState(0); // Tracks how far the user has progressed (0 = only first section)
  const sectionRefs = useRef([]); // To handle auto-scrolling

  // Scroll to new section when unlocked
  useEffect(() => {
    if (unlockedIndex > 0 && sectionRefs.current[unlockedIndex]) {
      setTimeout(() => {
        sectionRefs.current[unlockedIndex].scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }
  }, [unlockedIndex]);

  // Content Data (Now includes 'quiz' for each section)
  const content = {
    module: "Module 1.1 • Mechanics",
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
        animationCue: <DisplacementVelocityAndAcceleration />,
        // NEW: Quiz for Checkpoint
        quiz: {
          question: "Which of these lists contains ONLY Vector quantities?",
          options: [
            "Speed, Mass, Time",
            "Displacement, Velocity, Force",
            "Energy, Distance, Temperature"
          ],
          correctIndex: 1
        }
      },{
        id: "part2",
        title: "Part 2: Distance vs. Displacement",
        icon: <BookOpen className="w-6 h-6" />,
        text: "This is the most common trap for beginners.",
        comparison: [
          { label: "Distance (Scalar)", desc: "The total ground you covered. If you walk in a circle, your distance is the length of your path." },
          { label: "Displacement (Vector)", desc: "The straight-line 'shortcut' from start to finish. It includes the direction." }
        ],
        goldenRule: "If you start and finish at the exact same spot, your Displacement is ZERO, even if you ran a marathon to get there.",
        animationCue: <DisplacementVelocityAndAcceleration2 />,
        quiz: {
          question: "A runner completes one full lap of a 400m track. What is their displacement?",
          options: [
            "400m",
            "0m",
            "120m"
          ],
          correctIndex: 1
        }
      },{
        id: "part3",
        title: "Part 3: Speed vs. Velocity",
        icon: <Zap className="w-6 h-6" />,
        text: "Just like distance and displacement, these two are twins with a major difference.",
        equations: [
          { name: "Speed", type: "Scalar", formula: "Speed = Distance / Time" },
          { name: "Velocity", type: "Vector", formula: "Velocity = Displacement / Time" }
        ],
        insight: "Key Insight: You can have a constant speed but a changing velocity (e.g., a car on a roundabout).",
        // No animation for this part in original code, so we skip animationCue
        quiz: {
          question: "A car drives at constant speed around a roundabout. Is its velocity constant?",
          options: [
            "Yes, because speed is constant.",
            "No, because the direction is changing."
          ],
          correctIndex: 1
        }
      },{
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
        animationCue: <DisplacementVelocityAndAcceleration3 />,
        quiz: {
          question: "If a car is slowing down while moving North, which way is the acceleration pointing?",
          options: [
            "North (Same as motion)",
            "South (Opposite to motion)",
            "Acceleration is zero"
          ],
          correctIndex: 1
        }
      }
    ]
  };

  return (
    <>
      <title>Lesson Time!</title>
      <LessonHeader darkMode={darkMode} darkModeControl={darkModeControl} />
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
        {/* --- Main Content --- */}
        <main className="pt-24 pb-20 px-4 sm:px-6">
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

              // Only render sections that are unlocked (index <= unlockedIndex)
              const isUnlocked = idx <= unlockedIndex;
              const isCurrent = idx === unlockedIndex;
              const isLast = idx === content.sections.length - 1;

              if (!isUnlocked) return null; // Don't render locked future sections yet

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

                  {/* PART 1 Specific Layout */}
                  {section.id === "part1" && (
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

                  {/* PART 2 Specific Layout */}
                  {section.id === "part2" && (
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

                  {/* PART 3 Specific Layout */}
                  {section.id === "part3" && (
                    <div className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        {section.equations.map((eq) => (
                          <div key={eq.name} className={`p-5 rounded-xl border text-center ${darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
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
                      <div className={`p-4 rounded-lg text-sm ${darkMode ? 'bg-indigo-900/30 text-indigo-200' : 'bg-indigo-50 text-indigo-800'}`}>
                        {section.insight}
                      </div>
                    </div>
                  )}

                  {/* PART 4 Specific Layout */}
                  {section.id === "part4" && (
                    <div className={`p-6 rounded-xl border ${darkMode ? 'bg-slate-800/30 border-slate-700' : 'bg-white border-slate-200 shadow-sm'}`}>
                      <div className="text-center mb-6">
                        <div className="text-3xl font-serif italic font-bold">
                          a = <span className="inline-block relative top-[-10px] mx-1 border-b border-current">v - u</span>
                          <span className="relative top-[25px] -ml-[45px]">t</span>
                        </div>
                        <p className="mt-6 text-sm opacity-60">(v = final velocity, u = initial velocity, t = time)</p>
                      </div>
                      <ul className="space-y-2">
                        {section.conditions.map((cond, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <div className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${darkMode ? 'bg-indigo-400' : 'bg-indigo-600'}`} />
                            <span>{cond}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Animation Area */}
                  {section.animationCue && (
                    <div className="my-8">
                      {section.animationCue}
                    </div>
                  )}

                  {/* --- THE CHECKPOINT --- */}
                  {/* This only appears at the bottom of the CURRENT unlocked section */}
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