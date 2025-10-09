import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import running from "../../../assets/lesson/running.png"

const Step1Runner = () => {
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



export function Further({ setContentDisplay, setCurrentStep, setPageChecker, stepCounter, setStepCounter }) {

  const defineContent = {
    step0: (<div className="text-center text-xl mt-3 ">Let's expand it further!</div>),
    step1: <Step1Runner />,
    step2: (<div className='text-center mt-8 text-[17px] '><span className='font-bold text-gray-500'>Scalar: </span>His total distance is <strong>600m</strong> (Distance)</div>),
    step3: (
      <>
        <div className='text-center text-[17px] '><span className='font-bold text-gray-500'>Vector: </span>His total displacement is <strong>0m</strong></div>
        <div className='text-center text-[14px]  text-blue-600'>300m (to the right) - 300m (to the left)</div>
      </>
    ),
    step4: null
  }

  const nextStepKey = `step${stepCounter + 1}`;
  const currentContent = defineContent[`step${stepCounter}`];
  const nextContentExists = defineContent[nextStepKey] !== null && defineContent[nextStepKey] !== undefined;

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
      setStepCounter(0);
      setPageChecker({
        further: false,
      });
      setContentDisplay([]);
    }
  }


}