// app/api/qrcode/route.ts
import { NextResponse } from 'next/server'
import QRCode from 'qrcode'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const text = searchParams.get('text') ?? 'https://nextjs.org'
  const size = parseInt(searchParams.get('size') ?? '200')

  try {
    const qrDataUrl = await QRCode.toDataURL(text, {
      width: size,
      margin: 2,
      errorCorrectionLevel: 'H',
    })

    return NextResponse.json({ qrDataUrl })
  } catch (err) {
    const error =
      err instanceof Error ? err : new Error('Unknown error occurred')
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
