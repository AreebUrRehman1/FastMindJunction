import { useState } from 'react'
import { Route, Routes } from 'react-router'
import { HomePage } from './pages/HomePage'
import { LearningPathPage } from './pages/LearningPathPage'
import { ComingSoonPage } from './pages/ComingSoonPage'
import { LearnPage } from './pages/LearnPage'
import { LessonStates } from './components/wph11/LessonStates'
import { DesignTesting } from './components/wph11/DesignTesting'
import './App.css'

function App() {

  // Setting Dark Mode in website.
  const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem("colorScheme")) || false);

  function darkModeControl() {
    setDarkMode(!darkMode);
    localStorage.setItem("colorScheme", !darkMode)
  }

  return (
    <>
      <Routes>
        <Route index element={<HomePage darkModeControl={darkModeControl} darkMode={darkMode}/>} />
        <Route path="mode" element={<LearningPathPage darkModeControl={darkModeControl} darkMode={darkMode} />} />
        <Route path="coming-soon" element={<ComingSoonPage />} />
        <Route path="learn/:learnId" element={<LearnPage darkModeControl={darkModeControl} darkMode={darkMode} />} />
        <Route path="lesson/:lessonId" element={<LessonStates />} />
        <Route path='design' element={<DesignTesting />} />
      </Routes>
    </>
  )
}

export default App
