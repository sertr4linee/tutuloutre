import { z } from "zod";

// Base response type for all server actions
export type ServerActionResponse<T = void> = {
  data?: T;
  error?: string;
  message?: string;
};

// Validation schemas
export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
  totp: z.string().min(1, "TOTP code is required"),
});

export const aboutSchema = z.object({
  myApproach: z.string().min(1, "My approach is required"),
  education: z.object({
    degree: z.string().min(1, "Degree is required"),
    school: z.string().min(1, "School is required"),
    years: z.string().min(1, "Years are required"),
  }),
  skills: z.array(z.string()),
});

export const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  excerpt: z.string().min(1, "Excerpt is required"),
  content: z.string().min(1, "Content is required"),
  category: z.string().min(1, "Category is required"),
  coverImage: z.string().nullable().optional(),
  status: z.enum(["draft", "published"]).default("draft"),
  featured: z.boolean().default(false),
  tags: z.array(z.string()),
});

export const albumSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().nullable().optional(),
  category: z.string().min(1, "Category is required"),
  coverImage: z.string().nullable().optional(),
});

export const imageSchema = z.object({
  url: z.string().min(1, "Image URL is required"),
  caption: z.string().nullable().optional(),
  order: z.number().default(0),
});

// Types for server action inputs
export type LoginInput = z.infer<typeof loginSchema>;
export type AboutInput = z.infer<typeof aboutSchema>;
export type BlogInput = z.infer<typeof blogSchema>;
export type AlbumInput = z.infer<typeof albumSchema>;
export type ImageInput = z.infer<typeof imageSchema>;

// Types for server action responses
export type LoginResponse = ServerActionResponse<{ token: string }>;
export type AboutResponse = ServerActionResponse<{
  myApproach: string;
  education: {
    degree: string;
    school: string;
    years: string;
  };
  skills: string[];
}>;

export type BlogData = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  coverImage: string | null;
  status: "draft" | "published";
  featured: boolean;
  tags: string[];
  publishDate: string;
  createdAt: string;
  updatedAt: string;
};

export type BlogResponse = ServerActionResponse<BlogData>;
export type BlogsResponse = ServerActionResponse<BlogData[]>;

export type AlbumData = {
  id: string;
  title: string;
  description: string | null;
  category: string;
  coverImage: string | null;
  images: {
    id: string;
    url: string;
    caption: string | null;
    order: number;
  }[];
  createdAt: string;
  updatedAt: string;
};

export type AlbumResponse = ServerActionResponse<AlbumData>;
export type AlbumsResponse = ServerActionResponse<AlbumData[]>;

// Error types
export class ServerActionError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = "ServerActionError";
  }
}

export class ValidationError extends ServerActionError {
  constructor(message: string) {
    super(message, "VALIDATION_ERROR");
  }
}

export class AuthenticationError extends ServerActionError {
  constructor(message: string) {
    super(message, "AUTHENTICATION_ERROR");
  }
}

export class DatabaseError extends ServerActionError {
  constructor(message: string) {
    super(message, "DATABASE_ERROR");
  }
}

// Loading state types
export type LoadingState = {
  isLoading: boolean;
  error: string | null;
};

// Optimistic update types
export type OptimisticUpdate<T> = {
  data: T;
  timestamp: number;
};

// Utility types for data transformation
export type PrismaBlog = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  coverImage: string | null;
  status: string;
  featured: boolean;
  tags: string[];
  publishDate: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type PrismaImage = {
  id: string;
  url: string;
  caption: string | null;
  order: number;
  albumId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type PrismaAlbum = {
  id: string;
  title: string;
  description: string | null;
  category: string;
  coverImage: string | null;
  images: PrismaImage[];
  createdAt: Date;
  updatedAt: Date;
};

// Utility functions for data transformation
export function transformBlogData(blog: PrismaBlog): BlogData {
  return {
    ...blog,
    status: blog.status as "draft" | "published",
    publishDate: blog.publishDate.toISOString(),
    createdAt: blog.createdAt.toISOString(),
    updatedAt: blog.updatedAt.toISOString(),
  };
}

export function transformAlbumData(album: PrismaAlbum): AlbumData {
  return {
    ...album,
    createdAt: album.createdAt.toISOString(),
    updatedAt: album.updatedAt.toISOString(),
  };
}

// Error handling utility
export function handleServerActionError<T>(error: unknown): ServerActionResponse<T> {
  console.error("Server action error:", error);

  if (error instanceof ValidationError) {
    return { error: error.message };
  }

  if (error instanceof AuthenticationError) {
    return { error: error.message };
  }

  if (error instanceof DatabaseError) {
    return { error: error.message };
  }

  if (error instanceof Error) {
    return { error: error.message };
  }

  return { error: "An unexpected error occurred" };
} 