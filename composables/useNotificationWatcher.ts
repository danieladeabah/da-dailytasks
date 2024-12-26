import { useAuthenticationStore } from "@/store/auth";
import { useTasksStore } from "@/store/tasks";

export function useNotificationWatcher() {
  const AuthStore = useAuthenticationStore();
  const TaskStore = useTasksStore();
  const toast = useToast();

  watch(
    () => AuthStore.success || AuthStore.error,
    (newToastNotification) => {
      if (newToastNotification) {
        toast.add({
          title: newToastNotification,
          timeout: 2000,
          color: AuthStore.error ? "red" : "blue",
        });
        AuthStore.clearSuccessAfterDelay();
      }
    }
  );

  watch(
    () => TaskStore.success || TaskStore.error,
    (newToastNotification) => {
      if (newToastNotification) {
        toast.add({
          title: newToastNotification,
          timeout: 2000,
          color: TaskStore.error ? "red" : "green",
        });
        TaskStore.clearSuccessAfterDelay();
      }
    }
  );
}
