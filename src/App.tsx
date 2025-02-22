import {  Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage'
import LessonPage from './pages/LessonPlan'
import { ThemeProvider } from './context/ThemeContext'
import DarkModeToggle from './components/DarkModeToggleButton'

function App() {
  return(
  <ThemeProvider>
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white">
    <DarkModeToggle/>
    <Routes>
  <Route path="/login" element={<LoginPage />} />
  <Route path="/lessonPage" element={<LessonPage />} />
</Routes>

</div>

     
  </ThemeProvider>
  )
}

export default App
