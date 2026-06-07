import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AppPage from './pages/AppPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/app" element={<AppPage />} />
        <Route path="/dashboard" element={<Navigate to="/app" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
