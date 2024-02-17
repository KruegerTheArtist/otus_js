import { type Response, type Request } from 'express'
import { login as loginService, createNewUser as createNewUserService, logout as logoutService } from '../services/identity.service'
import { type IUser } from '../../shared/interfaces/user.interface'

export const login = (req: Request, res: Response): void => {
  const { body } = req
  if (!body.id || !body.phoneNumber || !body.password) {
    res.status(401).send({
      status: 'Unauthorized'
    })
  }
  loginService(String(body.id))
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
  const user: IUser = { id: Math.random().toString(), phoneNumber: body.phoneNumber, password: body.password }
  const createUser = createNewUserService(user)
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
