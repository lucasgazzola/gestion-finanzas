import request from 'supertest'

import app from '../app'

import dbClient from '../database/client'

const testUser = {
  name: 'Juan Perez',
  email: 'jpasd@example.com',
  password: 'password123',
}

beforeAll(async () => {
  console.log('Running tests...')
  // delete user John Doe
  const { email } = testUser
  await dbClient.user.deleteMany({
    where: {
      email,
    },
  })
})

describe('Test de CRUD de Usuarios', () => {
  const { name, email, password } = testUser
  it('Debe crear un nuevo usuario', async () => {
    const response = await request(app).post('/api/users').send({
      name,
      email,
      password,
    })
    expect(response.status).toBe(201)
  })

  it('Debe devolver un error si el usuario ya existe', async () => {
    const response = await request(app).post('/api/users').send({
      name,
      email,
      password,
    })
    expect(response.status).toBe(400)
  })

  it('Debe devolver todos los usuarios', async () => {
    const response = await request(app).get('/api/users')
    expect(response.status).toBe(200)
  })
})
