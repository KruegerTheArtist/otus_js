import express from 'express'
import { getAllTasks, getOneTask, createNewTask, updateOneTask, deleteOneTask } from '../controllers/tasks.controller'

const router = express.Router()

router.get('/list', getAllTasks)

router.get('/:taskId', getOneTask)

router.post('/create', createNewTask)

router.patch('/:taskId', updateOneTask)

router.delete('/:taskId', deleteOneTask)

export default router
