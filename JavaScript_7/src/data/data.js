const { saveToData } = require('../utils/save-to-data');
const data = require('./data.json');

const getAllTasksFromData = () => {
    return data.tasks;
};

const createNewUserToData = (user) => {
    const finedIndex = data?.users?.findIndex(
        (u) => u.phoneNumber === user.phoneNumber
    );
    const isAlreadyAdded = finedIndex > -1;
    if (isAlreadyAdded) {
        return data.users[finedIndex];
    }
    data.users.push(user);
    saveToData(data);
    return user;
};

const createNewTaskInToData = (newTask) => {
    const isAlreadyAdded =
        data?.tasks?.findIndex(
            (task) => task.id === newTask.id
        ) > -1;
    if (isAlreadyAdded) {
        return;
    }
    data.tasks.push(newTask);
    saveToData(data);
    return newTask;
};

const updateTaskInToData = (newTask) => {
    const findedIndex = data?.tasks?.findIndex(
        (task) => task.id === newTask.id
    )
    const isNotExist = findedIndex === -1;
    if (isNotExist) {
        return;
    }
    data.tasks[findedIndex] = newTask;
    saveToData(data);
    return newTask;
};

const deleteTaskInToData = (taskId) => {
    console.log(data);
    const findedIndex = data.tasks.findIndex(
        (task) => task.id === taskId
    )
    const isNotExist = findedIndex === -1;
    if (isNotExist) {
        return;
    }
    const newData = data?.tasks?.filter(task => task.id !== taskId);
    data.tasks = newData;
    saveToData(data);
    return;
};

const logoutUser = (userId) => {
    console.log(data);
    const findedIndex = data.tasks.findIndex(
        (task) => task.id === taskId
    )
    const isNotExist = findedIndex === -1;
    if (isNotExist) {
        return;
    }

    if (signedUsersId.includes(userId)) {
        signedUsersId = signedUsersId.filter(x => x !== userId);
        usersTokens = usersTokens.filter(x => x !== userId);
        sa
    }
    const newData = data?.users?.filter(user => user.id !== userId);
    data.taskId = newData;
    saveToData(data);
    return;
};

module.exports = {
    getAllTasksFromData,
    createNewTaskInToData,
    updateTaskInToData,
    deleteTaskInToData,
    createNewUserToData,
    logoutUser
};