import { useState, useEffect } from 'react'
import QRCode from 'react-qr-code'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import { Backend_URL } from '../App'

export default function QRGenerator() {
  const { user } = useAuth()
  const [qrData, setQrData] = useState({
    data: '',
    style: {
      border: 'solid',
      color: '#000000'
    },
    frameText: 'SCAN ME'
  })
  const [savedQRCodes, setSavedQRCodes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchQRCodes = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${Backend_URL}/api/qrCode/get`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('qrToken')}`
          }
        })
        setSavedQRCodes(response.data.qrCodes)
      } catch (err) {
        setError('Failed to load saved QR codes')
      } finally {
        setLoading(false)
      }
    }
    
    if (user) fetchQRCodes()
  }, [user])

  const handleGenerateQR = async () => {
    try {
      setLoading(true)
      setError('')
      const response = await axios.post(
        `${Backend_URL}/api/qrCode/create`,
        qrData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('qrToken')}`
          }
        }
      )
      setSavedQRCodes([...savedQRCodes, response.data.qrCode])
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save QR code')
    } finally {
      setLoading(false)
    }
  }

  const downloadQR = () => {
    const svg = document.getElementById('qr-code')
    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)
      const link = document.createElement('a')
      link.download = `${user?.username || 'qr'}-code.png`
      link.href = canvas.toDataURL()
      link.click()
    }
    
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData)
  }

  return (
    <div className="pt-24 max-w-4xl mx-auto px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Website URL</label>
            <input
              type="text"
              value={qrData.data}
              onChange={(e) => setQrData(p => ({...p, data: e.target.value}))}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="https://example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Frame Text</label>
            <input
              type="text"
              value={qrData.frameText}
              onChange={(e) => setQrData(p => ({...p, frameText: e.target.value}))}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Border Style</label>
            <select
              value={qrData.style.border}
              onChange={(e) => setQrData(p => ({
                ...p,
                style: { ...p.style, border: e.target.value }
              }))}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="solid">Solid</option>
              <option value="dotted">Dotted</option>
              <option value="dashed">Dashed</option>
              <option value="double">Double</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">QR Color</label>
            <input
              type="color"
              value={qrData.style.color}
              onChange={(e) => setQrData(p => ({
                ...p,
                style: { ...p.style, color: e.target.value }
              }))}
              className="w-full h-12 cursor-pointer"
            />
          </div>

          <div className="flex gap-4">
            <button 
              onClick={handleGenerateQR}
              disabled={loading}
              className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Generate QR'}
            </button>
            <button 
              onClick={downloadQR}
              className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Download
            </button>
          </div>
        </div>

        <div className="w-full md:w-2/3 flex flex-col items-center">
          <div className="bg-gray-100 p-6 rounded-lg w-fit">
            <div className="bg-white p-4 rounded">
              <QRCode
                id="qr-code"
                value={qrData.data || 'https://qr-generator.com'}
                fgColor={qrData.style.color}
                size={256}
                style={{ border: `5px ${qrData.style.border} ${qrData.style.color}` }}
              />
              {qrData.frameText && (
                <div className="text-center mt-4 font-sans" style={{ color: qrData.style.color }}>
                  {qrData.frameText}
                </div>
              )}
            </div>
          </div>

          {error && <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>}
          <div className="w-full mt-8">
            <h3 className="text-xl font-semibold mb-4">Saved QR Codes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedQRCodes.map((qr) => (
                <div key={qr._id} className="bg-gray-50 p-4 rounded-lg">
                  <div className="bg-white p-2 rounded">
                    <QRCode
                      value={qr.data}
                      fgColor={qr.style.color}
                      size={128}
                      style={{ border: `3px ${qr.style.border} ${qr.style.color}` }}
                    />
                    {qr.frameText && (
                      <div className="text-center mt-2 text-sm" style={{ color: qr.style.color }}>
                        {qr.frameText}
                      </div>
                    )}
                  </div>
                  <div className="mt-2 text-xs text-gray-600 truncate">
                    {qr.data}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}