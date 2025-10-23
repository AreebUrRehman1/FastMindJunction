import { useState, useEffect } from "react";
import { correctAnswers } from "../../data/wph11/quiz-correctanswer-container";
import { MiniQuizOptionContent, MiniQuizDragAndDropContent } from "./MiniQuizDataContainer";
import { displayOptions } from "../../data/wph11/display-options-container";
import { PUZZLE_CONFIG } from "../../data/wph11/puzzelconfig-container";
import correct from "../../assets/sounds/correct.mp3"
import wrong from "../../assets/sounds/wrong.mp3"


export function OptionsSelectHorizontalQuizRunner({ stepNo, setMiniQuestionLock, handleQuizFeedback, lessonId }) {

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

  // Get the correct answers for the current step
  const lectureCorrectAnswer = correctAnswers[lessonId]
  const currentCorrectAnswers = lectureCorrectAnswer[stepNo];

  // --- Feedback Logic (Uses the handleQuizFeedback prop) ---
  const createFeedBackMessage = (wrongScorePercentage, allWrong) => {
    if (wrongScorePercentage === 0) {
      // 4. Completion: Unlock Parent's "Continue" button and set success feedback
      setMiniQuestionLock(false);
      handleQuizFeedback(
        <span className='font-bold text-lg text-emerald-500'>Perfect run! You have mastered this concept. Keep that momentum going!</span>
      );
    } else if (allWrong) {
      // 3. External Feedback: Send incorrect message to the lesson footer
      setMiniQuestionLock(false);
      handleQuizFeedback(
        <span className='font-bold text-lg text-red-500'>No worries, revisit and revise the concept again and try again! Learning takes practice.</span>
      );
    } else {
      // 3. External Feedback: Send incorrect message to the lesson footer
      setMiniQuestionLock(false);
      handleQuizFeedback(
        <span className='font-bold text-lg text-amber-500'>No worries, mistakes make us better! Review the few spots you missed.</span>
      );
    }
  };

  // --- Core Quiz Logic ---
  const checkAnswers = (option) => {
    if (quizLocked) return; // 1. Lock check: Stop all interaction if the quiz is locked

    const isCorrectSelection = currentCorrectAnswers.includes(option); // 2. Determine the result for the clicked option

    // This is for identifying wrong options for feedbacks
    const LessonOptions = displayOptions[lessonId];
    const totalOptionsLength = LessonOptions[stepNo].length;
    let allWrong = false;


    // 3. Styles creater for options when selected
    let styleForClickedOption;
    if (isCorrectSelection) {
      styleForClickedOption = baseClasses + ' ' + correctClasses;
      correctsound.play();

    } else {
      styleForClickedOption = baseClasses + ' ' + wrongClasses;
      setWrongAnswerCounter(prevCounter => prevCounter + 1);
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
          const finalWrongCount = isCorrectSelection ? wrongAnswerCounter : wrongAnswerCounter + 1;
          const wrongScorePercentage = (finalWrongCount / totalOptionsLength) * 100;
          const allWrongIdentifierFormula = (finalWrongCount / totalOptionsLength) * 100;
          console.log(wrongScorePercentage, allWrongIdentifierFormula)

          if (allWrongIdentifierFormula === wrongScorePercentage) {
            allWrong = true;
          }
          setMiniQuestionLock(false);
          createFeedBackMessage(wrongScorePercentage, allWrong);
        }, 0);
      } else {
        // RULE 2: For multiple-answer questions, lock when all correct answers have been clicked
        const correctlyFoundCount = currentCorrectAnswers.filter(
          // Check if the correct item has been clicked (is a key in newResults)
          item => newResults.hasOwnProperty(item)
        ).length;

        if (correctlyFoundCount === currentCorrectAnswers.length) {
          setQuizLocked(true);
          setTimeout(() => {
            const finalWrongCount = isCorrectSelection ? wrongAnswerCounter : wrongAnswerCounter + 1;
            const wrongScorePercentage = (finalWrongCount / totalOptionsLength) * 100;
            const allWrongIdentifierFormula = ((totalOptionsLength - currentCorrectAnswers.length) / totalOptionsLength) * 100;

            console.log(wrongScorePercentage, allWrongIdentifierFormula)

            if (allWrongIdentifierFormula === wrongScorePercentage) {
              allWrong = true;
            }

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

export function OptionsSelectVerticalQuizRunner({ stepNo, setMiniQuestionLock, handleQuizFeedback, lessonId }) {

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
  const baseClasses = 'px-6 py-3 rounded-xl font-semibold transition-all duration-200 cursor-pointer text-sm shadow-md hover:shadow-lg border-2 w-[500px]';
  const correctClasses = 'bg-emerald-500 text-white border-emerald-600 transform shadow-emerald-500/50 scale-105';
  const wrongClasses = 'bg-red-500 text-white border-red-600 shadow-red-500/50';
  const neutralClasses = 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50';

  // Get the correct answers for the current step
  const lectureCorrectAnswer = correctAnswers[lessonId]
  const currentCorrectAnswers = lectureCorrectAnswer[stepNo];

  // --- Feedback Logic (Uses the handleQuizFeedback prop) ---
  const createFeedBackMessage = (wrongScorePercentage, allWrong) => {
    if (wrongScorePercentage === 0) {
      // 4. Completion: Unlock Parent's "Continue" button and set success feedback
      setMiniQuestionLock(false);
      handleQuizFeedback(
        <span className='font-bold text-lg text-emerald-500'>Perfect run! You have mastered this concept. Keep that momentum going!</span>
      );
    } else if (allWrong) {
      // 3. External Feedback: Send incorrect message to the lesson footer
      setMiniQuestionLock(false);
      handleQuizFeedback(
        <span className='font-bold text-lg text-red-500'>No worries, revisit and revise the concept again and try again! Learning takes practice.</span>
      );
    } else {
      // 3. External Feedback: Send incorrect message to the lesson footer
      setMiniQuestionLock(false);
      handleQuizFeedback(
        <span className='font-bold text-lg text-amber-500'>No worries, mistakes make us better! Review the few spots you missed.</span>
      );
    }
  };

  // --- Core Quiz Logic ---
  const checkAnswers = (option) => {
    if (quizLocked) return; // 1. Lock check: Stop all interaction if the quiz is locked

    const isCorrectSelection = currentCorrectAnswers.includes(option); // 2. Determine the result for the clicked option

    // This is for identifying wrong options for feedbacks
    const LessonOptions = displayOptions[lessonId];
    const totalOptionsLength = LessonOptions[stepNo].length;
    let allWrong = false;


    // 3. Styles creater for options when selected
    let styleForClickedOption;
    if (isCorrectSelection) {
      styleForClickedOption = baseClasses + ' ' + correctClasses;
      correctsound.play();

    } else {
      styleForClickedOption = baseClasses + ' ' + wrongClasses;
      setWrongAnswerCounter(prevCounter => prevCounter + 1);
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
          const finalWrongCount = isCorrectSelection ? wrongAnswerCounter : wrongAnswerCounter + 1;
          const wrongScorePercentage = (finalWrongCount / totalOptionsLength) * 100;
          const allWrongIdentifierFormula = (finalWrongCount / totalOptionsLength) * 100;
          console.log(wrongScorePercentage, allWrongIdentifierFormula)

          if (allWrongIdentifierFormula === wrongScorePercentage) {
            allWrong = true;
          }
          setMiniQuestionLock(false);
          createFeedBackMessage(wrongScorePercentage, allWrong);
        }, 0);
      } else {
        // RULE 2: For multiple-answer questions, lock when all correct answers have been clicked
        const correctlyFoundCount = currentCorrectAnswers.filter(
          // Check if the correct item has been clicked (is a key in newResults)
          item => newResults.hasOwnProperty(item)
        ).length;

        if (correctlyFoundCount === currentCorrectAnswers.length) {
          setQuizLocked(true);
          setTimeout(() => {
            const finalWrongCount = isCorrectSelection ? wrongAnswerCounter : wrongAnswerCounter + 1;
            const wrongScorePercentage = (finalWrongCount / totalOptionsLength) * 100;
            const allWrongIdentifierFormula = ((totalOptionsLength - currentCorrectAnswers.length) / totalOptionsLength) * 100;

            console.log(wrongScorePercentage, allWrongIdentifierFormula)

            if (allWrongIdentifierFormula === wrongScorePercentage) {
              allWrong = true;
            }

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

export function DragAndDropQuizRunner({ stepNo, setMiniQuestionLock, handleQuizFeedback, lessonId }) {

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
      correctsound.play();
    } else if (incorrectSlotsCount >= 1) {
      // 3. External Feedback: Send incorrect message to the lesson footer
      setMiniQuestionLock(false);
      handleQuizFeedback(
        <span className='font-bold text-lg text-red-500'>No worries, revisit and revise the concept again and try again! Learning takes practice.</span>
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