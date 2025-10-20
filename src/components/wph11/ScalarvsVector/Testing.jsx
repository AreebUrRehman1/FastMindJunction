import { useState, useMemo, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import { LessonPage2 } from "../../../pages/LessonPage2";
import { advanceLesson } from "./Testing2";
import { scalarvsVector } from "../../../data/lessonpage-container";


export function Testing() {
  // State for lesson progress
  const [currentStep, setCurrentStep] = useState(0); // Progress bar counter (0-totalSteps)
  const [stepCounter, setStepCounter] = useState(0); // Internal lesson step (e.g., 1, 2, 3...)

  // State for content and interaction
  const [contentDisplay, setContentDisplay] = useState([]);
  const [miniQuestionLock, setMiniQuestionLock] = useState(false); // Lock continue button
  const [feedBackGiven, setFeedBackGiven] = useState(false);
  const [feedBackDisplay, setFeedBackDisplay] = useState([]);
  const [inputMargin, setInputMargin] = useState(true); // It sets the proper margin for smooth scroll effect

  // Hooks
  const navigate = useNavigate();
  const { lessonId } = useParams();

  const totalSteps = 16; // Total number of activities/steps in this lesson

  const progressPercentage = useMemo(() => {
    // Calculate progress (min(100) to ensure it doesn't go over)
    return Math.min(100, ((currentStep / totalSteps) * 100) || 0);
  }, [currentStep, totalSteps]);

  // Function to advance the lesson content (memoized for efficiency)
  const handleAdvanceLesson = useCallback(() => {
    // This function calls the imported logic to manage content flow
    advanceLesson({
      stepCounter,
      setStepCounter,
      setContentDisplay,
      setMiniQuestionLock,
      setInputMargin,
      navigate,
      scalarvsVector // Pass the lesson content data
    });
  }, [stepCounter, setContentDisplay, navigate]);

  // Handler for the "Continue" button
  const handleContinue = () => {
    if (!miniQuestionLock && currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
      // Trigger the content change logic after step has been incremented
      handleAdvanceLesson();
    } else if (currentStep >= totalSteps) {
      // Final step, navigate back (or show finish screen)
      navigate(-1);
    }
  };

  // 1. Initial Content Load on component mount (Page 0, Step 0)
  useEffect(() => {
    // Load the very first piece of content before the user clicks "Continue"
    if (scalarvsVector && scalarvsVector.step0) {
      setContentDisplay([scalarvsVector.step0]);
    }
  }, [setContentDisplay]);

  return (
    <LessonPage2
      currentStep={currentStep}
      contentDisplay={contentDisplay}
      miniQuestionLock={miniQuestionLock}
      feedBackGiven={feedBackGiven}
      feedBackDisplay={feedBackDisplay}
      totalSteps={totalSteps}
      progressPercentage={progressPercentage}
      inputMargin={inputMargin}
      lessonId={lessonId}
      handleContinue={handleContinue} // PASSING THE HANDLER
    />
  );
}