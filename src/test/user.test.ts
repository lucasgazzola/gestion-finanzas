import request from 'supertest'

import app from '../app'

import dbClient from '../database/client'
import { deleteUserService } from '../services/userService'

const testUser = {
  name: 'Juan Perez',
  email: 'jpasd@example.com',
  password: 'password123',
}

beforeAll(async () => {
  console.log('Running tests...')
  // delete user John Doe
  const { email } = testUser
  await deleteUserService(email)
})

describe('Registro de usuarios', () => {
  const { name, email, password } = testUser
  it('Debe crear un nuevo usuario', async () => {
    const response = await request(app).post('/api/users').send({
      name,
      email,
      password,
      confirmPassword: password,
    })
    console.log(response.body)
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
  // delete user John Doe
  const { email } = testUser
  await dbClient.user.deleteMany({
    where: {
      email,
    },
  })
})
