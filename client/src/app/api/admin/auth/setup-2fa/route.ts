import { NextResponse } from 'next/server'
import { generateTOTP } from '@/lib/totp'
import { updateAdminTOTP } from '@/lib/db'
// import { getSession } from '@/lib/auth'

export async function GET() {
  try {
    // Pour le développement initial, on va temporairement désactiver la vérification de session
    // const session = await getSession(req)
    // if (!session) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    // Générer un nouveau secret TOTP
    const { secret, qrCode } = await generateTOTP('UNE MOME Admin')
    
    // Pour le debug
    console.log('QR Code generated:', { secret, qrCodeLength: qrCode.length })

    // Sauvegarder le secret dans la base de données
    await updateAdminTOTP('admin', secret)

    return NextResponse.json({ qrCode })
  } catch (error) {
    console.error('Setup 2FA error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
} 