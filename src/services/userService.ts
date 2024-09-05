import {
  createUser,
  updateUser,
  findUserByEmail,
  findUserById,
  findAllUsers,
} from '../repositories/userRepository'
import User from '../types/User'

export const registerUserService = async (data: Omit<User, 'id'>) => {
  return createUser(data)
}

export const getUserByEmailService = async (email: User['email']) => {
  return findUserByEmail(email)
}

export const getUserByIdService = async (id: User['id']) => {
  return findUserById(id)
}

export const updateUserByIdService = async (
  id: User['id'],
  data: Partial<Omit<User, 'id'>>
) => {
  return updateUser(id, data)
}

export const getAllUsersService = async () => {
  return findAllUsers()
}
