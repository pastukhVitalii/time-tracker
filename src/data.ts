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
  id: string
  email: string
  password: string
}

export interface IUserReq {
  email: string
  password: string
}

export const projects: Array<IProject> = [
  {
    id: '1',
    title: 'Halo lab',
    addedDate: '17/01/21',
    lastUpdate: '18/01/21',
    workers: ["Vitaliy"],

  },
  {
    id: '2',
    title: 'Mav-farm',
    addedDate: '07/09/2021',
    lastUpdate: '08/09/2021',
    workers: ["Vitaliy"],
  }
];
