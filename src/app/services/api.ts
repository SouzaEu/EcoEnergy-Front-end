import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add a request interceptor for authentication
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Add a response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const authAPI = {
  login: async (email: string, senha: string) => {
    const response = await api.post('/usuarios/login', null, {
      params: { email, senha }
    })
    return response.data
  },
  
  register: async (userData: any) => {
    const response = await api.post('/usuarios', userData)
    return response.data
  }
}

export const subscriptionAPI = {
  create: async (subscriptionData: any) => {
    const response = await api.post('/assinaturas', subscriptionData)
    return response.data
  },
  
  update: async (id: number, subscriptionData: any) => {
    const response = await api.put(`/assinaturas/${id}`, subscriptionData)
    return response.data
  },
  
  getByUserId: async (userId: number) => {
    const response = await api.get(`/assinaturas/${userId}`)
    return response.data
  }
}

export default api