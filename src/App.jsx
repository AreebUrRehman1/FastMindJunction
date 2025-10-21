import { Route, Routes } from 'react-router'
import { HomePage } from './pages/HomePage'
import { LearningPathPage } from './pages/LearningPathPage'
import { ComingSoonPage } from './pages/ComingSoonPage'
import { LearnPage } from './pages/LearnPage'
import { LessonStates } from './components/wph11/LessonStates'
import { DesignTesting } from './components/wph11/DesignTesting'
import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="mode" element={<LearningPathPage />} />
        <Route path="coming-soon" element={<ComingSoonPage />} />
        <Route path="learn/:learnId" element={<LearnPage />} />
        <Route path="lesson/:lessonId" element={<LessonStates />} />
        <Route path='design' element={<DesignTesting />} />
      </Routes>
    </>
  )
}

export default App
