import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'
import { authenticator } from 'otplib'

const prisma = new PrismaClient()

async function main() {
  const password = process.env.ADMIN_PASSWORD
  if (!password) {
    throw new Error('ADMIN_PASSWORD is required in .env')
  }

  const hashedPassword = await hash(password, 10)
  const totpSecret = authenticator.generateSecret()

  const admin = await prisma.admin.upsert({
    where: { id: 'admin' },
    update: {
      hashedPassword,
      totpSecret
    },
    create: {
      id: 'admin',
      hashedPassword,
      totpSecret
    }
  })

  const otpAuthUrl = authenticator.keyuri('admin', 'Une-Momes', totpSecret)
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(otpAuthUrl)}`

  console.log('Admin initialized successfully!')
  console.log('TOTP Secret:', totpSecret)
  console.log('\nScan this QR code with your authenticator app:')
  console.log(qrCodeUrl)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect()) 