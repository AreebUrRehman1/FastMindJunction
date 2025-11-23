// export function DesignTesting() {
// return (
//     // Outer Container: Physics Theme Background
//     <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      
//       {/* Header Section */}
//       <div className="max-w-4xl mx-auto text-center mb-12">
//         <h1 className="text-5xl font-extrabold text-gray-900 sm:text-6xl">
//           Speed vs. Velocity: The Physics Distinction
//         </h1>
//         <p className="mt-4 text-xl text-gray-600">
//           Essential concepts for Edexcel IAL Physics (WPH11/01) — Rate of motion matters!
//         </p>
//       </div>

//       {/* Main Comparison Grid */}
//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        
//         {/* === SPEED CARD (Scalar) === */}
//         <div className="bg-white rounded-2xl shadow-2xl p-8 border-l-8 border-blue-500 hover:shadow-3xl transition duration-300">
//           <div className="flex items-center space-x-4 mb-6">
//             <span className="text-5xl text-blue-600" role="img" aria-label="Speedometer">⏱️</span>
//             <h2 className="text-3xl font-bold text-gray-900">1. Speed (The Scalar)</h2>
//           </div>
          
//           <p className="text-lg text-gray-700 leading-relaxed mb-6">
//             **Speed** is a **scalar quantity**. It only measures **how fast** an object is moving. Its measurement is always positive (or zero).
//           </p>

//           <div className="bg-blue-50 p-6 rounded-lg mb-6">
//             <h3 className="text-xl font-semibold text-blue-700 mb-3">Formula & Calculation</h3>
//             <p className="font-mono text-2xl text-gray-800">
//               $$\textSpeed = \frac\textDistance\textTime$$
//             </p>
//             <p className="mt-2 text-sm text-gray-600">
//               *Uses **Distance** (the total path covered)
//             </p>
//             <p className="mt-1 text-sm text-gray-600">
//               *SI Unit: $m/s$
//             </p>
//           </div>
          
//           <h3 className="text-xl font-semibold text-gray-800 mb-3 border-b pb-1">
//             Key Examples (Magnitude Only)
//           </h3>
//           <ul className="space-y-2 text-gray-700 list-disc list-inside">
//             <li>The reading on your car's **speedometer**.</li>
//             <li>A runner covers $400 \text meters$ in $50 \text seconds$. ($8 \text m/s$)</li>
//             <li>It only cares about the **path length** traveled.</li>
//           </ul>

//         </div>

//         {/* === VELOCITY CARD (Vector) === */}
//         <div className="bg-white rounded-2xl shadow-2xl p-8 border-l-8 border-teal-500 hover:shadow-3xl transition duration-300">
//           <div className="flex items-center space-x-4 mb-6">
//             <span className="text-5xl text-teal-600" role="img" aria-label="Arrow pointing North">⬆️</span>
//             <h2 className="text-3xl font-bold text-gray-900">2. Velocity (The Vector)</h2>
//           </div>
          
//           <p className="text-lg text-gray-700 leading-relaxed mb-6">
//             **Velocity** is a **vector quantity**. It measures **how fast** an object is moving **and** in **what direction**.
//           </p>

//           <div className="bg-teal-50 p-6 rounded-lg mb-6">
//             <h3 className="text-xl font-semibold text-teal-700 mb-3">Formula & Calculation</h3>
//             <p className="font-mono text-2xl text-gray-800">
//               $$\textVelocity = \frac\textDisplacement\textTime$$
//             </p>
//             <p className="mt-2 text-sm text-gray-600">
//               *Uses **Displacement** (the net change in position)
//             </p>
//             <p className="mt-1 text-sm text-gray-600">
//               *SI Unit: $m/s$ (plus direction)
//             </p>
//           </div>

//           <h3 className="text-xl font-semibold text-gray-800 mb-3 border-b pb-1">
//             Key Concepts (Magnitude & Direction)
//           </h3>
//           <ul className="space-y-2 text-gray-700 list-disc list-inside">
//             <li>A plane flying at $500 \text km/h$ **North**.</li>
//             <li>Velocity is **zero** if an object returns to its start point.</li>
//             <li>**Changing velocity** (even if speed is constant) means **Acceleration**.</li>
//           </ul>
//         </div>
//       </div>

//       {/* Visual Example Section */}
//       <div className="max-w-4xl mx-auto mt-16 p-8 bg-white rounded-xl shadow-xl border-t-4 border-gray-300">
//         <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
//           The WPH11/01 Example: The Full Lap
//         </h2>
        
//         <div className="text-center text-lg text-gray-700 mb-6">
//           A runner completes a $400 \text m$ lap in $50 \text s$, starting and ending at the same point.
          
//         </div>

//         <div className="grid grid-cols-2 gap-4 text-center">
//             <div className="p-3 border-r">
//                 <p className="text-xl font-bold text-blue-600">Average Speed</p>
//                 <p className="text-3xl font-mono mt-1">$$ \frac400 \text m50 \text s = 8 \text m/s $$</p>
//                 <p className="text-sm text-gray-500">(Uses Distance)</p>
//             </div>
            
//             <div className="p-3">
//                 <p className="text-xl font-bold text-teal-600">Average Velocity</p>
//                 <p className="text-3xl font-mono mt-1">$$ \frac0 \text m50 \text s = 0 \text m/s $$</p>
//                 <p className="text-sm text-gray-500">(Uses Displacement)</p>
//             </div>
//         </div>
//         <p className="mt-6 text-center text-base text-red-700 font-medium">
//             **Crucial Exam Point:** Speed and Velocity are only equal if the object travels in a straight line without changing direction.
//         </p>
//       </div>

//     </div>
//   );
// }

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
            <Icon name={iconName} size={40} className={`mx-auto mb-4 text-${iconColor}-400`} />
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-400">{description}</p>
        </div>
    );
};

// Main App Component
export const DesignTesting = () => {
    // Custom style for the gradient text effect
    const gradientTextStyle = {
        backgroundImage: 'linear-gradient(90deg, #8b5cf6, #3b82f6)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        color: 'transparent', // Fallback
    };

    return (
        // Use a common class for the body font and background
        <div className="min-h-screen font-sans bg-[#0d0d12] text-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                
                {/* Navigation */}
                <header className="flex justify-between items-center mb-16">
                    <div className="text-2xl font-extrabold tracking-tight">
                        <span style={gradientTextStyle}>ExamFlow</span>
                    </div>
                    <nav>
                        <a href="#features" className="text-sm font-medium text-gray-400 hover:text-white transition duration-150 mr-4 md:mr-6">Features</a>
                        <a href="#paths" className="text-sm font-medium text-gray-400 hover:text-white transition duration-150 mr-4 md:mr-6">Paths</a>
                        <a href="#" className="text-sm font-medium text-white px-3 py-1.5 rounded-lg border border-gray-700 hover:border-blue-500 transition duration-150">Start Now</a>
                    </nav>
                </header>

                {/* 1. Hero Section */}
                <section className="text-center py-16 md:py-24">
                    <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-4">The 100% Free Way to Pass</p>
                    <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold leading-tight tracking-tighter mb-6">
                        <span style={gradientTextStyle} className="block">Master Concepts,</span>
                        <span className="block text-white">Conquer Exams.</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10">
                        Stop memorizing. Start understanding. We break down tough concepts and connect them directly to past paper questions with simple, animated explanations—**all completely free.**
                    </p>
                    <CtaButton>
                        Start Learning Now (It's Free!)
                    </CtaButton>
                </section>

                {/* 2. Methodology Section */}
                <section className="py-16 md:py-24">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">How ExamFlow Works: The 3-Step Success Cycle</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard 
                            iconName="lightbulb" 
                            iconColor="purple" 
                            title="1. Concept Simplified"
                            description="Our simple, animated lessons explain complex topics visually, ensuring deep comprehension from the ground up."
                        />
                        <FeatureCard 
                            iconName="book-open-text" 
                            iconColor="cyan" 
                            title="2. Question Contextualized"
                            description="Immediately see how that concept is applied in real past-paper questions. No more guessing what the examiner wants."
                        />
                        <FeatureCard 
                            iconName="graduation-cap" 
                            iconColor="green" 
                            title="3. Exam Success"
                            description="Build confidence by practicing with explanations that are simple, direct, and focused on maximizing your score."
                        />
                    </div>
                </section>

                {/* 3. Key Features Section */}
                <section id="features" className="py-16 md:py-24">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Built to Make Studying Effortless</h2>
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
                <section id="paths" className="py-16 md:py-24 text-center bg-gray-900 rounded-2xl shadow-2xl p-8">
                    <h2 className="text-4xl font-bold mb-6 text-white">Your Success, Tailored.</h2>
                    <p className="text-xl text-gray-400 max-w-4xl mx-auto mb-12">
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

                {/* 5. Footer CTA */}
                <section className="text-center py-16">
                    <h2 className="text-3xl sm:text-5xl font-extrabold mb-4 text-white">Zero Cost. Maximum Score.</h2>
                    <p className="text-xl text-gray-400 mb-8">It’s time to change how you prepare. Start your customized learning path today.</p>
                    <CtaButton>
                        Unlock All Content Free
                    </CtaButton>
                </section>
                
                {/* Footer */}
                <footer className="text-center py-8 border-t border-gray-800 mt-12">
                    <p className="text-sm text-gray-500">
                        &copy; 2025 ExamFlow Inc. All rights reserved. 
                        <a href="#" className="ml-2 text-gray-500 hover:text-blue-400">Privacy</a> | 
                        <a href="#" className="ml-2 text-gray-500 hover:text-blue-400">Terms</a>
                    </p>
                </footer>
            </div>
        </div>
    );
};