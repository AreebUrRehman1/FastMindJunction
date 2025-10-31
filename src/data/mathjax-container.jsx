import { useEffect } from "react";

const MathJaxComponent = ({ mathExpression }) => {
  useEffect(() => {
    window.MathJax.typeset();
  }, [mathExpression]);

  return (
    <>
      {mathExpression && (
        <span
          dangerouslySetInnerHTML={{ __html: mathExpression }}
        />
      )}
    </>
  );
};

export const ScalarVsVectorStep2Runner = () => {

  const vector = `A <strong>Vector Quantity</strong> requires both its <strong> magnitude</strong> and its <strong> direction</strong> to be fully defined. They are often represented by arrows. ( \\( \\vec{v} \\) for velocity )`

  return (
    <>
      <div className="max-w-6xl mx-auto grid grid-cols-1 gap-10 md:grid-cols-2">

        {/* === SCALAR CARD === */}
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden p-8 border-t-8 border-indigo-600 transform transition duration-500 hover:scale-[1.02]">
          <div className="flex items-center space-x-4 mb-6">
            <span className="text-5xl text-indigo-600" role="img" aria-label="Scale">📏</span>
            <h2 className="text-3xl font-bold text-gray-900">Scalar Quantities</h2>
          </div>

          <div className="mb-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              A <strong>Scalar Quantity</strong> is completely defined by its <strong>magnitude</strong> (size or amount) alone. No direction is necessary to describe it fully.
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
              <strong>Mass</strong> (e.g., 5 kg)
            </li>
            <li className="flex items-center">
              <span className="text-green-500 text-lg mr-2">✅</span>
              <strong>Distance</strong> (e.g., 10 meters)
            </li>
            <li className="flex items-center">
              <span className="text-green-500 text-lg mr-2">✅</span>
              <strong>Time</strong> (e.g., 60 seconds)
            </li>
            <li className="flex items-center">
              <span className="text-green-500 text-lg mr-2">✅</span>
              <strong>Speed</strong> (e.g., 50 km/h)
            </li>
            <li className="flex items-center">
              <span className="text-green-500 text-lg mr-2">✅</span>
              <strong>Temperature</strong> (e.g., 20°C)
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
              {<MathJaxComponent mathExpression={vector} />}
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
              <strong>Displacement</strong> (e.g., 10 meters North)
            </li>
            <li className="flex items-center">
              <span className="text-green-500 text-lg mr-2">✅</span>
              <strong>Velocity</strong> (e.g., 50 km/h East)
            </li>
            <li className="flex items-center">
              <span className="text-green-500 text-lg mr-2">✅</span>
              <strong>Force</strong> (e.g., 10 N Downwards)
            </li>
            <li className="flex items-center">
              <span className="text-green-500 text-lg mr-2">✅</span>
              <strong>Acceleration</strong> (e.g., 9.8 m/s² Down)
            </li>
            <li className="flex items-center">
              <span className="text-green-500 text-lg mr-2">✅</span>
              <strong>Momentum</strong> (Mass x Velocity)
            </li>
          </ul>

        </div>
      </div>
    </>
  )

}

export const SpeedVsVelocityStep2Runner = () => {
  const vector = `\\( Speed = \\frac{Distance}{Time} \\)`;
  const vector2 = `\\( Velocity = \\frac{Displacement}{Time} \\)`;

  return (
    <>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* === SPEED CARD (Scalar) === */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border-l-8 border-blue-500 hover:shadow-3xl transition duration-300">
          <div className="flex items-center space-x-4 mb-6">
            <span className="text-5xl text-blue-600" role="img" aria-label="Speedometer">⏱️</span>
            <h2 className="text-3xl font-bold text-gray-900">1. Speed (The Scalar)</h2>
          </div>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            <strong>Speed</strong> is a <strong>scalar quantity</strong>. It only measures <strong>how fast</strong> an object is moving. Its measurement is always positive (or zero).
          </p>

          <div className="bg-blue-50 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-semibold text-blue-700 mb-3">Formula & Calculation</h3>
            <p className="font-mono text-2xl text-gray-800">
              {<MathJaxComponent mathExpression={vector} />}
            </p>
            <p className="mt-2 text-sm text-gray-600">
              *Uses <strong>Distance</strong> (the total path covered)
            </p>
            <p className="mt-1 text-sm text-gray-600">
              *SI Unit: m/s²
            </p>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-3 border-b pb-1">
            Key Examples (Magnitude Only)
          </h3>
          <ul className="space-y-2 text-gray-700 list-disc list-inside">
            <li>The reading on your car's <strong>speedometer</strong>.</li>
            <li>A runner covers 400 meters in 50 seconds. (8m/s²)</li>
            <li>It only cares about the <strong>path length</strong> traveled.</li>
          </ul>

        </div>

        {/* === VELOCITY CARD (Vector) === */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border-l-8 border-teal-500 hover:shadow-3xl transition duration-300">
          <div className="flex items-center space-x-4 mb-6">
            <span className="text-5xl text-teal-600" role="img" aria-label="Arrow pointing North">⬆️</span>
            <h2 className="text-3xl font-bold text-gray-900">2. Velocity (The Vector)</h2>
          </div>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            <strong>Velocity</strong> is a <strong>vector quantity</strong>. It measures <strong>how fast</strong> an object is moving <strong>and</strong> in <strong>what direction</strong>.
          </p>

          <div className="bg-teal-50 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-semibold text-teal-700 mb-3">Formula & Calculation</h3>
            <p className="font-mono text-2xl text-gray-800">
              {<MathJaxComponent mathExpression={vector2} />}
            </p>
            <p className="mt-2 text-sm text-gray-600">
              *Uses <strong>Displacement</strong> (the net change in position)
            </p>
            <p className="mt-1 text-sm text-gray-600">
              *SI Unit: m/s² (plus direction)
            </p>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-3 border-b pb-1">
            Key Concepts (Magnitude & Direction)
          </h3>
          <ul className="space-y-2 text-gray-700 list-disc list-inside">
            <li>A plane flying at 500km/h <strong>North</strong>.</li>
            <li>Velocity is <strong>zero</strong> if an object returns to its start point.</li>
            <li><strong>Changing velocity</strong> (even if speed is constant) means <strong>Acceleration</strong>.</li>
          </ul>
        </div>
      </div>
    </>
  )
}