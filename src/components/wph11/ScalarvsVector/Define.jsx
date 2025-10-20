export function Define({ setContentDisplay, setCurrentStep, setPageChecker, stepCounter, setStepCounter }) {

  const defineContent = {
    step0: (<div className="text-center text-xl mt-5 ">Let's define it real quick!</div>),
    step1: (
      <>
        <div className='text-center mt-8 '><span className='font-bold text-gray-500'>Scalar: </span>magnitude <strong>only</strong></div>
        <div className='text-center '><span className='font-bold text-gray-500'>Vector: </span>magnitude <strong>+</strong> direction</div>
      </>
    ),
    step2: (
      <>
        <div className='flex justify-between mt-15'>
          <table className='border-solid border-black border-1'>
            <thead>
              <tr>
                <th colSpan="2" className='p-4 bg-gray-300'>Scalars</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='p-4 border-solid border-black border-1'>Distance</td>
                <td className='p-4 border-solid border-black border-1'>Speed</td>
              </tr>
              <tr>
                <td className='p-4 border-solid border-black border-1'>Mass</td>
                <td className='p-4 border-solid border-black border-1'>Time</td>
              </tr>
              <tr>
                <td className='p-4 border-solid border-black border-1'>Efficiency</td>
                <td className='p-4 border-solid border-black border-1'>Work Done</td>
              </tr>
            </tbody>
          </table>

          <table className='border-solid border-black border-1'>
            <thead>
              <tr>
                <th colSpan="2" className='p-4 bg-gray-300'>Vectors</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='p-4 border-solid border-black border-1'>Displacement</td>
                <td className='p-4 border-solid border-black border-1'>Velocity</td>
              </tr>
              <tr>
                <td className='p-4 border-solid border-black border-1'>Weight</td>
                <td className='p-4 border-solid border-black border-1'>Acceleration</td>
              </tr>
              <tr>
                <td className='p-4 border-solid border-black border-1'>Momentum</td>
                <td className='p-4 border-solid border-black border-1'>Force</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    ),
    step3: (<div className="text-center text-xl mt-8  font-bold text-red-500">And More!!!</div>),
    step4: null,
  }

  const nextStepKey = `step${stepCounter + 1}`;
  const currentContent = defineContent[`step${stepCounter}`];
  const nextContentExists = defineContent[nextStepKey] !== null && defineContent[nextStepKey] !== undefined;

  if (nextContentExists) {

    if (currentContent) {
      setContentDisplay((previous) => [...previous, currentContent]);
    }

    setStepCounter(prev => prev + 1);
    setCurrentStep(prev => prev + 1);

  } else {
    if (currentContent) {
      setContentDisplay((previous) => [...previous, currentContent]);
      setCurrentStep(prev => prev + 1);
      setStepCounter(prev => prev + 1);
    } else {
      setStepCounter(0);
      setPageChecker({
        define: false,
        example: true,
      });
      setContentDisplay([]);
    }
  }


}