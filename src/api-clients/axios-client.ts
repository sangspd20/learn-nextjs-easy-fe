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

      return Promise.reject(error.response?.data) // should be error response body
    }

    return Promise.reject(error)
  },
)

export default axiosClient
