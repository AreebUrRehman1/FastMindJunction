import { useState, useEffect } from "react";
// Assuming paths are correct for the environment
import correct from "../../../assets/sounds/correct.mp3"
import wrong from "../../../assets/sounds/wrong.mp3"

// --- Configuration for the Flexible Puzzle ---
// Defines all drop slots, the items available to drag, and the overall correct structure.
const PUZZLE_CONFIG = {
  // 1. Definition of the required slots (ID: Correct Answer(s))
  slots: {
    slotA: ['vector'],
    slotB: ['direction'],
  },
  // 2. All available items the user can drag
  draggableItems: ['scalar', 'vector', 'magnitude', 'direction'],
  
  // 3. The structure of the sentence, including text and slot IDs
  sentenceParts: [
    { type: 'text', content: 'Force is a ' },
    { type: 'slot', id: 'slotA' }, // Must contain 'vector'
    { type: 'text', content: ' quantity that has both magnitude and ' },
    { type: 'slot', id: 'slotB' }, // Must contain 'direction'
    { type: 'text', content: '.' },
  ]
};
// ---------------------------------------------


function createFeedBackMessage(wrongAnswerCount, setFeedBackGiven, setFeedBackDisplay, setWrongAnswerCounter, setCurrentStep) {
  let title, message, bgColor, icon;
  const correctsound = new Audio(correct);
  const wrongsound = new Audio(wrong);
  correctsound.volume = 0.1;
  wrongsound.volume = 0.1;

  if (wrongAnswerCount === 0) {
    title = "Flawless Victory!";
    message = "Perfect run! You have mastered this concept. Keep that momentum going!";
    bgColor = "bg-emerald-100 border-emerald-500 text-emerald-800";
    icon = (
      <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    );
    correctsound.play();
  } else if (wrongAnswerCount > 0) { // Changed condition to check for any wrong answer
    title = "Keep Going!";
    message = "No worries, revisit and revise the concept again and try again! Learning takes practice.";
    bgColor = "bg-red-100 border-red-500 text-red-800";
    icon = (
      <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    );
    wrongsound.play();
  }

  const messageCreation = (
    <div className={`p-2 w-full rounded-xl border-2 shadow-lg ${bgColor}`}>
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0">
          {icon}
        </div>
        <div>
          <h3 className="text-sm font-bold">{title}</h3>
          <p className="text-xs font-medium">
            {message}
          </p>
        </div>
      </div>
    </div>
  )

  setFeedBackDisplay([messageCreation]);
  setFeedBackGiven(true);
  setCurrentStep(prev => prev + 1);
  setWrongAnswerCounter(0);

}

const Step0Runner = ({ setMiniQuestionLock, setFeedBackGiven, setFeedBackDisplay, setCurrentStep }) => {

  // State to track content for ALL slots. Keys are slot IDs, values are dropped items.
  const initialAnswers = Object.keys(PUZZLE_CONFIG.slots).reduce((acc, id) => ({ ...acc, [id]: null }), {});
  const [userAnswers, setUserAnswers] = useState(initialAnswers); 
  const [quizLocked, setQuizLocked] = useState(false);
  const [wrongAnswerCounter, setWrongAnswerCounter] = useState(0);
  
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


  const checkAnswers = () => {
    if (quizLocked) return;

    let incorrectSlotsCount = 0;
    
    // Check every required slot against the user's answer
    Object.keys(PUZZLE_CONFIG.slots).forEach(slotId => {
      const userAnswer = userAnswers[slotId];
      const correctAnswers = PUZZLE_CONFIG.slots[slotId];
      
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
      createFeedBackMessage(incorrectSlotsCount, setFeedBackGiven, setFeedBackDisplay, setWrongAnswerCounter, setCurrentStep);
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
        const isCorrect = PUZZLE_CONFIG.slots[slotId]?.includes(content);
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

  // Renders the entire sentence structure from the PUZZLE_CONFIG
  const renderSentence = () => {
    return PUZZLE_CONFIG.sentenceParts.map((part, index) => {
      if (part.type === 'text') {
        return <span key={index}>{part.content}</span>;
      } else if (part.type === 'slot') {
        return renderDropSlot(part.id);
      }
      return null;
    });
  };

  return (
    <>
      <div className="text-center text-xl mt-3 ">Mini Quiz Time!</div>
      <div className="text-center text-xl mt-1  text-red-400">(Challenging)</div>
      <div className="text-center text-3xl mt-12 md:text-3xl font-extrabold text-gray-800 mb-8 p-2">
        Complete the following sentence
      </div>

      <div className="flex flex-col items-center p-4">

        {/* Sentence Structure with Drop Slot */}
        <div className='flex flex-wrap justify-center text-center text-2xl mt-5 font-semibold text-gray-700 items-center max-w-4xl'>
          {renderSentence()}
        </div>

        {/* Draggable Items Source */}
        <div className='flex gap-x-5 flex-wrap justify-center mt-16 p-4 rounded-xl bg-gray-100 shadow-xl border border-gray-200 max-w-full'>

          {/* Only display item if it is NOT currently placed in a slot */}
          {PUZZLE_CONFIG.draggableItems.map(item => (
            !placedItems.includes(item) && <div key={item} className="mb-2">{renderDraggableItem(item)}</div>
          ))}

        </div>

        {/* Check Button */}
        <button
          onClick={checkAnswers}
          disabled={quizLocked}
          className={`mt-12 px-8 py-3 font-bold text-lg rounded-xl transition-all duration-300 shadow-lg 
              ${quizLocked ? "bg-gray-400 text-gray-700 cursor-not-allowed" : "bg-sky-500 text-white hover:bg-sky-600 active:shadow-md"}`}
        >
          Check Answer
        </button>

      </div>
    </>
  );
};

export function Mini3({ setContentDisplay, setCurrentStep, setPageChecker, stepCounter, setStepCounter, setMiniQuestionLock, miniQuestionLock, setFeedBackGiven, setFeedBackDisplay, navigate }) {

  const defineContent = {
    step0: <Step0Runner setMiniQuestionLock={setMiniQuestionLock} setFeedBackGiven={setFeedBackGiven} setFeedBackDisplay={setFeedBackDisplay} setCurrentStep={setCurrentStep} />,
    step1: null,
  }

  const nextStepKey = `step${stepCounter + 1}`;
  const currentContent = defineContent[`step${stepCounter}`];
  const nextContentExists = defineContent[nextStepKey] !== null && defineContent[nextStepKey] !== undefined;

  if (miniQuestionLock !== true) {
    if (nextContentExists) {
      setContentDisplay((previous) => [...previous, currentContent]);
      setStepCounter(prev => prev + 1);

    } else {
      if (currentContent) {
        setContentDisplay((previous) => [...previous, currentContent]);
        setStepCounter(prev => prev + 1);
      } else {
        setStepCounter(0);
        setPageChecker({
          mini3: false,
        });
        setContentDisplay([]);
        navigate(-1);
      }
    }
  }
}
