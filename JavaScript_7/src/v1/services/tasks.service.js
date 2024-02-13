const { createNewTaskInToData, updateTaskInToData, deleteTaskInToData } = require('../../data/data');
const data = require('../../data/data.json');
const getAllTasks = () => {
    return data.tasks;
};

const getOneTask = (taskId) => {
    return data.tasks.find(x => x.id === taskId) || `Задача с id ${taskId} не найдена`;
};

const createNewTask = (task) => {
    const createdTast = createNewTaskInToData(task);
    return createdTast;
};

const updateOneTask = (task) => {
    const updatedTast = updateTaskInToData(task);
    return updatedTast;
};

const deleteOneTask = (taskId) => {
    deleteTaskInToData(taskId);
    return;
};

module.exports = {
    getAllTasks,
    getOneTask,
    createNewTask,
    updateOneTask,
    deleteOneTask,
};