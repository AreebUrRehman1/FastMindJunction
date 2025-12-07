import displacementVsVelocityTimeGraph from '../../assets/lesson/WPH11 - 1.3/displacement-vs-velocity-time-graph.png'
import darkdisplacementVsVelocityTimeGraph from '../../assets/lesson/WPH11 - 1.3/dark-displacement-vs-velocity-time-graph.png'
import theGradientTriangle from '../../assets/lesson/WPH11 - 1.4/the-gradient-triangle.png'
import darkTheGradientTriangle from '../../assets/lesson/WPH11 - 1.4/dark-the-gradient-triangle.png'
import theAreaSplit from '../../assets/lesson/WPH11 - 1.4/the-area-split.png'
import darkTheAreaSplit from '../../assets/lesson/WPH11 - 1.4/dark-the-area-split.png'
import theTangentTechnique from '../../assets/lesson/WPH11 - 1.4/the-tangent-technique.png'
import darkTheTangentTechnique from '../../assets/lesson/WPH11 - 1.4/dark-the-tangent-technique.png'
import theResolutionTriangle from '../../assets/lesson/WPH11 - 2.1/the-resolution-triangle.png'
import darkTheResolutionTriangle from '../../assets/lesson/WPH11 - 2.1/dark-the-resolution-triangle.png'
import theHeadToTailMethod from '../../assets/lesson/WPH11 - 2.1/the-head-to-tail-method.png'
import darkTheHeadToTailMethod from '../../assets/lesson/WPH11 - 2.1/dark-the-head-to-tail-method.png'
import theVectorAnatomy from '../../assets/lesson/WPH11 - 2.2/the-vector-anatomy.png'
import darkTheVectorAnatomy from '../../assets/lesson/WPH11 - 2.2/dark-the-vector-anatomy.png'

export const ImageRender = ({ darkMode, imageToDisplay }) => {

  const imageRender = {
    displacementVsVelocityTimeGraph: darkMode ? (<img src={darkdisplacementVsVelocityTimeGraph} alt='Displacement Vs Velocity Time Graph' />) : (<img src={displacementVsVelocityTimeGraph} alt='Dark Displacement Vs Velocity Time Graph' />),

    theGradientTriangle: darkMode ? (<img src={darkTheGradientTriangle} alt='Dark The Gradient Triangle' className='w-100 h-100 not-md:w-70 not-md:h-70' />) : (<img src={theGradientTriangle} alt='The Gradient Triangle' className='w-100 h-100 not-md:w-70 not-md:h-70' />),

    theAreaSplit: darkMode ? (<img src={darkTheAreaSplit} alt='The Area Split' className='w-100 h-100 not-md:w-70 not-md:h-70' />) : (<img src={theAreaSplit} alt='Dark The Area Split' className='w-100 h-100 not-md:w-70 not-md:h-70' />),

    theTangentTechnique: darkMode ? (<img src={darkTheTangentTechnique} alt='Dark The Tangent Technique' className='w-80 h-80 not-md:w-60 not-md:h-60' />) : (<img src={theTangentTechnique} alt='The Tangent Technique' className='w-80 h-80 not-md:w-60 not-md:h-60' />),

    theResolutionTriangle: darkMode ? (<img src={darkTheResolutionTriangle} alt='Dark The Resolution Triangle' className='w-100 not-md:w-60 object-contain' />) : (<img src={theResolutionTriangle} alt='The Resolution Triangle' className='w-100 not-md:w-60 object-contain' />),

    theHeadToTailMethod: darkMode ? (<img src={darkTheHeadToTailMethod} alt='Dark The Head-to-Tail Method' className='w-80 not-md:w-60 object-contain' />) : (<img src={theHeadToTailMethod} alt='The Head-to-Tail Method' className='w-80 not-md:w-60 object-contain' />),

    theVectorAnatomy: darkMode ? (<img src={darkTheVectorAnatomy} alt='Dark The Vector Anatomy' className='w-150 not-md:w-100 object-contain' />) : (<img src={theVectorAnatomy} alt='The Vector Anatomy' className='w-150 not-md:w-100 object-contain' />),
  }


  return imageRender[imageToDisplay];
}