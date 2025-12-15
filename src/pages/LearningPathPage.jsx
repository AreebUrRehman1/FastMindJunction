import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { WelcomeTransitionScreen } from "./WelcomeTransitionScreen";
import { staticContainer, staticContainer2 } from "../data/learningpathpage-container"
import biology from '../assets/path/Biology.png';
import it from '../assets/path/IT.png';
import mathematics from '../assets/path/Mathematics.png';
import chemistry from '../assets/path/Chemistry.png'
import physics from '../assets/path/Physics.png'

export function LearningPathPage({ darkModeControl, darkMode }) {

  let navigate = useNavigate();
  let params = useParams();
  const container2Ref = useRef(null);

  // stage: 'welcome' or 'loaded'
  const [stage, setStage] = useState('welcome');
  const [selectedKey, setSelectedKey] = useState(null)
  const [showStaticContainer2, setShowStaticContainer2] = useState("hidden");

  useEffect(() => {
    // Check if the container is visible (not "hidden") and the ref exists
    if (showStaticContainer2 !== "hidden" && container2Ref.current) {
      container2Ref.current.scrollIntoView({
        behavior: 'smooth', // Smooth scrolling animation
        block: 'center'      // Scroll the top of the element to the top of the viewport
      });
    }
  }, [showStaticContainer2]);

  if (stage === 'welcome') {
    const screenText = "Select Your Learning Path!"
    return <WelcomeTransitionScreen screenText={screenText} stage={stage} setStage={setStage} />;
  }


  function revealStaticContainer2(key) {
    setSelectedKey(key);

    if (key === "LP1") {
      setShowStaticContainer2("flex flex-wrap gap-[20px] justify-center py-[50px] mx-auto max-w-[1150px]");
    } else {
      navigate("/coming-soon")
    }
  }

  function pageTravel(key) {
    if (key === "WPH11") {
      navigate("/learn/WPH11")
    } else {
      navigate("/coming-soon")
    }
  }

  const imgMap = {
    biology,
    it,
    mathematics,
    chemistry,
    physics
  }


  return (
    <>
      <title>Select your Learning Path</title>

      <Header darkModeControl={darkModeControl} darkMode={darkMode} />

      <div className={`${darkMode ? "dark" : ""} dark:bg-[#0d0d12] text-gray-700 dark:text-gray-200 pt-[100px] min-h-screen`}>
        <div className="text-center text-[35px] font-bold dark:text-white">Select Your Learning Path...</div>

        <div className={`flex flex-wrap gap-[20px] justify-center pt-[50px] mx-auto max-w-[1150px]`}>
          {staticContainer.map((container) => {

            const baseClasses = "border-solid border-[0.5px] border-[#a4a4a4] dark:border-gray-600 text-center rounded-[10px] p-[10px] w-50 h-40 cursor-pointer";

            const selectedClass = container.key === selectedKey
              ? "bg-emerald-200 dark:bg-emerald-700"
              : "hover:bg-gray-200 dark:hover:bg-gray-700";

            const finalClasses = `${baseClasses} ${selectedClass}`;


            let availablity = "text-[13px] text-[#ff0000] dark:text-red-400";
            if (container.available === "Learn Now!") {
              availablity = "text-[13px] text-[#00ff00] dark:text-green-400";
            }

            return (
              <div className={finalClasses} onClick={() => { revealStaticContainer2(container.key) }} key={container.key}>
                <div className="flex justify-center"><img src={imgMap[container.image]} alt={container.alt} className="w-[50px] h-[50px]" /></div>
                <div className="text-[20px] font-bold leading-6 dark:text-white">{container.title}</div>
                <div className="text-[13px] text-[#808080] dark:text-gray-400">{container.text}</div>
                <div className={availablity}>{container.available}</div>
              </div>
            )
          })}
        </div>

        <div ref={container2Ref} className={showStaticContainer2}>
          {staticContainer2.map((container) => {
            let availablity = "text-[13px] text-[#ff0000] dark:text-red-400";
            if (container.available === "Learn Now!") {
              availablity = "text-[13px] text-[#00ff00] dark:text-green-400"
            } else if (container.available === "Under Development!") {
              availablity = "text-[13px] text-[#FFAE42] dark:text-yellow-400"
            }

            return (
              <div className="border-solid border-[0.5px] border-[#a4a4a4] dark:border-gray-600 text-center rounded-[10px] p-[10px] w-50 cursor-pointer dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700" onClick={() => { pageTravel(container.component) }} key={container.component}>
                <div className="text-[20px] font-bold leading-6 dark:text-white">{container.component}</div>
                <div className={availablity}>{container.available}</div>
              </div>
            )
          })}
        </div>
      </div>

      <Footer darkMode={darkMode} />
    </>
  )
}