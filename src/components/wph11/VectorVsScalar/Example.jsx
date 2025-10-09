import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import running from "../../../assets/lesson/running.png"

const Step1Runner = () => {
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



export function Example({ setContentDisplay, setCurrentStep, setPageChecker, stepCounter, setStepCounter }) {

  const defineContent = {
    step0: (<div className="text-center text-xl mt-3 ">For example</div>),
    step1: <Step1Runner />,
    step2: (
      <>
        <div className='text-center mt-8 text-[17px] '><span className='font-bold text-gray-500'>Scalar: </span>He moved <strong>300m</strong> (Distance)</div>
        <div className='text-center text-[17px] '><span className='font-bold text-gray-500'>Vector: </span>He moved <strong>300m east</strong> (Displacement)</div>
      </>
    ),
    step3: null,
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
        example: false,
        further: true
       });
      setContentDisplay([]);
    }
  }


}