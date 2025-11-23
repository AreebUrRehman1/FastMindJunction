import { Header } from "../components/Header"
import { Footer } from "../components/Footer";
import { Link } from "react-router";

export function HomePage() {

  const getIconPath = (name) => {
    switch (name) {
      case 'lightbulb': return <path d="M15 14c.2-1 .6-3 2-3s4.5 2 5 6" />;
      case 'book-open-text': return <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM12 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3h-11z" />;
      case 'graduation-cap': return <path d="M22 10v6m0 0l-10-6-10 6M3 14v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6M12 12l10-6-10-6L2 6l10 6z" />;
      case 'film': return (
        <>
          <rect x="2" y="2" width="20" height="20" rx="2" ry="2" />
          <path d="M7 2v20M17 2v20M2 12h20M2 7h20M2 17h20" />
        </>
      );
      case 'file-check': return (
        <>
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
          <polyline points="10 15 12 17 16 13" />
        </>
      );
      case 'activity': return <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />;
      case 'smartphone': return (
        <>
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
          <path d="M12 18h.01" />
        </>
      );
      default: return <circle cx="12" cy="12" r="10" />;
    }
  };

  const Icon = ({ name, size = 24, className = '', color = 'currentColor' }) => {
    return (
      <div className={`flex items-center justify-center ${className}`} style={{ width: size, height: size, color: color }}>
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {getIconPath(name)}
        </svg>
      </div>
    );
  };

  // Custom component to handle the CTA styles using pure Tailwind
  const CtaButton = ({ children, className = '' }) => (
    <button className={`
        text-white font-bold py-4 px-10 rounded-xl text-xl
        transition-all duration-300 ease-in-out
        bg-gradient-to-r from-purple-500 to-blue-500 
        shadow-lg shadow-blue-500/50 
        hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-400/60
        ${className}
    `}>
      {children}
    </button>
  );

  const FeatureCard = ({ iconName, iconColor, title, description }) => {
    return (
      <div className="
            p-6 rounded-xl text-center 
            bg-[#1a1a25] border border-[#2d2d3d] 
            transition-all duration-300 
            hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10
        ">
        <Icon name={iconName} size={40} className={`mx-auto mb-4 text-black`} />
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    );
  };

  const gradientTextStyle = {
    backgroundImage: 'linear-gradient(90deg, #8b5cf6, #3b82f6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    color: 'transparent', // Fallback
  };


  return (
    <>
      <title>Home</title>
      <Header />

      <div className="min-h-screen font-sans dark:bg-[#0d0d12] text-gray-200">
        <div className="flex flex-col items-center px-4 sm:px-6 lg:px-8 py-8">


          {/* 1. Hero Section */}
          <section className="text-center py-16 md:py-24">
            <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-4">The 100% Free Way to Pass</p>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold leading-tight tracking-tighter mb-6">
              <span style={gradientTextStyle} className="block">Master Concepts,</span>
              <span className="block text-gray-700 dark:text-white">Conquer Exams.</span>
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-400 max-w-3xl mx-auto mb-10">
              Stop memorizing. Start understanding. We break down tough concepts and connect them directly to past paper questions with simple, animated explanations — <strong>all completely free.</strong>
            </p>
            <Link to={"/mode"}><CtaButton>
              Start Learning Now (It's Free!)
            </CtaButton> </Link>
          </section>

          {/* 2. Methodology Section */}
          <section className="py-16 md:py-24">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-700 dark:text-inherit">How ExamFlow Works: The 3-Step Success Cycle</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                iconName="lightbulb"
                title="1. Concept Simplified"
                description="Our simple, animated lessons explain complex topics visually, ensuring deep comprehension from the ground up."
              />
              <FeatureCard
                iconName="book-open-text"
                title="2. Question Contextualized"
                description="Immediately see how that concept is applied in real past-paper questions. No more guessing what the examiner wants."
              />
              <FeatureCard
                iconName="graduation-cap"
                title="3. Exam Success"
                description="Build confidence by practicing with explanations that are simple, direct, and focused on maximizing your score."
              />
            </div>
          </section>

          {/* 3. Key Features Section */}
          <section id="features" className="py-16 md:py-24">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-700 dark:text-inherit">Built to Make Studying Effortless</h2>
            <div className="grid lg:grid-cols-2 gap-12 items-center">

              <div className="p-6 rounded-xl bg-[#1a1a25] border border-[#2d2d3d] flex items-start transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10">
                <Icon name="film" size={32} className="text-blue-400 flex-shrink-0 mr-4 mt-1" />
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Animated, Bite-Sized Lessons</h3>
                  <p className="text-gray-400">Forget long, boring lectures. Our content is delivered in short, dynamic videos and step-by-step animations that simplify the most difficult topics.</p>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-[#1a1a25] border border-[#2d2d3d] flex items-start transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10">
                <Icon name="file-check" size={32} className="text-orange-400 flex-shrink-0 mr-4 mt-1" />
                <div>
                  <h3 className="text-2xl font-semibold mb-2">The Ultimate Past Paper Library</h3>
                  <p className="text-gray-400">Access thousands of categorized and annotated past paper questions, complete with simple, high-scoring answer explanations.</p>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-[#1a1a25] border border-[#2d2d3d] flex items-start transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10">
                <Icon name="activity" size={32} className="text-pink-400 flex-shrink-0 mr-4 mt-1" />
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Real-Time Progress Metrics</h3>
                  <p className="text-gray-400">Know exactly where you stand. Track your mastery of individual concepts and exam skills, ensuring targeted study time.</p>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-[#1a1a25] border border-[#2d2d3d] flex items-start transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10">
                <Icon name="smartphone" size={32} className="text-emerald-400 flex-shrink-0 mr-4 mt-1" />
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Study Anywhere, Anytime</h3>
                  <p className="text-gray-400">Seamlessly switch between devices. Your personalized learning path is always synced, so you can study on the bus or at your desk.</p>
                </div>
              </div>

            </div>
          </section>

          {/* 4. Targeted Learning Paths */}
          <section id="paths" className="py-16 md:py-24 text-center dark:bg-gray-900  rounded-2xl dark:shadow-2xl p-8">
            <h2 className="text-4xl font-bold mb-6 dark:text-white text-gray-700 ">Your Success, Tailored.</h2>
            <p className="text-xl dark:text-gray-400 max-w-4xl mx-auto mb-12 text-gray-700">
              We understand that every student learns differently. ExamFlow uses adaptive learning paths to focus only on the topics you haven't mastered yet.
            </p>
            <div className="grid md:grid-cols-3 gap-8">

              <div className="p-6 bg-[#1a1a25] rounded-xl border border-indigo-700">
                <span className="text-4xl font-extrabold text-indigo-400 mb-2 block">1. Assess</span>
                <p className="text-gray-300">Quickly identify your weak points using short diagnostic quizzes based on real exam patterns.</p>
              </div>

              <div className="p-6 bg-[#1a1a25] rounded-xl border border-cyan-700">
                <span className="text-4xl font-extrabold text-cyan-400 mb-2 block">2. Learn</span>
                <p className="text-gray-300">Receive targeted animated lessons, focusing only on the concepts you need to close your knowledge gaps.</p>
              </div>

              <div className="p-6 bg-[#1a1a25] rounded-xl border border-green-700">
                <span className="text-4xl font-extrabold text-green-400 mb-2 block">3. Prove</span>
                <p className="text-gray-300">Practice the concept with curated past paper questions until you achieve 100% mastery. Exam ready!</p>
              </div>
            </div>
          </section>
        </div>
        <div className="bg-linear-to-r from-[#8b5cf6] to-[#3b82f6] py-20 mt-16 text-center shadow-2xl">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-5xl font-extrabold text-white mb-4">Ready to Ace Your Exams?</h2>
            <p className="text-xl text-blue-100 mb-10">Get instant access to structured courses, practice tests, and expert-led content.</p>
            <Link to="/mode" className="inline-block py-4 px-10 bg-white text-blue-600 font-bold text-xl rounded-xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:bg-blue-50">Learn Now!</Link>
          </div>
        </div>
      </div>


      <Footer />
    </>
  )
}