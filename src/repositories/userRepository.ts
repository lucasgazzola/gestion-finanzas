const SALT_ROUNDS = 10

import bcrypt from 'bcrypt'

import User from '../types/User'
import dbClient from '../database/client'

export const createUser = async (data: Omit<User, 'id'>) => {
  const existingUser = await dbClient.user.findUnique({
    where: { email: data.email },
  })

  if (existingUser) {
    throw new Error('Email already exists')
  }

  // Hash de la contraseña
  const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS)

  return dbClient.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
    select: { id: true, email: true, name: true },
  })
}

export const findUserByEmail = async (email: User['email']) => {
  return dbClient.user.findUnique({
    where: { email },
  })
}

export const findUserById = async (id: User['id']) => {
  const userProfile = await dbClient.user.findUnique({
    where: { id }, // userId sería el ID del usuario autenticado
    include: {
      transactions: true,
      budgets: true,
      goals: true,
    },
  })

  if (!userProfile) {
    throw new Error('User not found')
  } else {
    const { password, ...userWithoutPassword } = userProfile
    return userWithoutPassword
  }
}

export const updateUser = async (
  id: User['id'],
  data: Partial<Omit<User, 'id'>>
) => {
  const user = await dbClient.user.findUnique({
    where: { id },
  })

  if (!user) {
    throw new Error('User not found')
  }

  if (data.password) {
    const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS)
    data.password = hashedPassword
  }

  return dbClient.user.update({
    where: { id },
    data,
  })
}

export const findAllUsers = async () => {
  return dbClient.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      balance: true,
      transactions: true,
      budgets: true,
      goals: true,
    },
  })
}

export const verifyPassword = async (
  password: string,
  hashedPassword: string
) => {
  return bcrypt.compare(password, hashedPassword)
}
