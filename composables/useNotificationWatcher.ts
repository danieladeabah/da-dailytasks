import { useAuthenticationStore } from "@/store/auth";
import { useTasksStore } from "@/store/tasks";

type NotificationColor = "blue" | "red" | "green";

export function useNotificationWatcher() {
  const AuthStore = useAuthenticationStore();
  const TaskStore = useTasksStore();
  const toast = useToast();

  const watchNotifications = (
    store: any,
    colorMap: { success: NotificationColor; error: NotificationColor }
  ) => {
    watch(
      () => store.success || store.error,
      (newToastNotification) => {
        if (newToastNotification) {
          toast.add({
            title: newToastNotification,
            timeout: 2000,
            color: store.error ? colorMap.error : colorMap.success,
          });
          store.clearSuccessAfterDelay();
        }
      }
    );
  };

  // Watch notifications for AuthStore and TaskStore
  watchNotifications(AuthStore, { success: "blue", error: "red" });
  watchNotifications(TaskStore, { success: "green", error: "red" });
}
