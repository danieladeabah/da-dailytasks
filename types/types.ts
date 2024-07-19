export interface Task {
  id: string;
  name: string;
  deadline: string;
  description: string;
  assignees: {
    id: string;
    name: string;
    email: string;
    image: string;
  }[];
  subTasks: {
    id: string;
    name: string;
    assignees: {
      id: string;
    }[];
  }[];
  progress: number;
}
