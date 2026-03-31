// Function to get CSRF token from Django
export const getCSRFToken = (): string | null => {
  const name = 'csrftoken'
  let cookieValue: string | null = null
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';')
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim()
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
        break
      }
    }
  }
  return cookieValue
}

// Function to get CSRF token from Django API
export const fetchCSRFToken = async (): Promise<string> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_APP_URL}/api/csrf-token/`, {
      method: 'GET',
      credentials: 'same-origin',
    })
    if (!response.ok) {
      console.warn('CSRF endpoint returned:', response.status)
      return ''
    }
    const data = await response.json()
    return data.csrfToken
  } catch (error) {
    console.warn('CSRF fetch failed (endpoint may not exist):', error)
    return ''
  }
}

// Initialize CSRF token on app load
export const initializeCSRF = async (): Promise<void> => {
  try {
    // Try to get CSRF token from cookie first
    let csrfToken = getCSRFToken()
    
    // If no token in cookie, fetch it from API
    if (!csrfToken) {
      csrfToken = await fetchCSRFToken()
    }
    
    return Promise.resolve()
  } catch (error) {
    console.error('CSRF initialization failed:', error)
    return Promise.resolve() // Don't block app load
  }
}
