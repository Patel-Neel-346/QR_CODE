import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

export default function LoginModal({ show, onClose, showRegister, showForgotPassword }) {
  const [credentials, setCredentials] = useState({ Email: '', Password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await login(credentials)
      onClose()
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  if (!show) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-8">
        <h2 className="text-2xl font-bold mb-6">Welcome Back</h2>
        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={credentials.email}
              onChange={(e) => setCredentials(p => ({...p, Email: e.target.value}))}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials(p => ({...p, Password: e.target.value}))}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center space-y-4">
          <button
            onClick={showForgotPassword}
            className="text-indigo-600 hover:text-indigo-800 text-sm"
          >
            Forgot password?
          </button>
          <p className="text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={showRegister}
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}