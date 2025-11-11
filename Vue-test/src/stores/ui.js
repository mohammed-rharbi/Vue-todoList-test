import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUIStore = defineStore('ui', () => {
  // State
  const theme = ref(localStorage.getItem('theme') || 'light')
  const sidebarOpen = ref(true)
  const modalOpen = ref(false)
  const modalData = ref(null)

  // Computed
  const isDarkMode = computed(() => theme.value === 'dark')
  const isSidebarOpen = computed(() => sidebarOpen.value)
  const isModalOpen = computed(() => modalOpen.value)

  // Actions
  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', theme.value)
    
    // Apply theme to document
    if (theme.value === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const setTheme = (newTheme) => {
    theme.value = newTheme
    localStorage.setItem('theme', newTheme)
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value
  }

  const setSidebar = (state) => {
    sidebarOpen.value = state
  }

  const openModal = (data = null) => {
    modalOpen.value = true
    modalData.value = data
  }

  const closeModal = () => {
    modalOpen.value = false
    modalData.value = null
  }

  // Initialize theme on load
  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)
  }

  return {
    // State
    theme,
    sidebarOpen,
    modalOpen,
    modalData,
    // Computed
    isDarkMode,
    isSidebarOpen,
    isModalOpen,
    // Actions
    toggleTheme,
    setTheme,
    toggleSidebar,
    setSidebar,
    openModal,
    closeModal,
    initTheme
  }
})
