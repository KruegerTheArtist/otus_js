import { type Response, type Request } from 'express'
import { getAllData } from '../../data/data'
import { updateOneTask as updateOneTaskService, deleteOneTask as deleteOneTaskService, createNewTask as createNewTaskService, getOneTask as getOneTaskService } from '../services/tasks.service'

export const getAllTasks = (req: Request, res: Response): void => {
  const allTasks = getAllData().tasks
  res.send(JSON.stringify(allTasks))
}

export const getOneTask = (req: Request, res: Response): void => {
  const { query } = req
  const task = getOneTaskService(String(query.taskId))
  if (typeof task === 'string') {
    res.status(400).send({
      status: 'BadRequest',
      data: task
    })
  } else {
    res.status(200).send({
      status: 'OK',
      data: task
    })
  }
}

export const createNewTask = (req: Request, res: Response): void => {
  const { body } = req
  if (
    !body.id ||
        !body.tag ||
        !body.level ||
        !body.description
  ) {
    return
  }
  const task = {
    id: body.id,
    tag: body.tag,
    level: body.level,
    description: body.description
  }
  const createdTask = createNewTaskService(task)
  res.status(201).send({
    status: 'OK',
    data: createdTask
  })
}

export const updateOneTask = (req: Request, res: Response): void => {
  const { body } = req
  if (
    !body.id ||
        !body.tag ||
        !body.level ||
        !body.description
  ) {
    return
  }
  const task = {
    id: body.id,
    tag: body.tag,
    level: body.level,
    description: body.description
  }
  const updatedTask = updateOneTaskService(task)
  res.status(201).send({
    status: 'OK',
    data: updatedTask
  })
}

export const deleteOneTask = (req: Request, res: Response): void => {
  const { query } = req
  deleteOneTaskService(String(query.taskId))
  res.status(200).send({
    status: 'OK'
  })
}
