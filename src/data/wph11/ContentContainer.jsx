import { ArrowRight, BookOpen, Activity, Zap, Layers, AlertTriangle, Calculator, ListChecks } from 'lucide-react';
import { DisplacementVelocityAndAcceleration, DisplacementVelocityAndAcceleration2, DisplacementVelocityAndAcceleration3 } from './AnimationStorage';
import { TheSUVATEquations } from './AnimationStorage';

export function contentContainer(darkMode, lessonId) {

  // Content Data
  const LessonContent = {
    'displacementVelocity&Acceleration': {
      module: "Module 1.1 • Mechanics",
      title: "1.1 Displacement, Velocity & Acceleration",
      subtitle: "Speaking the Language of Motion",
      intro: "Before we can predict where a rocket lands or how fast a car crashes, we need to agree on the language we use to describe moving things. In Physics, \"how far\" and \"how fast\" can mean two very different things depending on whether you care about the direction.",
      sections: [
        {
          id: "variables",
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
          id: "goldenRule",
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
          id: "equations",
          title: "Part 3: Speed vs. Velocity",
          icon: <Zap className="w-6 h-6" />,
          text: "Just like distance and displacement, these two are twins with a major difference.",
          equations: [
            { name: "", type: "Scalar", formula: "Speed = Distance / Time" },
            { name: "", type: "Vector", formula: "Velocity = Displacement / Time" }
          ],
          insight: "Key Insight: You can have a constant speed but a changing velocity (e.g., a car on a roundabout).",
          quiz: {
            question: "A car drives at constant speed around a roundabout. Is its velocity constant?",
            options: [
              "Yes, because speed is constant.",
              "No, because the direction is changing."
            ],
            correctIndex: 1
          }
        }, {
          id: "conceptBreakdown",
          title: "Part 4: Acceleration",
          icon: <ArrowRight className="w-6 h-6" />,
          text: "Acceleration is not just 'speeding up.' In Physics, acceleration is a vector defined as the rate of change of velocity.",
          formulaHighlight: (
            <>
              a = <span className="inline-block relative top-[-10px] mx-1 border-b border-current">v - u</span>
              <span className="relative top-[25px] -ml-[45px]">t</span>
            </>
          ),
          variablesFullForm : "(v = final velocity, u = initial velocity, t = time)",
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
    },
    suvatEquations : {
      module: "Module 1.2 • Mechanics",
      title: "The SUVAT Equations",
      subtitle: "Predicting the Future of Motion",
      intro: "If an object is speeding up or slowing down at a steady rate, we can use a special set of four equations to predict its future. These are the 'SUVAT' equations—the most powerful tools in your kinematics toolkit.",
      sections: [
        {
          id: "variables",
          title: "Part 1: Decoding SUVAT",
          icon: <Layers className="w-6 h-6" />,
          text: "These equations are named after the five variables they connect. You must be able to identify these from word problems.",
          points: [
            {
              type: "s = Displacement",
              def: "The straight-line distance from start to finish (Vector).",
              examples: "Unit: meters (m)"
            },
            {
              type: "u = Initial Velocity",
              def: "How fast it's moving at the start of the timing (Vector).",
              examples: "Unit: meters per second (m/s)"
            },
            {
              type: "v = Final Velocity",
              def: "How fast it's moving at the end of the timing (Vector).",
              examples: "Unit: meters per second (m/s)"
            },
            {
              type: "a = Acceleration",
              def: "The rate of change of velocity. Must be constant!",
              examples: "Unit: m/s²"
            },
            {
              type: "t = Time",
              def: "How long the motion takes (Scalar).",
              examples: "Unit: seconds (s)"
            }
          ],
          quiz: {
            question: "In the SUVAT equations, what does 's' represent?",
            options: ["Speed", "Seconds", "Displacement"],
            correctIndex: 2
          }
        }, {
          id: "goldenRule",
          title: "Part 2: The Golden Rule",
          icon: <AlertTriangle className="w-6 h-6" />,
          text: "These equations are magical, but they are fragile. They only work under one specific condition.",
          comparison: [
            { label: "Constant Acceleration", desc: "Gravity pulling a falling ball, or a car braking steadily on a flat road. SUVAT WORKS here." },
            { label: "Variable Acceleration", desc: "A car changing gears, a skydiver opening a parachute, or a bungee jump. SUVAT FAILS here." }
          ],
          goldenRule: "WARNING: You can ONLY use these equations if the acceleration (a) is CONSTANT (Uniform).",
          animationCue: <TheSUVATEquations darkMode={darkMode} />,
          quiz: {
            question: "Can you use SUVAT equations for a skydiver just as they open their parachute (rapidly changing drag)?",
            options: ["Yes", "No", "Only if time is known"],
            correctIndex: 1
          }
        }, {
          id: "equations",
          title: "Part 3: The 4 Equations",
          icon: <Calculator className="w-6 h-6" />,
          text: "Here represents the mathematical relationship between the 5 variables. Note that each equation leaves out exactly one variable.",
          equations: [
            { name: "Missing 's'", type: "No Displacement", formula: "v = u + at" },
            { name: "Missing 'v'", type: "No Final Velocity", formula: "s = ut + ½at²" },
            { name: "Missing 't'", type: "No Time", formula: "v² = u² + 2as" },
            { name: "Missing 'a'", type: "No Acceleration", formula: "s = ½(u + v)t" }
          ],
          insight: "Pro Tip: List the variables you know (e.g., u, a, t) and the one you want (e.g., v). Pick the equation that has all four.",
          quiz: {
            question: "You want to find the distance (s), but you don't know the time (t). Which equation do you use?",
            options: ["s = ut + ½at²", "v = u + at", "v² = u² + 2as"],
            correctIndex: 2
          }
        }, {
          id: "strategy",
          title: "Part 4: How to Solve Problems",
          icon: <ListChecks className="w-6 h-6" />,
          text: "Don't panic when you see a word problem. Just follow this algorithm.",
          conditions: [
            "Write down 'S U V A T' vertically on your paper.",
            "Fill in the numbers you know from the question. (Watch out for hidden numbers like 'starts from rest' means u=0).",
            `Identify the variable you are trying to find (mark it with a "?" ).`,
            "Choose the equation that contains the 3 knowns and the 1 unknown.",
            "Plug in the numbers and solve."
          ],
          quiz: {
            question: "A car 'starts from rest'. What value do you write down immediately?",
            options: ["v = 0", "u = 0", "a = 0"],
            correctIndex: 1
          }
        }
      ]
    },
  }

  return LessonContent[lessonId];

} 
