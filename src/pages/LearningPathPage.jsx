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

export function LearningPathPage() {

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
      setShowStaticContainer2("flex flex-wrap gap-[20px] justify-center my-[50px] mx-auto max-w-[1150px]");
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

      <Header />

      <div className="text-center text-[35px] font-bold mt-[100px]">Select Your Learning Path...</div>

      <div className="flex flex-wrap gap-[20px] justify-center my-[50px] mx-auto max-w-[1150px]">
        {staticContainer.map((container) => {

          const baseClasses = "border-solid border-[0.5px] border-[#a4a4a4] text-center rounded-[10px] p-[10px] w-50 h-40 cursor-pointer";
          const selectedClass = container.key === selectedKey ? "bg-emerald-200" : "hover:bg-gray-200";
          const finalClasses = `${baseClasses} ${selectedClass}`


          let availablity = "text-[13px] text-[#ff0000]";
          if (container.available === "Learn Now!") {
            availablity = "text-[13px] text-[#00ff00]"
          }

          return (
            <div className={finalClasses} onClick={() => { revealStaticContainer2(container.key) }} key={container.key}>
              <div className="flex justify-center"><img src={imgMap[container.image]} alt={container.alt} className="w-[50px] h-[50px]" /></div>
              <div className="text-[20px] font-bold leading-6">{container.title}</div>
              <div className="text-[13px] text-[#808080]">{container.text}</div>
              <div className={availablity}>{container.available}</div>
            </div>
          )
        })}
      </div>

      <div className={showStaticContainer2}>
        {staticContainer2.map((container) => {
          let availablity = "text-[13px] text-[#ff0000]";
          if (container.available === "Learn Now!") {
            availablity = "text-[13px] text-[#00ff00]"
          } else if (container.available === "Under Development!") {
            availablity = "text-[13px] text-[#FFAE42]"
          }

          return (
            <div className=" border-solid border-[0.5px] border-[#a4a4a4] text-center rounded-[10px] p-[10px] w-50 cursor-pointer hover:bg-gray-200" onClick={() => { pageTravel(container.component) }} key={container.component}>
              <div className="text-[20px] font-bold leading-6">{container.component}</div>
              <div className={availablity}>{container.available}</div>
            </div>
          )
        })}
      </div>

      <Footer />
    </>
  )
}