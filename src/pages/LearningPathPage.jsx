import { useState } from "react";
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

  // stage: 'welcome' or 'loaded'
  const [stage, setStage] = useState('welcome');
  const [selectedKey, setSelectedKey] = useState(null)
  const [showStaticContainer2, setShowStaticContainer2] = useState("hidden");

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

      {/* Wrapping the main content area with the dark mode class for background and text color, matching HomePage */}
      <div className={`${darkMode ? "dark" : ""} dark:bg-[#0d0d12] text-gray-700 dark:text-gray-200 pt-[100px]`}>
        <div className="text-center text-[35px] font-bold dark:text-white">Select Your Learning Path...</div>

        <div className={`flex flex-wrap gap-[20px] justify-center py-[50px] mx-auto max-w-[1150px]`}>
          {staticContainer.map((container) => {

            // baseClasses now includes the default dark background color for the card itself
            const baseClasses = "border-solid border-[0.5px] border-[#a4a4a4] dark:border-gray-600 text-center rounded-[10px] p-[10px] w-50 h-40 cursor-pointer";

            // 2. Update hover and selected classes for dark mode
            const selectedClass = container.key === selectedKey
              ? "bg-emerald-200 dark:bg-emerald-700" // Selected
              : "hover:bg-gray-200 dark:hover:bg-gray-700"; // Hover

            const finalClasses = `${baseClasses} ${selectedClass}`;


            // 3. Update availability text color codes for dark mode
            let availablity = "text-[13px] text-[#ff0000] dark:text-red-400"; // Unavailable (Red)
            if (container.available === "Learn Now!") {
              availablity = "text-[13px] text-[#00ff00] dark:text-green-400" // Available (Green)
            }

            return (
              <div className={finalClasses} onClick={() => { revealStaticContainer2(container.key) }} key={container.key}>
                <div className="flex justify-center"><img src={imgMap[container.image]} alt={container.alt} className="w-[50px] h-[50px]" /></div>

                {/* 4. Update title text color */}
                <div className="text-[20px] font-bold leading-6 dark:text-white">{container.title}</div>

                {/* 5. Update description text color */}
                <div className="text-[13px] text-[#808080] dark:text-gray-400">{container.text}</div>

                <div className={availablity}>{container.available}</div>
              </div>
            )
          })}
        </div>

        <div className={showStaticContainer2}>
          {staticContainer2.map((container) => {
            // 6. Update text color codes for dark mode
            let availablity = "text-[13px] text-[#ff0000] dark:text-red-400"; // Unavailable (Red)
            if (container.available === "Learn Now!") {
              availablity = "text-[13px] text-[#00ff00] dark:text-green-400" // Available (Green)
            } else if (container.available === "Under Development!") {
              availablity = "text-[13px] text-[#FFAE42] dark:text-yellow-400" // In Development (Orange/Yellow)
            }

            return (
              // 7. Added dark:bg-gray-800 for the default card background, matching the primary cards
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