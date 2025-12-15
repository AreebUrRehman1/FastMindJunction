import { ArrowRight, ArrowDown, BookOpen, Activity, Zap, Layers, AlertTriangle, Calculator, ListChecks, TrendingUp, GitCommit, MonitorPlay, AreaChart, CornerUpLeft, PlusCircle, Ruler, Split, LayoutList, Target, Box, Move, Maximize2, Scale } from 'lucide-react';
import { DisplacementVelocityAndAcceleration, DisplacementVelocityAndAcceleration2, DisplacementVelocityAndAcceleration3 } from './AnimationStorage';
import { TheSUVATEquations } from './AnimationStorage';
import { GraphsOfMotion } from './AnimationStorage';
import { DecodingGraphs } from './AnimationStorage';
import { VectorMath } from './AnimationStorage';
import { ProjectileMotionPrinciples } from './AnimationStorage';
import { FreeBodyDiagrams } from './AnimationStorage';
import { NewtonFirstAndSecondLaws } from './AnimationStorage';
import { ImageRender } from './ImageRender';


export function contentContainer(darkMode, lessonId, mobile) {

  // Content Data
  const LessonContent = {
    'displacementVelocity&Acceleration': {
      module: "Module 1.1 • Kinematics",
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
          variablesFullForm: "(v = final velocity, u = initial velocity, t = time)",
          conditions: [
            "You speed up.",
            "You slow down (deceleration).",
            "You change direction (even if speed stays constant!)."
          ],
          animationCue: <DisplacementVelocityAndAcceleration3 darkMode={darkMode} />
        }
      ]
    },
    suvatEquations: {
      module: "Module 1.2 • Kinematics",
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
          ]
        }
      ]
    },
    graphsOfMotion: {
      module: "Module 1.3 • Kinematics",
      title: "1.3 Drawing Graphs of Motion",
      subtitle: "Telling the Story of Motion in Lines",
      intro: "Before we calculate anything, we must learn to 'read' the lines. A single glance at the shape of a graph tells you if an object is stopped, cruising, or crashing—but only if you check the axis labels first.",
      sections: [
        {
          id: "variables",
          title: "Part 1: The Three Storytellers",
          icon: <Activity className="w-6 h-6" />,
          text: "In Physics, the same motion looks completely different depending on which graph you use. Always check the Y-axis first.",
          points: [
            {
              type: "Displacement-Time (s-t)",
              def: "Plots POSITION. Tells you 'Where is it?'",
              examples: "Up = Moving Away. Down = Coming Back. Flat = Stopped."
            },
            {
              type: "Velocity-Time (v-t)",
              def: "Plots SPEED & DIRECTION. Tells you 'How fast?'",
              examples: "This is the most useful graph. Flat (non-zero) = Constant Speed."
            },
            {
              type: "Acceleration-Time (a-t)",
              def: "Plots THE PUSH. Tells you 'How is speed changing?'",
              examples: "Usually looks like steps or blocks."
            }
          ],
          quiz: {
            question: "You see a horizontal line on a graph. The object is moving at 100 km/h. Which graph is it?",
            options: ["Displacement-Time", "Velocity-Time", "Acceleration-Time (at zero)"],
            correctIndex: 1
          }
        }, {
          id: "goldenRule",
          title: "Part 2: The Shape Dictionary",
          icon: <GitCommit className="w-6 h-6" />,
          text: "Memorize how these three basic shapes translate into motion.",
          comparison: [
            { label: "Horizontal Line (-)", desc: "Means 'Constant'. On s-t: Stopped ┇ On v-t: Constant Velocity." },
            { label: "Diagonal Line (/)", desc: "Means 'Changing at a steady rate'. On s-t: Constant Velocity ┇ On v-t: Constant Acceleration." },
            { label: "Curved Line ( )", desc: "Means 'Changing rate'. On s-t: Acceleration ┇ On v-t: Non-uniform Acceleration." }
          ],
          goldenRule: "Visual Tip: 'Steeper' always means 'More Intense'. Steeper s-t = Faster. Steeper v-t = Harder Acceleration.",
          imageTag: <ImageRender darkMode={darkMode} imageToDisplay={"displacementVsVelocityTimeGraph"} />,
          quiz: {
            question: "A Displacement-Time graph shows a curve getting steeper and steeper. What is happening?",
            options: ["The object is slowing down.", "The object is accelerating (speeding up).", "The object is climbing a hill."],
            correctIndex: 1
          }
        }, {
          id: "strategy",
          title: "Part 3: Real World Translation",
          icon: <TrendingUp className="w-6 h-6" />,
          text: "Let's translate real-world scenarios into graph shapes.",
          conditions: [
            "Scenario A: Red Light (Stopped) → s-t is Flat ┇ v-t is Zero.",
            "Scenario B: Highway Cruise (Constant Speed) → s-t is Diagonal ┇ v-t is Flat (High up).",
            "Scenario C: Drag Race (Acceleration) → s-t is Curved (Smiling) ┇ v-t is Diagonal.",
            "Scenario D: Braking (Deceleration) → s-t is Curved (Frowning) ┇ v-t is Diagonal Down."
          ],
          quiz: {
            question: "A car brakes to a stop. What does the Velocity-Time graph look like?",
            options: ["A line sloping down to the x-axis.", "A horizontal line.", "A curved line going up."],
            correctIndex: 0
          }
        }, {
          id: "animation_cue",
          title: "Part 4: Visualizing the Link",
          icon: <MonitorPlay className="w-6 h-6" />,
          text: "To truly understand this, we need to see the object move and the graph draw itself simultaneously.",
          animationCue: (<GraphsOfMotion darkMode={darkMode} mobile={mobile} />),
          quiz: {
            question: "If the car moves BACKWARDS, where does the line go on a Velocity-Time graph?",
            options: ["It goes down, but stays above the x-axis.", "It goes below the x-axis (Negative).", "It disappears."],
            correctIndex: 1
          }
        }
      ]
    },
    decodingGraphs: {
      module: "Module 1.4 • Kinematics",
      title: "1.4 Decoding Graphs (Slopes & Areas)",
      subtitle: "Extracting Hidden Information",
      intro: "The true power of a graph isn't just its shape. By measuring the 'steepness' (Slope) or the 'space underneath' (Area), we can unlock hidden variables like velocity and displacement without needing a single formula.",
      sections: [
        {
          id: "goldenRule",
          title: "Part 1: The Slope is the Rate",
          icon: <TrendingUp className="w-6 h-6" />,
          text: "The Gradient (Slope) of a line represents the 'Rate of Change'. It tells you how fast the Y-variable is changing compared to the X-variable.",
          comparison: [
            { label: "Slope of s-t Graph", desc: "Calculates Velocity (v). (Change in Position / Time)" },
            { label: "Slope of v-t Graph", desc: "Calculates Acceleration (a). (Change in Speed / Time)" }
          ],
          goldenRule: "Calculation Tip: Gradient = (y₂ - y₁) / (x₂ - x₁). Always pick two points as far apart as possible for accuracy.",
          imageTag: <ImageRender darkMode={darkMode} imageToDisplay={"theGradientTriangle"} />,
          quiz: {
            question: "You calculate the gradient of a Velocity-Time graph and get a negative number (e.g., -5 m/s²). What does this mean?",
            options: ["The object is moving backwards.", "The object is slowing down (Decelerating).", "The calculation is wrong."],
            correctIndex: 1
          }
        }, {
          id: "equations",
          title: "Part 2: The Area is the Accumulator",
          icon: <AreaChart className="w-6 h-6" />,
          text: "The area trapped between the line and the x-axis represents the 'product' of the axes (Y multiplied by X).",
          equations: [
            { name: "Area under v-t Graph", type: "Equals", formula: "Displacement (s)" },
            { name: "Area under a-t Graph", type: "Equals", formula: "Change in Velocity (Δv)" },
          ],
          insight: "Visual Tip: Split complex shapes into rectangles and triangles. Remember: Area below the X-axis subtracts from your total displacement.",
          imageTag: <ImageRender darkMode={darkMode} imageToDisplay={"theAreaSplit"} />,
          quiz: {
            question: "A Velocity-Time graph is a rectangle 4s wide and 10m/s high. What is the displacement?",
            options: ["2.5 m", "14 m", "40 m"],
            correctIndex: 2
          }
        }, {
          id: "strategy",
          title: "Part 3: Advanced - The Curve Decoder",
          icon: <Zap className="w-6 h-6" />,
          text: "What if the line is curved? A curve means the slope (velocity or acceleration) is changing every instant. You cannot use 'Rise over Run' directly.",
          conditions: [
            "To find the Instantaneous Rate at a specific time 't':",
            "1. Place your ruler at point 't' on the curve.",
            "2. Draw a TANGENT (a straight line that just touches the curve without cutting through it).",
            "3. Make sure the area (highlight in pink) on both sides are almost equal.",
            "4. Take two points and calculate the gradient of that straight tangent line."
          ],
          imageTag: <ImageRender darkMode={darkMode} imageToDisplay={"theTangentTechnique"} />,
          animationCue: <DecodingGraphs darkMode={darkMode} />
        }
      ]
    },
    vectorMath: {
      module: "Module 2.1 • Vectors & Projectiles",
      title: "2.1 Vector Math",
      subtitle: "Resolving and Resulting 2D Motion",
      intro: "Vectors are the language of two-dimensional motion. We can't solve physics problems by just adding numbers; we must use geometry. This module teaches you the two fundamental vector skills: breaking them down and adding them up.",
      sections: [
        {
          id: "goldenRule",
          title: "Part 1: The Art of Resolving (Breaking Down)",
          icon: <CornerUpLeft className="w-6 h-6" />,
          text: "Resolving a vector means breaking it into two perpendicular components (usually horizontal and vertical). We do this because the motion in the x-direction is independent of the motion in the y-direction.",
          comparison: [
            {
              label: "Horizontal Component (Fx)",
              desc: "The side adjacent to the angle θ. Calculated using F cos θ."
            },
            {
              label: "Vertical Component (Fy)",
              desc: "The side opposite the angle θ. Calculated using F sin θ."
            }
          ],
          goldenRule: "Always draw a right-angled triangle. If the angle θ is measured from the horizontal, use Cosine for the horizontal and Sine for the vertical.",
          imageTag: <ImageRender darkMode={darkMode} imageToDisplay={"theResolutionTriangle"} />,
          animationCue: <VectorMath darkMode={darkMode} mobile={mobile} />,
          quiz: {
            question: "A force of 10 N acts at 30° to the horizontal. Which component uses sin(30°)?",
            options: ["Horizontal (Fx)", "Vertical (Fy)", "Both components"],
            correctIndex: 1
          }
        }, {
          id: "equations",
          title: "Part 2: Finding the Resultant (Adding Up)",
          icon: <PlusCircle className="w-6 h-6" />,
          text: "The resultant vector is the single vector that replaces all other vectors. This is the net effect of multiple forces or displacements acting on an object.",
          equations: [
            {
              name: "Magnitude (Size)",
              type: "Pythagoras' Theorem",
              formula: "R = √(Rₓ² + Rᵧ²)"
            },
            {
              name: "Direction (Angle)",
              type: "Trigonometry",
              formula: "θ = tan⁻¹(Rᵧ / Rₓ)"
            }
          ],
          insight: "Key Insight: You can only add or subtract vectors directly if they are parallel (on the same axis). Therefore, always resolve them first!",
          imageTag: <ImageRender darkMode={darkMode} imageToDisplay={"theHeadToTailMethod"} />,
          quiz: {
            question: "Two perpendicular forces, 3 N (East) and 4 N (North), act on an object. What is the magnitude of the resultant force?",
            options: ["1 N", "7 N", "5 N"],
            correctIndex: 2
          }
        }, {
          id: "strategy",
          title: "Part 3: Calculation vs. Drawing",
          icon: <Ruler className="w-6 h-6" />,
          text: "The syllabus requires you to be able to find the resultant and components using both methods, especially when vectors are NOT at 90 degrees to each other.",
          conditions: [
            "Calculation: Used for accuracy, especially when vectors are perpendicular (using Pythagoras/SOH CAH TOA).",
            "Drawing (Scale Diagram): Used to find the resultant of two vectors at ANY angle (e.g., 60°). Requires a ruler and protractor.",
            "Vector Addition Rule: The resultant always goes from the start of the first vector (tail) to the end of the last vector (head)."
          ]
        }
      ]
    },
    projectileMotionPrinciples: {
      module: "Module 2.2 • Vectors & Projectiles",
      title: "2.2 Projectile Motion Principles",
      subtitle: "The Art of Falling with Style",
      intro: "A projectile is any object that is given an initial push and then moves freely under gravity. The secret to solving these curved paths is simple but counter-intuitive: what happens horizontally has absolutely NO effect on what happens vertically.",
      sections: [
        {
          id: "goldenRule",
          title: "Part 1: The Golden Rule of Independence",
          icon: <Split className="w-6 h-6" />,
          text: "The horizontal motion and vertical motion are completely independent. They don't talk to each other. They don't affect each other. The only thing they share is TIME.",
          comparison: [
            {
              label: "Horizontal Motion (x)",
              desc: "Unaffected by gravity. No air resistance (usually). Therefore, ACCELERATION IS ZERO."
            },
            {
              label: "Vertical Motion (y)",
              desc: "Controlled by gravity. ACCELERATION IS CONSTANT (g = 9.81 m/s² downwards)."
            }
          ],
          goldenRule: "Treat a projectile as two separate problems happening at the same time: A car driving at constant speed (Horizontal) and a ball dropping (Vertical).",
          imageTag: <ImageRender darkMode={darkMode} imageToDisplay={"theVectorAnatomy"} />,
          quiz: {
            question: "If you drop a bullet and fire a bullet horizontally from the same height at the same time, which hits the ground first?",
            options: ["The dropped bullet", "The fired bullet", "They hit at the exact same time"],
            correctIndex: 2
          }
        }, {
          id: "equations",
          title: "Part 2: Horizontal Motion (The Easy Part)",
          icon: <ArrowRight className="w-6 h-6" />,
          text: "Since there is no air resistance (in our ideal physics world) and gravity acts downwards, there is nothing to speed up or slow down the object horizontally.",
          equations: [
            {
              name: "Acceleration (aₓ)",
              type: "Zero",
              formula: "a = 0 m/s²"
            },
            {
              name: "Velocity (vₓ)",
              type: "Constant",
              formula: "v = u (Initial = Final)"
            },
            {
              name: "Displacement (Range)",
              type: "Simple Speed",
              formula: "s = u × t"
            }
          ],
          animationCue: <ProjectileMotionPrinciples darkMode={darkMode} mobile={mobile} />,
          insight: "Visual Tip: If you looked at a projectile from directly above (bird's eye view), it would look like it's moving in a straight line at a steady speed.",
          quiz: {
            question: "A ball is thrown horizontally at 20 m/s. After 3 seconds, what is its horizontal velocity?",
            options: ["0 m/s", "20 m/s", "29.8 m/s"],
            correctIndex: 1
          }
        }, {
          id: "strategy",
          title: "Part 3: Vertical Motion (The SUVAT Part)",
          icon: <ArrowDown className="w-6 h-6" />,
          text: "Vertically, the object is just in free fall. It starts with some initial vertical velocity (which might be zero!) and accelerates downwards due to gravity.",
          conditions: [
            "Acceleration (aᵧ) = 9.81 m/s² (Downwards).",
            "Initial Velocity (uᵧ) = 0 if fired horizontally.",
            "Displacement (sᵧ) = Height fallen.",
            "Use your SUVAT equations here: s = ut + ½at² is the most common one."
          ],
        }
      ]
    },
    projectileProblems: {
      module: "Module 2.3 • Vectors & Projectiles",
      title: "2.3 Projectile Problems",
      subtitle: "From Theory to Calculation",
      intro: "Now that we know the rules, it's time to play the game. Projectile problems can look scary, but they always follow the exact same recipe. We will break them down into a 'Vertical Column' and a 'Horizontal Column'.",
      sections: [
        {
          id: "goldenRule",
          title: "Part 1: The Two-Column Method",
          icon: <LayoutList className="w-6 h-6" />,
          text: "Never try to do everything in your head. Start every single problem by drawing a table with two columns. This prevents you from accidentally using a vertical acceleration for a horizontal distance.",
          comparison: [
            {
              label: "Horizontal Column (x)",
              desc: "Velocity is CONSTANT. Acceleration (a) = 0. Range = speed × time."
            },
            {
              label: "Vertical Column (y)",
              desc: "Acceleration (a) = 9.81 m/s² downwards. Use SUVAT equations here."
            }
          ],
          goldenRule: "The variable 't' (Time) is the bridge. It is the ONLY value that is the same in both columns. Find 't' in one column to use it in the other.",
          imageTag: <ImageRender darkMode={darkMode} imageToDisplay={"theAngledLaunchResolution"} />,
          quiz: {
            question: "You are solving a projectile problem. You calculate the time of flight using the vertical data. Can you use this same time value for the horizontal calculation?",
            options: ["No, horizontal time is different", "Yes, time is scalar and universal", "Only if air resistance is zero"],
            correctIndex: 1
          }
        }, {
          id: "strategy",
          title: "Part 2: Scenario A - The Horizontal Launch",
          icon: <ArrowRight className="w-6 h-6" />,
          text: "This is when an object rolls off a table or is fired flat from a cliff. It is the simpler version because the initial vertical velocity is zero.",
          conditions: [
            "Vertical Initial Velocity (uᵧ) = 0 m/s (Key Concept!).",
            "Horizontal Initial Velocity (uₓ) = The launch speed.",
            "Acceleration (aᵧ) = 9.81 m/s² (downwards).",
            "Vertical Displacement (sᵧ) = Height of the cliff."
          ],
          imageTag: <ImageRender darkMode={darkMode} imageToDisplay={"theHorizontalLaunchProfile"} />,
          quiz: {
            question: "A ball rolls off a 5m high table at 10 m/s. What is its initial vertical velocity?",
            options: ["10 m/s", "5 m/s", "0 m/s"],
            correctIndex: 2
          }
        }, {
          id: "equations",
          title: "Part 3: Scenario B - The Angled Launch",
          icon: <Target className="w-6 h-6" />,
          text: "This is the 'classic' projectile, like kicking a football. You must resolve the initial velocity vector first before you can do anything else.",
          equations: [
            {
              name: "Initial Horizontal (uₓ)",
              type: "Constant",
              formula: "u cos θ"
            },
            {
              name: "Initial Vertical (uᵧ)",
              type: "Changes",
              formula: "u sin θ"
            },
            {
              name: "At Max Height",
              type: "Key Fact",
              formula: "vᵧ = 0 m/s"
            }
          ],
          insight: "Sign Convention Tip: Usually, we treat UP as positive. This means uᵧ is positive, but Acceleration (g) is NEGATIVE (-9.81).",
          imageTag: <ImageRender darkMode={darkMode} imageToDisplay={"theTwoColumnBlueprint"} />,
          quiz: {
            question: "A cannonball is fired at an angle. At the very peak of its flight, what is its vertical velocity?",
            options: ["Maximum", "9.81 m/s", "Zero"],
            correctIndex: 2
          }
        }, {
          id: "strategy",
          title: "Part 4: The Strategy Guide",
          icon: <Calculator className="w-6 h-6" />,
          text: "When facing a tough exam question, don't panic. Just follow this algorithm.",
          conditions: [
            "1. Resolve Initial Velocity into Uₓ (cos) and Uᵧ (sin).",
            "2. Set up your Table (Horizontal vs. Vertical).",
            "3. Fill in what you know (Remember: aₓ = 0, aᵧ = -9.81).",
            "4. Solve for Time (t) using the Vertical column.",
            "5. Use 't' to find Range (Horizontal distance)."
          ],
        }
      ]
    },
    freeBodyDiagrams: {
      module: "Module 3.1 • Dynamics",
      title: "3.1 Free Body Diagrams",
      subtitle: "The Map of Forces",
      intro: "Dynamics is the study of *why* things move. To predict motion, we must identify every single push and pull acting on an object. The Free Body Diagram (FBD) is the standard engineer's tool for visualizing these invisible forces.",
      sections: [
        {
          id: "goldenRule",
          title: "Part 1: The Particle Model",
          icon: <Box className="w-6 h-6" />,
          text: "Real objects are complex shapes (cars, planes, people). In Physics, we simplify them into a single dot called a 'Particle'. We assume all mass is concentrated at this one point.",
          comparison: [
            {
              label: "Center of Gravity",
              desc: "The single point where the object's weight appears to act. For a uniform box, it's the geometric center."
            },
            {
              label: "The Diagram",
              desc: "Draw the object as a simple box or dot. All forces must point AWAY from the dot."
            }
          ],
          goldenRule: "Never draw forces acting *on* other objects. Only draw the forces acting ON the object you are studying.",
          imageTag: <ImageRender darkMode={darkMode} imageToDisplay={"theParticleModelSimplication"} />,
          quiz: {
            question: "When drawing a Free Body Diagram for a book resting on a table, which force do you NOT include?",
            options: ["The weight of the book", "The force of the table pushing up", "The force of the book pushing down on the table"],
            correctIndex: 2
          }
        }, {
          id: "variables",
          title: "Part 2: The Force Checklist",
          icon: <ArrowDown className="w-6 h-6" />,
          text: "Don't guess. Go through this checklist to ensure you haven't missed anything.",
          points: [
            {
              type: "Weight (W = mg)",
              def: "Always points vertically DOWN towards the center of the Earth.",
              examples: "Present on every object with mass."
            },
            {
              type: "Normal Reaction (R)",
              def: "The 'support' force from a surface. Always points PERPENDICULAR (90°) away from the surface.",
              examples: "A table holding up a book."
            },
            {
              type: "Friction / Drag",
              def: "Resistive forces. Always point OPPOSITE to the direction of motion.",
              examples: "Air resistance, grip on the road."
            },
            {
              type: "Tension / Thrust",
              def: "Pulling forces (strings) or driving forces (engines). Point along the line of action.",
              examples: "Rope pulling a sled, jet engine pushing a plane."
            }
          ],
          animationCue: <FreeBodyDiagrams darkMode={darkMode} mobile={mobile} />,
          quiz: {
            question: "A block is sliding down a rough slope. In which direction does the Friction force point?",
            options: ["Down the slope", "Up the slope (Opposite to motion)", "Perpendicular to the slope"],
            correctIndex: 1
          }
        }, {
          id: "strategy",
          title: "Part 3: The Coordinate System (Signs)",
          icon: <Move className="w-6 h-6" />,
          text: "This is the most critical step. Forces are vectors, so Direction = Sign. You must choose which way is 'Positive'.",
          conditions: [
            "Standard Convention: Up is (+), Down is (-). Right is (+), Left is (-).",
            "Adaptive Convention: It is often smarter to define the 'Direction of Acceleration' as Positive.",
            "Example: If a lift is accelerating DOWN, treat Down as (+) and Up as (-). This makes the math easier (a is positive).",
            "Crucial Rule: Once you choose a direction, you must stick to it for ALL vectors (u, v, a, F) in that problem."
          ],
          imageTag: <ImageRender darkMode={darkMode} imageToDisplay={"theCoordinateSystemSwitch"} />,
          quiz: {
            question: "A rocket accelerates upwards. Gravity acts downwards. If you choose 'Up' as positive, what is the sign of Weight (W)?",
            options: ["Positive (+W)", "Negative (-W)", "Zero"],
            correctIndex: 1
          }
        }, {
          id: "equationsWithGoldenRule",
          title: "Part 4: The Resultant (Net Force)",
          icon: <Maximize2 className="w-6 h-6" />,
          text: "The 'Net Force' (ΣF) is the vector sum of all forces. This is what actually causes acceleration.",
          equations: [
            {
              name: "Equilibrium (Balanced)",
              type: "a = 0",
              formula: "ΣF = 0 (Up = Down)"
            },
            {
              name: "Accelerating (Unbalanced)",
              type: "a ≠ 0",
              formula: "ΣF = ma (Forward - Back = ma)"
            }
          ],
          goldenRule: "Newton's Second Law: Acceleration happens in the exact same direction as the Net Force.",
        }
      ]
    },
    "newton'sFirst&SecondLaws": {
      module: "Module 3.2 • Dynamics",
      title: "3.2 Newton's First & Second Laws",
      subtitle: "The Rules of Reality",
      intro: "Now that we can draw forces, we need to know what they actually DO. Sir Isaac Newton gave us three laws that explain almost all motion in the universe. In this lesson, we focus on the first two: Inertia and Acceleration.",
      sections: [
        {
          id: "goldenRule",
          title: "Part 1: Newton's First Law (Inertia)",
          icon: <Scale className="w-6 h-6" />,
          text: "Objects are lazy. They want to keep doing exactly what they are already doing. If you leave them alone (Balanced Forces), they won't change.",
          comparison: [
            {
              label: "Condition",
              desc: "Resultant Force (ΣF) is ZERO."
            },
            {
              label: "Result",
              desc: "Acceleration is ZERO. The object either stays at rest OR moves at a constant velocity in a straight line."
            }
          ],
          goldenRule: "Common Trap: 'Constant Velocity' requires ZERO net force. You don't need a forward force to keep moving; you only need it to overcome friction.",
          imageTag: <ImageRender darkMode={darkMode} imageToDisplay={"theEquilibriumStates"} />,
          quiz: {
            question: "A spaceship is drifting through deep space at 10,000 km/h with its engines OFF. What is the net force acting on it?",
            options: ["10,000 N", "Zero", "It depends on the mass"],
            correctIndex: 1
          }
        }, {
          id: "equations",
          title: "Part 2: Newton's Second Law (Acceleration)",
          icon: <Zap className="w-6 h-6" />,
          text: "What happens when forces are NOT balanced? The object changes its speed or direction. This 'change' is what we call Acceleration.",
          equations: [
            {
              name: "The Formula",
              type: "Vector Equation",
              formula: "ΣF = ma"
            },
            {
              name: "In Words",
              type: "Meaning",
              formula: "Resultant Force = Mass × Acceleration"
            }
          ],
          insight: "Crucial: The acceleration 'a' always points in the exact same direction as the Resultant Force 'ΣF'.",
          imageTag: <ImageRender darkMode={darkMode} imageToDisplay={"theMassEffect"} />,
          animationCue: <NewtonFirstAndSecondLaws darkMode={darkMode} mobile={mobile} />,
          quiz: {
            question: "You push a 10kg box with 50N of force. Friction resists with 20N. What is the acceleration?",
            options: ["5 m/s²", "3 m/s²", "2 m/s²"],
            correctIndex: 1
          }
        }, {
          id: "strategy",
          title: "Part 3: Solving Dynamics Problems",
          icon: <Activity className="w-6 h-6" />,
          text: "Don't panic when you see a complex diagram. Just follow the 'F=ma' recipe.",
          conditions: [
            "1. Draw the Free Body Diagram (FBD).",
            "2. Choose your positive direction (usually the direction of motion).",
            "3. Write 'ΣF = ma'.",
            "4. Replace 'ΣF' with (Forward Forces - Backward Forces).",
            "5. Solve for 'a' or 'F'."
          ]
        }
      ]
    }
  }

  return LessonContent[lessonId];

} 
