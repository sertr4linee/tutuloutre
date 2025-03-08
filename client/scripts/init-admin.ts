const { hash } = require('bcrypt')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})

async function testConnection() {
  try {
    await prisma.$connect()
    console.log('Successfully connected to database')
  } catch (error) {
    console.error('Error connecting to database:', error)
    process.exit(1)
  }
}

async function initializeAdmin(hashedPassword: string) {
  const existingAdmin = await prisma.admin.findFirst()
  if (existingAdmin) {
    console.log('Admin already exists')
    return existingAdmin
  }

  console.log('Creating new admin...')
  return prisma.admin.create({
    data: {
      id: 'admin',
      hashedPassword,
      totpSecret: null
    }
  })
}

async function main() {
  const password = process.env.ADMIN_PASSWORD || 'admin'
  const hashedPassword = await hash(password, 10)
  
  try {
    await testConnection()
    const admin = await initializeAdmin(hashedPassword)
    console.log('Admin initialized successfully:', admin.id)
  } catch (error) {
    console.error('Error initializing admin:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main() 