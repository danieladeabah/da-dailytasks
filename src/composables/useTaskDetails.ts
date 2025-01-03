import { useTasksStore } from '@/store/tasks'
import { useUser } from '~/composables/useUser'
import { useAuth } from '~/composables/useAuth'

export function useTaskDetails() {
  const route = useRoute()
  const { userInfo } = useUser()
  const { isLoggedIn } = useAuth()
  const tasksStore = useTasksStore()

  const trackId = route.params.tasksId as string
  const taskDetails = computed(() => tasksStore.findTaskById(trackId) || null)

  // Check task ownership
  const isTaskAdmin = computed(() => {
    return (
      taskDetails.value &&
      String(taskDetails.value.user_id) === String(userInfo.value?.id)
    )
  })

  // Disable controls for unauthorized users
  const isDisabled = computed(() => !isLoggedIn || !isTaskAdmin.value)

  return {
    taskDetails,
    isTaskAdmin,
    isDisabled
  }
}
