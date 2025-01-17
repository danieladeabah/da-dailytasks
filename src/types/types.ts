export interface Task {
  id: string
  isChecked?: boolean
  user_id: string
  name: string
  deadline: string
  description: string
  isPrivate: boolean
  user: {
    id: string
    first_name: string
    last_name: string
    profile_image: string
    created_at: string
    updated_at: string
  }
  assignees: {
    user_id: string
    id: string
    first_name: string
    last_name: string
    profile_image: string
    email: string
    created_at: string
    updated_at: string
  }[]
  subTasks: {
    id: string
    isChecked?: boolean
    name: string
  }[]
  progress: number
  created_at: string
  updated_at: string
}
