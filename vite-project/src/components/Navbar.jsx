import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar({ setShowAuthModal }) {
  const [showDropdown, setShowDropdown] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <nav className="bg-white shadow-sm fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <img src="/logo.png" className="h-8 w-auto" alt="QR Generator" />
            <div className="hidden md:flex space-x-8 ml-10">
              <button className="text-gray-700 hover:text-indigo-600">Features</button>
              <button className="text-gray-700 hover:text-indigo-600">Pricing</button>
              <button className="text-gray-700 hover:text-indigo-600">Docs</button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="relative" 
                onClick={() => setShowDropdown(true)}
                onDoubleClick={() => setShowDropdown(false)}
              >
                <button className="flex items-center gap-2 text-gray-700">
                  <span>{user.Username}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                    <button
                      onClick={logout}
                      className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button 
                  onClick={() => setShowAuthModal({ login: true })}
                  className="text-gray-600 hover:text-indigo-600"
                >
                  Login
                </button>
                <button
                  onClick={() => setShowAuthModal({ register: true })}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}