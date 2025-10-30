import { useState, useMemo, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import { LessonPage } from "../../pages/LessonPage";
import { advanceLesson } from "./AdvanceLesson";
import { LecturesRunner } from "../../data/lessonpage-container";
import { totalSteps } from "../../data/wph11/extra-container";
import { ExitConfirmationModal } from "./ExitConfirmationModel";


function useKeyboardShortcut(callback, enabled = true) {
  // Use useCallback to prevent unnecessary re-creation of the callback in the dependency array
  const memoizedCallback = useCallback(callback, [callback]);

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event) => {
      // Check for the Enter key
      if (event.key === 'Enter') {
        event.preventDefault();
        memoizedCallback();
      }
    };

    // Attach the listener to the whole document
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup: Remove the listener when the component unmounts or dependencies change
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [enabled, memoizedCallback]);
}

export function LessonStates() {
  // State for lesson progress
  const [currentStep, setCurrentStep] = useState(0); // Progress bar counter (0-totalSteps)
  const [stepCounter, setStepCounter] = useState(0); // Internal lesson step (e.g., 1, 2, 3...)

  // State for content and interaction
  const [contentDisplay, setContentDisplay] = useState([]);
  const [miniQuestionLock, setMiniQuestionLock] = useState(false); // Lock continue button
  const [feedBackGiven, setFeedBackGiven] = useState(false);
  const [feedBackDisplay, setFeedBackDisplay] = useState([]);
  const [inputMargin, setInputMargin] = useState(true); // It sets the proper margin for smooth scroll effect
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const [totalCorrectAnswers , setTotalCorrectAnswers] = useState(0);

  // Hooks
  const navigate = useNavigate();
  const { lessonId } = useParams();

  const LessonContentData = LecturesRunner[lessonId];

  const lessonTotalSteps = totalSteps[lessonId];

  const progressPercentage = useMemo(() => {
    // Calculate progress (min(100) to ensure it doesn't go over)
    return Math.min(100, ((currentStep / lessonTotalSteps) * 100) || 0);
  }, [currentStep, lessonTotalSteps]);

  const handleQuizFeedback = (message) => {
    setFeedBackDisplay([message]);
    setFeedBackGiven(true); // Show the feedback in the footer
  };

  // Function to advance the lesson content (memoized for efficiency)
  const handleAdvanceLesson = useCallback(() => {
    // This function calls the imported logic to manage content flow
    advanceLesson({
      stepCounter,
      setStepCounter,
      setContentDisplay,
      setMiniQuestionLock,
      handleQuizFeedback,
      setFeedBackGiven,
      setInputMargin,
      totalCorrectAnswers,
      setTotalCorrectAnswers,
      lessonId,
      LessonContentData // Pass the lesson content data
    });
  }, [stepCounter, navigate, totalCorrectAnswers]);

  // Handler for the "Continue" button
  const handleContinue = () => {
    if (!miniQuestionLock && currentStep < lessonTotalSteps) {
      setCurrentStep(prev => prev + 1);
      setInputMargin(true);
      // Trigger the content change logic after step has been incremented
      handleAdvanceLesson();
    } else if (currentStep >= lessonTotalSteps) {
      // Final step, navigate back (or show finish screen)
      navigate(-1);
    }
  };

  const handleExitLessonAttempt = () => {
    // We only show the modal if the user has made some progress (currentStep > 0)
    if (currentStep > 0) {
      setIsExitModalOpen(true);
    } else {
      navigate(-1);
    }
  };

  const handleConfirmExit = () => {
    setIsExitModalOpen(false);
    navigate(-1);
  };

  const handleCancelExit = () => {
    setIsExitModalOpen(false);
  };

  // Call the custom hook to enable the 'Enter' key shortcut when not locked.
  useKeyboardShortcut(handleContinue, !miniQuestionLock);

  // 1. Initial Content Load on component mount (Page 0, Step 0)
  useEffect(() => {
    // Load the very first piece of content before the user clicks "Continue"
    if (LessonContentData && LessonContentData.step0) {
      setContentDisplay([LessonContentData.step0]);
      setTotalCorrectAnswers(0);
    }
  }, [setContentDisplay]);

  return (
    <>
      <LessonPage
        currentStep={currentStep}
        contentDisplay={contentDisplay}
        miniQuestionLock={miniQuestionLock}
        feedBackGiven={feedBackGiven}
        feedBackDisplay={feedBackDisplay}
        lessonTotalSteps={lessonTotalSteps}
        progressPercentage={progressPercentage}
        inputMargin={inputMargin}
        handleContinue={handleContinue}
        onExitAttempt={handleExitLessonAttempt}
        ExitConfirmationModal={ExitConfirmationModal}
      />

      <ExitConfirmationModal
        isOpen={isExitModalOpen} 
        onCancel={handleCancelExit} 
        onConfirm={handleConfirmExit} 
      />
    </>
  );
}