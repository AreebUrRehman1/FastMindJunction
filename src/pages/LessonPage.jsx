import { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Define } from '../components/wph11/ScalarvsVector/Define.jsx';
import { Example } from '../components/wph11/ScalarvsVector/Example.jsx';
import { Further } from '../components/wph11/ScalarvsVector/Further.jsx';
import { Mini1 } from '../components/wph11/ScalarvsVector/Mini1.jsx';
import { Mini2 } from '../components/wph11/ScalarvsVector/Mini2.jsx';
import { Mini3 } from '../components/wph11/ScalarvsVector/Mini3.jsx';

export function LessonPage() {
  const [currentStep, setCurrentStep] = useState(0); // Manages the progress in the bar
  const [pageChecker, setPageChecker] = useState({
    define: true,
    example: false,
    further: false,
    mini1: false,
    mini2: false,
    mini3: false
  });
  const [stepCounter, setStepCounter] = useState(0); // Runs the steps in a component
  const [contentDisplay, setContentDisplay] = useState([]);
  const [miniQuestionLock, setMiniQuestionLock] = useState(false); // Block continue button when Quiz is displayed
  const [feedBackGiven, setFeedBackGiven] = useState(false); // Manages the display for feedback
  const [feedBackDisplay, setFeedBackDisplay] = useState([]);
  const navigate = useNavigate();
  const { lessonId } = useParams();

  const totalSteps = 16; // Total number of activities/steps in this lesson


  const progressPercentage = useMemo(() => {
    return Math.min(100, (currentStep / totalSteps) * 100);
  }, [currentStep, totalSteps]);

  // Function to advance the lesson stage
  const handleContinue = () => {

    if (feedBackGiven) {
      setFeedBackGiven(false);
      setFeedBackDisplay([]);
    }

    if (pageChecker["define"] === true) {
      Define({ setCurrentStep, setPageChecker, pageChecker, setContentDisplay, stepCounter, setStepCounter, setMiniQuestionLock, miniQuestionLock, setFeedBackGiven, setFeedBackDisplay })
    }
    else if (pageChecker["example"] === true) {
      Example({ setCurrentStep, setPageChecker, setContentDisplay, stepCounter, setStepCounter })
    }
    else if (pageChecker["further"] === true) {
      Further({ setCurrentStep, setPageChecker, setContentDisplay, stepCounter, setStepCounter })
    }
    else if (pageChecker["mini1"] === true) {
      Mini1({ setCurrentStep, setPageChecker, setContentDisplay, stepCounter, setStepCounter, setMiniQuestionLock, miniQuestionLock, setFeedBackGiven, setFeedBackDisplay })
    }
    else if (pageChecker["mini2"] === true) {
      Mini2({ setCurrentStep, setPageChecker, setContentDisplay, stepCounter, setStepCounter, setMiniQuestionLock, miniQuestionLock, setFeedBackGiven, setFeedBackDisplay })
    }
    else if (pageChecker["mini3"] === true) {
      Mini3({ setCurrentStep, setPageChecker, setContentDisplay, stepCounter, setStepCounter, setMiniQuestionLock, miniQuestionLock, setFeedBackGiven, setFeedBackDisplay, navigate })
    }
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
            <div className="text-center text-4xl font-bold">{lessonId}</div>
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
        <footer className={`fixed bottom-0 left-0 right-0 h-20 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-50 px-8 shadow-inner flex items-center ${feedBackGiven ? "justify-between" : "justify-end"}`}>
          {feedBackGiven && feedBackDisplay.map((feedBack, index) => (
            <div key={`feedback-${index}`} className="mx-auto">
              {feedBack}
            </div>
          ))}
          <button onClick={handleContinue} className={`px-8 py-3 font-bold text-lg rounded-xl ${miniQuestionLock ? "bg-blue-200 text-gray-400" : "bg-blue-500 dark:focus:ring-blue-700 text-white shadow-lg hover:bg-blue-600 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-blue-300"} `}>{currentStep < totalSteps ? 'Continue' : 'Finish'}</button>
        </footer>

      </div>
    </>
  );
}