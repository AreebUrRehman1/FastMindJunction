import { Route, Routes } from 'react-router'
import { HomePage } from './pages/HomePage'
import { LearningPathPage } from './pages/LearningPathPage'
import { ComingSoonPage } from './pages/ComingSoonPage'
import { LearnPage } from './pages/LearnPage'
import { LessonPage } from './pages/LessonPage'
import { LessonState } from './components/wph11/LessonStates'
import { Testing } from './components/wph11/ScalarvsVector/Testing'
import { Testing3 } from './components/wph11/ScalarvsVector/Testing3'
import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="mode" element={<LearningPathPage />} />
        <Route path="coming-soon" element={<ComingSoonPage />} />
        <Route path="learn/:learnId" element={<LearnPage />} />
        <Route path="lesson/:lessonId" element={<LessonState />} />
        <Route path='testing' element={<Testing />} />
        <Route path='design' element={<Testing3 />} />
      </Routes>
    </>
  )
}

export default App
