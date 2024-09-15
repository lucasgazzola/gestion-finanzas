import { Request, Response } from 'express'
import { body } from 'express-validator'
import jwt from 'jsonwebtoken'

import { findUserByEmail, verifyPassword } from '../repositories/userRepository'
import { handleValidationErrors } from '../middlewares/validationMiddleware'
import { toUserDto } from '../models/User'

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'

export const loginController = [
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email must be valid'),
  body('password')
    .isString()
    .notEmpty()
    .isLength({ min: 6, max: 24 })
    .withMessage(
      'Password is required and must be between 6 and 24 characters'
    ),

  handleValidationErrors,

  async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body

      const user = await findUserByEmail(email)

      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' })
      }

      const isPasswordValid = await verifyPassword(password, user.password)

      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid email or password' })
      }

      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: '1y',
      })

      res.cookie('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 864000000,
      })

      const userDto = toUserDto({
        user,
        budgets: user.budgets,
        goals: user.goals,
        transactions: user.transactions,
      })

      res.json({ user: userDto })
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message })
      } else {
        res.status(500).json({ error: 'Internal Server Error' })
      }
    }
  },
]

// export const validateToken = async (req: Request, res: Response) => {
//   const authHeader = req.headers.authorization

//   // Verifica si el header de autorización está presente
//   if (!authHeader) {
//     return res.status(401).json({ message: 'Missing authorization header' })
//   }

//   const token = authHeader.split(' ')[1] // Separa el token del prefijo 'Bearer'

//   // Verifica si el token está presente
//   if (!token) {
//     return res.status(401).json({ message: 'Missing token' })
//   }

//   try {
//     // Verifica y decodifica el token usando la clave secreta
//     const { email } = jwt.verify(token, JWT_SECRET) as {
//       id: number
//       email: string
//     }

//     const user = await findUserByEmail(email)

//     if (!user) {
//       return res.status(401).json({ message: 'Invalid token' })
//     }

//     const userDto = toUserDto({
//       user,
//       budgets: user.budgets,
//       goals: user.goals,
//       transactions: user.transactions,
//     })

//     res.status(200).json({ user: userDto })
//   } catch (error) {
//     // Si el token no es válido o ha expirado, responde con 401 Unauthorized
//     res.status(401).json({ message: 'Token no válido o expirado' })
//   }
// }
