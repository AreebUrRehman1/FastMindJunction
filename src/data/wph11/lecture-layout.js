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
    }

  }

  return lectureLayout[lessonId];
}