import { createClient } from 'redis'

const client = createClient({
  url: 'redis://default:FTtGYeItnQNHrwAKx2cPldRsLZxjnMeL@redis-10447.c280.us-central1-2.gce.redns.redis-cloud.com:10447'
})

client.on('error', err => {
  console.error('Redis Client Error:', err)
})

// Connect to Redis
client.connect().catch(err => {
  console.error('Redis Connection Error:', err)
})

export async function validateToken(userId: string, token: string): Promise<boolean> {
  if (!userId || !token) return false
  try {
    const storedToken = await client.get(`token:${userId}`)
    return storedToken === token
  } catch (error) {
    console.error('Redis validation error:', error)
    return false
  }
}

export async function saveToken(userId: string, token: string): Promise<boolean> {
  if (!userId || !token) throw new Error('UserId et token sont requis')
  try {
    await client.set(`token:${userId}`, token, {
      EX: 7 * 24 * 60 * 60 // 7 days in seconds
    })
    return true
  } catch (error) {
    console.error('Error saving token:', error)
    return false
  }
}

export async function removeToken(userId: string): Promise<boolean> {
  if (!userId) throw new Error('UserId est requis')
  try {
    await client.del(`token:${userId}`)
    return true
  } catch (error) {
    console.error('Error removing token:', error)
    return false
  }
}

export async function getToken(userId: string): Promise<string | null> {
  try {
    const token = await client.get(`token:${userId}`)
    return token
  } catch (error) {
    console.error('Error getting token:', error)
    return null
  }
}

// Cleanup function to be called when the server shuts down
export async function closeRedisConnection(): Promise<boolean> {
  try {
    await client.quit()
    return true
  } catch (error) {
    console.error('Error closing Redis connection:', error)
    return false
  }
} 