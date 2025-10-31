import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import running from "../../assets/lesson/running.png"
import car from "../../assets/lesson/car.png"


export const ScalarVsVectorStep3Runner = () => {
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

export const ScalarVsVectorStep5Runner = () => {
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

export const SpeedVsVelocityStep3Runner = () => {
  const carRef = useRef(null);

  useGSAP(() => {
    gsap.to(carRef.current, {
      x: "50vw",
      delay: 0.5,
      duration: 1.5,
      ease: "power2.out",
      repeat: 1,
      yoyo: true,
      yoyoEase: true,

      // Flip the image when the animation repeats (before the reverse starts)
      onRepeat: function () {
        // `this.targets()[0]` is the element currently being animated (.my-image)
        // We set scaleX to -1 to flip it horizontally.
        gsap.set(this.targets()[0], { scaleX: -1 });
      },

      // Reset the flip when the reverse completes (ready for the next forward run)
      onReverseComplete: function () {
        // Reset scaleX to 1 so the next forward animation starts normally.
        gsap.set(this.targets()[0], { scaleX: 1 });
      }
    });

  }, { scope: carRef });

  return (
    <>
      <div className="text-4xl font-extrabold text-gray-900 sm:text-5xl text-center lg:text-6xl mt-30">For example</div>,
      <div className="mt-4 text-xl text-gray-600 text-center mb-12">Speed Vs Velocity</div>
      <div className='px-10'><img ref={carRef} className="h-40 mt-15" src={car} alt="car" /></div>
      <div className="text-center text-[20px] text-emerald-400 font-bold mt-5">A car travels 400m in 20s, starting and ending at the same point.</div>
    </>
  );
};