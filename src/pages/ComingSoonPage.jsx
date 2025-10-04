import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useNavigate } from "react-router";


export function ComingSoonPage() {
    let navigate = useNavigate()

  return (
    <>
      <title>Coming Soon!</title>

      <Header />

      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 max-w-3xl mx-auto text-center bg-white rounded-xl shadow-lg my-25">

        <svg className="w-20 h-20 text-blue-500 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>

        <h2 className="text-5xl font-extrabold text-gray-900 mb-4">
          The Future is Almost Here!
        </h2>

        <p className="text-xl text-gray-600 mb-8 max-w-prose">
          We're working hard to perfect the <strong>structured paths</strong> and <strong>multimedia content</strong> for this section. We want to ensure it meets the FastMindJunction standard of excellence before launch.
        </p>

        <p className="text-lg text-blue-600 font-semibold border-b-2 border-blue-200 pb-1">
          Thank you for your patience — stay tuned for the official release!
        </p>

        <button className="text-lg bg-gray-500 text-white font-semibold px-2 py-1 rounded-[12px] mt-8 cursor-pointer" onClick={() => {navigate(-1)}}>
          Return Back
        </button>

      </div>

      <Footer />
    </>
  );
}