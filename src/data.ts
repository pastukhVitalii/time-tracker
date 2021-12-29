export type ITask = {
  id: string
  task_name: string
  create_date: string
  update_date: string
  time: number
  project_id: string
  user_id: string
}

export interface IProject {
  id: string
  title?: string
  addedDate?: string
  lastUpdate?: string
  workers?: Array<string>
  projectname?: string,
  createdate?: string,
  updatedate?: string,
  time?: string,
  user_id?: string,
}

export interface IUserRes {
  id: string | undefined
  email: string
  password?: string
  name: string
}

export interface IUserReq {
  email: string
  password: string
  name: string
}
