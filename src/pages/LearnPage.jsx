import { useState, useEffect, useRef } from "react";
import { WelcomeTransitionScreen } from "./WelcomeTransitionScreen";
import { Sidebar } from "../components/Sidebar";
import { unitDetailsContainer, topicDetailsContainer } from "../data/learnpage";
import coin from "../assets/learn/Coin.png";


export function LearnPage() {

  const [stage, setStage] = useState('welcome');
  const [activeTopicKey, setActiveTopicKey] = useState(null);

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

  }, [activeTopicKey]); // Dependency array: Re-run effect when 'activeTopicKey' changes


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

      <div className="flex">

        <Sidebar />

        <div className="flex-1">

          {unitDetailsContainer.map((unit, index) => {
            const unitKey = "Unit" + (index + 1);
            const currentTopics = topicDetailsContainer[unitKey];

            return (

              <>
                <div className="my-[40px] mx-auto text-center font-normal text-3xl" key={unit.key}>{unit.Name}</div>
                {currentTopics.map((topic) => {
                  const isVisible = activeTopicKey === topic.key;
                  return (
                    <div className="flex flex-col items-center mt-2" key={topic.key}>

                      <div className="w-[70.5px] h-[70.5px] relative" ref={isVisible ? tooltipRef : null}>

                        <div className={`flex w-[65px] h-[65px] rounded-full items-center justify-center relative transition-colors duration-100 ease-in-out cursor-pointer ${topic.Circle}`} onClick={() => toggleTooltipVisibility(topic.key)}>
                          <img className="w-[48px] h-[48px]" src={coin} alt="coin icon" />
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


        {/* <div className="flex-1">

          <div className="unit-details">

            <div className="my-[40px] mx-auto text-center font-normal text-3xl">Unit 1 - Motion</div>

            <div className="flex flex-col items-center">

              <div className="w-[70.5px] h-[70.5px] relative" ref={tooltipRef}>

                <div className="flex bg-[#06c1fab8] shadow-[0px_9px_1px_#049ac8b8] w-[65px] h-[65px] rounded-full items-center justify-center relative transition-colors duration-100 ease-in-out hover:bg-[#11d8ffb8] hover:shadow-[0px_9px_1px_#069dcbd5] cursor-pointer" onClick={toggleTooltipVisibility}>
                  <img className="w-[48px] h-[48px]" src={coin} alt="coin icon" />
                  {showTooltip === true ? (<div className="w-3 h-3 bg-[#4dd4fd] absolute bottom-[-27px] left-1/2 -translate-x-1/2 rotate-45"></div>) : <></>}
                </div>

                {showTooltip === true ? (
                  <div className="flex flex-col w-[180px] h-auto absolute p-2 pl-3 rounded-[20px] mt-5 z-2 bg-[#4dd4fd]">
                    <div className="text-[17px] font-extrabold text-white mt-[7px]">Equation of Motion</div>
                    <button className="rounded-[10px] w-[65%] h-[30px] border-none bg-white font-bold text-[15px] mt-[10%] mb-[17px] cursor-pointer tracking-[0.5px] shadow-[#8080806] hover:scale-101">Learn Now!</button>
                  </div>
                ) : <></>}

              </div>

            </div>

          </div>
        </div> */}

      </div>


      <div className="mb-[100px]"></div>

    </>
  )

}