// src/services/mockApi.js

import { mockUsers, mockTasks, generateFakeToken, getUserByEmail, getTasksByUser } from '@/data/mockData'

// Simulate network delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms))

// In-memory storage for current session
let currentUser = null
let currentToken = null
let tasks = [...mockTasks] // Copy to allow modifications
let taskIdCounter = tasks.length + 1

export const mockApi = {
  // Auth endpoints
  auth: {
    login: async (credentials) => {
      await delay(800) // Simulate network delay

      const user = getUserByEmail(credentials.email)
      
      if (!user || user.password !== credentials.password) {
        throw {
          response: {
            status: 401,
            data: {
              message: 'Invalid credentials'
            }
          }
        }
      }

      currentUser = user
      currentToken = generateFakeToken(user.id)

      return {
        data: {
          token: currentToken,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address
          }
        }
      }
    },

    register: async (userData) => {
      await delay(800)

      // Check if email exists
      const existingUser = getUserByEmail(userData.email)
      if (existingUser) {
        throw {
          response: {
            status: 422,
            data: {
              message: 'Email already exists'
            }
          }
        }
      }

      // Create new user
      const newUser = {
        id: mockUsers.length + 1,
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        address: userData.address,
        password: userData.password,
        created_at: new Date().toISOString()
      }

      mockUsers.push(newUser)
      currentUser = newUser
      currentToken = generateFakeToken(newUser.id)

      return {
        data: {
          token: currentToken,
          user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            phone: newUser.phone,
            address: newUser.address
          }
        }
      }
    },

    logout: async () => {
      await delay(300)
      currentUser = null
      currentToken = null
      return { data: { message: 'Logged out successfully' } }
    },

    me: async () => {
      await delay(300)
      
      if (!currentUser) {
        throw {
          response: {
            status: 401,
            data: { message: 'Unauthenticated' }
          }
        }
      }

      return {
        data: {
          id: currentUser.id,
          name: currentUser.name,
          email: currentUser.email,
          phone: currentUser.phone,
          address: currentUser.address
        }
      }
    }
  },

  // Task endpoints
  tasks: {
    fetchAll: async (filters = {}) => {
      await delay(600)

      if (!currentUser) {
        throw {
          response: {
            status: 401,
            data: { message: 'Unauthenticated' }
          }
        }
      }

      let userTasks = tasks.filter(task => task.user_id === currentUser.id)

      // Apply filters
      if (filters.status && filters.status !== 'all') {
        userTasks = userTasks.filter(task => task.status === filters.status)
      }

      if (filters.priority && filters.priority !== 'all') {
        userTasks = userTasks.filter(task => task.priority === filters.priority)
      }

      return {
        data: userTasks.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      }
    },

    getOne: async (id) => {
      await delay(400)

      if (!currentUser) {
        throw {
          response: {
            status: 401,
            data: { message: 'Unauthenticated' }
          }
        }
      }

      const task = tasks.find(t => t.id === id && t.user_id === currentUser.id)

      if (!task) {
        throw {
          response: {
            status: 404,
            data: { message: 'Task not found' }
          }
        }
      }

      return { data: task }
    },

    create: async (taskData) => {
      await delay(700)

      if (!currentUser) {
        throw {
          response: {
            status: 401,
            data: { message: 'Unauthenticated' }
          }
        }
      }

      const newTask = {
        id: taskIdCounter++,
        user_id: currentUser.id,
        title: taskData.title,
        description: taskData.description || '',
        priority: taskData.priority || 'medium',
        status: taskData.status || 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      tasks.push(newTask)

      return { data: newTask }
    },

    update: async (id, taskData) => {
      await delay(600)

      if (!currentUser) {
        throw {
          response: {
            status: 401,
            data: { message: 'Unauthenticated' }
          }
        }
      }

      const taskIndex = tasks.findIndex(t => t.id === id && t.user_id === currentUser.id)

      if (taskIndex === -1) {
        throw {
          response: {
            status: 404,
            data: { message: 'Task not found' }
          }
        }
      }

      tasks[taskIndex] = {
        ...tasks[taskIndex],
        ...taskData,
        updated_at: new Date().toISOString()
      }

      return { data: tasks[taskIndex] }
    },

    delete: async (id) => {
      await delay(500)

      if (!currentUser) {
        throw {
          response: {
            status: 401,
            data: { message: 'Unauthenticated' }
          }
        }
      }

      const taskIndex = tasks.findIndex(t => t.id === id && t.user_id === currentUser.id)

      if (taskIndex === -1) {
        throw {
          response: {
            status: 404,
            data: { message: 'Task not found' }
          }
        }
      }

      tasks.splice(taskIndex, 1)

      return { data: { message: 'Task deleted successfully' } }
    }
  }
}

export default mockApi
