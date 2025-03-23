import 'dotenv/config'
import redis from '../src/lib/redis'

async function testRedis() {
  try {
    // Test de connexion
    await redis.set('test', 'Hello Redis!')
    const value = await redis.get('test')
    console.log('Test value:', value)
    
    // Nettoyage
    await redis.del('test')
    console.log('Redis connection successful!')
  } catch (error) {
    console.error('Redis connection failed:', error)
  }
}

testRedis() 