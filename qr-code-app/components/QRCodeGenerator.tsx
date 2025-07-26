'use client' // Mark as Client Component in Next.js 15

import { QRCodeCanvas } from 'qrcode.react'
import { useState } from 'react'

export default function QRCodeGenerator() {
  const [text, setText] = useState('https://nextjs.org')
  const [size, setSize] = useState(128)
  const [bgColor, setBgColor] = useState('#ffffff')
  const [fgColor, setFgColor] = useState('#000000')

  return (
    <div className='flex flex-col items-center gap-4 p-4'>
      <h1 className='text-2xl font-bold'>QR Code Generator</h1>

      <div className='flex flex-col gap-2 w-full max-w-md'>
        <label htmlFor='text'>Content:</label>
        <input
          id='text'
          type='text'
          value={text}
          onChange={(e) => setText(e.target.value)}
          className='p-2 border rounded'
          placeholder='Enter text or URL'
        />
      </div>

      <div className='flex gap-4'>
        <div className='flex flex-col gap-2'>
          <label htmlFor='size'>Size (px):</label>
          <input
            id='size'
            type='number'
            value={size}
            onChange={(e) => setSize(parseInt(e.target.value))}
            className='p-2 border rounded'
            min='48'
            max='1024'
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor='fgColor'>Foreground Color:</label>
          <input
            id='fgColor'
            type='color'
            value={fgColor}
            onChange={(e) => setFgColor(e.target.value)}
            className='p-2 border rounded'
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor='bgColor'>Background Color:</label>
          <input
            id='bgColor'
            type='color'
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            className='p-2 border rounded'
          />
        </div>
      </div>

      <div className='p-4 border rounded bg-white'>
        <QRCodeCanvas
          value={text}
          size={size}
          bgColor={bgColor}
          fgColor={fgColor}
          level='H' // Error correction level (L, M, Q, H)
        />
      </div>

      <button
        onClick={() => {
          const canvas = document.querySelector('canvas')

          // Check if canvas exists
          if (!canvas) {
            console.error('No canvas element found')
            return
          }

          // Type assertion if using TypeScript
          const pngUrl = (canvas as HTMLCanvasElement).toDataURL('image/png')

          // Create download link
          const link = document.createElement('a')
          link.href = pngUrl
          link.download = 'qrcode.png'
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        }}
        className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
      >
        Download QR Code
      </button>
    </div>
  )
}
