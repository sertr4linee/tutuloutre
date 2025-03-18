const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002'

export const api = {
  auth: {
    login: async (password: string) => {
      const res = await fetch(`${API_URL}/api/admin/auth/login`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'same-origin',
        body: JSON.stringify({ password })
      })
      
      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Authentication failed')
      }
      
      return res.json()
    },

    verifyOTP: async (otp: string) => {
      const res = await fetch(`${API_URL}/api/admin/auth/verify-otp`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'same-origin',
        body: JSON.stringify({ otp })
      })
      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Authentication failed')
      }
      return res.json()
    },

    logout: async (token: string) => {
      const res = await fetch(`${API_URL}/api/admin/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      return res.json()
    }
  },

  admin: {
    about: {
      get: async (token: string) => {
        const res = await fetch(`${API_URL}/api/admin/about`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          },
          credentials: 'include'
        })
        if (!res.ok) {
          console.error('Error response:', await res.text())
          throw new Error('Failed to fetch about info')
        }
        return res.json()
      },
      
      update: async (data: any, token: string) => {
        const res = await fetch(`${API_URL}/api/admin/about`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify(data)
        })
        if (!res.ok) {
          const error = await res.json()
          throw new Error(error.error || 'Failed to update about info')
        }
        return res.json()
      }
    },

    blogs: {
      list: async (token: string) => {
        const res = await fetch(`${API_URL}/api/admin/blogs`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        return res.json()
      },
      create: async (data: any, token: string) => {
        const res = await fetch(`${API_URL}/api/admin/blogs`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(data)
        })
        return res.json()
      }
    },

    albums: {
      list: async (token: string) => {
        const res = await fetch(`${API_URL}/api/admin/albums`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        return res.json()
      },
      create: async (data: any, token: string) => {
        const res = await fetch(`${API_URL}/api/admin/albums`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(data)
        })
        return res.json()
      },
      update: async (id: string, data: any, token: string) => {
        const res = await fetch(`${API_URL}/api/admin/albums/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(data)
        })
        return res.json()
      },
      delete: async (id: string, token: string) => {
        const res = await fetch(`${API_URL}/api/admin/albums/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        return res.json()
      }
    }
  }
} 