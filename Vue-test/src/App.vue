<script setup>
import { RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import NotificationCenter from '@/components/Notifications/NotificationCenter.vue'

const authStore = useAuthStore()
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
    <RouterView />
    <NotificationCenter />
  </div>
</template>

<style scoped>
/* Global transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
