import { useState, useEffect } from "react";
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { WelcomeTransitionScreen } from "./WelcomeTransitionScreen";

export function LearnPage() {

  // stage: 'welcome' or 'loaded'
  const [stage, setStage] = useState('welcome');
  const [selectedKey, setSelectedKey] = useState(null)
  const [showStaticContainer2, setShowStaticContainer2] = useState("hidden");

  const WELCOME_DURATION_MS = 2500; // 2.5 seconds (Must match the CSS animation duration)

  // Manages the transition from welcome screen to loaded content
  useEffect(() => {
    if (stage === 'welcome') {
      const welcomeTimer = setTimeout(() => {
        setStage('loaded');
      }, WELCOME_DURATION_MS);

      return () => clearTimeout(welcomeTimer);
    }
  }, [stage]);

  if (stage === 'welcome') {
    const screenText = "Awesome! Let's Begin!"
    return <WelcomeTransitionScreen screenText={screenText}/>;
  }

  return (
    <>

      <title>Component Name</title>

      <Header />


      <Footer />
    </>
  )

}