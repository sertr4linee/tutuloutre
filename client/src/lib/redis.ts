import { createClient, RedisClientType } from 'redis'

const client: RedisClientType = createClient({
  username: 'default',
  password: 'FTtGYeItnQNHrwAKx2cPldRsLZxjnMeL',
  socket: {
    host: 'redis-10447.c280.us-central1-2.gce.redns.redis-cloud.com',
    port: 10447
  }
})

client.on('error', (err: Error) => console.error('Redis Client Error:', err))
client.on('connect', () => console.log('Redis connected successfully'))
client.on('ready', () => console.log('Redis ready for commands'))

// Connect to Redis
client.connect().catch(console.error)

export async function validateToken(userId: string, token: string): Promise<boolean> {
  if (!userId || !token) return false
  try {
    console.log('Validating token for user:', userId)
    const storedToken = await client.get(`token:${userId}`)
    console.log('Stored token:', storedToken ? 'exists' : 'not found')
    const isValid = storedToken === token
    console.log('Token validation result:', isValid)
    return isValid
  } catch (error) {
    console.error('Redis validation error:', error)
    return false
  }
}

export async function saveToken(userId: string, token: string): Promise<void> {
  if (!userId || !token) throw new Error('UserId et token sont requis')
  try {
    console.log('Saving token for user:', userId)
    await client.set(`token:${userId}`, token, {
      EX: 86400 // expire in 24h
    })
    console.log('Token saved successfully')
  } catch (error) {
    console.error('Redis save error:', error)
    throw error
  }
}

export async function removeToken(userId: string): Promise<void> {
  if (!userId) throw new Error('UserId est requis')
  try {
    console.log('Removing token for user:', userId)
    await client.del(`token:${userId}`)
    console.log('Token removed successfully')
  } catch (error) {
    console.error('Redis remove error:', error)
    throw error
  }
}

export default client 