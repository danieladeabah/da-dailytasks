export interface Task {
  id: string
  user_id: string
  name: string
  deadline: string
  description: string
  isPrivate: boolean
  assignees: {
    id: string
    name: string
    email: string
    image: string
  }[]
  subTasks: {
    id: string
    isChecked?: boolean
    name: string
  }[]
  progress: number
}
