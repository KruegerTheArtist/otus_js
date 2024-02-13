const identityService = require('../services/identity.service');

const login = (req, res) => {
    const { body } = req;
    if (!body.id || !body.phoneNumber || !body.password) {
        return res.status(401).send({
            status: 'Unauthorized'
        });
    }
    identityService.login({ id: body.id, phoneNumber: body.phoneNumber, password: body.password });
    res.status(200).send({
        status: 'OK',
        token: 'token123'
    });
};


const register = (req, res) => {
    const { body } = req;
    if (!body.phoneNumber || !body.password) {
        return
    }
    const createUser = identityService.createNewUser({ id: Math.random(0, 99), phoneNumber: body.phoneNumber, password: body.password });
    res.status(201).send({
        status: 'OK',
        data: createUser,
    });
};

const logout = (req, res) => {
    const { query } = req;
    identityService.logout(query.userId);
    res.status(200).send({
        status: 'OK',
    });
};

const getUserList = (req, res) => {
    const task = identityService.getAllUsers();
    res.send(JSON.stringify(task));
};

const updateOneUser = (req, res) => {
    const { body } = req;
    if (
        !body.id ||
        !body.phoneNumber ||
        !body.password
    ) {
        return;
    }
    const task = {
        id: body.id,
        phoneNumber: body.phoneNumber,
        password: body.password
    };
    const updatedTask = identityService.updateOneUser(task);
    res.status(201).send({
        status: 'OK',
        data: updatedTask,
    });
};

const deleteOneUser = (req, res) => {
    const { query } = req;
    identityService.deleteOneUser(query.userId);
    res.status(201).send({
        status: 'OK',
    });
};

module.exports = {
    getUserList,
    register,
    login,
    logout,
    updateOneUser,
    deleteOneUser,
};