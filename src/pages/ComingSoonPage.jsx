import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useNavigate } from "react-router";


export function ComingSoonPage({ darkMode, darkModeControl }) {
  let navigate = useNavigate()

  return (
    <>
      <title>Coming Soon!</title>

      <Header darkMode={darkMode} darkModeControl={darkModeControl} />

      {/* Main container wrapper to set the dark mode background for the whole page area */}
      <div className={`${darkMode ? "dark" : ""} font-sans dark:bg-[#0d0d12] pt-25 pb-13`}>

        {/* Card Container: Apply dark mode styles to the card itself */}
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 max-w-3xl mx-auto text-center 
                        bg-white dark:bg-[#1a1a25] rounded-xl shadow-lg dark:shadow-blue-500/10 border border-gray-200 dark:border-[#2d2d3d]">

          {/* SVG Icon: Keep color vibrant */}
          <svg className="w-20 h-20 text-blue-500 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>

          {/* Title: Adjust text color for dark mode */}
          <h2 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            The Future is Almost Here!
          </h2>

          {/* Description Paragraph: Adjust text color for dark mode */}
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-prose">
            We're working hard to perfect the <strong>structured paths</strong> and <strong>multimedia content</strong> for this section. We want to ensure it meets the FastMindJunction standard of excellence before launch.
          </p>

          {/* Sub-Text/Callout: Adjust text color and border for dark mode */}
          <p className="text-lg text-blue-600 dark:text-indigo-400 font-semibold border-b-2 border-blue-200 dark:border-indigo-700 pb-1">
            Thank you for your patience — stay tuned for the official release!
          </p>

          {/* Button: Use a more prominent, styled button similar to HomePage CTA */}
          <button className="text-lg font-bold py-3 px-8 rounded-xl mt-8 cursor-pointer
                             transition-all duration-300 ease-in-out
                             bg-gradient-to-r from-purple-500 to-blue-500 text-white
                             shadow-lg shadow-blue-500/50 
                             hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-400/60"
            onClick={() => { navigate(-1) }}>
            Return Back
          </button>

        </div>
      </div>

      <Footer darkMode={darkMode} />
    </>
  );
}