export interface Task {
  isChecked: any
  id: string
  user_id: string
  name: string
  deadline: string
  description: string
  isPrivate: number
  assignees: {
    id: string
    name: string
    email: string
    image: string
  }[]
  subTasks: {
    id: string
    isChecked?: number
    name: string
  }[]
  progress: number
}
