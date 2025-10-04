import logo from '/Logo.png'

export function Header() {
  return (
    <>
      <div className="fixed top-0 right-0 left-0 z-10 bg-littlefade">

        <div className="flex flex-column justify-between mx-12 my-1 items-center">

          <div className="flex flex-row items-center">
            <div><img src={logo} className="w-15 h-15" alt="logo" /></div>
            <div className="font-bold ml-3 text-[22px]">FASTMINDJUNCTION</div>
          </div>

          <div className="text-[19px] text-slate-500 italic animate-pulse">The beautiful thing about learning is that nobody can take it away from you</div>

          <div className="text-zinc-400 font-extrabold">SITE LANGUAGE: ENGLISH</div>

        </div>

      </div>
    </>
  )
}