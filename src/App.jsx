import { Route, Routes } from 'react-router'
import { HomePage } from './pages/HomePage'
import { LearningPathPage } from './pages/LearningPathPage'
import { ComingSoonPage } from './pages/ComingSoonPage'
import { LearnPage } from './pages/LearnPage'
import { LessonPage } from './pages/LessonPage'
import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="mode" element={<LearningPathPage />} />
        <Route path="coming-soon" element={<ComingSoonPage />} />
        <Route path="learn" element={<LearnPage />} />
        <Route path="lesson" element={<LessonPage />} />
      </Routes>
    </>
  )
}

export default App
