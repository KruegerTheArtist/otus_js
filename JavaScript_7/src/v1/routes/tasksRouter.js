const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasks.controller');

router.get('/list', tasksController.getAllTasks);

router.get('/:taskId', tasksController.getOneTask);

router.post('/create', tasksController.createNewTask);

router.patch('/:taskId', tasksController.updateOneTask);

router.delete('/:taskId', tasksController.deleteOneTask);

module.exports = router;