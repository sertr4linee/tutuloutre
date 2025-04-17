import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Make sure id exists before proceeding
    const id = params?.id;
    if (!id) {
      console.error('No gallery id provided');
      return NextResponse.json(
        { error: 'Gallery ID is required' },
        { status: 400 }
      );
    }
    
    console.log('Fetching photo album with id:', id);
    
    // Initialize payload with config
    const payload = await getPayload({
      config: await configPromise,
    });
    
    // Log available collections for debugging
    console.log('Available collections:', Object.keys(payload.collections));
    
    // Check if the photo-albums collection exists
    if (!Object.keys(payload.collections).includes('photo-albums')) {
      console.error('Collection photo-albums not found');
      return NextResponse.json(
        { error: 'Photo albums collection not configured properly' },
        { status: 500 }
      );
    }

    // Try to find by ID first
    const albumResult = await payload.find({
      collection: 'photo-albums' as any,
      where: {
        id: {
          equals: id,
        },
      },
      depth: 2, // To retrieve associated photos
    });

    console.log('Album query result:', albumResult.docs ? `Found ${albumResult.docs.length} docs` : 'No docs found');

    // If no results by ID, try to find by slug (in case ID is actually a slug)
    if (!albumResult.docs || albumResult.docs.length === 0) {
      console.log('No album found by ID, trying to find by slug...');
      
      const albumBySlugResult = await payload.find({
        collection: 'photo-albums' as any,
        where: {
          slug: {
            equals: id,
          },
        },
        depth: 2,
      });
      
      // If still no results, return 404
      if (!albumBySlugResult.docs || albumBySlugResult.docs.length === 0) {
        return NextResponse.json(
          { error: 'Album not found', id: id },
          { status: 404 }
        );
      }
      
      // Use the album found by slug
      const album = albumBySlugResult.docs[0] as any;
      
      // Transform the photo album data
      const photos = album.photos?.map((photoObj: any) => ({
        id: photoObj.id || photoObj.photo?.id,
        url: photoObj.photo?.url,
        alt: photoObj.photo?.alt || album.title,
        caption: photoObj.caption || '',
        width: photoObj.photo?.width,
        height: photoObj.photo?.height,
      })) || [];
      
      const transformedAlbum = {
        id: album.id,
        title: album.title,
        description: album.description || '',
        category: album.category,
        coverImage: album.coverImage?.url || null,
        photos: photos,
        featured: album.featured || false,
        createdAt: album.createdAt,
        slug: album.slug,
      };
      
      return NextResponse.json({ 
        data: transformedAlbum
      });
    }

    // Process the album found by ID
    const album = albumResult.docs[0] as any;
    
    // Log found album data
    console.log('Found album with title:', album.title);
    
    // Transform photos array for frontend use
    const photos = album.photos?.map((photoObj: any) => ({
      id: photoObj.id || photoObj.photo?.id,
      url: photoObj.photo?.url,
      alt: photoObj.photo?.alt || album.title,
      caption: photoObj.caption || '',
      width: photoObj.photo?.width,
      height: photoObj.photo?.height,
    })) || [];
    
    // Transform the photo album data for the frontend
    const transformedAlbum = {
      id: album.id,
      title: album.title,
      description: album.description || '',
      category: album.category,
      coverImage: album.coverImage?.url || null,
      photos: photos,
      featured: album.featured || false,
      createdAt: album.createdAt,
      slug: album.slug,
    };

    return NextResponse.json({ 
      data: transformedAlbum
    });

  } catch (error) {
    console.error('Error fetching photo album:', error);
    return NextResponse.json(
      { error: 'Failed to fetch photo album', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
} 