// In src/services/workoutService.js

import { createNewUserToData, getAllData, logoutUser } from '../../data/data'
import { type IUser } from '../../shared/interfaces/user.interface'

let signedUsersId: string[] = []
let usersTokens: Array<{ userId: string, token: string }> = []

export const getOneUserById = (userId: string): IUser | string => {
  const findenUser = getAllData().users.find(x => x.id === userId)
  if (findenUser !== undefined) {
    return findenUser
  }
  return `Пользователь с id ${userId} не найден`
}

export const login = (userId: string): void => {
  if (!signedUsersId.includes(userId)) {
    signedUsersId.push(userId)
    usersTokens.push({ userId, token: 'token123' })
  }
}

export const logout = (userId: string): void => {
  if (signedUsersId.includes(userId)) {
    signedUsersId = signedUsersId.filter(x => x !== userId)
    usersTokens = usersTokens.filter(x => x.userId !== userId)
  }
  logoutUser(userId)
}

export const createNewUser = (user: IUser): IUser => {
  const createdUser = createNewUserToData(user)
  return createdUser
}
