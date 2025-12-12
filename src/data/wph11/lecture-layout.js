export function lectureLayout(lessonId) {

  const lectureLayout = {
    "displacementVelocity&Acceleration": {
      layouts: 4,
      sectionIds: ['variables', 'goldenRule', 'equations', 'conceptBreakdown']
    },
    suvatEquations: {
      layouts: 4,
      sectionIds: ['variables', 'goldenRule', 'equations', 'strategy']
    },
    graphsOfMotion: {
      layouts: 4,
      sectionIds: ['variables', 'goldenRule', 'strategy']
    },
    decodingGraphs: {
      layouts: 3,
      sectionIds: ['goldenRule', 'equations', 'strategy']
    },
    vectorMath: {
      layout: 3,
      sectionIds: ['goldenRule', 'equations', 'strategy']
    },
    projectileMotionPrinciples: {
      layout: 3,
      sectionIds: ['goldenRule', 'equations', 'strategy']
    },
    projectileProblems: {
      layout: 4,
      sectionIds: ['goldenRule', 'strategy' , 'equations', 'strategy']
    },
    freeBodyDiagrams: {
      layout: 4,
      sectionIds: ['goldenRule', 'variables' , 'strategy', 'equationsWithGoldenRule']
    }

  }

  return lectureLayout[lessonId];
}