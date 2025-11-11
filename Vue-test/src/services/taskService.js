// src/services/taskService.js

import mockApi from './mockApi'

// Set to true to use mock API, false for real API
const USE_MOCK_API = true

export const taskService = {
  fetchTasks: async (filters = {}) => {
    try {
      if (USE_MOCK_API) {
        return await mockApi.tasks.fetchAll(filters)
      }
      // Real API call would go here
      // const response = await api.get('/tasks', { params: filters })
      // return response.data
    } catch (error) {
      console.error('Fetch tasks error:', error)
      throw error
    }
  },

  getTask: async (id) => {
    try {
      if (USE_MOCK_API) {
        return await mockApi.tasks.getOne(id)
      }
      // Real API call would go here
      // const response = await api.get(`/tasks/${id}`)
      // return response.data
    } catch (error) {
      console.error('Get task error:', error)
      throw error
    }
  },

  createTask: async (taskData) => {
    try {
      if (USE_MOCK_API) {
        return await mockApi.tasks.create(taskData)
      }
      // Real API call would go here
      // const response = await api.post('/tasks', taskData)
      // return response.data
    } catch (error) {
      console.error('Create task error:', error)
      throw error
    }
  },

  updateTask: async (id, taskData) => {
    try {
      if (USE_MOCK_API) {
        return await mockApi.tasks.update(id, taskData)
      }
      // Real API call would go here
      // const response = await api.put(`/tasks/${id}`, taskData)
      // return response.data
    } catch (error) {
      console.error('Update task error:', error)
      throw error
    }
  },

  deleteTask: async (id) => {
    try {
      if (USE_MOCK_API) {
        return await mockApi.tasks.delete(id)
      }
      // Real API call would go here
      // const response = await api.delete(`/tasks/${id}`)
      // return response.data
    } catch (error) {
      console.error('Delete task error:', error)
      throw error
    }
  },

  batchUpdate: async (taskIds, updates) => {
    try {
      if (USE_MOCK_API) {
        // Simple mock implementation
        const promises = taskIds.map(id => mockApi.tasks.update(id, updates))
        await Promise.all(promises)
        return { data: { message: 'Tasks updated successfully' } }
      }
      // Real API call would go here
      // const response = await api.patch('/tasks/batch', { taskIds, updates })
      // return response.data
    } catch (error) {
      console.error('Batch update error:', error)
      throw error
    }
  },

  batchDelete: async (taskIds) => {
    try {
      if (USE_MOCK_API) {
        // Simple mock implementation
        const promises = taskIds.map(id => mockApi.tasks.delete(id))
        await Promise.all(promises)
        return { data: { message: 'Tasks deleted successfully' } }
      }
      // Real API call would go here
      // const response = await api.post('/tasks/batch-delete', { taskIds })
      // return response.data
    } catch (error) {
      console.error('Batch delete error:', error)
      throw error
    }
  }
}
