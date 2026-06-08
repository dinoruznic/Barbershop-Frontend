import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import MainFrame from './components/layout/MainFrame'
import BookAppointmentPage from './features/appointments/BookAppointmentPage'
import ClientDashboard from './features/client/ClientDashboard'
import HomePage from './pages/HomePage'
import AppPlaceholderPage from './pages/AppPlaceholderPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/app" element={<MainFrame />}>
          <Route index element={<Navigate to="/app/dashboard" replace />} />
          <Route path="dashboard" element={<ClientDashboard />} />
          <Route path="book-appointment" element={<BookAppointmentPage />} />
          <Route path="my-appointments" element={<AppPlaceholderPage />} />
          <Route path="favorite-services" element={<AppPlaceholderPage />} />
          <Route path="services" element={<AppPlaceholderPage />} />
          <Route path="reviews" element={<AppPlaceholderPage />} />
          <Route path="notifications" element={<AppPlaceholderPage />} />
          <Route path="profile" element={<AppPlaceholderPage />} />
          <Route path="schedule" element={<AppPlaceholderPage />} />
          <Route path="time-off" element={<AppPlaceholderPage />} />
          <Route path="assigned-appointments" element={<AppPlaceholderPage />} />
          <Route path="employees" element={<AppPlaceholderPage />} />
          <Route path="inventory" element={<AppPlaceholderPage />} />
          <Route path="payments" element={<AppPlaceholderPage />} />
          <Route path="analytics" element={<AppPlaceholderPage />} />
          <Route path="administration" element={<AppPlaceholderPage />} />
        </Route>
        <Route
          path="/dashboard"
          element={<Navigate to="/app/dashboard" replace />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
