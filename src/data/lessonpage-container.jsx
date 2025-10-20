import { ScalarVsVectorStep6Runner, ScalarVsVectorStep9Runner } from "./lessonpage-animation-container.jsx"
import { ScalarVsVectorStep2Runner } from "./mathjax-container.jsx"
import { OptionsSelectQuizRunner } from "./lessonpage-quiz-container.jsx"

export const scalarvsVector = {
  step0: <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl text-center lg:text-6xl">Understanding Scalar vs. Vector Quantities</h1>,
  step1: <p className="mt-4 text-xl text-gray-600 text-center mb-12">The fundamental difference in physics: Magnitude vs. Magnitude & Direction.</p>,
  step2: <ScalarVsVectorStep2Runner />,
  step3: <ScalarVsVectorStep6Runner />,
  step4: (
    <>
      <div className='text-center mt-8 text-[17px] '><span className='font-bold text-gray-500'>Distance: </span>He moved <strong>300m</strong></div>
      <div className='text-center text-[17px] '><span className='font-bold text-gray-500'>Displacement: </span>He moved <strong>300m east</strong></div>
    </>
  ),
  step5: <ScalarVsVectorStep9Runner />,
  step6: <div className='text-center mt-8 text-[17px] '><span className='font-bold text-gray-500'>Distance: </span>His <strong>total distance</strong> is <strong>700m</strong></div>,
  step7: (
    <>
      <div className='text-center text-[17px] '><span className='font-bold text-gray-500'>Displacement: </span>His <strong>total displacement</strong> is <strong>-100m</strong></div>
      <div className='text-center text-[14px]  text-blue-600'>300m (to the right) - 400m (to the left)</div>
    </>
  ),
}