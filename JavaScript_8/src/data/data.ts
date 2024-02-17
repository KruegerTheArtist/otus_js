import { type IData } from '../shared/interfaces/data.interface'
import { type ITask } from '../shared/interfaces/task.interface'
import { type IUser } from '../shared/interfaces/user.interface'
import { saveToData } from '../utils/save-to-data'
import data from './data.json'

/** Получить всю "БД" */
export const getAllData = (): IData => {
  return data as IData
}

export const createNewUserToData = (user: IUser): IUser => {
  const users: IUser[] = getAllData().users
  const finedIndex = users.findIndex(
    (u: IUser) => u.phoneNumber === user.phoneNumber
  )
  const isAlreadyAdded = finedIndex > -1
  if (isAlreadyAdded) {
    return users[finedIndex]
  }
  users.push(user)
  saveToData(getAllData())
  return user
}

export const createNewTaskInToData = (newTask: ITask): ITask => {
  const tasks: ITask[] = getAllData().tasks
  const finedIndex = tasks.findIndex(
    (task) => task.id === newTask.id
  )
  const isAlreadyAdded = finedIndex > -1
  if (isAlreadyAdded) {
    return tasks[finedIndex]
  }
  tasks.push(newTask)
  saveToData(getAllData())
  return newTask
}

export const updateTaskInToData = (newTask: ITask): ITask | undefined => {
  const tasks: ITask[] = getAllData().tasks
  const findedIndex = tasks.findIndex(
    (task) => task.id === newTask.id
  )
  const isNotExist = findedIndex === -1
  if (isNotExist) {
    return
  }
  tasks[findedIndex] = newTask
  saveToData(getAllData())
  return newTask
}

export const deleteTaskInToData = (taskId: string): void => {
  const tasks: ITask[] = getAllData().tasks
  const findedIndex = tasks.findIndex(
    (task) => task.id === taskId
  )
  const isNotExist = findedIndex === -1
  if (isNotExist) {
    return
  }
  const newData: ITask[] = tasks.filter(task => task.id !== taskId)
  getAllData().tasks = newData
  saveToData(getAllData())
}

export const logoutUser = (userId: string): void => {
  const users: IUser[] = getAllData().users
  const findedIndex = users.findIndex(
    (u) => u.id === userId
  )
  const isNotExist = findedIndex === -1
  if (isNotExist) {
    return
  }

  const newData = users.filter(user => user.id !== userId)
  getAllData().users = newData
  saveToData(getAllData())
}
