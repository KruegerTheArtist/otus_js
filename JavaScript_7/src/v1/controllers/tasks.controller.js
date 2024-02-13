const tasksService = require('../services/tasks.service');

const getAllTasks = (req, res) => {
    const allTasks = tasksService.getAllTasks();
    res.send(JSON.stringify(allTasks));
};

const getOneTask = (req, res) => {
    const { query } = req;
    console.log(query);
    const task = tasksService.getOneTask(query.taskId);
    res.status(200).send({
        status: 'OK',
        data: task,
    });
};

const createNewTask = (req, res) => {
    const { body } = req;
    if (
        !body.id ||
        !body.tag ||
        !body.level ||
        !body.description
    ) {
        return;
    }
    const task = {
        id: body.id,
        tag: body.tag,
        level: body.level,
        description: body.description,
    };
    const createdTask = tasksService.createNewTask(task);
    res.status(201).send({
        status: 'OK',
        data: createdTask,
    });
};

const updateOneTask = (req, res) => {
    const { body } = req;
    if (
        !body.id ||
        !body.tag ||
        !body.level ||
        !body.description
    ) {
        return;
    }
    const task = {
        id: body.id,
        tag: body.tag,
        level: body.level,
        description: body.description,
    };
    const updatedTask = tasksService.updateOneTask(task);
    res.status(201).send({
        status: 'OK',
        data: updatedTask,
    });
};

const deleteOneTask = (req, res) => {
    const { query } = req;
    tasksService.deleteOneTask(query.taskId);
    res.status(200).send({
        status: 'OK',
    });
};

module.exports = {
    getAllTasks,
    getOneTask,
    createNewTask,
    updateOneTask,
    deleteOneTask,
};