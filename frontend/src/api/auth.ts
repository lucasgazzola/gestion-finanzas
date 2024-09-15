import { RegisterFormData } from '../pages/Register'
import { LogInFormData } from '../pages/Login'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // Asegúrate de incluir esto
    },
    body: JSON.stringify(formData),
  })
  const responseBody = await response.json()

  if (Array.isArray(responseBody.errors)) {
    console.log(responseBody.errors[0].msg)
    throw new Error(responseBody.errors[0].msg)
  }
  if (!response.ok) {
    throw new Error(responseBody.message)
  }
}

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  })

  if (!response.ok) {
    throw new Error('Invalid token')
  }

  return response.json()
}

export const login = async (formData: LogInFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  })

  const responseBody = await response.json()

  if (Array.isArray(responseBody.errors)) {
    console.log(responseBody.errors[0].msg)
    throw new Error(responseBody.errors[0].msg)
  }
  if (!response.ok) {
    throw new Error(responseBody.message)
  }
  return responseBody
}

export const logout = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  })
  if (!response.ok) {
    throw new Error('Failed to sign out')
  }
}
