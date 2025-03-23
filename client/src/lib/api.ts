interface FetchOptions extends RequestInit {
  requireAuth?: boolean;
}

export async function fetchApi(url: string, options: FetchOptions = {}) {
  const { requireAuth = true, ...fetchOptions } = options;
  
  if (requireAuth) {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    fetchOptions.headers = {
      ...fetchOptions.headers,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }

  const response = await fetch(url, fetchOptions);
  
  if (response.status === 401) {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin/login';
    throw new Error('Session expired');
  }

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'An error occurred');
  }

  return data;
} 