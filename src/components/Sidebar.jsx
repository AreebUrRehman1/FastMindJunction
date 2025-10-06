import sidebar from "../assets/learn/Sidebar Icon.png";
import darkmode from "../assets/learn/Dark mode Icon.png";
import wph11 from "../assets/learn/WPH11.png";
import logo from "/Logo2.png";

export function Sidebar() {
  return (
    <>
      <div className="w-85 h-screen bg-white border-r border-gray-200 flex-shrink-0 shadow-md">
        <div className="flex flex-col h-full overflow-y-auto">

          <div className="p-4 flex items-center justify-between border-b border-gray-100 sticky top-0 bg-white z-10">
            <div className="flex items-center">
              <span className="mr-2"><img className="w-10 h-10" src={logo} alt="logo" /></span>
              <span className="text-lg font-bold text-gray-600">FastMindJunction</span>
            </div>

            {/* DND/Toggle Button Area */}
            <div className="flex items-center space-x-2 relative bg-gray-100 rounded-lg p-1">
              <button className="p-1.5 hover:bg-gray-200 rounded-lg text-gray-600 transition-colors"><img src={darkmode} className="w-6 h-6 cursor-pointer" alt="Dark mode Icon" /></button>
              <button className="p-1.5 hover:bg-gray-200 rounded-lg text-gray-600 transition-colors"><img src={sidebar} className="w-6 h-6 cursor-pointer" alt="Sidebar Icon" /></button>
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
    </>
  )
}