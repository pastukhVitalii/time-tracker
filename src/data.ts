export type ITask = {
  id: string
  title: string
  duration: number
  lastUpdate: string
}

export interface IProject {
  id: string
  title: string
  addedDate: string
  lastUpdate: string
  workers?: Array<string>
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

export const tasks: Array<ITask> = [
  {
    id: 't1',
    title: 'Add style',
    duration: 180,
    lastUpdate: '01/09/21',
  },
  {
    id: 't1',
    title: 'refactoring',
    duration: 70,
    lastUpdate: '11/09/21',
  }
]
