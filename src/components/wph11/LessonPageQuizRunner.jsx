import { useState, useEffect } from "react";
import { correctAnswers } from "../../data/wph11/quiz-correctanswer-container";
import { MiniQuizOptionContent, MiniQuizDragAndDropContent } from "./MiniQuizDataContainer";
import { displayOptions, displayOptionsAnswer } from "../../data/wph11/display-options-container";
import { stats } from "../../data/wph11/lesson-complete-container";
import { PUZZLE_CONFIG } from "../../data/wph11/puzzelconfig-container";
import correct from "../../assets/sounds/correct.mp3"
import wrong from "../../assets/sounds/wrong.mp3"


export function OptionsSelectHorizontalQuizRunner({ stepNo, setMiniQuestionLock, handleQuizFeedback, lessonId, setTotalCorrectAnswers, totalCorrectAnswers }) {

  const [answerResults, setAnswerResults] = useState({});
  const [quizLocked, setQuizLocked] = useState(false);
  const [wrongAnswerCounter, setWrongAnswerCounter] = useState(0);
  const maxFailedAttemps = 2;

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

  // Get the correct answers for the current step
  const lectureCorrectAnswer = correctAnswers[lessonId]
  const currentCorrectAnswers = lectureCorrectAnswer[stepNo];

  const lectureFeedBackAnswer = displayOptionsAnswer[lessonId]; // It is the Lecture Feedback Accesssor 

  // Feedback Creator
  const createFeedBackMessage = (wrongScorePercentage, allWrong) => {
    if (wrongScorePercentage === 0) {
      handleQuizFeedback(
        <span className='font-bold text-lg text-emerald-500'>Perfect run! You have mastered this concept. Keep that momentum going!</span>
      );
      setTotalCorrectAnswers(prev => prev + 1);
    } else if (allWrong) {
      handleQuizFeedback(
        <span className='font-bold text-lg text-red-500'>No worries, revisit and revise the concept again and try again! Learning takes practice. The answer is <span className="font-extrabold">{lectureFeedBackAnswer[stepNo]}.</span></span>
      );
    } else if (wrongScorePercentage === 1) {
      handleQuizFeedback(
        <span className='font-bold text-lg text-amber-500'>No worries, mistakes make us better! Review the few spots you missed.</span>
      );
      setTotalCorrectAnswers(prev => prev + 0.5);
    }
  };

  // --- Core Quiz Logic ---
  const checkAnswers = (option) => {
    if (quizLocked || answerResults[option]) return; // Lock check: Stop all interaction if the quiz is locked

    const isCorrectSelection = currentCorrectAnswers.includes(option); // Determine the result for the clicked option

    // This is for identifying wrong options for feedbacks
    const nextWrongCount = isCorrectSelection ? wrongAnswerCounter : wrongAnswerCounter + 1;
    let allWrong = false;
    let wrongScorePercentage = 0;


    // Styles creater for options when selected
    let styleForClickedOption;
    if (isCorrectSelection) {
      styleForClickedOption = baseClasses + ' ' + correctClasses;
      correctsound.play();

    } else {
      styleForClickedOption = baseClasses + ' ' + wrongClasses;
      setWrongAnswerCounter(nextWrongCount);
      wrongsound.play()
    }

    // Storing the styles made for the options
    setAnswerResults(prevResults => {
      const newResults = { // Can't directly view or use answerResult state
        ...prevResults,
        [option]: styleForClickedOption,
      };

      const isSingleAnswerQuestion = currentCorrectAnswers.length === 1; // Checking if there is only one answer

      if (isSingleAnswerQuestion) {
        setQuizLocked(true); // Lock immediately on the clicking any options (doesn't matter if it's right or wrong)
        setTimeout(() => {
          if (isCorrectSelection) {
            wrongScorePercentage = 0;
            allWrong = false;
          } else {
            wrongScorePercentage = null;
            allWrong = true;
          }
          setMiniQuestionLock(false);
          createFeedBackMessage(wrongScorePercentage, allWrong);
        }, 0);
      } else {
        // For multiple-answer questions, lock when all correct answers have been clicked
        const correctlyFoundCount = currentCorrectAnswers.filter(
          // Check if the correct item has been clicked (is a key in newResults)
          item => newResults.hasOwnProperty(item)
        ).length;

        if (nextWrongCount >= maxFailedAttemps) { // Max Attempt Reached
          setQuizLocked(true);
          setTimeout(() => {
            setMiniQuestionLock(false);
            wrongScorePercentage = null;
            createFeedBackMessage(wrongScorePercentage, allWrong = true);
          }, 0);
        }

        if (correctlyFoundCount === currentCorrectAnswers.length) { // Selected All Correct Options
          setQuizLocked(true);
          setTimeout(() => {
            const wrongScoreChecker = wrongAnswerCounter ? true : false;
            if (wrongScoreChecker) wrongScorePercentage = 1
            setMiniQuestionLock(false);
            createFeedBackMessage(wrongScorePercentage, allWrong);
          }, 0);
        }
      }

      return newResults;
    });
  };

  // Pass the checkAnswers function down to the accessor component
  return (
    <MiniQuizOptionContent
      answerResults={answerResults}
      baseClasses={baseClasses}
      neutralClasses={neutralClasses}
      quizLocked={quizLocked}
      stepNo={stepNo}
      lessonId={lessonId}
      displayOptions={displayOptions}
      checkAnswers={checkAnswers} // Pass the handler
    />
  );
};

export function OptionsSelectVerticalQuizRunner({ stepNo, setMiniQuestionLock, handleQuizFeedback, lessonId, setTotalCorrectAnswers, totalCorrectAnswers }) {

  const [answerResults, setAnswerResults] = useState({});
  const [quizLocked, setQuizLocked] = useState(false);
  const [wrongAnswerCounter, setWrongAnswerCounter] = useState(0);
  const maxFailedAttemps = 2;

  const correctsound = new Audio(correct);
  const wrongsound = new Audio(wrong);
  correctsound.volume = 0.1;
  wrongsound.volume = 0.1;

  // Initial Setup: Lock the parent's "Continue" button when the quiz mounts
  useEffect(() => {
    setMiniQuestionLock(true);
  }, [setMiniQuestionLock]); // Runs once when component mounts

  // CSS classes for styling options
  const baseClasses = 'px-6 py-3 rounded-xl font-semibold transition-all duration-200 cursor-pointer text-sm shadow-md hover:shadow-lg border-2 w-[500px]';
  const correctClasses = 'bg-emerald-500 text-white border-emerald-600 transform shadow-emerald-500/50 scale-105';
  const wrongClasses = 'bg-red-500 text-white border-red-600 shadow-red-500/50';
  const neutralClasses = 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50';

  // Get the correct answers for the current step
  const lectureCorrectAnswer = correctAnswers[lessonId]
  const currentCorrectAnswers = lectureCorrectAnswer[stepNo];

  const lectureFeedBackAnswer = displayOptionsAnswer[lessonId]; // It is the Lecture Feedback Accesssor 

  // Feedback Creator
  const createFeedBackMessage = (wrongScorePercentage, allWrong) => {
    if (wrongScorePercentage === 0) {
      handleQuizFeedback(
        <span className='font-bold text-lg text-emerald-500'>Perfect run! You have mastered this concept. Keep that momentum going!</span>
      );
      setTotalCorrectAnswers(prev => prev + 1);
    } else if (allWrong) {
      handleQuizFeedback(
        <span className='font-bold text-lg text-red-500'>No worries, revisit and revise the concept again and try again! Learning takes practice. The answer is <span className="font-extrabold">{lectureFeedBackAnswer[stepNo]}.</span></span>
      );
    } else if (wrongScorePercentage === 1) {
      handleQuizFeedback(
        <span className='font-bold text-lg text-amber-500'>No worries, mistakes make us better! Review the few spots you missed.</span>
      );
      setTotalCorrectAnswers(prev => prev + 0.5);
    }
  };

  // --- Core Quiz Logic ---S
  const checkAnswers = (option) => {
    if (quizLocked || answerResults[option]) return; // Lock check: Stop all interaction if the quiz is locked

    const isCorrectSelection = currentCorrectAnswers.includes(option); // Determine the result for the clicked option

    // This is for identifying wrong options for feedbacks
    const nextWrongCount = isCorrectSelection ? wrongAnswerCounter : wrongAnswerCounter + 1;
    let allWrong = false;
    let wrongScorePercentage = 0;


    // Styles creater for options when selected
    let styleForClickedOption;
    if (isCorrectSelection) {
      styleForClickedOption = baseClasses + ' ' + correctClasses;
      correctsound.play();

    } else {
      styleForClickedOption = baseClasses + ' ' + wrongClasses;
      setWrongAnswerCounter(nextWrongCount);
      wrongsound.play()
    }

    // Storing the styles made for the options
    setAnswerResults(prevResults => {
      const newResults = { // Can't directly view or use answerResult state
        ...prevResults,
        [option]: styleForClickedOption,
      };

      const isSingleAnswerQuestion = currentCorrectAnswers.length === 1; // Checking if there is only one answer

      if (isSingleAnswerQuestion) {
        setQuizLocked(true); // Lock immediately on the clicking any options (doesn't matter if it's right or wrong)
        setTimeout(() => {
          if (isCorrectSelection) {
            wrongScorePercentage = 0;
            allWrong = false;
          } else {
            wrongScorePercentage = null;
            allWrong = true;
          }
          setMiniQuestionLock(false);
          createFeedBackMessage(wrongScorePercentage, allWrong);
        }, 0);
      } else {
        // For multiple-answer questions, lock when all correct answers have been clicked
        const correctlyFoundCount = currentCorrectAnswers.filter(
          // Check if the correct item has been clicked (is a key in newResults)
          item => newResults.hasOwnProperty(item)
        ).length;

        if (nextWrongCount >= maxFailedAttemps) { // Max Attempt Reached
          setQuizLocked(true);
          setTimeout(() => {
            setMiniQuestionLock(false);
            wrongScorePercentage = null;
            createFeedBackMessage(wrongScorePercentage, allWrong = true);
          }, 0);
        }

        if (correctlyFoundCount === currentCorrectAnswers.length) { // Selected All Correct Options
          setQuizLocked(true);
          setTimeout(() => {
            const wrongScoreChecker = wrongAnswerCounter ? true : false;
            if (wrongScoreChecker) wrongScorePercentage = 1
            setMiniQuestionLock(false);
            createFeedBackMessage(wrongScorePercentage, allWrong);
          }, 0);
        }
      }

      return newResults;
    });
  };

  // Pass the checkAnswers function down to the accessor component
  return (
    <MiniQuizOptionContent
      answerResults={answerResults}
      baseClasses={baseClasses}
      neutralClasses={neutralClasses}
      quizLocked={quizLocked}
      stepNo={stepNo}
      lessonId={lessonId}
      displayOptions={displayOptions}
      checkAnswers={checkAnswers} // Pass the handler
    />
  );
};

export function DragAndDropQuizRunner({ stepNo, setMiniQuestionLock, handleQuizFeedback, lessonId, setTotalCorrectAnswers, totalCorrectAnswers }) {

  const puzzleConfigLecture = PUZZLE_CONFIG[lessonId]

  // State to track content for ALL slots. Keys are slot IDs, values are dropped items.
  const initialAnswers = Object.keys(puzzleConfigLecture[stepNo].slots).reduce((acc, id) => ({ ...acc, [id]: null }), {});
  const [userAnswers, setUserAnswers] = useState(initialAnswers);
  const [quizLocked, setQuizLocked] = useState(false);
  const [wrongAnswerCounter, setWrongAnswerCounter] = useState(0);

  const correctsound = new Audio(correct);
  const wrongsound = new Audio(wrong);
  correctsound.volume = 0.1;
  wrongsound.volume = 0.1;

  // Create a list of items currently placed in any slot, so they can be hidden from the source list.
  const placedItems = Object.values(userAnswers).filter(item => item !== null);
  const lectureFeedBackAnswer = displayOptionsAnswer[lessonId]; // It is the Lecture Feedback Accesssor 

  // Safely lock the parent component on initial render
  useEffect(() => {
    setMiniQuestionLock(true);
  }, [setMiniQuestionLock]);

  // Handle start of drag operation
  const handleDragStart = (e, itemValue) => {
    e.dataTransfer.setData("text/plain", itemValue);
    // Add slot ID as well to track if we need to remove it from another slot before dropping
    e.dataTransfer.setData("text/slotid", e.currentTarget.dataset.slotid || '');
    e.currentTarget.classList.add('opacity-50');
  };

  // Handle end of drag operation
  const handleDragEnd = (e) => {
    e.currentTarget.classList.remove('opacity-50');
  };

  // Allow drop over the target slot
  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('border-green-600', 'bg-green-50');
  };

  // Remove hover style when drag leaves
  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('border-green-600', 'bg-green-50');
  };

  // Handle the drop operation on the slot
  const handleDrop = (e, targetSlotId) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-green-600', 'bg-green-50');

    if (quizLocked) return;

    const droppedItemValue = e.dataTransfer.getData("text/plain");

    // Check if the item is already in another slot. If so, remove it first.
    // This makes the item immediately available in the source list again.
    setUserAnswers(prevAnswers => {
      let newAnswers = { ...prevAnswers };

      // Find which slot (if any) currently holds the item being dragged
      const currentSlotId = Object.keys(prevAnswers).find(id => prevAnswers[id] === droppedItemValue);

      // If the item was dragged from a different slot, clear the old slot
      if (currentSlotId && currentSlotId !== targetSlotId) {
        newAnswers[currentSlotId] = null;
      }

      // Set the new slot content
      newAnswers[targetSlotId] = droppedItemValue;
      return newAnswers;
    });
  };

  // Handle click on the slot to remove the item
  const handleRemoveItem = (slotId) => {
    if (!quizLocked) {
      setUserAnswers(prevAnswers => ({
        ...prevAnswers,
        [slotId]: null,
      }));
    }
  };

  // --- Feedback Logic (Uses the handleQuizFeedback prop) ---
  const createFeedBackMessage = (incorrectSlotsCount) => {
    if (incorrectSlotsCount === 0) {
      // 4. Completion: Unlock Parent's "Continue" button and set success feedback
      setMiniQuestionLock(false);
      handleQuizFeedback(
        <span className='font-bold text-lg text-emerald-500'>Perfect run! You have mastered this concept. Keep that momentum going!</span>
      );
      setTotalCorrectAnswers(prev => prev + 1);
      correctsound.play();
    } else if (incorrectSlotsCount >= 1) {
      // 3. External Feedback: Send incorrect message to the lesson footer
      setMiniQuestionLock(false);
      handleQuizFeedback(
        <span className='font-bold text-lg text-red-500'>No worries, revisit and revise the concept again and try again! Learning takes practice. The answer is <span className="font-extrabold">{lectureFeedBackAnswer[stepNo]}.</span></span>
      );
      wrongsound.play();
    }
  };

  const checkAnswers = () => {
    if (quizLocked) return;

    let incorrectSlotsCount = 0;

    // Check every required slot against the user's answer
    Object.keys(puzzleConfigLecture[stepNo].slots).forEach(slotId => {
      const userAnswer = userAnswers[slotId];
      const correctAnswers = puzzleConfigLecture[stepNo].slots[slotId];

      // Check if the slot is empty OR if the dropped value is not in the list of correct answers
      if (!userAnswer || !correctAnswers.includes(userAnswer)) {
        incorrectSlotsCount += 1;
      }

      if (correctAnswers.includes(userAnswers)) {
      }
    });

    setWrongAnswerCounter(incorrectSlotsCount);
    setQuizLocked(true);

    // Defer the parent state update to prevent the bad setState() error
    setTimeout(() => {
      setMiniQuestionLock(false); // UNLOCK LessonPage (Continue button enabled)
      createFeedBackMessage(incorrectSlotsCount);
    }, 0);
  };

  // Function to render the draggable item based on its value
  const renderDraggableItem = (value) => {
    const colorClass = 'text-red-700 border-red-300';

    const displayValue = value.charAt(0).toUpperCase() + value.slice(1);

    return (
      <div
        draggable={!quizLocked}
        onDragStart={(e) => handleDragStart(e, value)}
        onDragEnd={handleDragEnd}
        // Note: We don't use onClick here for removal, the slot handles it.
        className={`px-5 py-2 rounded-full text-xl font-bold cursor-grab inline-block bg-white shadow-lg transition-shadow duration-150 border ${colorClass} 
        ${quizLocked ? 'opacity-80 cursor-default' : 'hover:shadow-xl'}`}
      >
        <div>{displayValue}</div>
      </div>
    );
  };

  // Renders a single drop slot (used in the sentence structure)
  const renderDropSlot = (slotId) => {
    const slotPlaceholder = (
      <span className="text-gray-500 text-base italic">Drop Here</span>
    );

    const content = userAnswers[slotId];

    // Determine if the slot is correctly filled after checking answers
    let borderColor = 'border-sky-400';
    if (quizLocked) {
      const isCorrect = puzzleConfigLecture[stepNo].slots[slotId]?.includes(content);
      borderColor = isCorrect ? 'border-emerald-500 border-solid' : 'border-red-500 border-solid';
    }

    return (
      <div
        key={slotId}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e, slotId)}
        onClick={content ? () => handleRemoveItem(slotId) : undefined}
        className={`h-12 min-w-36 mx-2 border-2 border-dashed rounded-lg inline-flex items-center justify-center transition-colors duration-200 shadow-inner 
            ${borderColor} ${content ? 'p-1' : ''}`}
      >
        {content ? renderDraggableItem(content) : slotPlaceholder}
      </div>
    );
  }

  // Renders the entire sentence structure from the puzzleConfigLecture
  const renderSentence = () => {
    return puzzleConfigLecture[stepNo].sentenceParts.map((part, index) => {
      if (part.type === 'text') {
        return <span key={index}>{part.content}</span>;
      } else if (part.type === 'slot') {
        return renderDropSlot(part.id);
      }
      return null;
    });
  };

  return (
    <MiniQuizDragAndDropContent
      renderSentence={renderSentence}
      puzzleConfigLecture={puzzleConfigLecture}
      stepNo={stepNo}
      placedItems={placedItems}
      renderDraggableItem={renderDraggableItem}
      checkAnswers={checkAnswers}
      lessonId={lessonId}
      quizLocked={quizLocked}
    />
  );
};

export function LessonCompletePage({ totalCorrectAnswers, lessonId }) {
  const [showContent, setShowContent] = useState(false);
  const lessonStats = stats[lessonId];

  const percentageFormula = (totalCorrectAnswers / lessonStats.totalScore) * 100;

  // Simple animation to make the content fade/slide in smoothly
  useEffect(() => {
    // Timeout to ensure the animation fires after the component mounts
    const timer = setTimeout(() => setShowContent(true), 50);
    return () => clearTimeout(timer);
  }, []);

  // Simple reusable component for displaying statistics
  const StatCard = ({ title, value, color }) => (
    <div className="flex flex-col items-center">
      <div className={`text-4xl font-extrabold ${color} transition-transform duration-300 hover:scale-105`}>
        {value}
      </div>
      <div className="text-lg font-medium text-gray-500 dark:text-gray-400 mt-1">
        {title}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4 mt-50">
      <div
        className={`w-full max-w-5xl p-6 md:p-12 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl transition-all duration-700 ease-in-out
          ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="text-center">

          {/* Icon/Visual Element (Trophy SVG) */}
          <div className="mx-auto w-24 h-24 text-emerald-500 mb-8 animate-bounce-slow">
            <svg
              className="w-full h-full"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-2.126a2 2 0 01-1.76-1.077l-3.486-6.972A2 2 0 015.263 11h2.126a2 2 0 011.76 1.077l3.486 6.972A2 2 0 0013.237 21h2.126a2 2 0 001.76-1.077l3.486-6.972A2 2 0 0021.789 12H19.237"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 10V6a3 3 0 013-3v0a3 3 0 013 3v4M9 10h6"
              />
            </svg>
          </div>

          {/* Main Title and Message */}
          <h1 className="text-5xl md:text-6xl font-extrabold text-emerald-600 dark:text-emerald-400 mb-4">
            Lesson Complete!
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-2 font-semibold">
            You've successfully mastered the concepts in:
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-10">
            {lessonStats.lessonTitle}
          </h2>

          {/* Statistics Grid */}
          <div className="flex justify-between mb-12 border-t border-b border-gray-200 dark:border-gray-700 py-6 px-10">

            {/* Stat Card: Score */}
            <StatCard
              title="Final Score"
              value={`${percentageFormula.toFixed(0)}%`}
              color="text-blue-500"
            />

            {/* Stat Card: Time */}
            <StatCard
              title="Mini Quiz Completed"
              value={lessonStats.miniQuizCompleted}
              color="text-yellow-500"
            />

            {/* Stat Card: Correct */}
            <StatCard
              title="Correct Answers"
              value={`${totalCorrectAnswers}/${lessonStats.totalScore}`}
              color="text-emerald-500"
            />

            {/* Stat Card: Next */}
            <StatCard
              title="Next Lesson"
              value={`${lessonStats.nextLesson}`}
              color="text-purple-500"
            />

          </div>

          <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            <span className="italic">"You don't have to be great to start, but you have to start to be great."</span> <strong> — Zig Ziglar</strong>
          </p>
        </div>
      </div>
    </div>
  );
}