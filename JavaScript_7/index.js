const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios')
const tasksRouter = require('./src/v1/routes/tasksRouter');
const identityRouter = require('./src/v1/routes/identityRouter');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api/v1/tasks', tasksRouter);
app.use('/api/v1/identity', identityRouter);

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
});

let testedUser = { id: undefined, phoneNumber: '+79998887766', password: 'password' }
let token = undefined;

//Testing
/** Логин пользователя */
function login() {
    return axios.post(`http://localhost:${PORT}/api/v1/identity/login`, testedUser, {
        headers: {
            Authorization: ''
        }
    })
        .then(function (response) {
            if (response.status === 200) {
                console.log(`Логин успешный пользователя c id:${testedUser.id}`);
                token = response.data.token
            }
        })
        .catch(function (error) {
            console.log(`Войти пользователю c id:${testedUser.id} не удалось`);
        });

}
/** Логаут пользователя */
function logout(id) {
    return axios.delete(`http://localhost:${PORT}/api/v1/identity/logout/identity/?userId=${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(function (response) {
            if (response.status === 200) {
                console.log(`Разлогин прошел успешно`);
            }
        })
        .catch(function (error) {
            console.log(`Выйти не удалось`);
        });

}

/** Создать задачу */
function addTask(testedTask) {
    return axios.post(`http://localhost:${PORT}/api/v1/tasks/create`, testedTask, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(function (response) {
            if (response.status === 201) {
                console.log(`Задача c id:${response.data.data.id} создана`);
            }
        })
        .catch(function (error) {
            console.log(`Задачу создать не удалось`);
        });

}

/** Проверить, есть ли такая задача по ID */
function checkTaskWithId(id) {
    axios.get(`http://localhost:${PORT}/api/v1/tasks/tasks?${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(function (response) {
            if (response.status === 200) {
                console.log(`Задача c id:${id} прочитана`);
            }
        })
        .catch(function (error) {
            console.log(`Задачу найти не удалось`);
        });

}

/** Обновить задачу */
function updateTask(testedTask) {
    return axios.patch(`http://localhost:${PORT}/api/v1/tasks/tasks?${testedTask.id}`, testedTask, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(function (response) {
            if (response.status === 201) {
                console.log(`Задача c id:${response.data.data.id} взята в работу`);
            }
        })
        .catch(function (error) {
            console.log(`Задачу найти не удалось`);
        });

}

/** Удалить задачу */
function deleteTask(id) {
    return axios.delete(`http://localhost:${PORT}/api/v1/tasks/tasks?${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(function (response) {
            if (response.status === 200) {
                console.log(`Задача c id:${id} удалена, потому что была выполнена`);
                // Проверить что удалилась
                checkTaskWithId(testedTask.id);
            }
        })
        .catch(function (error) {
            console.log(`Задачу найти не удалось`);
        });

}

/** Тестовые запросы для проверки */
axios.post(`http://localhost:${PORT}/api/v1/identity/register`, testedUser)
    .then(function (response) {
        if (response.status === 201) {
            testedUser = response.data?.data;
            console.log(`Зарегистрировал пользователя с номером телефона:${testedUser.phoneNumber}`);
            //Логин
            login();
            let testedTask = { id: '111', description: 'Что то о чем - то', level: 'Нормальный', tag: 'Тэг' }
            //Создал задачу
            addTask(testedTask);
            const workedTask = testedTask;
            workedTask.description = 'Взята в работу';
            //Обновил задачу
            updateTask(workedTask);
            //Завершил задачу
            deleteTask(testedTask.id)
        }
    })
    .catch(function (error) {
        console.log(`Зарегистрировать пользователя с номером телефона:${testedUser.phoneNumber} не удалось`);
    });

setTimeout(() => {

    logout(testedUser.id);

}, 5000)
