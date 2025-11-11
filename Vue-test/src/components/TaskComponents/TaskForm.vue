<script setup>
import { ref } from 'vue'
import { useTasksStore } from '@/stores/tasks'
import { useNotificationsStore } from '@/stores/notifications'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const tasksStore = useTasksStore()
const notificationsStore = useNotificationsStore()

const formData = ref({
  title: '',
  description: '',
  priority: 'medium',
  status: 'pending'
})

const isLoading = ref(false)

const handleSubmit = async () => {
  if (!formData.value.title.trim()) {
    notificationsStore.addNotification({
      type: 'error',
      message: 'Task title is required'
    })
    return
  }

  isLoading.value = true

  try {
    await tasksStore.createTask(formData.value)
    
    // Reset form
    formData.value = {
      title: '',
      description: '',
      priority: 'medium',
      status: 'pending'
    }

    notificationsStore.addNotification({
      type: 'success',
      message: 'Task created successfully!'
    })
  } catch (error) {
    notificationsStore.addNotification({
      type: 'error',
      message: 'Failed to create task'
    })
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <Card class="sticky top-24">
    <CardHeader>
      <CardTitle class="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Add New Task
      </CardTitle>
      <CardDescription>Create a new task to track your work</CardDescription>
    </CardHeader>

    <CardContent>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="space-y-2">
          <Label for="title">Task Title *</Label>
          <Input
            id="title"
            v-model="formData.title"
            placeholder="Enter task title"
            :disabled="isLoading"
          />
        </div>

        <div class="space-y-2">
          <Label for="description">Description</Label>
          <Textarea
            id="description"
            v-model="formData.description"
            placeholder="Add more details..."
            rows="4"
            :disabled="isLoading"
          />
        </div>

        <div class="space-y-2">
          <Label for="priority">Priority</Label>
          <Select v-model="formData.priority" :disabled="isLoading">
            <SelectTrigger>
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" class="w-full" :disabled="isLoading">
          <span v-if="!isLoading" class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Create Task
          </span>
          <span v-else class="flex items-center gap-2">
            <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Creating...
          </span>
        </Button>
      </form>
    </CardContent>
  </Card>
</template>
