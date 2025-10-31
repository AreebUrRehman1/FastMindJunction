import { marginStep } from "../../data/wph11/extra-container";

export function advanceLesson({ stepCounter, setStepCounter, setContentDisplay, setMiniQuestionLock, LessonContentData, setInputMargin, handleQuizFeedback, setFeedBackGiven, lessonId, totalCorrectAnswers, setTotalCorrectAnswers }) {

  const nextStepNo = `step${stepCounter + 1}`;
  const currentStep = LessonContentData[nextStepNo];
  const nextStepExists = !!currentStep;
  const step = `step${stepCounter}`;

  marginStep[lessonId].map((margin) => {
    if (step === margin) {
      return setInputMargin(false);
    }
  })

  if (nextStepExists) {
    let contentToDisplay;
    setFeedBackGiven(false);

    if (typeof currentStep === 'function') {
      // Execute the function component, passing the required props (setMiniQuestionLock, handleQuizFeedback)
      contentToDisplay = currentStep({ setMiniQuestionLock, handleQuizFeedback, lessonId, totalCorrectAnswers, setTotalCorrectAnswers });
    } else {
      // If it's not a function (i.e., it's already JSX), use it directly
      contentToDisplay = currentStep;
    }

    // This variable now holds the actual JSX element React expects.
    setContentDisplay((prev) => [...prev, contentToDisplay]);

    // Must return the new state value in the functional update
    setStepCounter((prev) => prev + 1);
    return;
  }
}