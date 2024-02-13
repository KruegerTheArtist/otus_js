import { type Level } from '../enums/level.enum'

/** Модель задачи */
export interface ITask {
  /** Идентификатор задачи */
  id: string
  /** Тег */
  tag: string
  /** Уровень сложности */
  level: Level
  /** Описание */
  description: string
}
