import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import Navbar from './components/Navbar.jsx'
import QRGenerator from './components/QRGenerator.jsx'
import LoginModal from './components/Auth/LoginModel.jsx'
import RegisterModal from './components/Auth/RegisterModel.jsx'
import ForgotPasswordModal from './components/Auth/ForgotPasswordModel.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

export const Backend_URL = import.meta.env.VITE_BACKEND_URL

export default function App() {
  const [showAuthModal, setShowAuthModal] = useState({
    login: false,
    register: false,
    forgotPassword: false
  })

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar setShowAuthModal={setShowAuthModal} />
        
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <QRGenerator />
            </ProtectedRoute>
          }/>
        </Routes>

        <LoginModal 
          show={showAuthModal.login}
          onClose={() => setShowAuthModal(prev => ({...prev, login: false}))}
          showRegister={() => setShowAuthModal({ login: false, register: true })}
          showForgotPassword={() => setShowAuthModal({ login: false, forgotPassword: true })}
        />

        <RegisterModal 
          show={showAuthModal.register}
          onClose={() => setShowAuthModal(prev => ({...prev, register: false}))}
        />

        <ForgotPasswordModal
          show={showAuthModal.forgotPassword}
          onClose={() => setShowAuthModal({ login: true, forgotPassword: false })}
        />
      </div>
    </AuthProvider>
  )
}