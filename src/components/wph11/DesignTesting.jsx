export function DesignTesting() {
  return (
    <>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl">
            Understanding Scalar vs. Vector Quantities
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            The fundamental difference in physics: Magnitude vs. Magnitude & Direction.
          </p>
        </div>

        {/* Main Comparison Section */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 gap-10 md:grid-cols-2">

          {/* === SCALAR CARD === */}
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden p-8 border-t-8 border-indigo-600 transform transition duration-500 hover:scale-[1.02]">
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-5xl text-indigo-600" role="img" aria-label="Scale">📏</span>
              <h2 className="text-3xl font-bold text-gray-900">Scalar Quantities</h2>
            </div>

            <div className="mb-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                A **Scalar Quantity** is completely defined by its **magnitude** (size or amount) alone. No direction is necessary to describe it fully.
              </p>
            </div>

            {/* Key Feature */}
            <div className="bg-indigo-50 p-4 rounded-lg mb-6">
              <p className="text-xl font-semibold text-indigo-700">
                Key Feature: Magnitude ONLY
              </p>
            </div>

            <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
              Common Examples
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center">
                <span className="text-green-500 text-lg mr-2">✅</span>
                **Mass** (e.g., 5 kg)
              </li>
              <li className="flex items-center">
                <span className="text-green-500 text-lg mr-2">✅</span>
                **Distance** (e.g., 10 meters)
              </li>
              <li className="flex items-center">
                <span className="text-green-500 text-lg mr-2">✅</span>
                **Time** (e.g., 60 seconds)
              </li>
              <li className="flex items-center">
                <span className="text-green-500 text-lg mr-2">✅</span>
                **Speed** (e.g., 50 km/h)
              </li>
              <li className="flex items-center">
                <span className="text-green-500 text-lg mr-2">✅</span>
                **Temperature** (e.g., 20°C)
              </li>
            </ul>

          </div>

          {/* === VECTOR CARD === */}
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden p-8 border-t-8 border-pink-600 transform transition duration-500 hover:scale-[1.02]">
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-5xl text-pink-600" role="img" aria-label="Arrow">➡️</span>
              <h2 className="text-3xl font-bold text-gray-900">Vector Quantities</h2>
            </div>

            <div className="mb-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                A **Vector Quantity** requires both its **magnitude** and its **direction** to be fully defined. They are often represented by arrows.
              </p>
            </div>

            {/* Key Feature */}
            <div className="bg-pink-50 p-4 rounded-lg mb-6">
              <p className="text-xl font-semibold text-pink-700">
                Key Feature: Magnitude AND Direction
              </p>
            </div>

            <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
              Common Examples
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center">
                <span className="text-green-500 text-lg mr-2">✅</span>
                **Displacement** (e.g., 10 meters North)
              </li>
              <li className="flex items-center">
                <span className="text-green-500 text-lg mr-2">✅</span>
                **Velocity** (e.g., 50 km/h East)
              </li>
              <li className="flex items-center">
                <span className="text-green-500 text-lg mr-2">✅</span>
                **Force** (e.g., 10 N Downwards)
              </li>
              <li className="flex items-center">
                <span className="text-green-500 text-lg mr-2">✅</span>
                **Acceleration** (e.g., 9.8 m/s² Down)
              </li>
              <li className="flex items-center">
                <span className="text-green-500 text-lg mr-2">✅</span>
                **Momentum** (Mass x Velocity)
              </li>
            </ul>

          </div>
        </div>

        {/* Visual Analogy Section (Placeholder for simple animation/visual) */}
        <div className="max-w-4xl mx-auto mt-16 p-8 bg-white rounded-xl shadow-xl">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
            Visual Analogy: Distance vs. Displacement
          </h2>
          <div className="flex flex-col md:flex-row justify-around items-center space-y-4 md:space-y-0 text-center">

            {/* Distance Analogy */}
            <div className="w-full md:w-1/2 p-4">
              <p className="text-2xl font-semibold text-indigo-700 mb-2">SCALAR: Distance</p>
              <div className="text-4xl mb-3" role="img" aria-label="Wavy path">〰️</div>
              <p className="text-gray-600">Total path covered: **500 meters** (No direction needed)</p>
            </div>

            {/* Separator */}
            <div className="hidden md:block h-32 w-px bg-gray-300"></div>

            {/* Displacement Analogy */}
            <div className="w-full md:w-1/2 p-4">
              <p className="text-2xl font-semibold text-pink-700 mb-2">VECTOR: Displacement</p>
              <div className="text-4xl mb-3" role="img" aria-label="Straight arrow">⬇️</div>
              <p className="text-gray-600">Straight-line change: **100 meters South** (Direction IS needed)</p>
            </div>
          </div>
          <p className="mt-6 text-center text-sm text-gray-500">
            (You can replace the emojis with simple SVGs or embed your planned animation here.)
          </p>
        </div>

      </div>
    </>
  )
}