import { useEffect } from "react";


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