import request from 'supertest'
import app from '../app'
import {
  deleteUserService,
  getUserByEmailService,
} from '../services/userService'
import { testUser } from './data'

const { name, email, password } = testUser

beforeAll(async () => {
  console.log('Running tests...')

  // Elimina el usuario de prueba en caso de que exista
  const isUser = await getUserByEmailService(email)
  if (isUser) {
    await deleteUserService(email)
  }
})

describe('Registro de usuarios', () => {
  it('Debe crear un nuevo usuario', async () => {
    const response = await request(app).post('/api/users').send({
      name,
      email,
      password,
      confirmPassword: password,
    })
    expect(response.status).toBe(201)
  })

  it('Debe devolver un error si el usuario ya existe', async () => {
    const response = await request(app).post('/api/users').send({
      name,
      email,
      password,
      confirmPassword: password,
    })
    expect(response.status).toBe(400)
  })

  it('Debe devolver un error si las contraseñas son distintas', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        name,
        email,
        password,
        confirmPassword: `${password}123`,
      })
    expect(response.status).toBe(400)
  })

  it('Debe devolver un error si el email es inválido', async () => {
    const response = await request(app).post('/api/users').send({
      name,
      email: 'invalid-email',
      password,
      confirmPassword: password,
    })
    expect(response.status).toBe(400)
  })

  it('Debe devolver un error si falta algún campo', async () => {
    const response = await request(app).post('/api/users').send({
      name,
      password,
      confirmPassword: password,
    })

    expect(response.status).toBe(400)
  })
})

afterAll(async () => {
  // Elimina el usuario de prueba
  await deleteUserService(email)
})

/*
    TODO: Validar el error
    console.log(response.text)
     {"errors":[{"type":"field","msg":"Email is required","path":"email","location":"body"},{"type":"field","msg":"Invalid email","path":"email","location":"body"}]}
    */
