import api from './api'

const USE_MOCK_API = false

export const taskService = {
  fetchTasks: async (filters = {}) => {
    try {
      if (USE_MOCK_API) {
        const mockApi = await import('./mockApi').then(m => m.default)
        return await mockApi.tasks.fetchAll(filters)
      }
      // Real API call
      const response = await api.get('/tasks', { params: filters })
      return response.data
    } catch (error) {
      console.error('Fetch tasks error:', error)
      throw error
    }
  },

  getTask: async (id) => {
    try {
      if (USE_MOCK_API) {
        const mockApi = await import('./mockApi').then(m => m.default)
        return await mockApi.tasks.getOne(id)
      }
      // Real API call
      const response = await api.get(`/tasks/${id}`)
      return response.data
    } catch (error) {
      console.error('Get task error:', error)
      throw error
    }
  },

  createTask: async (taskData) => {
    try {
      if (USE_MOCK_API) {
        const mockApi = await import('./mockApi').then(m => m.default)
        return await mockApi.tasks.create(taskData)
      }
      // Real API call
      const response = await api.post('/tasks', taskData)
      return response.data
    } catch (error) {
      console.error('Create task error:', error)
      throw error
    }
  },

  updateTask: async (id, taskData) => {
    try {
      if (USE_MOCK_API) {
        const mockApi = await import('./mockApi').then(m => m.default)
        return await mockApi.tasks.update(id, taskData)
      }
      // Real API call
      const response = await api.put(`/tasks/${id}`, taskData)
      return response.data
    } catch (error) {
      console.error('Update task error:', error)
      throw error
    }
  },

  deleteTask: async (id) => {
    try {
      if (USE_MOCK_API) {
        const mockApi = await import('./mockApi').then(m => m.default)
        return await mockApi.tasks.delete(id)
      }
      // Real API call
      const response = await api.delete(`/tasks/${id}`)
      return response.data
    } catch (error) {
      console.error('Delete task error:', error)
      throw error
    }
  }
}
