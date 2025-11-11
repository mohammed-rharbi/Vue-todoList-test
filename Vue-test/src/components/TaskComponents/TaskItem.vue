<script setup>
import { ref } from 'vue'
import { useTasksStore } from '@/stores/tasks'
import { useNotificationsStore } from '@/stores/notifications'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const tasksStore = useTasksStore()
const notificationsStore = useNotificationsStore()

const showDeleteDialog = ref(false)

const priorityColors = {
  low: 'bg-slate-100 text-slate-700 border-slate-300',
  medium: 'bg-blue-100 text-blue-700 border-blue-300',
  high: 'bg-orange-100 text-orange-700 border-orange-300',
  urgent: 'bg-red-100 text-red-700 border-red-300'
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-700 border-yellow-300',
  in_progress: 'bg-blue-100 text-blue-700 border-blue-300',
  completed: 'bg-green-100 text-green-700 border-green-300'
}

const toggleComplete = async () => {
  try {
    const newStatus = props.task.status === 'completed' ? 'pending' : 'completed'
    await tasksStore.updateTask(props.task.id, { ...props.task, status: newStatus })
    
    notificationsStore.addNotification({
      type: 'success',
      message: `Task ${newStatus === 'completed' ? 'completed' : 'reopened'}!`
    })
  } catch (error) {
    notificationsStore.addNotification({
      type: 'error',
      message: 'Failed to update task'
    })
  }
}

const handleDelete = async () => {
  try {
    await tasksStore.deleteTask(props.task.id)
    notificationsStore.addNotification({
      type: 'success',
      message: 'Task deleted successfully'
    })
  } catch (error) {
    notificationsStore.addNotification({
      type: 'error',
      message: 'Failed to delete task'
    })
  }
}
</script>

<template>
  <div class="flex items-start gap-3 p-4 rounded-lg border bg-white dark:bg-slate-800 hover:shadow-md transition-shadow">
    <!-- Checkbox -->
    <Checkbox
      :checked="task.status === 'completed'"
      @update:checked="toggleComplete"
      class="mt-1"
    />

    <!-- Task Content -->
    <div class="flex-1 min-w-0">
      <div class="flex items-start justify-between gap-2 mb-1">
        <h3
          class="font-medium text-slate-900 dark:text-white"
          :class="{ 'line-through text-slate-500': task.status === 'completed' }"
        >
          {{ task.title }}
        </h3>
      </div>

      <p
        v-if="task.description"
        class="text-sm text-slate-600 dark:text-slate-400 mb-2"
        :class="{ 'line-through': task.status === 'completed' }"
      >
        {{ task.description }}
      </p>

      <!-- Badges -->
      <div class="flex flex-wrap gap-2">
        <Badge :class="priorityColors[task.priority]" variant="outline">
          {{ task.priority }}
        </Badge>
        <Badge :class="statusColors[task.status]" variant="outline">
          {{ task.status.replace('_', ' ') }}
        </Badge>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex gap-1">
      <Button variant="ghost" size="icon" class="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </Button>

      <AlertDialog>
        <AlertDialogTrigger as-child>
          <Button variant="ghost" size="icon" class="text-red-600 hover:text-red-700 hover:bg-red-50">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your task.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction @click="handleDelete" class="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  </div>
</template>
