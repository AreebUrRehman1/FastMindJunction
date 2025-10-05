import { useState, useEffect, useRef } from "react";
import { WelcomeTransitionScreen } from "./WelcomeTransitionScreen";
import logo from "/Logo2.png";
import sidebar from "../assets/learn/Sidebar Icon.png";
import darkmode from "../assets/learn/Dark mode Icon.png";
import wph11 from "../assets/learn/WPH11.png";
import coin from "../assets/learn/Coin.png";



export function LearnPage() {

  const div12 = useRef(null);
  const img = useRef(null);

  // stage: 'welcome' or 'loaded'
  const [stage, setStage] = useState('welcome');

  const WELCOME_DURATION_MS = 2500; // 2.5 seconds (Must match the CSS animation duration)

  // Manages the transition from welcome screen to loaded content
  useEffect(() => {
    if (stage === 'welcome') {
      const welcomeTimer = setTimeout(() => {
        setStage('loaded');
      }, WELCOME_DURATION_MS);

      return () => clearTimeout(welcomeTimer);
    }
  }, [stage]);

  if (stage === 'welcome') {
    const screenText = "Awesome! Let's Begin!"
    return <WelcomeTransitionScreen screenText={screenText} />;
  }

  if (div12.current && img.current) {
    console.log("started")
    // myDivRef.current is the equivalent of the 'element' parameter
    const parent = div12.current.getBoundingClientRect();
    const child = img.current.getBoundingClientRect();

    // Formula: Child's Absolute Position - Parent's Absolute Position
    const relativeX = child.left - parent.left;

    // Output the result
    console.log(`Relative X (distance from parent's left edge): ${relativeX}px`);
  }

  return (
    <>

      <title>Component Name</title>

      <div className="flex">

        <div className="w-85 h-screen bg-white border-r border-gray-200 flex-shrink-0 shadow-md">
          <div className="flex flex-col h-full overflow-y-auto">

            <div className="p-4 flex items-center justify-between border-b border-gray-100 sticky top-0 bg-white z-10">
              <div className="flex items-center">
                <span className="mr-2"><img className="w-10 h-10" src={logo} alt="logo" /></span>
                <span className="text-lg font-bold text-gray-600">FastMindJunction</span>
              </div>

              {/* DND/Toggle Button Area */}
              <div className="flex items-center space-x-2 relative bg-gray-100 rounded-lg p-1">
                {/* Night Mode Button (Placeholder for the DND functionality) */}
                <button className="p-1.5 hover:bg-gray-200 rounded-lg text-gray-600 transition-colors"><img src={darkmode} className="w-6 h-6 cursor-pointer" alt="Dark mode Icon" /></button>
                {/* Second Toggle Button (Placeholder for Dark Mode) */}
                <button className="p-1.5 hover:bg-gray-200 rounded-lg text-gray-600 transition-colors"><img src={sidebar} className="w-6 h-6 cursor-pointer" alt="Sidebar Icon" /></button>
                {/* NOTE: The complex DND dropdown is removed as requested */}
              </div>
            </div>

            <div className="flex flex-col py-2">
              <div className="text-gray-400 font-semibold text-center mt-2 text-[18px]">Current</div>
              <div className="flex items-center p-2.5 mx-2 rounded-lg cursor-pointer transition-colors text-sm font-medium bg-gray-100 text-gray-900">
                <img className="w-7 h-7 mr-5" src={wph11} alt="WPH11 Icon" />
                <span className="w-5 h-5 flex-shrink-0 mr-3">WPH11</span>
              </div>
            </div>

          </div>
        </div>

        <div className="flex-1">

          <div className="unit-details">
            <div className="my-[40px] mx-auto text-center font-normal text-3xl">Unit 1 - Motion</div>

            <div ref={div12} className="flex flex-col items-center gap-[20px] gap-y-[20px]">

              <div className="w-[70.5px] h-[70.5px] relative">
                <div ref={img} className="flex bg-[#06c1fab8] shadow-[0px_9px_1px_#049ac8b8] w-[65px] h-[65px] rounded-full items-center justify-center"><img className="w-[48px] h-[48px]" src={coin} alt="coin icon" /></div>
                <div className="flex flex-col w-[180px] h-auto absolute p-2 pl-3 rounded-[20px] mt-[20px] z-2 bg-[#4dd4fd] left-1/2 -translate-x-1/2">
                  <div className="w-3 h-3 bg-[#4dd4fd] absolute top-[-5px] left-1/2 -translate-x-1/2 rotate-45"></div>
                  <div className="text-[17px] font-extrabold text-white mt-[7px]">Equation of Motion</div>
                  <button className="rounded-[10px] w-[65%] h-[30px] border-none bg-white font-bold text-[15px] mt-[10%] mb-[17px] cursor-pointer tracking-[0.5px] shadow-[#8080806] hover:scale-101">Learn Now!</button>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>


      <div className="mb-[100px]"></div>

    </>
  )

}