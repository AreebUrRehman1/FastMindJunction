import logo from '/Logo.png'
import darkmode from "../assets/learn/Dark mode Icon.png";
import lightmode from "../assets/learn/Light mode Icon.png";

export function LessonHeader({darkModeControl, darkMode}) {
  return (
    <div className={`${darkMode ? "dark" : ""} fixed top-0 right-0 left-0 z-20 dark:bg-slate-900/80 border-slate-800 backdrop-blur-sm shadow-xl dark:border-b dark:border-gray-700`}>

      {/* Main container: Responsive padding, centers contents, allows elements to wrap/hide */}
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 py-3 md:py-2">

        {/* 1. Logo and Title*/}
        <div className="flex items-center flex-shrink-0">
          <img className="w-8 h-8 rounded-lg mr-2 flex items-center justify-center text-white font-black text-sm" src={logo} />
          <div className="font-bold text-xl text-gray-700 dark:text-white">FASTMINDJUNCTION</div>
        </div>

        {/* 3. Site Language and Icon (Hidden on small devices, visible on medium and up) */}
          <button className="p-1.5 hover:bg-gray-200 rounded-lg text-gray-600 transition-colors dark:hover:bg-gray-700" onClick={darkModeControl}><img src={darkMode ? darkmode : lightmode} className="w-6 h-6 cursor-pointer" alt="Dark mode Icon" /></button>
      </div>

    </div>
  )
}