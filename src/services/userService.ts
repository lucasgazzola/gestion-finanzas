import {
  createUser,
  updateUser,
  findUserByEmail,
  findUserById,
  findAllUsers,
  deleteUser,
} from '../repositories/userRepository'
import User from '../models/User'

export const registerUserService = (data: Omit<User, 'id'>) => {
  return createUser(data)
}

export const getUserByEmailService = (email: User['email']) => {
  return findUserByEmail(email)
}

export const getUserByIdService = (id: User['id']) => {
  return findUserById(id)
}

export const updateUserByIdService = (
  id: User['id'],
  data: Partial<Omit<User, 'id'>>
) => {
  return updateUser(id, data)
}

export const deleteUserService = (email: User['email']) => {
  return deleteUser(email)
}

export const getAllUsersService = () => {
  return findAllUsers()
}
