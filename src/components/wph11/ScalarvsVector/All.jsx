import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import running from "../../../assets/lesson/running.png"

// Components for animated steps
const Page2Step1Runner = () => {
  const personRef = useRef(null);

  useGSAP(() => {
    gsap.to(personRef.current, {
      x: 800,
      duration: 1.5,
      ease: "power2.out",
    });

  }, { scope: personRef });

  return (
    <>
      <div className="text-center text-xl mt-8 text-gray-500">Distance vs Displacement</div>
      <img ref={personRef} className="h-40 mt-15" src={running} alt="running person" />
      <div className="text-center text-[20px] text-emerald-400 font-bold mt-5">Runner moves 300m east</div>
    </>
  );
};

const Page3Step1Runner = () => {
  const personRef = useRef(null);

  useGSAP(() => {
    gsap.to(personRef.current, {
      x: -800,
      duration: 1.5,
      ease: "power2.out",
    });

  }, { scope: personRef });

  return (
    <>
      <div className="text-center text-xl mt-8  text-gray-500">Distance vs Displacement</div>
      <img ref={personRef} className="h-40 mt-15 ml-[800px] scale-x-[-1]" src={running} alt="running person" />
      <div className="text-center text-[20px] text-emerald-400 font-bold mt-5 ">Runner moves again 300m but to the west now</div>
    </>
  );
};

// Exported Lesson Content Data
export const scalarvsVector = {
  page0: {
    step0: (<div className="text-center text-xl mt-5 ">Let's define it real quick!</div>),
    step1: (
      <>
        <div className='text-center mt-8 '><span className='font-bold text-gray-500'>Scalar: </span>magnitude <strong>only</strong></div>
        <div className='text-center '><span className='font-bold text-gray-500'>Vector: </span>magnitude <strong>+</strong> direction</div>
      </>
    ),
    step2: (
      <>
        <div className='flex justify-between mt-15'>
          <table className='border-solid border-black border-1'>
            <thead>
              <tr>
                <th colSpan="2" className='p-4 bg-gray-300'>Scalars</th>
              </tr>
            </thead>
            <tbody>
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
            </tbody>
          </table>

          <table className='border-solid border-black border-1'>
            <thead>
              <tr>
                <th colSpan="2" className='p-4 bg-gray-300'>Vectors</th>
              </tr>
            </thead>
            <tbody>
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
            </tbody>
          </table>
        </div>
      </>
    ),
    step3: (<div className="text-center text-xl mt-8  font-bold text-red-500">And More!!!</div>),
  },
  page1: {
    step0: (<div className="text-center text-xl mt-3 ">For example</div>),
    step1: <Page2Step1Runner />,
    step2: (
      <>
        <div className='text-center mt-8 text-[17px] '><span className='font-bold text-gray-500'>Scalar: </span>He moved <strong>300m</strong> (Distance)</div>
        <div className='text-center text-[17px] '><span className='font-bold text-gray-500'>Vector: </span>He moved <strong>300m east</strong> (Displacement)</div>
      </>
    ),
  },
  page2: {
    step0: (<div className="text-center text-xl mt-3 ">Let's expand it further!</div>),
    step1: <Page3Step1Runner />,
    step2: (<div className='text-center mt-8 text-[17px] '><span className='font-bold text-gray-500'>Scalar: </span>His total distance is <strong>600m</strong> (Distance)</div>),
    step3: (
      <>
        <div className='text-center text-[17px] '><span className='font-bold text-gray-500'>Vector: </span>His total displacement is <strong>0m</strong></div>
        <div className='text-center text-[14px]  text-blue-600'>300m (to the right) - 300m (to the left)</div>
      </>
    ),
    pageEnd: (<div className="text-center text-2xl mt-12 font-bold text-emerald-500">Lesson Page Completed!</div>)
  },
}

// Renamed and updated function to properly handle state setters
export function advanceLesson({ stepCounter, setStepCounter, pageCounter, setPageCounter, setContentDisplay, navigate, setMiniQuestionLock, scalarvsVector }) {

  const pageNo = `page${pageCounter}`;
  const nextStepNo = `step${stepCounter + 1}`;
  const nextPageNo = `page${pageCounter + 1}`;

  const currentPage = scalarvsVector[pageNo];
  const currentContent = currentPage ? currentPage[nextStepNo] : null;

  const nextStepExists = !!currentContent;
  const nextPageExists = !!scalarvsVector[nextPageNo];

  // 1. Advance to the next step on the current page
  if (nextStepExists) {
    setContentDisplay((prev) => [...prev, currentContent]);
    // CORRECTED: Must return the new state value in the functional update
    setStepCounter((prev) => prev + 1); 
    return;
  } 
  
  // 2. Advance to the next page
  if (nextPageExists) {
      // CORRECTED: Must return the new state value in the functional update
      setPageCounter((prev) => prev + 1); 
      setStepCounter(1); // Start next page at step 1 (since step 0 is the intro)
      const nextPage = scalarvsVector[nextPageNo];
      const step0content = nextPage["step0"];
      setContentDisplay([step0content]);
      return;
  } 
  
  // 3. Lesson completed (no more pages/steps)
  if (!nextStepExists && !nextPageExists) {
    const finalContent = currentPage.pageEnd || (<div className="text-center text-2xl mt-12 font-bold text-emerald-500">Lesson Completed!</div>);
    setContentDisplay((prev) => [...prev, finalContent]);
    // Navigation will be handled by the parent component's handleContinue when totalSteps is reached
  }
}