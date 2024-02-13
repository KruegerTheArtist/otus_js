import { type Response, type Request } from 'express'
import { login as loginService, createNewUser as createNewUserService, logout as logoutService } from '../services/identity.service'

export const login = (req: Request, res: Response): void => {
  const { body } = req
  if (!body.id || !body.phoneNumber || !body.password) {
    res.status(401).send({
      status: 'Unauthorized'
    })
  }
  loginService({ id: body.id, phoneNumber: body.phoneNumber, password: body.password })
  res.status(200).send({
    status: 'OK',
    token: 'token123'
  })
}

export const register = (req: Request, res: Response): void => {
  const { body } = req
  if (!body.phoneNumber || !body.password) {
    return
  }
  const createUser = createNewUserService({ id: Math.random(), phoneNumber: body.phoneNumber, password: body.password })
  res.status(201).send({
    status: 'OK',
    data: createUser
  })
}

export const logout = (req: Request, res: Response): void => {
  const { query } = req
  logoutService(String(query.userId))
  res.status(200).send({
    status: 'OK'
  })
}
