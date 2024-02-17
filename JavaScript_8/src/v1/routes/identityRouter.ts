import express from 'express'
import { login, logout, register } from '../controllers/identity.controller'
const router = express.Router()

router.post('/register', register)

router.post('/login', login)

router.delete('/logout/:userId', logout)

export default router
