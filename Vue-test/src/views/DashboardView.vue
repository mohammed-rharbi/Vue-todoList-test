<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useTasksStore } from '@/stores/tasks'
import Header from '@/components/Layout/Header.vue'
import TaskStats from '@/components/TaskComponents/TaskStats.vue'
import TaskForm from '@/components/TaskComponents/TaskForm.vue'
import TaskList from '@/components/TaskComponents/TaskList.vue'

const authStore = useAuthStore()
const tasksStore = useTasksStore()

onMounted(async () => {
  await tasksStore.fetchTasks()
})
</script>

<template>
  <div class="min-h-screen">
    <Header />
    
    <main class="container mx-auto px-4 py-8 max-w-7xl">
      <!-- Welcome Section -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Welcome back, {{ authStore.user?.name || 'User' }}! 👋
        </h1>
        <p class="text-slate-600 dark:text-slate-400">
          Here's what you need to do today
        </p>
      </div>

      <!-- Stats Section -->
      <TaskStats class="mb-8" />

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Task Form - Left Side -->
        <div class="lg:col-span-1">
          <TaskForm />
        </div>

        <!-- Task List - Right Side -->
        <div class="lg:col-span-2">
          <TaskList />
        </div>
      </div>
    </main>
  </div>
</template>
