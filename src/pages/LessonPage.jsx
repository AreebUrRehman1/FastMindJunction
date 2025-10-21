import { useRef, useEffect } from "react";

export function LessonPage({ currentStep, contentDisplay, miniQuestionLock, feedBackGiven, feedBackDisplay, lessonTotalSteps, progressPercentage, handleContinue, inputMargin, navigate }) {

  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [contentDisplay]);

  return (
    <>
      <title>Lesson Time!</title>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">

        {/* 1. TOP PROGRESS BAR HEADER */}
        <header className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-50 flex items-center shadow-md px-6">

          {/* Back Button (Placeholder) */}
          <button onClick={() => navigate(-1)} className="text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors mr-6 text-2xl font-semibold">&times;</button>

          {/* Progress Bar Container */}
          <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 transition-all duration-500 ease-out rounded-full" style={{ width: `${progressPercentage}%` }} role="progressbar" aria-valuenow={progressPercentage} aria-valuemin="0" aria-valuemax="100"></div>
          </div>
        </header>

        {/* 2. MAIN CONTENT AREA */}
        <main className={`flex-1 flex justify-center pt-25 pb-24 ${inputMargin === true ? "mb-25" : ""}`}>
          <div className="w-full">
            {contentDisplay.map((content, index) => {
              const isLastItem = index === contentDisplay.length - 1;
              return (
                <div key={index} className={isLastItem ? 'animate-slide-in' : ''} ref={isLastItem ? bottomRef : null} >
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
          <button onClick={handleContinue} className={`px-8 py-3 font-bold text-lg rounded-xl ${miniQuestionLock ? "bg-blue-200 text-gray-400" : "bg-blue-500 dark:focus:ring-blue-700 text-white shadow-lg hover:bg-blue-600 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-blue-300"} `}>{currentStep < lessonTotalSteps ? 'Continue' : 'Finish'}</button>
        </footer>

      </div>
    </>
  );
}