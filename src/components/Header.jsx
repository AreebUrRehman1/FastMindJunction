import logo from '/Logo.png'

export function Header() {
  return (
    <div className="fixed top-0 right-0 left-0 z-20 dark:bg-gray-800/90 backdrop-blur-sm shadow-xl dark:border-b dark:border-gray-700">

      {/* Main container: Responsive padding, centers contents, allows elements to wrap/hide */}
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 py-3 md:py-2">

        {/* 1. Logo and Title*/}
        <div className="flex items-center flex-shrink-0">
          <img className="w-8 h-8 rounded-lg mr-2 flex items-center justify-center text-white font-black text-sm" src={logo} />
          <div className="font-bold text-xl text-gray-700 dark:text-white">FASTMINDJUNCTION</div>
        </div>

        {/* 2. Quote (Hidden on small devices, visible on medium and up) */}
        <div className="hidden md:block text-sm text-slate-400 italic animate-pulse mx-4 flex-grow text-center">
          The beautiful thing about learning is that nobody can take it away from you
        </div>

        {/* 3. Site Language (Hidden on small devices, visible on medium and up) */}
        <div className="hidden md:block text-zinc-400 font-extrabold text-xs ml-4 flex-shrink-0">
          SITE LANGUAGE: ENGLISH
        </div>

      </div>

    </div>
  )
}