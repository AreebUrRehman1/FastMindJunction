import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Checkpoint } from './Checkpoint';
import { content } from '../../data/wph11/content-container';
import back from '../../assets/lesson/Back Icon2.png';
import { LessonHeader } from '../LessonHeader';

export function LessonPage({ darkMode, darkModeControl }) {
  // --- STATE ---
  const [unlockedIndex, setUnlockedIndex] = useState(0); // Tracks how far the user has progressed (0 = only first section)
  const sectionRefs = useRef([]); // To handle auto-scrolling
  const navigate = useNavigate();


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

  return (
    <>
      <title>Lesson Time!</title>
      <LessonHeader darkMode={darkMode} darkModeControl={darkModeControl} />
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
        {/* --- Main Content --- */}
        <main className="pt-24 pb-20 px-4 sm:px-6">
          <div className={`text-blue-600 font-bold rounded-2xl p-2 not-md:mb-6 ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"} inline-block`} onClick={() => {navigate(-1)}}>
            <div className='flex items-center gap-x-3'>
              <img src={back} alt="Back Icon" className='w-7 h-7' />
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