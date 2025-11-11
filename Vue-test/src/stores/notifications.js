import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useNotificationsStore = defineStore('notifications', () => {
  // State
  const notifications = ref([])
  
  // Computed
  const unreadCount = computed(() => 
    notifications.value.filter(n => !n.read).length
  )

  const unreadNotifications = computed(() => 
    notifications.value.filter(n => !n.read)
  )

  const sortedByTime = computed(() => 
    [...notifications.value].sort((a, b) => b.timestamp - a.timestamp)
  )

  // Actions
  const addNotification = (notification) => {
    const id = Date.now()
    const newNotification = {
      id,
      type: notification.type || 'info',
      message: notification.message,
      duration: notification.duration || 3000,
      timestamp: Date.now(),
      read: false
    }

    notifications.value.push(newNotification)

    // Auto remove after duration
    setTimeout(() => {
      removeNotification(id)
    }, notification.duration || 3000)

    return id
  }

  const removeNotification = (id) => {
    notifications.value = notifications.value.filter(n => n.id !== id)
  }

  const markAsRead = (id) => {
    const notification = notifications.value.find(n => n.id === id)
    if (notification) {
      notification.read = true
    }
  }

  const markAllAsRead = () => {
    notifications.value.forEach(n => {
      n.read = true
    })
  }

  const clearAll = () => {
    notifications.value = []
  }

  // Notification helpers
  const success = (message, duration = 3000) => {
    return addNotification({ type: 'success', message, duration })
  }

  const error = (message, duration = 3000) => {
    return addNotification({ type: 'error', message, duration })
  }

  const warning = (message, duration = 3000) => {
    return addNotification({ type: 'warning', message, duration })
  }

  const info = (message, duration = 3000) => {
    return addNotification({ type: 'info', message, duration })
  }

  return {
    // State
    notifications,
    // Computed
    unreadCount,
    unreadNotifications,
    sortedByTime,
    // Actions
    addNotification,
    removeNotification,
    markAsRead,
    markAllAsRead,
    clearAll,
    // Helpers
    success,
    error,
    warning,
    info
  }
})
