import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authService } from '@/services/authService'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)
  const token = ref(localStorage.getItem('token') || null)
  const isLoading = ref(false)
  const error = ref(null)

  // Computed
  const isAuthenticated = computed(() => !!token.value)
  const currentUser = computed(() => user.value)
  const hasToken = computed(() => !!token.value)


const login = async (email, password) => {
  isLoading.value = true
  error.value = null
  
  try {
    const response = await authService.login({ email, password })

    token.value = response.data?.token || response.token
    user.value = response.data?.user || response.user
    localStorage.setItem('token', token.value)
    return response
  } catch (err) {
    error.value = err.response?.data?.message || 'Login failed'
    throw err
  } finally {
    isLoading.value = false
  }
}


  const register = async (userData) => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await authService.register(userData)
      token.value = response.token
      user.value = response.user
      localStorage.setItem('token', response.token)
      return response
    } catch (err) {
      error.value = err.response?.data?.message || 'Registration failed'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      token.value = null
      user.value = null
      localStorage.removeItem('token')
    }
  }

  const setUser = (userData) => {
    user.value = userData
  }

  const refreshToken = async () => {
    // Implement token refresh logic if needed
    try {
      // const response = await authService.refresh()
      // token.value = response.token
      // localStorage.setItem('token', response.token)
    } catch (err) {
      console.error('Token refresh failed:', err)
      logout()
    }
  }

  return {
    // State
    user,
    token,
    isLoading,
    error,
    // Computed
    isAuthenticated,
    currentUser,
    hasToken,
    // Actions
    login,
    register,
    logout,
    setUser,
    refreshToken
  }
})
