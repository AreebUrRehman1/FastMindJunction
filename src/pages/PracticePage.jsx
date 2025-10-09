export function LessonPage() {
  // State to manage the current progress through the lesson
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 15; // Total number of activities/steps in this lesson


  // const person = useRef(null);
  // const person2 = useRef(null);

  // useGSAP(() => {
  //   gsap.to(person.current, {
  //     x: 800,
  //     delay: 1,
  //     duration: 1.5,
  //   })
  // })

  // useGSAP(() => {
  //   gsap.to(person2.current, {
  //     x: -800,
  //     delay: 1,
  //     duration: 1.5,
  //   })
  // })


  //   const [answerResults, setAnswerResults] = useState({});
  //   const [quizLocked, setQuizLocked] = useState(false);

  //   const correctAnswer = [
  //     "Yes"
  //   ]

  //   const baseClasses = 'px-6 py-3 rounded-full font-semibold transition-all duration-200 cursor-pointer text-sm shadow-md hover:shadow-lg';
  //   const correctClasses = 'bg-emerald-500 text-white transform shadow-emerald-500/50';
  //   const wrongClasses = 'bg-red-500 text-white shadow-red-500/50';
  //   const neutralClasses = 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50';


  // function checkAnswers(option) {
  //     // 1. Lock check: Stop all interaction if the quiz is locked
  //     if (quizLocked) return;

  //     // 2. Determine the result for the clicked option
  //     const isCorrectSelection = correctAnswer.includes(option);

  //     // 3. Calculate the final class for the clicked option
  //     let styleForClickedOption;
  //     if (isCorrectSelection) {
  //       styleForClickedOption = baseClasses + ' ' + correctClasses;
  //     } else {
  //       styleForClickedOption = baseClasses + ' ' + wrongClasses;
  //     }

  //     // 4. Update logic: Use functional state update to safely check the lock condition
  //     setAnswerResults(prevResults => {
  //       // Create the new state object first (preserving previous results)
  //       const newResults = {
  //         ...prevResults,
  //         [option]: styleForClickedOption,
  //       };

  //       // 5. CONDITIONAL LOCK CHECK (The core modification)
  //       const isSingleAnswerQuestion = correctAnswer.length === 1;

  //       if (isSingleAnswerQuestion) {
  //           // RULE 1: For single-answer questions, lock immediately on the first click (doesn't matter if it's right or wrong)
  //           setQuizLocked(true);
  //       } else {
  //           // RULE 2: For multiple-answer questions, lock when all correct answers have been clicked
  //           const correctlyFoundCount = correctAnswer.filter(
  //               // Check if the correct item has been clicked (is a key in newResults)
  //               item => newResults.hasOwnProperty(item) 
  //           ).length;

  //           if (correctlyFoundCount === correctAnswer.length) {
  //               setQuizLocked(true);
  //           }
  //       }

  //       return newResults;
  //     });
  //   }


  // const swapy = useRef(null)
  // const container = useRef(null)

  // useEffect(() => {
  //   // If container element is loaded
  //   if (container.current) {
  //     swapy.current = createSwapy(container.current)
  //   }

  //   return () => {
  //     // Destroy the swapy instance on component destroy
  //     swapy.current?.destroy()
  //   }
  // }, [])


  // Calculate progress as a percentage
  const progressPercentage = useMemo(() => {
    return Math.min(100, (currentStep / totalSteps) * 100);
  }, [currentStep, totalSteps]);

  // Function to advance the lesson stage
  const handleContinue = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Lesson is complete, call the provided finish handler
      alert('Lesson Complete! Great job!');
      if (onLessonFinish) {
        onLessonFinish();
      }
    }
  };

  // Placeholder content: Replace this with your actual interactive lesson logic
  const lessonContent = (
    <div>
      <div className="text-center text-4xl font-bold">Scalar Vs Vector</div>

      {/* <div className="text-center text-xl mt-5 animate-slide-in">Let's define it real quick!</div>

      <div className='text-center mt-8 animate-slide-in'><span className='font-bold text-gray-500'>Scalar: </span>magnitude <strong>only</strong></div>
      <div className='text-center animate-slide-in'><span className='font-bold text-gray-500'>Vector: </span>magnitude <strong>+</strong> direction</div>

      <div className='flex justify-between mt-15'>
          <table className='border-solid border-black border-1'>
            <tr>
              <th colspan="2" className='p-4 bg-gray-300'>Scalars</th>
            </tr>
            <tr>
              <td className='p-4 border-solid border-black border-1'>Distance</td>
              <td className='p-4 border-solid border-black border-1'>Speed</td>
            </tr>
            <tr>
              <td className='p-4 border-solid border-black border-1'>Mass</td>
              <td className='p-4 border-solid border-black border-1'>Time</td>
            </tr>
            <tr>
              <td className='p-4 border-solid border-black border-1'>Efficiency</td>
              <td className='p-4 border-solid border-black border-1'>Work Done</td>
            </tr>
          </table>

          <table className='border-solid border-black border-1'>
            <tr>
              <th colspan="2" className='p-4 bg-gray-300'>Vectors</th>
            </tr>
            <tr>
              <td className='p-4 border-solid border-black border-1'>Displacement</td>
              <td className='p-4 border-solid border-black border-1'>Velocity</td>
            </tr>
            <tr>
              <td className='p-4 border-solid border-black border-1'>Weight</td>
              <td className='p-4 border-solid border-black border-1'>Acceleration</td>
            </tr>
            <tr>
              <td className='p-4 border-solid border-black border-1'>Momentum</td>
              <td className='p-4 border-solid border-black border-1'>Force</td>
            </tr>
          </table>
      </div>


      <div className="text-center text-xl mt-8 animate-slide-in font-bold text-red-500">And More!!!</div> */}

      {/* <div className="text-center text-xl mt-3 animate-slide-in">For example</div>

      <div className="text-center text-xl mt-8 animate-slide-in text-gray-500">Distance vs Displacement</div>
      <img ref={person} className="h-40 mt-15" src={running} alt="running person" />
      <div className="text-center text-[20px] text-emerald-400 font-bold mt-5 animate-slide-in">Runner moves 300m east</div>
      <div className='text-center mt-8 text-[17px] animate-slide-in'><span className='font-bold text-gray-500'>Scalar: </span>He moved <strong>300m</strong> (Distance)</div>
      <div className='text-center text-[17px] animate-slide-in'><span className='font-bold text-gray-500'>Vector: </span>He moved <strong>300m east</strong> (Displacement)</div> */}


      {/* <div className="text-center text-xl mt-3 animate-slide-in">Let's expand it further!</div>

      <div className="text-center text-xl mt-8 animate-slide-in text-gray-500">Distance vs Displacement</div>
      <img ref={person2} className="h-40 mt-15 ml-[800px] scale-x-[-1]" src={running} alt="running person" />
      <div className="text-center text-[20px] text-emerald-400 font-bold mt-5 animate-slide-in">Runner moves again 300m but to the west now</div>
      <div className='text-center mt-8 text-[17px] animate-slide-in'><span className='font-bold text-gray-500'>Scalar: </span>His total distance is <strong>600m</strong> (Distance)</div>
      <div className='text-center text-[17px] animate-slide-in'><span className='font-bold text-gray-500'>Vector: </span>His total displacement is <strong>0m</strong></div>
      <div className='text-center text-[14px] animate-slide-in text-blue-600'>300m (to the right) - 300m (to the left)</div> */}


      {/* <div className="text-center text-xl mt-3 animate-slide-in">Mini Quiz Time!</div>
      <div className="text-center text-xl mt-1 animate-slide-in text-emerald-400">(Easy)</div>

      <div className="text-center text-3xl mt-12 md:text-3xl font-extrabold text-gray-800 mb-8 animate-slide-in p-2">Which of the following is a <strong>Vector</strong> quantity?</div>

      <div className='flex flex-wrap justify-center gap-5'>

        {['Force', 'Distance', 'Displacement', 'Weight', 'Mass', 'Time'].map((option) => {
          // 6. Get the dynamic class. If not clicked, use neutral class.
          const classes = answerResults[option] || `${baseClasses} ${neutralClasses}`;

          return (
            <div
              key={option}
              className={`${classes} ${quizLocked ? 'opacity-70 !cursor-default' : ''}`} // Add visual lock style
              // 7. Conditional click handler: completely disabled when quizLocked is true
              onClick={quizLocked ? undefined : () => { checkAnswers(option) }}
            >
              {option}
            </div>
          );
        })}

      </div>

      <p className="mt-8 text-center text-gray-500 text-xs italic">(A vector has both magnitude and direction.)</p> */}

      {/* <div className="text-center text-xl mt-3 animate-slide-in">Mini Quiz Time!</div>
      <div className="text-center text-xl mt-1 animate-slide-in text-emerald-400">(Easy)</div>

      <div className="text-center text-3xl mt-12 md:text-3xl font-extrabold text-gray-800 mb-8 animate-slide-in p-2">Does <strong>Velocity</strong> include direction?</div>

      <div className='flex flex-wrap justify-center gap-5'>

        {['Yes', 'No'].map((option) => {
          // Get the dynamic class. If not clicked, use neutral class.
          const classes = answerResults[option] || `${baseClasses} ${neutralClasses}`;

          return (
            <div
              key={option}
              className={`${classes} ${quizLocked ? 'opacity-70 !cursor-default' : ''}`} // Add visual lock style
              // Conditional click handler: completely disabled when quizLocked is true
              onClick={quizLocked ? undefined : () => { checkAnswers(option) }}
            >
              {option}
            </div>
          );
        })}

      </div>

      <p className="mt-8 text-center text-gray-500 text-xs italic">(A vector has both magnitude and direction.)</p> */}



      {/* <div className="text-center text-xl mt-3 animate-slide-in">Mini Quiz Time!</div>
      <div className="text-center text-xl mt-1 animate-slide-in text-red-400">(Challenging)</div>

      <div className="text-center text-3xl mt-12 md:text-3xl font-extrabold text-gray-800 mb-8 animate-slide-in p-2">
        Complete the following sentence
      </div>

      <div ref={container} className="flex flex-col items-center">

        <div className='flex text-center text-2xl mt-5 font-semibold text-gray-700'>
          Force is
          <div
            data-swapy-slot="a"
            className='h-8 w-28 mx-4 border-b-2 border-dashed border-gray-400 bg-gray-100 rounded-md inline-flex items-center justify-center text-base transition-colors duration-200'>
            <div data-swapy-item="a" className="min-h-full min-w-full text-transparent">A</div>
          </div>
          Quantity
        </div>

        <div className='flex gap-x-5 justify-center mt-16 p-4 rounded-xl bg-gray-200 shadow-inner'>
          <div data-swapy-slot="b" className='px-5 py-2 rounded-full text-xl font-bold cursor-grab inline-block bg-white shadow-lg hover:shadow-xl transition-shadow duration-150 text-sky-700'>
            <div data-swapy-item="b">
              <div>Scalar</div>
            </div>
          </div>

          <div data-swapy-slot="c" className='px-5 py-2 rounded-full text-xl font-bold cursor-grab inline-block bg-white shadow-lg hover:shadow-xl transition-shadow duration-150 text-sky-700'>
            <div data-swapy-item="c">
              <div>Vector</div>
            </div>
          </div>

        </div>

      </div> */}

    </div>
  );

  return (
    <>
      <title>Lesson Time!</title>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">

        {/* 1. TOP PROGRESS BAR HEADER */}
        <header className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-50 flex items-center shadow-md px-6">

          {/* Back Button (Placeholder) */}
          <button onClick={() => console.log("Exit Lesson")} className="text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors mr-6 text-2xl font-semibold">&times;</button>

          {/* Progress Bar Container */}
          <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 transition-all duration-500 ease-out rounded-full" style={{ width: `${progressPercentage}%` }} role="progressbar" aria-valuenow={progressPercentage} aria-valuemin="0" aria-valuemax="100"></div>
          </div>
        </header>

        {/* 2. MAIN CONTENT AREA */}
        <main className="flex-1 flex justify-center pt-25 pb-24">
          <div className="w-full max-w-3xl">
            {lessonContent}
          </div>
        </main>

        {/* 3. BOTTOM ACTION BAR/FOOTER */}
        <footer className="fixed bottom-0 left-0 right-0 h-20 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-50 flex items-center justify-end px-8 shadow-inner">
          <button onClick={handleContinue} className="px-8 py-3 bg-green-500 text-white font-bold text-lg rounded-xl shadow-lg hover:bg-green-600 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-700">{currentStep < totalSteps ? 'Continue' : 'Finish'}</button>
        </footer>

      </div>
    </>
  );
}