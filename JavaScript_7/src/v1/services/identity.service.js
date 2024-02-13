// In src/services/workoutService.js

const { logoutUser, updateTaskInToData, deleteTaskInToData, createNewUserToData } = require('../../data/data');
const data = require('../../data/data.json');

const signedUsersId = [];
const usersTokens = [];

const getAllUsers = () => {
    return data.users;
};

const getOneUserById = (userId) => {
    return data.users.find(x => x.id === userId) || `Пользователь с id ${userId} не найден`;
};

const login = (userId) => {
    if (!signedUsersId.includes(userId)) {
        signedUsersId.push(userId);
        usersTokens.push({userId, token: 'token123'})
    }
};

const logout = (userId) => {
    if (signedUsersId.includes(userId)) {
        signedUsersId = signedUsersId.filter(x => x !== userId);
        usersTokens = usersTokens.filter(x => x !== userId);
    }
    logoutUser(userId)
};

const createNewUser = (user) => {
    const createdUser = createNewUserToData(user);
    return createdUser;
};

const updateOneUser = (user) => {
    const updatedTast = updateTaskInToData(user);
    return updatedTast;
};

const deleteOneUser = (userId) => {
    deleteTaskInToData(userId);
    return;
};

module.exports = {
    getAllUsers,
    getOneUserById,
    createNewUser,
    updateOneUser,
    deleteOneUser,
    login,
    logout
};