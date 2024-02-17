import { type ITask } from './task.interface'
import { type IUser } from './user.interface'

/** Модель "БД" */
export interface IData {
  /** Задачи */
  tasks: ITask[]
  /** Пользователи */
  users: IUser[]
}
