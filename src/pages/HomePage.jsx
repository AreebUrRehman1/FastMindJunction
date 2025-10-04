import { Header } from "../components/Header"
import { Footer } from "../components/Footer";
import { Link } from "react-router";
import { staticContainer } from "../data/homepage-container"
import idea from '../assets/home/Idea.png';
import learning from '../assets/home/Learning.png';
import path from '../assets/home/Path.png';
import start from '../assets/home/Start.png'

export function HomePage() {

  const imageMap = {
    idea,
    learning,
    path
  }

  return (
    <>

      <title>Home</title>
      <Header />

      <div className="flex my-15 mx-auto items-center justify-between p-10">
        <div className="flex-1 flex justify-center">
          <img src={start} alt="Start" className="mix-blend-multiply w-150 h-150" />
        </div>
        <div className="flex-1">
          <h1 className="text-[2.5rem]/[2.5rem] font-bold text-stone-800">The smarter way to study and succeed.</h1>
          <p className="mt-5 text-[1.2rem] text-gray-600">Practice. Learn. Achieve. Join thousands of students using FastMindJunction to master exam topics.</p>
          <div className="mt-8">
            <Link to="/mode" className="text-center py-3.5 px-5 bg-blue-400 border-solid font-bold text-white rounded-[9px] hover:bg-blue-500">Get Started</Link>
          </div>
        </div>
      </div>

      {staticContainer.map((container) => {
        if (container.side === "left") {
          return (
            <div className="flex my-10 mx-auto p-10 items-center justify-between" key={container.key}>
              <div className="flex-1 flex justify-center">
                <img src={imageMap[container.image]} alt={container.image} className="w-150 h-150 mix-blend-multiply" />
              </div>

              <div className="flex-1 font-bold text-center">
                <div className="text-[#1a2938] text-[1.4rem] mt-[1.5em] mb-[1rem]">{container.title}</div>
                <div className=" text-[1.1rem] leading-[1.6] text-justify">{container.body}</div>
              </div>
            </div>
          )
        }

        if (container.side === "right") {
          return (
            <div className="flex flex-row-reverse my-10 mx-auto p-10 items-center justify-between" key={container.key}>
              <div className="flex-1 flex justify-center">
                <img src={imageMap[container.image]} alt={container.image} className="w-150 h-150 mix-blend-multiply" />
              </div>

              <div className="flex-1 font-bold text-center">
                <div className="text-[#1a2938] text-[1.4rem] mt-[1.5em] mb-[1rem]">{container.title}</div>
                <div className=" text-[1.1rem] leading-[1.6] text-justify">{container.body}</div>
              </div>
            </div>
          )
        }

      })}

      <div className="bg-blue-600 py-20 mt-20 text-center shadow-2xl">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-5xl font-extrabold text-white mb-4">Ready to Ace Your Exams?</h2>
          <p className="text-xl text-blue-100 mb-10">Get instant access to structured courses, practice tests, and expert-led content.</p>
          <Link to="/mode" className="inline-block py-4 px-10 bg-white text-blue-600 font-bold text-xl rounded-xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:bg-blue-50">Learn Now!</Link>
        </div>
      </div>


      <Footer />
    </>
  )
}