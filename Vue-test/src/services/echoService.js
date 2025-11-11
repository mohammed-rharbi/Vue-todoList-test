import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

window.Pusher = Pusher

let echoInstance = null

export const initEcho = () => {
  if (echoInstance) {
    return echoInstance
  }

  echoInstance = new Echo({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER || 'mt1',
    forceTLS: true,
    authEndpoint: `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/broadcasting/auth`,
    auth: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        Accept: 'application/json'
      }
    }
  })

  return echoInstance
}

export const getEcho = () => {
  if (!echoInstance) {
    return initEcho()
  }
  return echoInstance
}

export const disconnectEcho = () => {
  if (echoInstance) {
    echoInstance.disconnect()
    echoInstance = null
  }
}

// Helper methods for common channel operations
export const echoService = {
  // Listen to private channel
  private: (channelName) => {
    const echo = getEcho()
    return echo.private(channelName)
  },

  // Listen to public channel
  channel: (channelName) => {
    const echo = getEcho()
    return echo.channel(channelName)
  },

  // Leave channel
  leave: (channelName) => {
    const echo = getEcho()
    echo.leave(channelName)
  },

  // Listen for task created event
  onTaskCreated: (callback) => {
    const echo = getEcho()
    return echo.private('tasks')
      .listen('TaskCreated', callback)
  },

  // Listen for task updated event
  onTaskUpdated: (callback) => {
    const echo = getEcho()
    return echo.private('tasks')
      .listen('TaskUpdated', callback)
  },

  // Listen for task deleted event
  onTaskDeleted: (callback) => {
    const echo = getEcho()
    return echo.private('tasks')
      .listen('TaskDeleted', callback)
  }
}

export default echoService
