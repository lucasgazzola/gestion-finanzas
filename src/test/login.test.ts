import request from 'supertest'
import app from '../app'
import {
  deleteUserService,
  getUserByEmailService,
  registerUserService,
} from '../services/userService'
import { testUser } from './data'

const { email, password } = testUser

beforeAll(async () => {
  console.log('Running tests...')
  // Elimina el usuario de prueba en caso de que exista
  const isUser = await getUserByEmailService(email)
  if (isUser) {
    await deleteUserService(email)
  }
})

describe('Login de usuarios', () => {
  it('Debe iniciar sesión', async () => {
    // Registra el usuario antes de intentar loguearse
    await registerUserService(testUser)
    const response = await request(app).post('/api/auth/login').send({
      email,
      password,
    })
    expect(response.status).toBe(200)
  })
})

afterAll(async () => {
  // Elimina el usuario de prueba después de todos los tests
  await deleteUserService(email)
})
