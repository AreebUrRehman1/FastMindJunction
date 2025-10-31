import { ScalarVsVectorStep3Runner, ScalarVsVectorStep5Runner, SpeedVsVelocityStep3Runner } from "./wph11/animation-container.jsx"
import { ScalarVsVectorStep2Runner, SpeedVsVelocityStep2Runner } from "./mathjax-container.jsx"
import { OptionsSelectHorizontalQuizRunner, OptionsSelectVerticalQuizRunner, DragAndDropQuizRunner, LessonCompletePage } from "../components/wph11/LessonPageQuizRunner.jsx"

export const LecturesRunner = {
  scalarVsVector: {
    step0: <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl text-center lg:text-6xl">Understanding Scalar vs. Vector Quantities</h1>,
    step1: <p className="mt-4 text-xl text-gray-600 text-center mb-12">The fundamental difference in physics: Magnitude vs. Magnitude & Direction.</p>,
    step2: <ScalarVsVectorStep2Runner />,
    step3: <ScalarVsVectorStep3Runner />,
    step4: (
      <>
        <div className='text-center mt-8 text-[17px] '><span className='font-bold text-gray-500'>Distance: </span>He moved <strong>300m</strong></div>
        <div className='text-center text-[17px] '><span className='font-bold text-gray-500'>Displacement: </span>He moved <strong>300m east</strong></div>
      </>
    ),
    step5: <ScalarVsVectorStep5Runner />,
    step6: <div className='text-center mt-8 text-[17px] '><span className='font-bold text-gray-500'>Distance: </span>His <strong>total distance</strong> is <strong>700m</strong></div>,
    step7: (
      <>
        <div className='text-center text-[17px] '><span className='font-bold text-gray-500'>Displacement: </span>His <strong>total displacement</strong> is <strong>-100m</strong></div>
        <div className='text-center text-[14px]  text-blue-600'>300m (to the right) - 400m (to the left)</div>
      </>
    ),
    step8: ({ setMiniQuestionLock, handleQuizFeedback, lessonId, totalCorrectAnswers, setTotalCorrectAnswers }) => (<OptionsSelectHorizontalQuizRunner stepNo="step8" setMiniQuestionLock={setMiniQuestionLock} handleQuizFeedback={handleQuizFeedback} lessonId={lessonId} setTotalCorrectAnswers={setTotalCorrectAnswers} />),
    step9: ({ setMiniQuestionLock, handleQuizFeedback, lessonId, totalCorrectAnswers, setTotalCorrectAnswers }) => (<OptionsSelectHorizontalQuizRunner stepNo="step9" setMiniQuestionLock={setMiniQuestionLock} handleQuizFeedback={handleQuizFeedback} lessonId={lessonId} setTotalCorrectAnswers={setTotalCorrectAnswers} />),
    step10: ({ setMiniQuestionLock, handleQuizFeedback, lessonId, totalCorrectAnswers, setTotalCorrectAnswers }) => (<DragAndDropQuizRunner stepNo="step10" setMiniQuestionLock={setMiniQuestionLock} handleQuizFeedback={handleQuizFeedback} lessonId={lessonId} setTotalCorrectAnswers={setTotalCorrectAnswers} />),
    step11: ({ setMiniQuestionLock, handleQuizFeedback, lessonId, totalCorrectAnswers, setTotalCorrectAnswers }) => (<OptionsSelectVerticalQuizRunner stepNo="step11" setMiniQuestionLock={setMiniQuestionLock} handleQuizFeedback={handleQuizFeedback} lessonId={lessonId} setTotalCorrectAnswers={setTotalCorrectAnswers} />),
    step12: ({ setMiniQuestionLock, handleQuizFeedback, lessonId, totalCorrectAnswers, setTotalCorrectAnswers }) => (<LessonCompletePage lessonId={lessonId} totalCorrectAnswers={totalCorrectAnswers} setMiniQuestionLock={setMiniQuestionLock} />)
  },
  speedVsVelocity: {
    step0: <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl text-center lg:text-6xl">Speed vs Velocity: The Physics Distinction</h1>,
    step1: <p className="mt-4 text-xl text-gray-600 text-center mb-12">Essential concepts for Edexcel IAL Physics (WPH11/01) — Rate of motion matters!</p>,
    step2: <SpeedVsVelocityStep2Runner />,
    step3: <SpeedVsVelocityStep3Runner />,
    step4: (
      <>
        <div className='text-center mt-8 text-[17px] '><span className='font-bold text-gray-500'>Speed: </span>The speed of the car is <strong>50 km/h</strong></div>
        <div className='text-center text-[17px] '><span className='font-bold text-gray-500'>Velocity: </span>The velocity of the car is <strong>0 km/h</strong></div>
        <div className='text-center text-[14px]  text-blue-600'>The displacement of the car is <strong>Zero</strong>, which is why the velocity is also <strong>Zero</strong></div>
      </>
    ),
  }
}