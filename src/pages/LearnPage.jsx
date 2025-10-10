import { useState, useEffect, useRef } from "react";
import { WelcomeTransitionScreen } from "./WelcomeTransitionScreen";
import { Sidebar } from "../components/Sidebar";
import { unitDetailsContainer, topicDetailsContainer } from "../data/learnpage";
import hat from "../assets/learn/Graduation Hat.png"


export function LearnPage() {

  const [stage, setStage] = useState('welcome');
  const [activeTopicKey, setActiveTopicKey] = useState(null);
  const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem("colorScheme")) || false);

  const tooltipRef = useRef(null);


  // useEffect to handle clicks outside the tooltip
  useEffect(() => {

    // Function to check if the click is outside the ref'd element
    const handleClickOutside = (event) => {
      // If the tooltip is visible AND the click is NOT on the tooltip/coin
      if (activeTopicKey && tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setActiveTopicKey(null);
      }
    };

    // Attach the event listener to the document body
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener when the component unmounts or dependencies change
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

  }, [activeTopicKey]);

  //For Tab Logo
  useEffect(() => {
    const faviconUrl = "/Logo2.png";

    let link = document.querySelector("link[rel~='icon']") || document.querySelector("link[rel='shortcut icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      link.type = 'image/png';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = faviconUrl;

  }, []);

  if (stage === 'welcome') {
    const screenText = "Awesome! Let's Begin!"
    return <WelcomeTransitionScreen screenText={screenText} stage={stage} setStage={setStage} />;
  }

  function toggleTooltipVisibility(key) {
    // If the clicked key is already active, set state to null (close it).
    // Otherwise, set the new key as active (open it).
    setActiveTopicKey(prevKey => prevKey === key ? null : key);
  }

  return (
    <>
      <title>Component Name</title>

      <div className={`flex relative ${darkMode ? "dark" : ""}`}>

        <Sidebar darkMode={darkMode} setDarkMode={setDarkMode}/>

        <div className="flex-1 pb-20 pl-[333.25px] pr-[333.25px] dark:bg-gray-950">

          {unitDetailsContainer.map((unit, index) => {
            const unitKey = "Unit" + (index + 1);
            const currentTopics = topicDetailsContainer[unitKey];

            return (

              <>
                <div className="my-[40px] mx-auto text-center font-normal text-3xl dark:text-gray-100" key={unit.key}>{unit.Name}</div>
                {currentTopics.map((topic) => {
                  const isVisible = activeTopicKey === topic.key;
                  return (
                    <div className="flex flex-col items-center mt-2" key={topic.key}>

                      <div className="w-[70.5px] h-[70.5px] relative" ref={isVisible ? tooltipRef : null}>

                        <div className={`flex w-[65px] h-[65px] rounded-full items-center justify-center relative transition-colors duration-100 ease-in-out cursor-pointer ${topic.Circle}`} onClick={() => toggleTooltipVisibility(topic.key)}>
                          <img className="w-[48px] h-[48px]" src={hat} alt="coin icon" />
                          {isVisible ? (<div className={`w-3 h-3 absolute bottom-[-27px] left-1/2 -translate-x-1/2 rotate-45 z-2 ${topic.ToolTipColor}`}></div>) : <></>}
                        </div>

                        {isVisible ? (
                          <div className={`flex flex-col w-[180px] h-auto absolute p-2 pl-3 rounded-[20px] mt-5 z-2 ${topic.ToolTipColor} ${topic.ToolTipMove ? topic.ToolTipMove : ""}`}>
                            <div className="text-[17px] font-extrabold text-white mt-[7px]">{topic.Name}</div>
                            <button className="rounded-[10px] w-[65%] h-[30px] border-none bg-white font-bold text-[15px] mt-[10%] mb-[17px] cursor-pointer tracking-[0.5px] shadow-[#8080806] hover:scale-101">Learn Now!</button>
                          </div>
                        ) : null}

                      </div>

                    </div>
                  )
                })}
              </>
            )

          })}

        </div>

      </div>
    </>
  )

}