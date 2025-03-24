"use server";

import { neon } from "@neondatabase/serverless";
import { compare } from "bcryptjs";
import * as jose from 'jose';
import { authenticator } from "otplib";
import { saveToken, removeToken } from "@/lib/redis";
import { prisma } from "@/lib/prisma";
import { handleServerActionError, validateServerActionResponse } from "@/lib/server-actions";
import {
  LoginInput,
  AboutInput,
  BlogInput,
  AlbumInput,
  ImageInput,
  LoginResponse,
  AboutResponse,
  BlogResponse,
  BlogsResponse,
  AlbumResponse,
  AlbumsResponse,
  ValidationError,
  AuthenticationError,
  DatabaseError,
  transformBlogData,
  transformAlbumData,
  ServerActionResponse,
  BlogData,
  AlbumData
} from "@/types/server-actions";
import { cookies } from "next/headers";
import { verifyTOTP } from "@/lib/auth";
import { uploadToS3, deleteFromS3 } from '@/lib/s3';

// Authentication actions
export async function login(input: LoginInput): Promise<LoginResponse> {
  try {
    console.log('Login attempt started')
    const user = await prisma.admin.findFirst();

    if (!user) {
      console.error('No admin user found')
      throw new AuthenticationError("Invalid credentials");
    }

    const isValid = await verifyTOTP(input.totp, user.totpSecret);
    if (!isValid) {
      console.error('Invalid TOTP code')
      throw new AuthenticationError("Invalid TOTP code");
    }

    console.log('TOTP verification successful')
    
    // Create JWT with jose
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!)
    const token = await new jose.SignJWT({ id: user.id })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('7d')
      .sign(secret)

    await saveToken(user.id, token);

    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
      priority: 'high'
    });

    console.log('Login successful, token set in cookies')
    return { data: { token } };
  } catch (error) {
    console.error('Login error:', error)
    return { error: error instanceof Error ? error.message : "An unexpected error occurred" };
  }
}

export async function logout(): Promise<ServerActionResponse> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    
    if (token) {
      try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET!)
        const { payload } = await jose.jwtVerify(token, secret)
        await removeToken(payload.id as string);
      } catch (error) {
        console.error('Error verifying token during logout:', error)
      }
      cookieStore.delete("token");
    }

    return { message: "Logged out successfully" };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "An unexpected error occurred" };
  }
}

// About management actions
export async function getAbout(): Promise<AboutResponse> {
  try {
    const about = await prisma.about.findFirst();
    if (!about) {
      throw new DatabaseError("About data not found");
    }
    return { 
      data: {
        myApproach: about.myApproach,
        education: {
          degree: about.degree,
          school: about.school,
          years: about.years,
        },
        skills: about.skills,
      }
    };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "An unexpected error occurred" };
  }
}

export async function updateAbout(input: AboutInput): Promise<AboutResponse> {
  try {
    const about = await prisma.about.upsert({
      where: { id: "about" },
      update: {
        myApproach: input.myApproach,
        degree: input.education.degree,
        school: input.education.school,
        years: input.education.years,
        skills: input.skills,
      },
      create: {
        id: "about",
        myApproach: input.myApproach,
        degree: input.education.degree,
        school: input.education.school,
        years: input.education.years,
        skills: input.skills,
      },
    });
    return { 
      data: {
        myApproach: about.myApproach,
        education: {
          degree: about.degree,
          school: about.school,
          years: about.years,
        },
        skills: about.skills,
      }
    };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "An unexpected error occurred" };
  }
}

// Blog management actions
export async function getBlogs(): Promise<BlogsResponse> {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { data: blogs.map(transformBlogData) };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "An unexpected error occurred" };
  }
}

export async function getBlog(id: string): Promise<BlogResponse> {
  try {
    const blog = await prisma.blog.findUnique({
      where: { id },
    });
    if (!blog) {
      throw new DatabaseError("Blog not found");
    }
    return { data: transformBlogData(blog) };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "An unexpected error occurred" };
  }
}

export async function createBlog(input: BlogInput): Promise<BlogResponse> {
  try {
    const blog = await prisma.blog.create({
      data: input,
    });
    return { data: transformBlogData(blog) };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "An unexpected error occurred" };
  }
}

export async function updateBlog(id: string, input: BlogInput): Promise<BlogResponse> {
  try {
    const blog = await prisma.blog.update({
      where: { id },
      data: input,
    });
    return { data: transformBlogData(blog) };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "An unexpected error occurred" };
  }
}

export async function deleteBlog(id: string): Promise<ServerActionResponse> {
  try {
    await prisma.blog.delete({
      where: { id },
    });
    return { message: "Blog deleted successfully" };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "An unexpected error occurred" };
  }
}

// Album management actions
export async function getAlbums(): Promise<AlbumsResponse> {
  try {
    const albums = await prisma.album.findMany({
      include: { images: true },
      orderBy: { createdAt: 'desc' }
    });
    return { data: albums.map(album => ({
      id: album.id,
      title: album.title,
      description: album.description,
      category: album.category,
      coverImage: album.coverImage,
      images: album.images.map(image => ({
        id: image.id,
        url: image.url,
        caption: image.caption,
        order: image.order
      })),
      createdAt: album.createdAt.toISOString(),
      updatedAt: album.updatedAt.toISOString()
    })) };
  } catch (error) {
    console.error('Get albums error:', error);
    return { error: error instanceof Error ? error.message : 'Failed to get albums' };
  }
}

export async function getAlbum(id: string): Promise<AlbumResponse> {
  try {
    const album = await prisma.album.findUnique({
      where: { id },
      include: { images: true }
    });

    if (!album) {
      return { error: 'Album not found' };
    }

    return { data: {
      id: album.id,
      title: album.title,
      description: album.description,
      category: album.category,
      coverImage: album.coverImage,
      images: album.images.map(image => ({
        id: image.id,
        url: image.url,
        caption: image.caption,
        order: image.order
      })),
      createdAt: album.createdAt.toISOString(),
      updatedAt: album.updatedAt.toISOString()
    }};
  } catch (error) {
    console.error('Get album error:', error);
    return { error: error instanceof Error ? error.message : 'Failed to get album' };
  }
}

export async function createAlbum(input: AlbumInput): Promise<AlbumResponse> {
  try {
    const album = await prisma.album.create({
      data: {
        title: input.title,
        description: input.description,
        category: input.category,
        coverImage: input.coverImage
      }
    });

    return { data: {
      id: album.id,
      title: album.title,
      description: album.description,
      category: album.category,
      coverImage: album.coverImage,
      images: [],
      createdAt: album.createdAt.toISOString(),
      updatedAt: album.updatedAt.toISOString()
    }};
  } catch (error) {
    console.error('Create album error:', error);
    return { error: error instanceof Error ? error.message : 'Failed to create album' };
  }
}

export async function updateAlbum(id: string, input: AlbumInput): Promise<AlbumResponse> {
  try {
    const album = await prisma.album.update({
      where: { id },
      data: {
        title: input.title,
        description: input.description,
        category: input.category,
        coverImage: input.coverImage
      },
      include: { images: true }
    });

    return { data: {
      id: album.id,
      title: album.title,
      description: album.description,
      category: album.category,
      coverImage: album.coverImage,
      images: album.images.map(image => ({
        id: image.id,
        url: image.url,
        caption: image.caption,
        order: image.order
      })),
      createdAt: album.createdAt.toISOString(),
      updatedAt: album.updatedAt.toISOString()
    }};
  } catch (error) {
    console.error('Update album error:', error);
    return { error: error instanceof Error ? error.message : 'Failed to update album' };
  }
}

export async function deleteAlbum(id: string): Promise<ServerActionResponse> {
  try {
    await prisma.album.delete({
      where: { id }
    });

    return { message: 'Album deleted successfully' };
  } catch (error) {
    console.error('Delete album error:', error);
    return { error: error instanceof Error ? error.message : 'Failed to delete album' };
  }
}

export async function addImageToAlbum(albumId: string, file: Buffer, fileName: string, contentType: string) {
  try {
    // Upload to S3
    const imageUrl = await uploadToS3(file, `albums/${albumId}/${fileName}`, contentType);

    // Save to database
    const image = await prisma.image.create({
      data: {
        url: imageUrl,
        albumId: albumId,
        order: 0 // You might want to implement proper ordering logic
      }
    });

    return { data: image };
  } catch (error) {
    console.error('Error adding image to album:', error);
    return { error: 'Failed to add image to album' };
  }
}

export async function updateImageOrder(albumId: string, imageIds: string[]): Promise<AlbumResponse> {
  try {
    await prisma.$transaction(
      imageIds.map((id, index) =>
        prisma.image.update({
          where: { id },
          data: { order: index }
        })
      )
    );

    const album = await prisma.album.findUnique({
      where: { id: albumId },
      include: { images: true }
    });

    if (!album) {
      return { error: 'Album not found' };
    }

    return { data: {
      id: album.id,
      title: album.title,
      description: album.description,
      category: album.category,
      coverImage: album.coverImage,
      images: album.images.map(image => ({
        id: image.id,
        url: image.url,
        caption: image.caption,
        order: image.order
      })),
      createdAt: album.createdAt.toISOString(),
      updatedAt: album.updatedAt.toISOString()
    }};
  } catch (error) {
    console.error('Update image order error:', error);
    return { error: error instanceof Error ? error.message : 'Failed to update image order' };
  }
}

export async function deleteImage(imageId: string) {
  try {
    // Get the image URL first
    const image = await prisma.image.findUnique({
      where: { id: imageId }
    });

    if (!image) {
      return { error: 'Image not found' };
    }

    // Extract the file name from the URL
    const fileName = image.url.split('/').pop();
    if (fileName) {
      // Delete from S3
      await deleteFromS3(`albums/${image.albumId}/${fileName}`);
    }

    // Delete from database
    await prisma.image.delete({
      where: { id: imageId }
    });

    return { success: true };
  } catch (error) {
    console.error('Error deleting image:', error);
    return { error: 'Failed to delete image' };
  }
}

// Data fetching actions
export async function getData(): Promise<ServerActionResponse<{
  about: AboutResponse["data"];
  blogs: BlogData[];
  albums: AlbumData[];
}>> {
  try {
    const [about, blogs, albums] = await Promise.all([
      prisma.about.findFirst(),
      prisma.blog.findMany({
        orderBy: { createdAt: "desc" },
      }),
      prisma.album.findMany({
        include: { images: true },
        orderBy: { createdAt: "desc" },
      }),
    ]);

    if (!about) {
      throw new DatabaseError("About data not found");
    }

    return {
      data: {
        about: {
          myApproach: about.myApproach,
          education: {
            degree: about.degree,
            school: about.school,
            years: about.years,
          },
          skills: about.skills,
        },
        blogs: blogs.map(transformBlogData),
        albums: albums.map(album => ({
          id: album.id,
          title: album.title,
          description: album.description,
          category: album.category,
          coverImage: album.coverImage,
          images: album.images.map(image => ({
            id: image.id,
            url: image.url,
            caption: image.caption,
            order: image.order
          })),
          createdAt: album.createdAt.toISOString(),
          updatedAt: album.updatedAt.toISOString()
        })),
      },
    };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "An unexpected error occurred" };
  }
}

// Actions publiques pour récupérer les blogs et albums
export async function getPublicBlogs() {
  try {
    const blogs = await prisma.blog.findMany({
      where: {
        status: 'published'
      },
      orderBy: {
        publishDate: 'desc'
      }
    });

    return { data: blogs };
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return { error: 'Failed to fetch blogs' };
  }
}

export async function getPublicAlbums() {
  try {
    const albums = await prisma.album.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return { data: albums };
  } catch (error) {
    console.error('Error fetching albums:', error);
    return { error: 'Failed to fetch albums' };
  }
}

// Add more server actions as needed 