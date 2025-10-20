import { useState, useEffect } from "react";
import correct from "../assets/sounds/correct.mp3"
import wrong from "../assets/sounds/wrong.mp3"

export function OptionsSelectQuizRunner({ stepNo, setMiniQuestionLock, handleQuizFeedback }) {

  const [answerResults, setAnswerResults] = useState({});
  const [quizLocked, setQuizLocked] = useState(false);
  const [wrongAnswerCounter, setWrongAnswerCounter] = useState(0);


  const correctsound = new Audio(correct);
  const wrongsound = new Audio(wrong);
  correctsound.volume = 0.1;
  wrongsound.volume = 0.1;

  // Initial Setup: Lock the parent's "Continue" button when the quiz mounts
  useEffect(() => {
    setMiniQuestionLock(true);
  }, [setMiniQuestionLock]); // Runs once when component mounts

  // CSS classes for styling options
  const baseClasses = 'px-6 py-3 rounded-xl font-semibold transition-all duration-200 cursor-pointer text-sm shadow-md hover:shadow-lg border-2';
  const correctClasses = 'bg-emerald-500 text-white border-emerald-600 transform shadow-emerald-500/50 scale-105';
  const wrongClasses = 'bg-red-500 text-white border-red-600 shadow-red-500/50';
  const neutralClasses = 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50';

  // Define the correct answers for the specific step
  // NOTE: You should ideally move this data outside the component, but defining it here for simplicity
  const correctAnswers = {
      step8: ['Force', 'Displacement', 'Weight'], // Assuming these are the vector quantities
  };
  
  // Get the correct answers for the current step
  const currentCorrectAnswers = correctAnswers[stepNo] || [];

  // --- Feedback Logic (Uses the handleQuizFeedback prop) ---
  const createFeedBackMessage = (isCorrect) => {
    if (isCorrect) {
      // 4. Completion: Unlock Parent's "Continue" button and set success feedback
      setMiniQuestionLock(false);
      handleQuizFeedback(
          <span className='font-bold text-lg text-emerald-500'>Correct! You're ready to continue.</span>
      );
    } else {
      // 3. External Feedback: Send incorrect message to the lesson footer
      handleQuizFeedback(
          <span className='font-bold text-lg text-red-500'>Incorrect. Pay attention to magnitude and direction. Try again!</span>
      );
    }
  };

  // --- Core Quiz Logic ---
  const checkAnswers = (selectedOption) => {
    // If the quiz is locked (after a correct answer), do nothing
    if (quizLocked) return;

    const isCorrectSelection = currentCorrectAnswers.includes(selectedOption);

    if (isCorrectSelection) {
      correctsound.play();

      setAnswerResults((prev) => ({
        ...prev,
        [selectedOption]: `${baseClasses} ${correctClasses}`,
      }));

      // Lock the quiz locally so they can't click more options
      setQuizLocked(true);
      
      // Send correct feedback and UNLOCK the parent's "Continue" button
      createFeedBackMessage(true);

    } else {
      wrongsound.play();
      setWrongAnswerCounter((prev) => prev + 1);

      setAnswerResults((prev) => ({
        ...prev,
        [selectedOption]: `${baseClasses} ${wrongClasses}`,
      }));
      
      // Send incorrect feedback (parent's "Continue" button remains locked)
      createFeedBackMessage(false);
    }
  };

  // Pass the checkAnswers function down to the accessor component
  return (
    <MiniQuizContainerAccessor 
      answerResults={answerResults} 
      baseClasses={baseClasses} 
      neutralClasses={neutralClasses} 
      quizLocked={quizLocked}
      stepNo = {stepNo}
      checkAnswers={checkAnswers} // Pass the handler
    />
  );
}

// --- Display/Data Accessor Component ---
// This component contains the static quiz content and handles click events.
function MiniQuizContainerAccessor({ answerResults, baseClasses, neutralClasses, quizLocked, checkAnswers, stepNo }) {

  const miniQuizDataContainer = {
    step8: (
      <>
        <div className="text-center text-xl mt-3 ">Mini Quiz Time!</div>
        <div className="text-center text-xl mt-1  text-emerald-400">(Easy)</div>
        <div className="text-center text-3xl mt-12 md:text-3xl font-extrabold text-gray-800 mb-8  p-2">Which of the following are **Vector** quantities? (Select all that apply)</div>

        <div className='flex flex-wrap justify-center gap-5'>

          {['Force', 'Distance', 'Displacement', 'Weight', 'Mass', 'Time'].map((option) => {
            // Get the dynamic class. If not clicked, use neutral class.
            const classes = answerResults[option] || `${baseClasses} ${neutralClasses}`;

            return (
              <div
                key={option}
                className={`${classes} ${quizLocked ? 'opacity-70 !cursor-default' : 'hover:scale-[1.03] transition-transform'}`} // Add visual lock style
                // Click handler: only runs if the quiz is NOT locked
                onClick={quizLocked ? undefined : () => { checkAnswers(option) }}
              >
                {option}
              </div>
            );
          })}

        </div>
      </>
    ),
  };

  return miniQuizDataContainer[stepNo];
}
