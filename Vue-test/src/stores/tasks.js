import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { taskService } from '@/services/taskService'

export const useTasksStore = defineStore('tasks', () => {
  // State
  const tasks = ref([])
  const selectedTask = ref(null)
  const isLoading = ref(false)
  const error = ref(null)
  const filters = ref({
    status: 'all',
    priority: 'all'
  })

  // Computed
  const filteredTasks = computed(() => {
    return tasks.value.filter(task => {
      const statusMatch = filters.value.status === 'all' || task.status === filters.value.status
      const priorityMatch = filters.value.priority === 'all' || task.priority === filters.value.priority
      return statusMatch && priorityMatch
    })
  })

  const stats = computed(() => ({
    total: tasks.value.length,
    completed: tasks.value.filter(t => t.status === 'completed').length,
    pending: tasks.value.filter(t => t.status !== 'completed').length
  }))

  const completedCount = computed(() => 
    tasks.value.filter(t => t.status === 'completed').length
  )

  const pendingCount = computed(() => 
    tasks.value.filter(t => t.status !== 'completed').length
  )

  const taskStats = computed(() => {
    const byPriority = {
      low: 0,
      medium: 0,
      high: 0,
      urgent: 0
    }
    
    tasks.value.forEach(task => {
      if (byPriority[task.priority] !== undefined) {
        byPriority[task.priority]++
      }
    })

    return {
      total: tasks.value.length,
      completed: completedCount.value,
      pending: pendingCount.value,
      byPriority
    }
  })

  // Actions
  const fetchTasks = async () => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await taskService.fetchTasks()
      tasks.value = Array.isArray(response) ? response : response.data || []
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to fetch tasks'
      console.error('Fetch tasks error:', err)
    } finally {
      isLoading.value = false
    }
  }

  const getTask = async (id) => {
    try {
      const response = await taskService.getTask(id)
      selectedTask.value = response
      return response
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to fetch task'
      throw err
    }
  }

  const createTask = async (taskData) => {
    try {
      const response = await taskService.createTask(taskData)
      tasks.value.unshift(response) // Add to beginning of array
      return response
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to create task'
      throw err
    }
  }

  const updateTask = async (id, taskData) => {
    try {
      const response = await taskService.updateTask(id, taskData)
      const index = tasks.value.findIndex(t => t.id === id)
      if (index > -1) {
        tasks.value[index] = response
      }
      return response
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to update task'
      throw err
    }
  }

  const deleteTask = async (id) => {
    try {
      await taskService.deleteTask(id)
      tasks.value = tasks.value.filter(t => t.id !== id)
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to delete task'
      throw err
    }
  }

  const completeTask = async (id) => {
    const task = tasks.value.find(t => t.id === id)
    if (task) {
      return updateTask(id, { ...task, status: 'completed' })
    }
  }

  const setFilters = (newFilters) => {
    filters.value = { ...filters.value, ...newFilters }
  }

  const clearFilters = () => {
    filters.value = {
      status: 'all',
      priority: 'all'
    }
  }

  const setSelectedTask = (task) => {
    selectedTask.value = task
  }

  return {
    // State
    tasks,
    selectedTask,
    isLoading,
    error,
    filters,
    // Computed
    filteredTasks,
    stats,
    completedCount,
    pendingCount,
    taskStats,
    // Actions
    fetchTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
    completeTask,
    setFilters,
    clearFilters,
    setSelectedTask
  }
})
