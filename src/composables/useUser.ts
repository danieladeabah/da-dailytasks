import { useAuthenticationStore } from '@/store/auth'

export const useUser = () => {
  const authStore = useAuthenticationStore()
  const userInfo = ref<{
    id: number | null
    first_name: string
    last_name: string
    email: string
    profile_image: string
  } | null>(null)

  onMounted(async () => {
    authStore.loadToken()
    if (authStore.token) {
      await authStore.fetchUserDetails()
      userInfo.value = authStore.getUserInfo()
    }
  })

  return { userInfo }
}
