export function Footer({darkMode}) {
  return (
    <footer className={`${darkMode ? "dark" : ""} bg-gray-600 dark:bg-gray-800`}>
      <div className="max-w-7xl mx-auto flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8">

        {/* Links Section: Stacks on mobile, center-aligned start on desktop */}
        <div className="flex flex-wrap justify-center sm:justify-center gap-x-16 gap-y-10 sm:gap-x-20 md:gap-x-28">

          {/* Column 1: About Us */}
          <div className="flex flex-col min-w-[150px]">
            <div className="text-white text-2xl font-bold mb-5">About Us</div>
            <div className="text-gray-300 text-base mt-3 hover:text-white cursor-pointer transition-colors duration-150">Who we are</div>
            <div className="text-gray-300 text-base mt-3 hover:text-white cursor-pointer transition-colors duration-150">Purpose</div>
            <div className="text-gray-300 text-base mt-3 hover:text-white cursor-pointer transition-colors duration-150">Commitment</div>
            <div className="text-gray-300 text-base mt-3 hover:text-white cursor-pointer transition-colors duration-150">FAQ</div>
          </div>

          {/* Column 2: Course */}
          <div className="flex flex-col min-w-[150px]">
            <div className="text-white text-2xl font-bold mb-5">Course</div>
            <div className="text-gray-300 text-base mt-3 hover:text-white cursor-pointer transition-colors duration-150">Physics</div>
            <div className="text-gray-300 text-base mt-3 hover:text-white cursor-pointer transition-colors duration-150">Biology</div>
            <div className="text-gray-300 text-base mt-3 hover:text-white cursor-pointer transition-colors duration-150">Chemistry</div>
            <div className="text-gray-300 text-base mt-3 hover:text-white cursor-pointer transition-colors duration-150">IT</div>
            <div className="text-gray-300 text-base mt-3 hover:text-white cursor-pointer transition-colors duration-150">Mathematics</div>
          </div>

          {/* Column 3: Social Media */}
          <div className="flex flex-col min-w-[150px]">
            <div className="text-white text-2xl font-bold mb-5">Social Media</div>
            <div className="text-gray-300 text-base mt-3 hover:text-white cursor-pointer transition-colors duration-150">Youtube</div>
            <div className="text-gray-300 text-base mt-3 hover:text-white cursor-pointer transition-colors duration-150">Twitter</div>
          </div>

        </div>

        {/* Copyright Section */}
        <div className="mt-12 pt-5 border-t border-gray-700/80">
          <div className="text-center text-gray-300 text-sm">© Copyright 2024-2025 FastMindJunction. All Rights Reserved.</div>
        </div>

      </div>
    </footer>
  )
}