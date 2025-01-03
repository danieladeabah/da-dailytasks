import { useAuthenticationStore } from '@/store/auth'

export const useAuth = () => {
  const authStore = useAuthenticationStore()
  const isLoggedIn = computed(() => !!authStore.token)

  onMounted(() => {
    authStore.loadToken()
  })

  return { isLoggedIn }
}
