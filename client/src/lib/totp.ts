import { authenticator } from 'otplib'
import QRCode from 'qrcode'

export async function generateTOTP(serviceName: string) {
  try {
    const secret = authenticator.generateSecret()
    const otpauth = authenticator.keyuri('admin', serviceName, secret)
    
    const qrCode = await QRCode.toDataURL(otpauth, {
      width: 400,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#ffffff'
      }
    })
    
    console.log('TOTP generated successfully')
    return { secret, qrCode }
  } catch (error) {
    console.error('Error generating TOTP:', error)
    throw error
  }
}

export function verifyTOTP(token: string, secret: string) {
  try {
    return authenticator.verify({ token, secret })
  } catch (error) {
    console.error('Error verifying TOTP:', error)
    return false
  }
} 