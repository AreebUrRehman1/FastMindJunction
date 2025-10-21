export function MiniQuizOptionContent({ answerResults, baseClasses, neutralClasses, quizLocked, checkAnswers, stepNo }) {

  const miniQuizOptionDataContainer = {
    step8: (
      <>
        <div className="text-4xl font-extrabold text-gray-900 sm:text-5xl text-center lg:text-6xl mt-50">Mini Quiz Time!</div>
        <div className="mt-4 text-3xl text-center mb-12 text-emerald-400">(Easy)</div>
        <div className="text-center text-3xl mt-12 md:text-3xl font-extrabold text-gray-800 mb-8 p-2">What is the only required component to fully define a <strong>Scalar Quantity?</strong></div>

        <div className='flex flex-wrap justify-center gap-5 mb-50'>

          {['Volume', 'Both Magnitude and Direction', 'Direction', 'Magnitude'].map((option) => {
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
    step9: (
      <>
        <div className="text-4xl font-extrabold text-gray-900 sm:text-5xl text-center lg:text-6xl mt-50">Mini Quiz Time!</div>
        <div className="mt-4 text-3xl text-center mb-12 text-amber-400">(Medium)</div>
        <div className="text-center text-3xl mt-12 md:text-3xl font-extrabold text-gray-800 mb-8 p-2">Which of the following are <strong>Vector</strong> quantities? (Select all that apply)</div>

        <div className='flex flex-wrap justify-center gap-5 mb-50'>

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

  return miniQuizOptionDataContainer[stepNo];
}

export function MiniQuizDragAndDropContent({ renderSentence, PUZZLE_CONFIG, stepNo, placedItems, renderDraggableItem, checkAnswers, quizLocked }) {

  const miniQuizDragAndDropDataContainer = {
    step10: (
      <>
        <div className="text-4xl font-extrabold text-gray-900 sm:text-5xl text-center lg:text-6xl mt-50">Mini Quiz Time!</div>
        <div className="mt-4 text-3xl text-center mb-12 text-red-400">(Challenging)</div>
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
            {PUZZLE_CONFIG[stepNo].draggableItems.map(item => (
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
    )
  };

  return miniQuizDragAndDropDataContainer[stepNo];
}