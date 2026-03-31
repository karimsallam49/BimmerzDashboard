import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_URL,
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json,'
  }
})

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

api.interceptors.request.use(
  (config) => {
    const csrfToken = getCSRFToken()
    if (csrfToken) {
      config.headers['X-CSRFToken'] = csrfToken
    }
    
    if (config.params) {
      config.params = { ...config.params, business_id: 1 }
    } else {
      config.params = { business_id: 1 }
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 403 && error.response?.data?.detail === "CSRF token mismatch.") {
      try {
        await axios.get(`${import.meta.env.VITE_APP_URL}/api/csrf-token/`, {
          withCredentials: true
        })
        
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
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api
