import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Backend_URL } from '../App'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [userEmail,setUserEmail]=useState('')

  useEffect(() => {
    const token = localStorage.getItem('qrToken')
    if (token) verifyToken(token)
    else setLoading(false)
  }, [])

  const verifyToken = async (token) => {
    try {
      const res = await axios.get(`${Backend_URL}/api/user/get`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUser(res.data.user)
    } catch (error) {
      logout()
    } finally {
      setLoading(false)
    }
  }

  const login = async (credentials) => {
    const res = await axios.post(`${Backend_URL}/api/user/login`, credentials)
    console.log(res)
    localStorage.setItem('qrToken', res.data.token)
    setUser(res.data.user)
  }

  const register = async (credentials) => {
    const res = await axios.post(`${Backend_URL}/api/user/register`, credentials)
    console.log(res)
    localStorage.setItem('qrToken', res.data.token)
    setUser(res.data.user)
  }

  const logout = () => {
    localStorage.removeItem('qrToken')
    setUser(null)
  }

  const SendOTPFunction = async (credentials) => {
    console.log(credentials)
    const UserEmail=credentials
    console.log(UserEmail)
    const res = await axios.post(`${Backend_URL}/api/otp/send-otp`,{Email:UserEmail})
    console.log(res)
    // localStorage.setItem('qrToken', res.data.token)
    // setUser(res.data.user)
  }
  
  const VerifyOTPFunction = async (credentials) => {
    const UserOtp=credentials
    console.log(userEmail)
    const res = await axios.post(`${Backend_URL}/api/otp/verify-otp`, {otp:UserOtp})
    console.log(res)
    // localStorage.setItem('qrToken', res.data.token)
    // setUser(res.data.user)
  }

  const resetPassword = async (credentials) => {
    const NewUserPassword=credentials

    const res = await axios.post(`${Backend_URL}/api/user/reset`, {newPassword:NewUserPassword,Email:userEmail})
    
    console.log(res)
    // localStorage.setItem('qrToken', res.data.token)
    // setUser(res.data.user)
  }
  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout,SendOTPFunction,VerifyOTPFunction,resetPassword,setUserEmail}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)