<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useNotificationsStore } from '@/stores/notifications'

const router = useRouter()
const authStore = useAuthStore()
const notificationsStore = useNotificationsStore()

const isEditing = ref(false)
const isSaving = ref(false)

const formData = ref({
  name: authStore.user?.name || '',
  email: authStore.user?.email || '',
  phone: authStore.user?.phone || '',
  address: authStore.user?.address || ''
})

const originalData = { ...formData.value }

const handleEdit = () => {
  isEditing.value = true
}

const handleCancel = () => {
  isEditing.value = false
  formData.value = { ...originalData }
}

const handleSave = async () => {
  isSaving.value = true
  
  try {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Update auth store
    authStore.setUser({
      ...authStore.user,
      ...formData.value
    })
    
    originalData = { ...formData.value }
    isEditing.value = false
    
    notificationsStore.success('Profile updated successfully!')
  } catch (error) {
    notificationsStore.error('Failed to update profile')
  } finally {
    isSaving.value = false
  }
}

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}

const joinedDate = new Date(authStore.user?.created_at || new Date()).toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})

const getInitials = (name) => {
  if (!name) return 'U'
  return name.split(' ').map(n => n).join('').toUpperCase().slice(0, 2)
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
    <!-- Header -->
    <header class="bg-white shadow-sm sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-slate-900">Profile</h1>
        <button
          @click="handleLogout"
          class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-2xl mx-auto px-4 py-8">
      <!-- Navigation -->
      <div class="mb-6 flex gap-2">
        <router-link to="/dashboard" class="px-4 py-2 text-slate-600 hover:text-slate-900">
          ← Back to Tasks
        </router-link>
        <router-link to="/notifications" class="px-4 py-2 text-slate-600 hover:text-slate-900">
          Notifications
        </router-link>
      </div>

      <!-- Profile Card -->
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <!-- Avatar Section -->
        <div class="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-8 flex items-end gap-4 -mb-8">
          <div class="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-3xl font-bold border-4 border-white shadow-lg">
            {{ getInitials(authStore.user?.name) }}
          </div>
          <div class="pb-2">
            <h2 class="text-2xl font-bold text-white">{{ authStore.user?.name }}</h2>
            <p class="text-blue-100 text-sm">Joined {{ joinedDate }}</p>
          </div>
        </div>

        <!-- Profile Content -->
        <div class="px-6 py-8 pt-12">
          <!-- Edit Button -->
          <div class="flex justify-end mb-6">
            <button
              v-if="!isEditing"
              @click="handleEdit"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Edit Profile
            </button>
            <div v-else class="flex gap-2">
              <button
                @click="handleSave"
                :disabled="isSaving"
                class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium disabled:opacity-50"
              >
                {{ isSaving ? 'Saving...' : 'Save' }}
              </button>
              <button
                @click="handleCancel"
                :disabled="isSaving"
                class="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors text-sm font-medium disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>

          <!-- Profile Fields -->
          <div class="space-y-6">
            <!-- Name -->
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
              <input
                v-if="isEditing"
                v-model="formData.name"
                type="text"
                class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p v-else class="text-slate-900">{{ authStore.user?.name }}</p>
            </div>

            <!-- Email -->
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2">Email</label>
              <input
                v-if="isEditing"
                v-model="formData.email"
                type="email"
                class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p v-else class="text-slate-900">{{ authStore.user?.email }}</p>
            </div>

            <!-- Phone -->
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
              <input
                v-if="isEditing"
                v-model="formData.phone"
                type="tel"
                class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p v-else class="text-slate-900">{{ authStore.user?.phone }}</p>
            </div>

            <!-- Address -->
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2">Address</label>
              <input
                v-if="isEditing"
                v-model="formData.address"
                type="text"
                class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p v-else class="text-slate-900">{{ authStore.user?.address }}</p>
            </div>
          </div>

          <!-- Account Info -->
          <div class="mt-8 pt-8 border-t border-slate-200">
            <h3 class="text-lg font-semibold text-slate-900 mb-4">Account Information</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-slate-50 p-4 rounded-lg">
                <p class="text-sm text-slate-600">Account ID</p>
                <p class="font-mono text-sm text-slate-900 mt-1">{{ authStore.user?.id }}</p>
              </div>
              <div class="bg-slate-50 p-4 rounded-lg">
                <p class="text-sm text-slate-600">Member Since</p>
                <p class="text-sm text-slate-900 mt-1">{{ joinedDate }}</p>
              </div>
            </div>
          </div>

          <!-- Danger Zone -->
          <div class="mt-8 pt-8 border-t border-red-200 bg-red-50 p-6 rounded-lg">
            <h3 class="text-lg font-semibold text-red-900 mb-2">Danger Zone</h3>
            <p class="text-sm text-red-700 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
            <button
              class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
