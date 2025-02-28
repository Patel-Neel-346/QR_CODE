import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

export default function ForgotPasswordModal({ show, onClose }) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({ Email: '', otp: '', newPassword: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { resetPassword,SendOTPFunction,VerifyOTPFunction,setUserEmail } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (step === 1) {
        // Add your OTP sending logic here
        await SendOTPFunction(formData.Email)
        setUserEmail(formData.Email)
        setStep(2)
      } else if (step === 2) {
        // Add OTP verification logic here
        await VerifyOTPFunction(formData.otp)
        setStep(3)
      } else {
        await resetPassword(formData.newPassword)
        alert('Password reset successfully!')
        onClose()
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Password reset failed')
    } finally {
      setLoading(false)
    }
  }

  if (!show) return null

  return (
    <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-8">
        <h2 className="text-2xl font-bold mb-6">
          {step === 1 ? 'Reset Password' : step === 2 ? 'Verify OTP' : 'New Password'}
        </h2>
        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={formData.Email}
                onChange={(e) => setFormData(p => ({...p, Email: e.target.value}))}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          )}

          {step === 2 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">OTP Code</label>
              <input
                type="text"
                value={formData.otp}
                onChange={(e) => setFormData(p => ({...p, otp: e.target.value}))}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter 6-digit code"
                required
              />
            </div>
          )}

          {step === 3 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input
                type="password"
                value={formData.newPassword}
                onChange={(e) => setFormData(p => ({...p, newPassword: e.target.value}))}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? 'Processing...' : 
              step === 1 ? 'Send OTP' : 
              step === 2 ? 'Verify OTP' : 
              'Reset Password'}
          </button>
        </form>

        <button
          onClick={() => step === 1 ? onClose() : setStep(step - 1)}
          className="mt-4 text-gray-600 hover:text-gray-800 w-full text-center text-sm"
        >
          {step === 1 ? 'Back to Login' : 'Back'}
        </button>
      </div>
    </div>
  )
}