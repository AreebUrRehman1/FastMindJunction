import { useEffect } from "react";

export function WelcomeTransitionScreen({ screenText, stage, setStage }) {

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

  // Use inline <style> to define keyframe animations, 
  // which Tailwind does not provide by default for complex animations.
  return (
    <>
      <title>Loading...</title>
      <style>
        {`
          /* Keyframe for text entering the screen */
          @keyframes fade-in-up {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          /* Keyframe for the entire screen overlay dissolving */
          @keyframes zoom-fade-out {
            0% { opacity: 1; transform: scale(1); }
            80% { opacity: 1; transform: scale(1.05); }
            100% { opacity: 0; visibility: hidden; transform: scale(1.1); }
          }
          /* Keyframe for the progress bar animation */
          @keyframes progress {
            from { transform: translateX(-100%); }
            to { transform: translateX(0); }
          }

          .welcome-animation-container {
            /* Applies the dissolving animation (2.5s total duration) */
            animation: zoom-fade-out 2.5s forwards;
          }
          .welcome-text {
            /* Applies the text entrance animation (0.5s duration, 0.5s delay) */
            animation: fade-in-up 0.5s ease-out 0.5s forwards;
          }
        `}
      </style>
      <div className="fixed inset-0 bg-[#515b69] z-50 flex flex-col items-center justify-center welcome-animation-container">

        {/* Animated Brand Logo/Text */}
        <div className="text-white text-3xl md:text-5xl font-extrabold tracking-wider opacity-0 welcome-text">
          FastMindJunction
        </div>

        {/* Welcome Message (Delayed Entrance) */}
        <div className="text-white text-[15px] md:text-xl mt-4 opacity-0 welcome-text" style={{ animationDelay: '0.5s' }}>
          {screenText}
        </div>

        {/* Simple Loading Bar */}
        <div className="w-64 h-1 bg-inherit border-1 border-white rounded-full mt-10 overflow-hidden">
          {/* Progress bar animation runs for 2.5s to match the container's duration */}
          <div className="h-full bg-white animate-[progress_2.5s_ease-out_forwards]" style={{ transform: 'translateX(-100%)' }}></div>
        </div>

      </div>
    </>
  );
};