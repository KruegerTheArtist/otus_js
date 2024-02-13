import axios from 'axios'
import bodyParser from 'body-parser'
import express, { type Application } from 'express'
import tasksRouter from './src/v1/routes/tasksRouter'
import identityRouter from './src/v1/routes/identityRouter'
import { type ITask } from './src/shared/interfaces/task.interface'
import { Level } from './src/shared/enums/level.enum'

const app: Application = express()
const PORT = (process.env.PORT != null) || 3000

app.use(bodyParser.json())
app.use('/api/v1/tasks', tasksRouter)
app.use('/api/v1/identity', identityRouter)

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`)
})

let testedUser = { id: undefined, phoneNumber: '+79998887766', password: 'password' }
let token: string | undefined

// Testing
/** Логин пользователя */
async function login (): Promise<void> {
  await axios.post(`http://localhost:${PORT}/api/v1/identity/login`, testedUser, {
    headers: {
      Authorization: ''
    }
  })
    .then(function (response) {
      if (response.status === 200) {
        console.log(`Логин успешный пользователя c id:${testedUser.id}`)
        token = response.data.token
      }
    })
    .catch(function (error) {
      console.log(`Войти пользователю c id:${testedUser.id} не удалось`)
      console.error(`${error}`)
    })
}
/** Логаут пользователя */
async function logout (id: string): Promise<void> {
  await axios.delete(`http://localhost:${PORT}/api/v1/identity/logout/identity/?userId=${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(function (response) {
      if (response.status === 200) {
        console.log('Разлогин прошел успешно')
      }
    })
    .catch(function (error) {
      console.log('Выйти не удалось')
      console.error(`${error}`)
    })
}

/** Создать задачу */
async function addTask (testedTask: ITask): Promise<void> {
  await axios.post(`http://localhost:${PORT}/api/v1/tasks/create`, testedTask, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(function (response) {
      if (response.status === 201) {
        console.log(`Задача c id:${response.data.data.id} создана`)
      }
    })
    .catch(function (error) {
      console.log('Задачу создать не удалось')
      console.error(`${error}`)
    })
}

/** Проверить, есть ли такая задача по ID */
async function checkTaskWithId (id: string): Promise<void> {
  await axios.get(`http://localhost:${PORT}/api/v1/tasks/tasks?${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(function (response) {
      if (response.status === 200) {
        console.log(`Задача c id:${id} прочитана`)
      }
    })
    .catch(function (error) {
      console.log('Задачу найти не удалось')
      console.error(`${error}`)
    })
}

/** Обновить задачу */
async function updateTask (testedTask: ITask): Promise<void> {
  await axios.patch(`http://localhost:${PORT}/api/v1/tasks/tasks?${testedTask.id}`, testedTask, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(function (response) {
      if (response.status === 201) {
        console.log(`Задача c id:${response.data.data.id} взята в работу`)
      }
    })
    .catch(function (error) {
      console.log('Задачу найти не удалось')
      console.error(`${error}`)
    })
}

/** Удалить задачу */
async function deleteTask (id: string): Promise<void> {
  await axios.delete(`http://localhost:${PORT}/api/v1/tasks/tasks?taskId=${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(async function (response) {
      if (response.status === 200) {
        console.log(`Задача c id:${id} удалена, потому что была выполнена`)
        // Проверить что удалилась
        await checkTaskWithId(id)
      }
    })
    .catch(function (error) {
      console.log('Задачу найти не удалось')
      console.error(`${error}`)
    })
}

/** Тестовые запросы для проверки */
axios.post(`http://localhost:${PORT}/api/v1/identity/register`, testedUser)
  .then(async function (response) {
    if (response.status === 201) {
      testedUser = response.data?.data
      console.log(`Зарегистрировал пользователя с номером телефона:${testedUser.phoneNumber}`)
      // Логин
      await login()
      const testedTask: ITask = { id: '111', description: 'Что то о чем - то', level: Level.Medium, tag: 'Тэг' }
      // Создал задачу
      await addTask(testedTask)
      const workedTask = testedTask
      workedTask.description = 'Взята в работу'
      // Обновил задачу
      await updateTask(workedTask)
      // Завершил задачу
      await deleteTask(testedTask.id)
    }
  })
  .catch(function (error) {
    console.log(`Зарегистрировать пользователя с номером телефона:${testedUser.phoneNumber} не удалось`)
    console.error(error)
  })

setTimeout(async (): Promise<void> => {
  await logout(String(testedUser.id))
}, 5000)
