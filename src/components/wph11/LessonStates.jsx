import { useState, useMemo, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import { LessonPage2 } from "../../pages/LessonPage2";
import { advanceLesson, scalarvsVector } from "./ScalarvsVector/All"

export function LessonState() {
  // State for lesson progress
  const [currentStep, setCurrentStep] = useState(0); // Progress bar counter (0-totalSteps)
  const [stepCounter, setStepCounter] = useState(0); // Internal lesson step (e.g., 1, 2, 3...)
  const [pageCounter, setPageCounter] = useState(0); // Internal lesson page (e.g., 0, 1, 2...)
  
  // State for content and interaction
  const [contentDisplay, setContentDisplay] = useState([]);
  const [miniQuestionLock, setMiniQuestionLock] = useState(false); // Lock continue button
  const [feedBackGiven, setFeedBackGiven] = useState(false);
  const [feedBackDisplay, setFeedBackDisplay] = useState([]);

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
        pageCounter,
        setPageCounter,
        setContentDisplay,
        setMiniQuestionLock, 
        navigate,
        scalarvsVector // Pass the lesson content data
    });
  }, [stepCounter, pageCounter, setContentDisplay, navigate]);

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
    if (scalarvsVector && scalarvsVector.page0 && scalarvsVector.page0.step0) {
        setContentDisplay([scalarvsVector.page0.step0]);
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
      lessonId={lessonId}
      handleContinue={handleContinue} // PASSING THE HANDLER
    />
  );
}