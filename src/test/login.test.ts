import request from 'supertest'

import app from '../app'

import { deleteUserService, registerUserService } from '../services/userService'

const testUser = {
  name: 'Juan Perez',
  email: 'jpasd@example.com',
  password: 'password123',
}
const { name, email, password } = testUser

beforeAll(async () => {
  console.log('Running tests...')
  // delete user John Doe
  const { email } = testUser
  await deleteUserService(email)
  await registerUserService({
    ...testUser,
    createdAt: new Date(),
    updatedAt: new Date(),
    balance: 0,
  })
})

describe('Login de usuarios', () => {
  it('Debe iniciar sesión', async () => {
    const response = await request(app).post('/api/auth/login').send({
      email,
      password,
    })

    console.log(response.body)
    expect(response.status).toBe(200)

    const cookies = response.headers['set-cookie']
    expect(cookies).toBeDefined()
    // Extrae el JWT de la cookie
    const token = cookies[0].split(';')[0].split('=')[1]
    console.log(token)
    // Ahora puedes usar `token` en las siguientes peticiones protegidas
    const protectedResponse = await request(app)
      .get('/api/auth/validate-token')
      .set('Cookie', `auth_token=${token}`) // Incluye la cookie en la solicitud

    // Verifica que el acceso protegido fue permitido
    expect(protectedResponse.status).toBe(200)
  })
})
