export function DesignTesting() {
return (
    // Outer Container: Physics Theme Background
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-900 sm:text-6xl">
          Speed vs. Velocity: The Physics Distinction
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          Essential concepts for Edexcel IAL Physics (WPH11/01) — Rate of motion matters!
        </p>
      </div>

      {/* Main Comparison Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* === SPEED CARD (Scalar) === */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border-l-8 border-blue-500 hover:shadow-3xl transition duration-300">
          <div className="flex items-center space-x-4 mb-6">
            <span className="text-5xl text-blue-600" role="img" aria-label="Speedometer">⏱️</span>
            <h2 className="text-3xl font-bold text-gray-900">1. Speed (The Scalar)</h2>
          </div>
          
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            **Speed** is a **scalar quantity**. It only measures **how fast** an object is moving. Its measurement is always positive (or zero).
          </p>

          <div className="bg-blue-50 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-semibold text-blue-700 mb-3">Formula & Calculation</h3>
            <p className="font-mono text-2xl text-gray-800">
              $$\textSpeed = \frac\textDistance\textTime$$
            </p>
            <p className="mt-2 text-sm text-gray-600">
              *Uses **Distance** (the total path covered)
            </p>
            <p className="mt-1 text-sm text-gray-600">
              *SI Unit: $m/s$
            </p>
          </div>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3 border-b pb-1">
            Key Examples (Magnitude Only)
          </h3>
          <ul className="space-y-2 text-gray-700 list-disc list-inside">
            <li>The reading on your car's **speedometer**.</li>
            <li>A runner covers $400 \text meters$ in $50 \text seconds$. ($8 \text m/s$)</li>
            <li>It only cares about the **path length** traveled.</li>
          </ul>

        </div>

        {/* === VELOCITY CARD (Vector) === */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border-l-8 border-teal-500 hover:shadow-3xl transition duration-300">
          <div className="flex items-center space-x-4 mb-6">
            <span className="text-5xl text-teal-600" role="img" aria-label="Arrow pointing North">⬆️</span>
            <h2 className="text-3xl font-bold text-gray-900">2. Velocity (The Vector)</h2>
          </div>
          
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            **Velocity** is a **vector quantity**. It measures **how fast** an object is moving **and** in **what direction**.
          </p>

          <div className="bg-teal-50 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-semibold text-teal-700 mb-3">Formula & Calculation</h3>
            <p className="font-mono text-2xl text-gray-800">
              $$\textVelocity = \frac\textDisplacement\textTime$$
            </p>
            <p className="mt-2 text-sm text-gray-600">
              *Uses **Displacement** (the net change in position)
            </p>
            <p className="mt-1 text-sm text-gray-600">
              *SI Unit: $m/s$ (plus direction)
            </p>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-3 border-b pb-1">
            Key Concepts (Magnitude & Direction)
          </h3>
          <ul className="space-y-2 text-gray-700 list-disc list-inside">
            <li>A plane flying at $500 \text km/h$ **North**.</li>
            <li>Velocity is **zero** if an object returns to its start point.</li>
            <li>**Changing velocity** (even if speed is constant) means **Acceleration**.</li>
          </ul>
        </div>
      </div>

      {/* Visual Example Section */}
      <div className="max-w-4xl mx-auto mt-16 p-8 bg-white rounded-xl shadow-xl border-t-4 border-gray-300">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
          The WPH11/01 Example: The Full Lap
        </h2>
        
        <div className="text-center text-lg text-gray-700 mb-6">
          A runner completes a $400 \text m$ lap in $50 \text s$, starting and ending at the same point.
          
        </div>

        <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-3 border-r">
                <p className="text-xl font-bold text-blue-600">Average Speed</p>
                <p className="text-3xl font-mono mt-1">$$ \frac400 \text m50 \text s = 8 \text m/s $$</p>
                <p className="text-sm text-gray-500">(Uses Distance)</p>
            </div>
            
            <div className="p-3">
                <p className="text-xl font-bold text-teal-600">Average Velocity</p>
                <p className="text-3xl font-mono mt-1">$$ \frac0 \text m50 \text s = 0 \text m/s $$</p>
                <p className="text-sm text-gray-500">(Uses Displacement)</p>
            </div>
        </div>
        <p className="mt-6 text-center text-base text-red-700 font-medium">
            **Crucial Exam Point:** Speed and Velocity are only equal if the object travels in a straight line without changing direction.
        </p>
      </div>

    </div>
  );
}