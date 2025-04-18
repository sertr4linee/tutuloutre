import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function GET(request: NextRequest) {
  try {
    console.log('Fetching all photo albums');
    
    // Initialize payload with config
    const payload = await getPayload({
      config: await configPromise,
    });
    
    // Check if the photo-albums collection exists
    if (!Object.keys(payload.collections).includes('photo-albums')) {
      console.error('Collection photo-albums not found');
      return NextResponse.json(
        { error: 'Photo albums collection not configured properly' },
        { status: 500 }
      );
    }

    // Find all albums
    const albumsResult = await payload.find({
      collection: 'photo-albums' as any,
      depth: 1, // Only need basic info for album listings
    });

    console.log('Albums query result:', albumsResult.docs ? `Found ${albumsResult.docs.length} albums` : 'No albums found');
    
    // Transform the photo album data for the frontend
    const transformPhotoUrl = (url: string | undefined | null): string | null => {
      if (!url) return null;
      
      // If the URL is relative, convert to static media path
      if (url.startsWith('/') && !url.startsWith('//')) {
        const filename = url.split('/').pop();
        if (filename) {
          return `/media/${filename}`;
        }
      }
      
      return url;
    };

    // Map albums to a simpler format for the gallery page
    const transformedAlbums = albumsResult.docs.map((album: any) => ({
      id: album.id,
      title: album.title,
      description: album.description || '',
      category: album.category,
      coverImage: transformPhotoUrl(album.coverImage?.url),
      imageCount: album.photos?.length || 0,
      createdAt: album.createdAt,
      slug: album.slug,
      featured: album.featured || false,
    }));

    return NextResponse.json({ 
      data: { albums: transformedAlbums }
    });

  } catch (error) {
    console.error('Error fetching photo albums:', error);
    return NextResponse.json(
      { error: 'Failed to fetch photo albums', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}