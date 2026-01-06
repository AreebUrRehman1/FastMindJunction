// Helper to convert "theVectorAnatomy" -> "the-vector-anatomy"
const toKebabCase = (str) => {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
};

export const ImageRender = ({ darkMode, imageToDisplay }) => {

  // 1. CONFIGURATION: Map every image key to its folder number
  const imageConfig = {
    // 1.3
    displacementVsVelocityTimeGraph: { folder: '1.3' },
    
    // 1.4
    theGradientTriangle: { folder: '1.4' },
    theAreaSplit: { folder: '1.4' },
    theTangentTechnique: { folder: '1.4' },
    
    // 2.1
    theResolutionTriangle: { folder: '2.1' },
    theHeadToTailMethod: { folder: '2.1' },
    
    // 2.2
    theVectorAnatomy: { folder: '2.2' },
    
    // 2.3
    theAngledLaunchResolution: { folder: '2.3' },
    theHorizontalLaunchProfile: { folder: '2.3' },
    theTwoColumnBlueprint: { folder: '2.3', singleVariant: true }, // No dark mode version
    
    // 3.1
    // Special case: Fixes the typo in your original variable name "Simplication" vs file "simplification"
    theParticleModelSimplication: { folder: '3.1', filename: 'the-particle-model-simplification' }, 
    theCoordinateSystemSwitch: { folder: '3.1' },
    
    // 3.2
    theEquilibriumStates: { folder: '3.2' },
    theMassEffect: { folder: '3.2' },
    
    // 3.3
    massVsWeight: { folder: '3.3', singleVariant: true }, // No dark mode version
    theDragVectorGrowth: { folder: '3.3' },
    theTerminalVelocityGraph: { folder: '3.3' },
    
    // 3.4
    theSkaterInteraction: { folder: '3.4' },
    theEarthMoonPair: { folder: '3.4', singleVariant: true } // No dark mode version
  };

  const config = imageConfig[imageToDisplay];

  // Safety check: If the image key isn't found, return null or a placeholder
  if (!config) return null;

  // 2. LOGIC: Construct the filename
  // Use the manual filename if provided (fixes typo), otherwise auto-convert
  const baseFilename = config.filename || toKebabCase(imageToDisplay);
  
  // Determine if we need the 'dark-' prefix
  // We skip adding 'dark-' if the image is marked as 'singleVariant'
  const prefix = (darkMode && !config.singleVariant) ? 'dark-' : '';
  
  // Build the final path: /assets/lesson/WPH11/FOLDER/FILENAME.png
  const src = `/lesson/WPH11/${config.folder}/${prefix}${baseFilename}.png`;

  return (
    <img 
      src={src} 
      alt={imageToDisplay} 
      loading="lazy"
      className={`object-contain ${
        // Apply specific sizing if needed, or use a generic responsive class
        imageToDisplay === 'theEarthMoonPair' ? 'w-200 not-md:w-100' :
        imageToDisplay === 'theTangentTechnique' ? 'w-80 h-80 not-md:w-60 not-md:h-60' :
        'w-150 not-md:w-100'
      }`}
      onError={(e) => {
        console.error(`Image failed to load: ${src}`);
        e.target.style.display = 'none'; 
      }}
    />
  );
};