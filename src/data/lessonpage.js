import running from "../assets/lesson/running.png"

export const vectorVsScalar = {
  page1: {
    step1: `<div class="text-center text-xl mt-5 ">Let's define it real quick!</div>`,
    step2: `      <div class='text-center mt-8 '><span class='font-bold text-gray-500'>Scalar: </span>magnitude <strong>only</strong></div>
      <div class='text-center '><span class='font-bold text-gray-500'>Vector: </span>magnitude <strong>+</strong> direction</div>`,
    step3: `      <div class='flex justify-between mt-15'>
          <table class='border-solid border-black border-1'>
            <tr>
              <th colspan="2" class='p-4 bg-gray-300'>Scalars</th>
            </tr>
            <tr>
              <td class='p-4 border-solid border-black border-1'>Distance</td>
              <td class='p-4 border-solid border-black border-1'>Speed</td>
            </tr>
            <tr>
              <td class='p-4 border-solid border-black border-1'>Mass</td>
              <td class='p-4 border-solid border-black border-1'>Time</td>
            </tr>
            <tr>
              <td class='p-4 border-solid border-black border-1'>Efficiency</td>
              <td class='p-4 border-solid border-black border-1'>Work Done</td>
            </tr>
          </table>

          <table class='border-solid border-black border-1'>
            <tr>
              <th colspan="2" class='p-4 bg-gray-300'>Vectors</th>
            </tr>
            <tr>
              <td class='p-4 border-solid border-black border-1'>Displacement</td>
              <td class='p-4 border-solid border-black border-1'>Velocity</td>
            </tr>
            <tr>
              <td class='p-4 border-solid border-black border-1'>Weight</td>
              <td class='p-4 border-solid border-black border-1'>Acceleration</td>
            </tr>
            <tr>
              <td class='p-4 border-solid border-black border-1'>Momentum</td>
              <td class='p-4 border-solid border-black border-1'>Force</td>
            </tr>
          </table>
      </div>`,
    step4: `<div class="text-center text-xl mt-8  font-bold text-red-500">And More!!!</div>`
  },
  page2: {
    step1: `<div class="text-center text-xl mt-3 ">For example</div>`,
    step2: `      <div class="text-center text-xl mt-8  text-gray-500">Distance vs Displacement</div>
      <img ref={person} class="h-40 mt-15" src=${running} alt="running person" />
      <div class="text-center text-[20px] text-emerald-400 font-bold mt-5 ">Runner moves 300m east</div>`,
    step3: `      <div class='text-center mt-8 text-[17px] '><span class='font-bold text-gray-500'>Scalar: </span>He moved <strong>300m</strong> (Distance)</div>
      <div class='text-center text-[17px] '><span class='font-bold text-gray-500'>Vector: </span>He moved <strong>300m east</strong> (Displacement)</div>`
  },
  page3: {
    step1: `<div class="text-center text-xl mt-3 ">Let's expand it further!</div>`,
    step2: `<div class="text-center text-xl mt-8  text-gray-500">Distance vs Displacement</div>
      <img ref={person2} class="h-40 mt-15 ml-[800px] scale-x-[-1]" src=${running} alt="running person" />
      <div class="text-center text-[20px] text-emerald-400 font-bold mt-5 ">Runner moves again 300m but to the west now</div>
      <div class='text-center mt-8 text-[17px] '><span class='font-bold text-gray-500'>Scalar: </span>His total distance is <strong>600m</strong> (Distance)</div>`,
    step3: `      <div class='text-center text-[17px] '><span class='font-bold text-gray-500'>Vector: </span>His total displacement is <strong>0m</strong></div>
      <div class='text-center text-[14px]  text-blue-600'>300m (to the right) - 300m (to the left)</div>`
  }
}