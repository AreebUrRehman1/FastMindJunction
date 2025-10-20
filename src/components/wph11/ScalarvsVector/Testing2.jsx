// Renamed and updated function to properly handle state setters
export function advanceLesson({ stepCounter, setStepCounter, setContentDisplay, navigate, setMiniQuestionLock, scalarvsVector, setInputMargin }) {

  const nextStepNo = `step${stepCounter + 1}`;

  const currentStep = scalarvsVector[nextStepNo];
  const currentContent = currentStep ? scalarvsVector[nextStepNo] : null;

  const nextStepExists = !!currentContent;

  const step = `step${stepCounter}`;

  const marginStep = "step1"

  if (step === marginStep) {
    setInputMargin(false);
  } else {
    setInputMargin(true);
  }

  // 1. Advance to the next step on the current page
  if (nextStepExists) {
    setContentDisplay((prev) => [...prev, currentContent]);
    // Must return the new state value in the functional update
    setStepCounter((prev) => prev + 1);
    return;
  }

  // 2. Lesson completed (no more pages/steps)
  if (!nextStepExists) {
    const finalContent = <div className="text-center text-2xl mt-12 font-bold text-emerald-500">Lesson Completed!</div>;
    setContentDisplay((prev) => [...prev, finalContent]);
    // Navigation will be handled by the parent component's handleContinue when totalSteps 
  }
}