import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import running from "../assets/lesson/running.png"


export const ScalarVsVectorStep6Runner = () => {
  const personRef = useRef(null);

  useGSAP(() => {
    gsap.to(personRef.current, {
      x: "40vw",
      delay: 0.5,
      duration: 1.5,
      ease: "power2.out",
    });

  }, { scope: personRef });

  return (
    <>
      <div className="text-4xl font-extrabold text-gray-900 sm:text-5xl text-center lg:text-6xl mt-30">For example</div>,
      <div className="mt-4 text-xl text-gray-600 text-center mb-12">Distance vs Displacement</div>
      <div className='px-10'><img ref={personRef} className="h-40 mt-15" src={running} alt="running person" /></div>
      <div className="text-center text-[20px] text-emerald-400 font-bold mt-5">Runner moves 300m east</div>
    </>
  );
};

export const ScalarVsVectorStep9Runner = () => {
  const personRef = useRef(null);

  useGSAP(() => {
    gsap.to(personRef.current, {
      x: "-40vw",
      delay: 0.5,
      duration: 1.5,
      ease: "power2.out",
    });

  }, { scope: personRef });

  return (
    <>
      <div className="text-4xl font-extrabold text-gray-900 sm:text-5xl text-center lg:text-6xl mt-30">Let's expand it further!</div>
      <div className="mt-4 text-xl text-gray-600 text-center mb-12">Distance vs Displacement</div>
      <div className='flex justify-center px-10'><img ref={personRef} className="h-40 mt-15 scale-x-[-1]" src={running} alt="running person" /></div>
      <div className="text-center text-[20px] text-emerald-400 font-bold mt-5 ">Runner moves again 400m but to the west now</div>
    </>
  );
};