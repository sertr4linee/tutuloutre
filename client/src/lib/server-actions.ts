import { ServerActionResponse, ServerActionError, ValidationError, AuthenticationError, DatabaseError } from "@/types/server-actions";

// Utility function to handle server action errors
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

// Utility function to validate server action response
export function validateServerActionResponse<T>(response: ServerActionResponse<T>): response is { data: T } {
  if (response.error) {
    throw new ServerActionError(response.error);
  }
  return true;
}

// Utility function to create a loading state
export function createLoadingState(): { isLoading: boolean; error: string | null } {
  return {
    isLoading: false,
    error: null,
  };
}

// Utility function to handle optimistic updates
export function createOptimisticUpdate<T>(data: T): { data: T; timestamp: number } {
  return {
    data,
    timestamp: Date.now(),
  };
}

// Utility function to handle server action with loading state
export async function withLoadingState<T>(
  action: () => Promise<ServerActionResponse<T>>,
  setLoading: (loading: boolean) => void,
  setError: (error: string | null) => void
): Promise<ServerActionResponse<T>> {
  setLoading(true);
  setError(null);

  try {
    const response = await action();
    if (response.error) {
      setError(response.error);
      return response;
    }
    return response;
  } catch (error) {
    const errorResponse = handleServerActionError<T>(error);
    setError(errorResponse.error || null);
    return errorResponse;
  } finally {
    setLoading(false);
  }
}

// Utility function to handle server action with optimistic updates
export async function withOptimisticUpdate<T>(
  action: () => Promise<ServerActionResponse<T>>,
  optimisticData: T,
  setData: (data: T) => void
): Promise<ServerActionResponse<T>> {
  // Apply optimistic update
  setData(optimisticData);

  try {
    const response = await action();
    if (response.error) {
      // Revert optimistic update on error
      setData(optimisticData);
      return response;
    }
    return response;
  } catch (error) {
    // Revert optimistic update on error
    setData(optimisticData);
    return handleServerActionError<T>(error);
  }
}

// Utility function to handle server action with retry logic
export async function withRetry<T>(
  action: () => Promise<ServerActionResponse<T>>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<ServerActionResponse<T>> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await action();
    } catch (error) {
      lastError = error as Error;
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, delay * attempt));
      }
    }
  }

  return handleServerActionError<T>(lastError);
}

// Utility function to handle server action with debounce
export function debounce<T extends (...args: any[]) => Promise<any>>(
  action: T,
  delay: number = 500
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  let timeoutId: NodeJS.Timeout;

  return async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    clearTimeout(timeoutId);
    return new Promise((resolve) => {
      timeoutId = setTimeout(async () => {
        const result = await action(...args);
        resolve(result);
      }, delay);
    });
  };
} 