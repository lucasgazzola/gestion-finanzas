import { type User } from '@prisma/client'

export default User

import { Budget, Goal, Transaction } from './'

export type UserDto = {
  id: number
  name: string
  email: string
  balance: number
  createdAt: Date
  updatedAt: Date
  budgets: Budget[]
  goals: Goal[]
  transactions: Transaction[]
}

type UserInfo = {
  user: User
  budgets: Budget[]
  goals: Goal[]
  transactions: Transaction[]
}

export const toUserDto = (userInfo: UserInfo): UserDto => {
  return {
    id: userInfo.user.id,
    name: userInfo.user.name,
    email: userInfo.user.email,
    balance: userInfo.user.balance,
    createdAt: userInfo.user.createdAt,
    updatedAt: userInfo.user.updatedAt,
    budgets: userInfo.budgets,
    goals: userInfo.goals,
    transactions: userInfo.transactions,
  }
}
