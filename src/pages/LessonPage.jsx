import { useState, useMemo, useRef, useEffect } from 'react';
import { createSwapy } from 'swapy';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Define } from '../components/wph11/VectorVsScalar/Define.jsx';
import { Example } from '../components/wph11/VectorVsScalar/Example.jsx';
import { Further } from '../components/wph11/VectorVsScalar/Further.jsx';

export function LessonPage() {
  // State to manage the current progress through the lesson
  const [currentStep, setCurrentStep] = useState(0);
  const [pageChecker, setPageChecker] = useState({
    define: true,
    example: false,
    further: false,
  });
  const [stepCounter, setStepCounter] = useState(0);
  const [contentDisplay, setContentDisplay] = useState([]);

  const totalSteps = 15; // Total number of activities/steps in this lesson


  const progressPercentage = useMemo(() => {
    return Math.min(100, (currentStep / totalSteps) * 100);
  }, [currentStep, totalSteps]);

  // Function to advance the lesson stage
  const handleContinue = () => {

    if (pageChecker["define"] === true) {
      Define({ setCurrentStep, setPageChecker, setContentDisplay, stepCounter, setStepCounter })
    }
    else if (pageChecker["example"] === true) {
      Example({ setCurrentStep, setPageChecker, setContentDisplay, stepCounter, setStepCounter })
    }
    else if (pageChecker["further"] === true) {
      Further({ setCurrentStep, setPageChecker, setContentDisplay, stepCounter, setStepCounter })
    }


    // if (currentStep < totalSteps) {
    //   setCurrentStep(prev => prev + 1);
    // } else {
    //   // Lesson is complete, call the provided finish handler
    //   alert('Lesson Complete! Great job!');
    //   if (onLessonFinish) {
    //     onLessonFinish();
    //   }
    // }
  };

  return (
    <>
      <title>Lesson Time!</title>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">

        {/* 1. TOP PROGRESS BAR HEADER */}
        <header className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-50 flex items-center shadow-md px-6">

          {/* Back Button (Placeholder) */}
          <button onClick={() => console.log("Exit Lesson")} className="text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors mr-6 text-2xl font-semibold">&times;</button>

          {/* Progress Bar Container */}
          <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 transition-all duration-500 ease-out rounded-full" style={{ width: `${progressPercentage}%` }} role="progressbar" aria-valuenow={progressPercentage} aria-valuemin="0" aria-valuemax="100"></div>
          </div>
        </header>

        {/* 2. MAIN CONTENT AREA */}
        <main className="flex-1 flex justify-center pt-25 pb-24">
          <div className="w-full max-w-3xl">
            <div className="text-center text-4xl font-bold">Scalar Vs Vector</div>
            {contentDisplay.map((content, index) => {
              return (
                <div key={index} className={index === contentDisplay.length - 1 ? 'animate-slide-in' : ''}>
                  {content}
                </div>
              );
            })}
          </div>
        </main>

        {/* 3. BOTTOM ACTION BAR/FOOTER */}
        <footer className="fixed bottom-0 left-0 right-0 h-20 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-50 flex items-center justify-end px-8 shadow-inner">
          <button onClick={handleContinue} className="px-8 py-3 bg-blue-500 text-white font-bold text-lg rounded-xl shadow-lg hover:bg-blue-600 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-700">{currentStep < totalSteps ? 'Continue' : 'Finish'}</button>
        </footer>

      </div>
    </>
  );
}