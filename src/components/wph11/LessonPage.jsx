import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useMediaQuery } from '@uidotdev/usehooks';
import { Checkpoint } from './Checkpoint';
import { contentContainer } from '../../data/wph11/ContentContainer';
import { Templates } from './Templates';
import { lectureLayout } from '../../data/wph11/lecture-layout';
import { LessonHeader } from '../LessonHeader';
import back from '../../assets/lesson/Back Icon2.png';

export function LessonPage({ darkMode, darkModeControl }) {
  // --- STATE ---
  const [unlockedIndex, setUnlockedIndex] = useState(0); // Tracks how far the user has progressed (0 = only first section)
  const sectionRefs = useRef([]); // To handle auto-scrolling
  const navigate = useNavigate();
  const { lessonId } = useParams();
  const mobile = useMediaQuery('(max-width: 768px)');

  // Accessing the content
  const content = contentContainer(darkMode, lessonId, mobile);
  const lectureContentLayout = lectureLayout(lessonId);


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

  return (
    <>
      <title>Lesson Time!</title>
      <LessonHeader darkMode={darkMode} darkModeControl={darkModeControl} />
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
        {/* --- Main Content --- */}
        <main className="pt-24 pb-20 px-4 sm:px-6">
          <div className={`text-blue-600 font-bold rounded-2xl p-2 not-md:mb-6 ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"} inline-block`} onClick={() => { navigate(-1) }}>
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
              const shouldRenderTemplate = lectureContentLayout?.sectionIds.includes(section.id);

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

                  {shouldRenderTemplate && (
                    <Templates section={section} darkMode={darkMode} />
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
                        titleFinished={content.title}
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