<script setup>
import { useNotificationsStore } from '@/stores/notifications'
import NotificationItem from './NotificationItem.vue'
import { TransitionGroup } from 'vue'

const notificationsStore = useNotificationsStore()
</script>

<template>
  <div class="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
    <TransitionGroup name="notification">
      <NotificationItem
        v-for="notification in notificationsStore.notifications"
        :key="notification.id"
        :notification="notification"
        @close="notificationsStore.removeNotification(notification.id)"
      />
    </TransitionGroup>
  </div>
</template>

<style scoped>
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
