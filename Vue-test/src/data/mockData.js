
export const mockUsers = [
  {
    id: 1,
    name: 'Mohammed',
    email: 'mohammed@example.com',
    phone: '+212612345678',
    address: 'Casablanca, Morocco',
    password: 'password123',
    created_at: '2024-01-01T10:00:00Z'
  },
  {
    id: 2,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    address: 'New York, USA',
    password: 'password123',
    created_at: '2024-01-02T10:00:00Z'
  }
]

export const mockTasks = [
  {
    id: 1,
    user_id: 1,
    title: 'Complete Vue.js project',
    description: 'Build the to-do list application with Vue 3 and Pinia',
    priority: 'high',
    status: 'in_progress',
    created_at: '2024-11-10T08:00:00Z',
    updated_at: '2024-11-10T08:00:00Z'
  },
  {
    id: 2,
    user_id: 1,
    title: 'Learn Laravel',
    description: 'Study Laravel backend development and API creation',
    priority: 'medium',
    status: 'pending',
    created_at: '2024-11-10T09:00:00Z',
    updated_at: '2024-11-10T09:00:00Z'
  },
  {
    id: 3,
    user_id: 1,
    title: 'Setup PostgreSQL',
    description: 'Install and configure PostgreSQL database',
    priority: 'urgent',
    status: 'completed',
    created_at: '2024-11-09T10:00:00Z',
    updated_at: '2024-11-10T10:00:00Z'
  },
  {
    id: 4,
    user_id: 1,
    title: 'Design UI components',
    description: 'Create modern UI with shadcn-vue components',
    priority: 'high',
    status: 'completed',
    created_at: '2024-11-09T11:00:00Z',
    updated_at: '2024-11-10T11:00:00Z'
  },
  {
    id: 5,
    user_id: 1,
    title: 'Integrate Pusher',
    description: 'Setup real-time notifications with Pusher and Laravel Echo',
    priority: 'low',
    status: 'pending',
    created_at: '2024-11-10T12:00:00Z',
    updated_at: '2024-11-10T12:00:00Z'
  }
]

export const generateFakeToken = (userId) => {
  return `fake_jwt_token_${userId}_${Date.now()}`
}

export const getUserByEmail = (email) => {
  return mockUsers.find(user => user.email === email)
}


export const getUserById = (id) => {
  return mockUsers.find(user => user.id === id)
}


export const getTasksByUser = (userId) => {
  return mockTasks.filter(task => task.user_id === userId)
}
