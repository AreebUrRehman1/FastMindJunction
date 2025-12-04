import { ArrowRight, BookOpen, Activity, Zap } from 'lucide-react';
import { DisplacementVelocityAndAcceleration, DisplacementVelocityAndAcceleration2, DisplacementVelocityAndAcceleration3 } from './AnimationStorage';

export function contentContainer(darkMode, lessonId) {

  // Content Data (Now includes 'quiz' for each section)
  const LessonContent = {
    'displacementVelocity&Acceleration': {
      module: "Module 1.1 • Mechanics",
      title: "1.1 Displacement, Velocity & Acceleration",
      subtitle: "Speaking the Language of Motion",
      intro: "Before we can predict where a rocket lands or how fast a car crashes, we need to agree on the language we use to describe moving things. In Physics, \"how far\" and \"how fast\" can mean two very different things depending on whether you care about the direction.",
      sections: [
        {
          id: "part1",
          title: "Part 1: Scalars vs. Vectors",
          icon: <Activity className="w-6 h-6" />,
          text: "Everything we measure in mechanics falls into two teams: Scalars and Vectors.",
          points: [
            {
              type: "Scalar",
              def: "Simple. They only have a magnitude (a size or amount). They don’t care which way you are pointing.",
              examples: "Mass, Time, Energy, Temperature, Distance, Speed"
            },
            {
              type: "Vector",
              def: "Precise. They have both a magnitude AND a direction.",
              examples: "Force, Displacement, Velocity, Acceleration, Momentum"
            }
          ],
          animationCue: <DisplacementVelocityAndAcceleration darkMode={darkMode} />,
          // NEW: Quiz for Checkpoint
          quiz: {
            question: "Which of these lists contains ONLY Vector quantities?",
            options: [
              "Speed, Mass, Time",
              "Displacement, Velocity, Force",
              "Energy, Distance, Temperature"
            ],
            correctIndex: 1
          }
        }, {
          id: "part2",
          title: "Part 2: Distance vs. Displacement",
          icon: <BookOpen className="w-6 h-6" />,
          text: "This is the most common trap for beginners.",
          comparison: [
            { label: "Distance (Scalar)", desc: "The total ground you covered. If you walk in a circle, your distance is the length of your path." },
            { label: "Displacement (Vector)", desc: "The straight-line 'shortcut' from start to finish. It includes the direction." }
          ],
          goldenRule: "If you start and finish at the exact same spot, your Displacement is ZERO, even if you ran a marathon to get there.",
          animationCue: <DisplacementVelocityAndAcceleration2 darkMode={darkMode} />,
          quiz: {
            question: "A runner completes one full lap of a 400m track. What is their displacement?",
            options: [
              "400m",
              "0m",
              "120m"
            ],
            correctIndex: 1
          }
        }, {
          id: "part3",
          title: "Part 3: Speed vs. Velocity",
          icon: <Zap className="w-6 h-6" />,
          text: "Just like distance and displacement, these two are twins with a major difference.",
          equations: [
            { name: "Speed", type: "Scalar", formula: "Speed = Distance / Time" },
            { name: "Velocity", type: "Vector", formula: "Velocity = Displacement / Time" }
          ],
          insight: "Key Insight: You can have a constant speed but a changing velocity (e.g., a car on a roundabout).",
          // No animation for this part in original code, so we skip animationCue
          quiz: {
            question: "A car drives at constant speed around a roundabout. Is its velocity constant?",
            options: [
              "Yes, because speed is constant.",
              "No, because the direction is changing."
            ],
            correctIndex: 1
          }
        }, {
          id: "part4",
          title: "Part 4: Acceleration",
          icon: <ArrowRight className="w-6 h-6" />,
          text: "Acceleration is not just 'speeding up.' In Physics, acceleration is a vector defined as the rate of change of velocity.",
          formulaHighlight: "a = (v - u) / t",
          conditions: [
            "You speed up.",
            "You slow down (deceleration).",
            "You change direction (even if speed stays constant!)."
          ],
          animationCue: <DisplacementVelocityAndAcceleration3 darkMode={darkMode} />,
          quiz: {
            question: "If a car is slowing down while moving North, which way is the acceleration pointing?",
            options: [
              "North (Same as motion)",
              "South (Opposite to motion)",
              "Acceleration is zero"
            ],
            correctIndex: 1
          }
        }
      ]
    }
  }

  return LessonContent[lessonId];

} 
