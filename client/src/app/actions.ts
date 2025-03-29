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
import { unstable_cache } from 'next/cache';

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

export const getAlbum = unstable_cache(
  async (id: string) => {
    try {
      const album = await prisma.album.findUnique({
        where: { id },
        select: {
          id: true,
          title: true,
          description: true,
          category: true,
          coverImage: true,
          createdAt: true,
          updatedAt: true,
          images: {
            select: {
              id: true,
              url: true,
              caption: true,
              order: true,
            },
            orderBy: {
              order: 'asc'
            }
          }
        }
      });

      if (!album) {
        return { error: 'Album not found' };
      }

      return {
        data: {
          ...album,
          createdAt: album.createdAt.toISOString(),
          updatedAt: album.updatedAt.toISOString()
        }
      };
    } catch (error) {
      console.error('Get album error:', error);
      return { error: error instanceof Error ? error.message : 'Failed to get album' };
    }
  },
  ['album'],
  {
    revalidate: 60,
    tags: ['album']
  }
);

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

export async function addImageToAlbum(albumId: string, file: File, fileName: string, contentType: string) {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', 'gallery');
    formData.append('id', albumId);

    const result = await uploadImage(formData);
    
    if (result.error) {
      throw new Error(result.error);
    }

    if (!result.data?.url) {
      throw new Error('No URL returned from upload');
    }

    // Save to database
    const image = await prisma.image.create({
      data: {
        url: result.data.url,
        albumId: albumId,
        order: 0
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

export async function getPublicBlogBySlug(slug: string) {
  try {
    console.log('Fetching blog with slug:', slug);
    const blog = await prisma.blog.findFirst({
      where: {
        slug,
        status: 'published'
      }
    });

    console.log('Blog found:', blog ? 'yes' : 'no');

    if (!blog) {
      console.log('Blog not found, returning error');
      return { error: 'Blog not found' };
    }

    const response = {
      data: {
        ...blog,
        author: {
          name: 'Une Mômes'
        },
        readTime: Math.ceil(blog.content.split(' ').length / 200)
      }
    };
    console.log('Returning blog data successfully');
    return response;
  } catch (error) {
    console.error('Error in getPublicBlogBySlug:', error);
    return { error: 'Failed to fetch blog' };
  }
}

export const getPublicAlbums = unstable_cache(
  async () => {
    try {
      const albums = await prisma.album.findMany({
        select: {
          id: true,
          title: true,
          description: true,
          category: true,
          coverImage: true,
          createdAt: true,
          updatedAt: true,
          images: {
            select: {
              id: true,
              url: true,
              caption: true,
              order: true,
            },
            take: 1, // Only get one image for preview
            orderBy: {
              order: 'asc'
            }
          },
          _count: {
            select: {
              images: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

      return {
        data: albums.map(album => ({
          id: album.id,
          title: album.title,
          description: album.description,
          category: album.category,
          coverImage: album.coverImage,
          imageCount: album._count.images,
          previewImage: album.images[0],
          createdAt: album.createdAt.toISOString(),
          updatedAt: album.updatedAt.toISOString()
        }))
      };
    } catch (error) {
      console.error('Error in getPublicAlbums:', error);
      return { error: 'Failed to fetch albums' };
    }
  },
  ['public-albums'],
  {
    revalidate: 60, // Cache for 60 seconds
    tags: ['albums']
  }
);

export async function uploadImage(formData: FormData) {
  try {
    const file = formData.get('file') as File;
    const type = formData.get('type') as 'blog' | 'gallery';
    const id = formData.get('id') as string;

    if (!file || !type || !id) {
      throw new Error('Missing required fields');
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const key = `${type}/${id}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
    const url = await uploadToS3(buffer, key, file.type);
    
    return { data: { url } };
  } catch (error) {
    console.error('Error uploading image:', error);
    return { error: 'Failed to upload image' };
  }
}

// Work page data
export async function getWorkPageData() {
  try {
    const [blogs, albums, projects] = await Promise.all([
      prisma.blog.findMany({
        where: { status: 'published' },
        orderBy: { publishDate: 'desc' },
        take: 3
      }),
      prisma.album.findMany({
        orderBy: { createdAt: 'desc' },
        take: 6
      }),
      prisma.schoolProject.findMany({
        orderBy: { createdAt: 'desc' }
      })
    ]);

    return {
      data: {
        blogs: blogs.map(transformBlogData),
        albums: albums.map(transformAlbumData),
        projects: projects.map(project => ({
          ...project,
          createdAt: project.createdAt.toISOString(),
          updatedAt: project.updatedAt.toISOString()
        }))
      }
    };
  } catch (error) {
    console.error('Error fetching work page data:', error);
    return { error: error instanceof Error ? error.message : "An unexpected error occurred" };
  }
}

// School Project Types
export interface SchoolProject {
  id: string
  title: string
  description: string
  year: string
  category: string
  tags: string[]
  image: string | null
  objectives: string[]
  skills: string[]
  color: string
  featured: boolean
  createdAt: string
  updatedAt: string
  slug: string
  images: ProjectImage[]
}

export interface ProjectImage {
  id: string
  url: string
  caption: string | null
  projectId: string
  order: number
  createdAt: string
  updatedAt: string
}

export interface CreateSchoolProjectInput {
  title: string
  description: string
  year: string
  category: string
  tags: string[]
  image?: string | null
  objectives: string[]
  skills: string[]
  color: string
  featured?: boolean
  slug?: string
}

export interface UpdateSchoolProjectInput extends Partial<CreateSchoolProjectInput> {
  id: string
}

// School Project Actions
export async function createSchoolProject(input: CreateSchoolProjectInput): Promise<ServerActionResponse<SchoolProject>> {
  'use server'
  try {
    console.log('Creating school project with input:', input)
    const project = await prisma.schoolProject.create({
      data: {
        ...input,
        featured: input.featured ?? false
      }
    })
    console.log('Project created:', project)
    
    return {
      data: {
        ...project,
        createdAt: project.createdAt.toISOString(),
        updatedAt: project.updatedAt.toISOString()
      }
    }
  } catch (error) {
    console.error('Create school project error:', error)
    return { error: error instanceof Error ? error.message : 'Failed to create school project' }
  }
}

export async function updateSchoolProject(input: UpdateSchoolProjectInput): Promise<ServerActionResponse<SchoolProject>> {
  'use server'
  try {
    console.log('Updating school project with input:', input)
    const project = await prisma.schoolProject.update({
      where: { id: input.id },
      data: input
    })
    console.log('Project updated:', project)
    
    return {
      data: {
        ...project,
        createdAt: project.createdAt.toISOString(),
        updatedAt: project.updatedAt.toISOString()
      }
    }
  } catch (error) {
    console.error('Update school project error:', error)
    return { error: error instanceof Error ? error.message : 'Failed to update school project' }
  }
}

export async function deleteSchoolProject(id: string): Promise<ServerActionResponse> {
  try {
    await prisma.schoolProject.delete({
      where: { id }
    })
    
    return { message: 'School project deleted successfully' }
  } catch (error) {
    console.error('Delete school project error:', error)
    return { error: error instanceof Error ? error.message : 'Failed to delete school project' }
  }
}

export async function getSchoolProject(idOrSlug: string): Promise<ServerActionResponse<SchoolProject>> {
  try {
    const isUUID = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(idOrSlug)
                || /^[0-9a-zA-Z]{25}$/.test(idOrSlug);
    
    const project = await prisma.schoolProject.findFirst({
      where: isUUID ? { id: idOrSlug } : { slug: idOrSlug },
      include: {
        images: {
          orderBy: { order: 'asc' }
        }
      }
    })
    
    if (!project) {
      return { error: 'School project not found' }
    }
    
    return {
      data: {
        ...project,
        createdAt: project.createdAt.toISOString(),
        updatedAt: project.updatedAt.toISOString(),
        images: project.images.map(img => ({
          ...img,
          createdAt: img.createdAt.toISOString(),
          updatedAt: img.updatedAt.toISOString()
        }))
      }
    }
  } catch (error) {
    console.error('Get school project error:', error)
    return { error: error instanceof Error ? error.message : 'Failed to get school project' }
  }
}

export async function getSchoolProjects(options?: { 
  featured?: boolean 
  limit?: number
}): Promise<ServerActionResponse<SchoolProject[]>> {
  try {
    const projects = await prisma.schoolProject.findMany({
      where: options?.featured !== undefined ? { featured: options.featured } : undefined,
      take: options?.limit,
      orderBy: { createdAt: 'desc' },
      include: {
        images: {
          orderBy: { order: 'asc' },
          take: 1 // Just get the first image for previews
        }
      }
    })
    
    return {
      data: projects.map(project => ({
        ...project,
        createdAt: project.createdAt.toISOString(),
        updatedAt: project.updatedAt.toISOString(),
        images: project.images.map(img => ({
          ...img,
          createdAt: img.createdAt.toISOString(),
          updatedAt: img.updatedAt.toISOString()
        }))
      }))
    }
  } catch (error) {
    console.error('Get school projects error:', error)
    return { error: error instanceof Error ? error.message : 'Failed to get school projects' }
  }
}

// Project Image Actions
export interface AddProjectImageInput {
  projectId: string
  url: string
  caption?: string
  order?: number
}

export async function addProjectImage(input: AddProjectImageInput): Promise<ServerActionResponse<ProjectImage>> {
  'use server'
  try {
    const image = await prisma.projectImage.create({
      data: {
        projectId: input.projectId,
        url: input.url,
        caption: input.caption || null,
        order: input.order !== undefined 
          ? input.order 
          : await getNextImageOrder(input.projectId)
      }
    })
    
    return {
      data: {
        ...image,
        createdAt: image.createdAt.toISOString(),
        updatedAt: image.updatedAt.toISOString()
      }
    }
  } catch (error) {
    console.error('Add project image error:', error)
    return { error: error instanceof Error ? error.message : 'Failed to add project image' }
  }
}

export async function updateProjectImage(id: string, input: Partial<Omit<AddProjectImageInput, 'projectId'>>): Promise<ServerActionResponse<ProjectImage>> {
  'use server'
  try {
    const image = await prisma.projectImage.update({
      where: { id },
      data: input
    })
    
    return {
      data: {
        ...image,
        createdAt: image.createdAt.toISOString(),
        updatedAt: image.updatedAt.toISOString()
      }
    }
  } catch (error) {
    console.error('Update project image error:', error)
    return { error: error instanceof Error ? error.message : 'Failed to update project image' }
  }
}

export async function deleteProjectImage(id: string): Promise<ServerActionResponse> {
  'use server'
  try {
    await prisma.projectImage.delete({
      where: { id }
    })
    
    return { message: 'Project image deleted successfully' }
  } catch (error) {
    console.error('Delete project image error:', error)
    return { error: error instanceof Error ? error.message : 'Failed to delete project image' }
  }
}

export async function reorderProjectImages(projectId: string, imageIds: string[]): Promise<ServerActionResponse> {
  'use server'
  try {
    await Promise.all(
      imageIds.map((id, index) => 
        prisma.projectImage.update({
          where: { id },
          data: { order: index }
        })
      )
    )
    
    return { message: 'Project images reordered successfully' }
  } catch (error) {
    console.error('Reorder project images error:', error)
    return { error: error instanceof Error ? error.message : 'Failed to reorder project images' }
  }
}

async function getNextImageOrder(projectId: string): Promise<number> {
  const maxOrder = await prisma.projectImage.aggregate({
    where: { projectId },
    _max: { order: true }
  })
  
  return (maxOrder._max.order ?? -1) + 1
}

export async function uploadProjectImage(formData: FormData): Promise<ServerActionResponse<{ url: string }>> {
  'use server'
  try {
    const file = formData.get('file') as File;
    const projectId = formData.get('projectId') as string;
    
    if (!file || !(file instanceof File)) {
      console.error('File not provided or invalid');
      return { error: 'File not provided or invalid' };
    }
    
    console.log('Uploading project image:', {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      projectId
    });
    
    // Convertir le File en Buffer pour uploadToS3
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Générer une clé unique pour le fichier
    const key = `projects/${projectId}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
    
    // Uploader le fichier et obtenir l'URL
    const url = await uploadToS3(buffer, key, file.type);
    
    console.log('File uploaded successfully to:', url);
    
    return { 
      data: { 
        url  // URL de l'image réellement téléchargée
      } 
    }
  } catch (error) {
    console.error('Upload project image error:', error)
    return { error: error instanceof Error ? error.message : 'Failed to upload project image' }
  }
}

// Add more server actions as needed 