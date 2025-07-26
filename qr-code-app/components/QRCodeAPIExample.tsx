// components/QRCodeAPIExample.tsx
'use client'

import { useState } from 'react'

export default function QRCodeAPIExample() {
  const [qrImage, setQrImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generateQR = async (text: string, size: number) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `/api/qrcode?text=${encodeURIComponent(text)}&size=${size}`
      )

      if (!response.ok) {
        throw new Error('Failed to generate QR code')
      }

      const data = (await response.json()) as { qrDataUrl: string }
      setQrImage(data.qrDataUrl)
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error('Unknown error occurred')
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col gap-4'>
      <button
        onClick={() => generateQR('https://nextjs.org', 200)}
        disabled={loading}
        className='px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400'
      >
        {loading ? 'Generating...' : 'Generate QR via API'}
      </button>

      {error && <div className='text-red-500'>{error}</div>}

      {qrImage && (
        <img src={qrImage} alt='Generated QR Code' className='border p-2' />
      )}
    </div>
  )
}
