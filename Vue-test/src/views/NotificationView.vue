<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useNotificationsStore } from '@/stores/notifications'

const router = useRouter()
const authStore = useAuthStore()
const notificationsStore = useNotificationsStore()

const sortedNotifications = computed(() => 
  [...notificationsStore.notifications].sort((a, b) => b.timestamp - a.timestamp)
)

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}

const handleClearAll = () => {
  if (confirm('Clear all notifications?')) {
    notificationsStore.clearAll()
  }
}

const handleMarkAsRead = (id) => {
  notificationsStore.markAsRead(id)
}

const handleMarkAllAsRead = () => {
  notificationsStore.markAllAsRead()
}

const getTypeIcon = (type) => {
  const icons = {
    success: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    error: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
    warning: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
    info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
  }
  return icons[type] || icons.info
}

const getTypeColor = (type) => {
  const colors = {
    success: 'bg-green-100 text-green-700 border-green-300',
    error: 'bg-red-100 text-red-700 border-red-300',
    warning: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    info: 'bg-blue-100 text-blue-700 border-blue-300'
  }
  return colors[type] || colors.info
}

const formatTime = (timestamp) => {
  const date = new Date(timestamp)
  return date.toLocaleString()
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
    <!-- Header -->
    <header class="bg-white shadow-sm sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-slate-900">Notifications</h1>
        <button
          @click="handleLogout"
          class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-4xl mx-auto px-4 py-8">
      <!-- Navigation -->
      <div class="mb-6 flex gap-2">
        <router-link to="/dashboard" class="px-4 py-2 text-slate-600 hover:text-slate-900">
          ← Back to Tasks
        </router-link>
        <router-link to="/profile" class="px-4 py-2 text-slate-600 hover:text-slate-900">
          Profile
        </router-link>
      </div>

      <!-- Notifications Stats -->
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <div class="bg-white p-4 rounded-lg shadow-sm">
          <p class="text-slate-600 text-sm">Total</p>
          <p class="text-2xl font-bold text-slate-900">{{ notificationsStore.notifications.length }}</p>
        </div>
        <div class="bg-white p-4 rounded-lg shadow-sm">
          <p class="text-slate-600 text-sm">Unread</p>
          <p class="text-2xl font-bold text-slate-900">{{ notificationsStore.unreadCount }}</p>
        </div>
        <div class="bg-white p-4 rounded-lg shadow-sm col-span-2 md:col-span-1">
          <p class="text-slate-600 text-sm">Read</p>
          <p class="text-2xl font-bold text-slate-900">{{ notificationsStore.notifications.length - notificationsStore.unreadCount }}</p>
        </div>
      </div>

      <!-- Actions -->
      <div v-if="notificationsStore.notifications.length > 0" class="mb-6 flex gap-2">
        <button
          @click="handleMarkAllAsRead"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
        >
          Mark all as read
        </button>
        <button
          @click="handleClearAll"
          class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
        >
          Clear all
        </button>
      </div>

      <!-- Notifications List -->
      <div class="bg-white rounded-lg shadow-sm">
        <div v-if="notificationsStore.notifications.length === 0" class="p-8 text-center">
          <svg class="mx-auto h-12 w-12 text-slate-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <p class="text-slate-600 font-medium">No notifications yet</p>
          <p class="text-slate-500 text-sm mt-1">Your notifications will appear here</p>
        </div>

        <div v-else class="divide-y">
          <div
            v-for="notification in sortedNotifications"
            :key="notification.id"
            class="p-4 border-l-4 hover:bg-slate-50 transition-colors cursor-pointer"
            :class="[
              getTypeColor(notification.type),
              !notification.read ? 'border-l-blue-600' : 'border-l-slate-300'
            ]"
            @click="handleMarkAsRead(notification.id)"
          >
            <div class="flex items-start justify-between">
              <div class="flex items-start gap-3 flex-1">
                <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path :d="getTypeIcon(notification.type)" />
                </svg>
                <div class="flex-1">
                  <p class="font-medium">{{ notification.message }}</p>
                  <p class="text-xs mt-1 opacity-75">{{ formatTime(notification.timestamp) }}</p>
                </div>
              </div>
              <div v-if="!notification.read" class="flex-shrink-0 ml-2">
                <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-600 text-white">
                  New
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
