import QRCodeGenerator from '@/components/QRCodeGenerator'

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center p-24'>
      <QRCodeGenerator />
    </main>
  )
}
