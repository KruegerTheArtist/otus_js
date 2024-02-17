import { createNewTaskInToData, deleteTaskInToData, getAllData, updateTaskInToData } from '../../data/data'
import { type ITask } from '../../shared/interfaces/task.interface'

export const getAllTasks = (): ITask[] => {
  return getAllData().tasks
}

export const getOneTask = (taskId: string): ITask | null | string => {
  const findenTask = getAllData().tasks.find(x => x.id === taskId)
  if (findenTask !== undefined) {
    return findenTask
  }
  return `Задача с id ${taskId} не найдена`
}

export const createNewTask = (task: ITask): ITask => {
  const createdTast = createNewTaskInToData(task)
  return createdTast
}

export const updateOneTask = (task: ITask): ITask | undefined => {
  const updatedTast = updateTaskInToData(task)
  return updatedTast
}

export const deleteOneTask = (taskId: string): void => {
  deleteTaskInToData(taskId)
}
