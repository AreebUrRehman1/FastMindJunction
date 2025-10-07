import { useState } from "react";
import sidebar from "../assets/learn/Sidebar Icon.png";
import sidebarclosed from "../assets/learn/Sidebar Closed Icon.png";
import darkmode from "../assets/learn/Dark mode Icon.png";
import lightmode from "../assets/learn/Light mode Icon.png";
import wph11 from "../assets/learn/WPH11.png";
import logo from "/Logo2.png";

export function Sidebar({darkMode, setDarkMode}) {

  const [showSidebar, setShowSideBar] = useState(false);

  function fullSidebar() {
    setShowSideBar(prev => !prev);
  }

  function darkModeControl() {
    setDarkMode(!darkMode);
    localStorage.setItem("colorScheme", !darkMode)
  }

  return (
    <>
      <div className="fixed top-0 bottom-0 bg-white border-r border-gray-200 flex-shrink-0 shadow-md dark:bg-gray-900">
        <div className="flex flex-col h-full overflow-y-auto">

          <div className="p-4 flex items-center justify-between border-b border-gray-100 sticky top-0 bg-white z-10 dark:bg-gray-900 dark:border-gray-700">
            <div className="flex items-center">
              <span className="mr-2"><img className="w-10 h-10" src={logo} alt="logo" /></span>
              {showSidebar ? (
              <span className="text-lg font-bold text-gray-600 mr-5 dark:text-gray-100">FastMindJunction</span>
              ) : null}
            </div>

            {/* DND/Toggle Button Area */}
            <div className="flex items-center space-x-2 relative bg-gray-100 rounded-lg p-1 dark:bg-gray-800">
              {showSidebar ? (
                <button className="p-1.5 hover:bg-gray-200 rounded-lg text-gray-600 transition-colors dark:hover:bg-gray-700" onClick={darkModeControl}><img src={darkMode ? lightmode : darkmode} className="w-6 h-6 cursor-pointer" alt="Dark mode Icon" /></button>
              ) : null}
              <button className="p-1.5 hover:bg-gray-200 rounded-lg text-gray-600 transition-colors dark:hover:bg-gray-700" onClick={fullSidebar}><img src={showSidebar ? sidebar : sidebarclosed} className="w-6 h-6 cursor-pointer" alt="Sidebar Icon" /></button>
            </div>
          </div>

          <div className="flex flex-col py-2">
            {showSidebar ? (
            <div className="text-gray-400 font-semibold text-center mt-2 text-[18px]">Current</div>
            ) : null}
            <div className={`flex items-center p-2.5 mx-2 rounded-lg cursor-pointer transition-colors text-sm font-medium bg-gray-100 text-gray-900 dark:bg-gray-800 ${showSidebar === false ? "justify-center" : ""}`}>
              <img className={`w-7 h-7 z ${showSidebar ? "mr-5" : ""}`} src={wph11} alt="WPH11 Icon" />
              {showSidebar ? (
              <span className="w-5 h-5 flex-shrink-0 mr-3 dark:text-gray-100">WPH11</span>
              ) : null}
            </div>
          </div>

        </div>
      </div>
    </>
  )
}