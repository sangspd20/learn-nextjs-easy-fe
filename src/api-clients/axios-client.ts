import axios, { AxiosResponse, AxiosError } from 'axios'

// Create an Axios instance
const axiosClient = axios.create({
  baseURL: '/api',
  //timeout: 10000, // Optional: 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
})

// === Response Interceptor ===
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Optionally transform response here
    return response.data
  },
  (error: AxiosError) => {
    // Global error handling
    if (error.response) {
      const { status } = error.response

      if (status === 401) {
        // Handle unauthorized globally
        console.warn('Unauthorized - maybe redirect to login')
        // e.g., window.location.href = '/login';
      } else if (status === 500) {
        console.error('Server error')
      }
    }

    return Promise.reject(error)
  },
)

export default axiosClient
