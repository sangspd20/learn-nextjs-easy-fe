import axiosClient from '@/api-clients/axios-client'
import { LoginPayload } from '@/models'

export const authApi = {
  login(payload: LoginPayload) {
    return axiosClient.post('/login', payload)
  },

  logout() {
    return axiosClient.post('/logout')
  },

  getProfile() {
    return axiosClient.get('/profile')
  },
}
