import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function GET() {
  try {
    // Initialize payload with config
    const payload = await getPayload({
      config: await configPromise,
    })
    
    // Get all collection slugs
    const collections = Object.keys(payload.collections)
    
    // Log for server-side debugging
    console.log('Available collections:', collections)
    
    return NextResponse.json({ 
      collections,
      success: true
    })
    
  } catch (error) {
    console.error('Error fetching collections:', error)
    return NextResponse.json({
      error: 'Failed to fetch collections',
      collections: [],
      success: false
    }, { status: 500 })
  }
} 