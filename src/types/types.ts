export interface Task {
  isChecked: any
  id: string
  user_id: string
  name: string
  deadline: string
  description: string
  isPrivate: number
  user: {
    id: string
    first_name: string
    last_name: string
    profile_image: string
  }
  assignees: {
    user_id: string
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
