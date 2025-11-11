<script setup>
import { computed } from 'vue'
import { useTasksStore } from '@/stores/tasks'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const tasksStore = useTasksStore()

const stats = computed(() => tasksStore.stats)
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <!-- Total Tasks -->
    <Card class="border-l-4 border-l-blue-500">
      <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-sm font-medium text-slate-600 dark:text-slate-400">
          Total Tasks
        </CardTitle>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      </CardHeader>
      <CardContent>
        <div class="text-3xl font-bold text-slate-900 dark:text-white">{{ stats.total }}</div>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">All your tasks</p>
      </CardContent>
    </Card>

    <!-- Completed Tasks -->
    <Card class="border-l-4 border-l-green-500">
      <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-sm font-medium text-slate-600 dark:text-slate-400">
          Completed
        </CardTitle>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </CardHeader>
      <CardContent>
        <div class="text-3xl font-bold text-slate-900 dark:text-white">{{ stats.completed }}</div>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Tasks done</p>
      </CardContent>
    </Card>

    <!-- Pending Tasks -->
    <Card class="border-l-4 border-l-orange-500">
      <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-sm font-medium text-slate-600 dark:text-slate-400">
          Pending
        </CardTitle>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </CardHeader>
      <CardContent>
        <div class="text-3xl font-bold text-slate-900 dark:text-white">{{ stats.pending }}</div>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Tasks remaining</p>
      </CardContent>
    </Card>
  </div>
</template>
