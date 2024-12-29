import { useAuthenticationStore } from '@/store/auth'

export default defineNuxtRouteMiddleware(() => {
  const store = useAuthenticationStore()

  if (!store.token) {
    return Promise.resolve(navigateTo('/auth/login'))
  }
  return Promise.resolve(true)
})
