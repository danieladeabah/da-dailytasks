import type { Task } from "~/types/types";

export const calculateTaskProgress = (task: Task) => {
    const totalSubTasks = task.subTasks.length;
    if (totalSubTasks === 0) return 0;
  
    const completedSubTasks = task.subTasks.filter(
      (subTask) => subTask.isChecked
    ).length;
    return Math.round((completedSubTasks / totalSubTasks) * 100);
  };