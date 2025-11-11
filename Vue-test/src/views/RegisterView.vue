<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

const router = useRouter()
const authStore = useAuthStore()

const formData = ref({
  name: '',
  email: '',
  phone: '',
  address: '',
  password: '',
  password_confirmation: ''
})

const isLoading = ref(false)
const error = ref(null)

const handleRegister = async () => {
  if (formData.value.password !== formData.value.password_confirmation) {
    error.value = 'Passwords do not match'
    return
  }

  isLoading.value = true
  error.value = null

  try {
    await authStore.register(formData.value)
    router.push('/dashboard')
  } catch (err) {
    error.value = err.response?.data?.message || 'Registration failed'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4 py-12">
    <Card class="w-full max-w-2xl shadow-2xl">
      <CardHeader class="space-y-1 text-center">
        <div class="flex justify-center mb-4">
          <div class="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
        </div>
        <CardTitle class="text-2xl font-bold">Create an Account</CardTitle>
        <CardDescription>Fill in your details to get started</CardDescription>
      </CardHeader>

      <CardContent class="space-y-4">
        <Alert v-if="error" variant="destructive">
          <AlertDescription>{{ error }}</AlertDescription>
        </Alert>

        <form @submit.prevent="handleRegister" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label for="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                v-model="formData.name"
                required
                :disabled="isLoading"
              />
            </div>

            <div class="space-y-2">
              <Label for="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                v-model="formData.email"
                required
                :disabled="isLoading"
              />
            </div>

            <div class="space-y-2">
              <Label for="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1234567890"
                v-model="formData.phone"
                required
                :disabled="isLoading"
              />
            </div>

            <div class="space-y-2">
              <Label for="address">Address</Label>
              <Input
                id="address"
                placeholder="123 Main St"
                v-model="formData.address"
                required
                :disabled="isLoading"
              />
            </div>

            <div class="space-y-2">
              <Label for="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                v-model="formData.password"
                required
                :disabled="isLoading"
              />
            </div>

            <div class="space-y-2">
              <Label for="password_confirmation">Confirm Password</Label>
              <Input
                id="password_confirmation"
                type="password"
                placeholder="••••••••"
                v-model="formData.password_confirmation"
                required
                :disabled="isLoading"
              />
            </div>
          </div>

          <Button
            type="submit"
            class="w-full"
            :disabled="isLoading"
          >
            <span v-if="!isLoading">Create Account</span>
            <span v-else class="flex items-center gap-2">
              <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating account...
            </span>
          </Button>
        </form>
      </CardContent>

      <CardFooter class="flex flex-col space-y-2">
        <div class="text-sm text-center text-slate-600 dark:text-slate-400">
          Already have an account?
          <router-link to="/login" class="text-blue-600 hover:underline font-medium">
            Sign in
          </router-link>
        </div>
      </CardFooter>
    </Card>
  </div>
</template>
