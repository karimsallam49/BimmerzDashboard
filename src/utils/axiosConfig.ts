import axios from 'axios'

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_APP_URL,
  withCredentials: true, // Important for CSRF cookies
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
})

// Function to get CSRF token from cookies
const getCSRFToken = (): string | null => {
  const name = 'csrftoken'
  let cookieValue: string | null = null
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';')
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim()
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
        break
      }
    }
  }
  return cookieValue
}

// Request interceptor to add CSRF token
api.interceptors.request.use(
  (config) => {
    const csrfToken = getCSRFToken()
    if (csrfToken) {
      config.headers['X-CSRFToken'] = csrfToken
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle CSRF token mismatch
    if (error.response?.status === 403 && error.response?.data?.detail === "CSRF token mismatch.") {
      // Try to refresh CSRF token and retry the request
      try {
        // Get new CSRF token
        await axios.get(`${import.meta.env.VITE_APP_URL}/api/csrf-token/`, {
          withCredentials: true
        })
        
        // Retry the original request with new CSRF token
        const originalRequest = error.config
        const newCSRFToken = getCSRFToken()
        if (newCSRFToken) {
          originalRequest.headers['X-CSRFToken'] = newCSRFToken
          return api(originalRequest)
        }
      } catch (retryError) {
        console.error('Failed to refresh CSRF token:', retryError)
      }
    }
    
    if (error.response?.status === 401) {
      // Handle unauthorized access
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api
