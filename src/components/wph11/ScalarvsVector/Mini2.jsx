import { useState, useEffect } from "react";
import correct from "../../../assets/sounds/correct.mp3"
import wrong from "../../../assets/sounds/wrong.mp3"


function createFeedBackMessage(wrongAnswerCount, setFeedBackGiven, setFeedBackDisplay, setWrongAnswerCounter, setCurrentStep) {
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
  setCurrentStep(prev => prev + 1);
  setWrongAnswerCounter(0);

}

const Step1Runner = ({ setMiniQuestionLock, setFeedBackGiven, setFeedBackDisplay, setCurrentStep }) => {

  const [answerResults, setAnswerResults] = useState({});
  const [quizLocked, setQuizLocked] = useState(false);
  const [wrongAnswerCounter, setWrongAnswerCounter] = useState(0);
  const correctsound = new Audio(correct);
  const wrongsound = new Audio(wrong);
  correctsound.volume = 0.1;
  wrongsound.volume = 0.1;

  useEffect(() => {
    setMiniQuestionLock(true);
  }, []);

  const correctAnswer = [
    "Yes"
  ]

  const baseClasses = 'px-6 py-3 rounded-full font-semibold transition-all duration-200 cursor-pointer text-sm shadow-md hover:shadow-lg';
  const correctClasses = 'bg-emerald-500 text-white transform shadow-emerald-500/50';
  const wrongClasses = 'bg-red-500 text-white shadow-red-500/50';
  const neutralClasses = 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50';


  function checkAnswers(option) {
    if (quizLocked) return;     // 1. Lock check: Stop all interaction if the quiz is locked

    const isCorrectSelection = correctAnswer.includes(option); // 2. Determine the result for the clicked option

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

      const isSingleAnswerQuestion = correctAnswer.length === 1; // Checking if there is only one answer

      if (isSingleAnswerQuestion) {
        setQuizLocked(true); // Lock immediately on the clicking any options (doesn't matter if it's right or wrong)
        setTimeout(() => {
          const finalWrongCount = isCorrectSelection ? wrongAnswerCounter : wrongAnswerCounter + 1; // There is a possiblity that the wrongAnswerCounter haven't been properly counted (This is set for safety measures)

          setMiniQuestionLock(false);
          createFeedBackMessage(finalWrongCount, setFeedBackGiven, setFeedBackDisplay, setWrongAnswerCounter, setCurrentStep);
        }, 0);
      } else {
        // RULE 2: For multiple-answer questions, lock when all correct answers have been clicked
        const correctlyFoundCount = correctAnswer.filter(
          // Check if the correct item has been clicked (is a key in newResults)
          item => newResults.hasOwnProperty(item)
        ).length;

        if (correctlyFoundCount === correctAnswer.length) {
          setQuizLocked(true);
          setTimeout(() => {
            const finalWrongCount = isCorrectSelection ? wrongAnswerCounter : wrongAnswerCounter + 1;

            setMiniQuestionLock(false);
            createFeedBackMessage(finalWrongCount, setFeedBackGiven, setFeedBackDisplay, setWrongAnswerCounter, setCurrentStep);
          }, 0);
        }
      }

      return newResults;
    });
  }

  return (
    <>
      <div className="text-center text-xl mt-3 animate-slide-in">Mini Quiz Time!</div>
      <div className="text-center text-xl mt-1 animate-slide-in text-emerald-400">(Easy)</div>
      <div className="text-center text-3xl mt-12 md:text-3xl font-extrabold text-gray-800 mb-8 animate-slide-in p-2">Does <strong>Velocity</strong> include direction?</div>

      <div className='flex flex-wrap justify-center gap-5'>

        {['Yes', 'No'].map((option) => {
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

      <p className="mt-8 text-center text-gray-500 text-xs italic">(A vector has both magnitude and direction.)</p>
    </>
  );
};

export function Mini2({ setContentDisplay, setCurrentStep, setPageChecker, stepCounter, setStepCounter, setMiniQuestionLock, miniQuestionLock, setFeedBackGiven, setFeedBackDisplay }) {

  const defineContent = {
    step0: <Step1Runner setMiniQuestionLock={setMiniQuestionLock} setFeedBackGiven={setFeedBackGiven} setFeedBackDisplay={setFeedBackDisplay} setCurrentStep={setCurrentStep} />,
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
          mini2: false,
          mini3: true
        });
        setContentDisplay([]);
      }
    }
  }


}