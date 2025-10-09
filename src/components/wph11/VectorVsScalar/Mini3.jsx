import { useState, useEffect } from "react";


function createFeedBackMessage(wrongAnswerCount, setFeedBackGiven, setFeedBackDisplay, setWrongAnswerCounter) {
  let title, message, bgColor, icon;

  if (wrongAnswerCount === 0) {
    title = "Flawless Victory!";
    message = "Perfect run! You have mastered this concept. Keep that momentum going!";
    bgColor = "bg-emerald-100 border-emerald-500 text-emerald-800";
    icon = (
      <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    );
  } else if (wrongAnswerCount === 1) {
    title = "Keep Going!";
    message = "No worries, revisit and revise the concept again and try again! Learning takes practice.";
    bgColor = "bg-red-100 border-red-500 text-red-800";
    icon = (
      <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    );
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
  setWrongAnswerCounter(0);

}

const Step1Runner = ({ setMiniQuestionLock, setFeedBackGiven, setFeedBackDisplay }) => {

  // State to track which item is currently in the slot 'a'. Null means empty.
  const [slotContent, setSlotContent] = useState(null); // 'vector' or 'scalar'
  const [quizLocked, setQuizLocked] = useState(false);
  const [wrongAnswerCounter, setWrongAnswerCounter] = useState(0);

  // Safely lock the parent component on initial render
  useEffect(() => {
    setMiniQuestionLock(true);
  }, [setMiniQuestionLock]);

  // Handle start of drag operation
  const handleDragStart = (e, itemValue) => {
    e.dataTransfer.setData("text/plain", itemValue);
    // Optionally add a visual cue
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
  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-green-600', 'bg-green-50');

    if (quizLocked) return;

    const droppedItemValue = e.dataTransfer.getData("text/plain");

    // Clear the original item's slot in the source array logic if necessary, 
    // but here we just manage the slot's content
    setSlotContent(droppedItemValue);
  };

  // Handle click on the slot to remove the item (making it droppable again)
  const handleRemoveItem = () => {
    if (!quizLocked) {
      setSlotContent(null);
    }
  };


  const checkAnswers = () => {
    if (quizLocked) return;

    // The correct answer is 'vector'
    const isCorrect = slotContent === 'vector';
    let finalWrongCount = 0;

    if (isCorrect) {
      finalWrongCount = 0;
    } else {
      // If the slot is empty or contains the wrong item ('scalar')
      finalWrongCount = 1;
    }

    setWrongAnswerCounter(finalWrongCount);
    setQuizLocked(true);

    // Defer the parent state update to prevent the bad setState() error
    setTimeout(() => {
      setMiniQuestionLock(false); // UNLOCK LessonPage (Continue button enabled)
      createFeedBackMessage(finalWrongCount, setFeedBackGiven, setFeedBackDisplay, setWrongAnswerCounter);
    }, 0);
  };

  // Function to render the draggable item based on its value
  const renderDraggableItem = (value) => {
    const isVector = value === 'vector';
    const colorClass = isVector ? 'text-emerald-700 border-emerald-300' : 'text-red-700 border-red-300';

    return (
      <div
        draggable={!quizLocked}
        onDragStart={(e) => handleDragStart(e, value)}
        onDragEnd={handleDragEnd}
        onClick={handleRemoveItem} // Allows quick removal if clicked inside the slot
        className={`px-5 py-2 rounded-full text-xl font-bold cursor-grab inline-block bg-white shadow-lg transition-shadow duration-150 border ${colorClass} 
        ${quizLocked ? 'opacity-80 cursor-default' : 'hover:shadow-xl'}`}
      >
        <div>{value.charAt(0).toUpperCase() + value.slice(1)}</div>
      </div>
    );
  };

  const slotPlaceholder = (
    <span className="text-gray-500 text-base italic">Drop Here</span>
  );

  return (
    <>
      <div className="text-center text-3xl mt-12 md:text-3xl font-extrabold text-gray-800 mb-8 p-2">
        Complete the following sentence
      </div>

      <div className="flex flex-col items-center p-4">

        {/* Sentence Structure with Drop Slot */}
        <div className='flex text-center text-2xl mt-5 font-semibold text-gray-700 items-center'>
          Force is
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={slotContent ? handleRemoveItem : undefined} // Allow removing item by clicking
            className='h-12 w-36 mx-4 border-2 border-dashed border-sky-400 rounded-lg inline-flex items-center justify-center transition-colors duration-200 shadow-inner'
          >
            {slotContent ? renderDraggableItem(slotContent) : slotPlaceholder}
          </div>
          Quantity
        </div>

        {/* Draggable Items Source */}
        <div className='flex gap-x-5 justify-center mt-16 p-4 rounded-xl bg-gray-100 shadow-xl border border-gray-200'>

          {/* Only display item if it is NOT currently in the slot */}
          {slotContent !== 'scalar' && renderDraggableItem('scalar')}
          {slotContent !== 'vector' && renderDraggableItem('vector')}

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

export function Mini3({ setContentDisplay, setCurrentStep, setPageChecker, stepCounter, setStepCounter, setMiniQuestionLock, miniQuestionLock, setFeedBackGiven, setFeedBackDisplay }) {

  const defineContent = {
    step0: (
      <>
        <div className="text-center text-xl mt-3 animate-slide-in">Mini Quiz Time!</div>
        <div className="text-center text-xl mt-1 animate-slide-in text-red-400">(Challenging)</div>
      </>
    ),
    step1: <Step1Runner setMiniQuestionLock={setMiniQuestionLock} setFeedBackGiven={setFeedBackGiven} setFeedBackDisplay={setFeedBackDisplay} />,
    step2: null,
  }

  const nextStepKey = `step${stepCounter + 1}`;
  const currentContent = defineContent[`step${stepCounter}`];
  const nextContentExists = defineContent[nextStepKey] !== null && defineContent[nextStepKey] !== undefined;

  if (miniQuestionLock !== true) {
    if (nextContentExists) {

      if (currentContent) {
        setContentDisplay((previous) => [...previous, currentContent]);
      }

      setStepCounter(prev => prev + 1);
      setCurrentStep(prev => prev + 1);

    } else {
      if (currentContent) {
        setContentDisplay((previous) => [...previous, currentContent]);
        setCurrentStep(prev => prev + 1);
        setStepCounter(prev => prev + 1);
      } else {
        setPageChecker({
          mini3: false,
        });
        alert('Lesson Complete! Great job!');
        if (onLessonFinish) {
          onLessonFinish();
        }
      }
    }
  }


}