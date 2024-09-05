import { Request, Response } from 'express'
import { body } from 'express-validator'
import jwt from 'jsonwebtoken'

import { findUserByEmail, verifyPassword } from '../repositories/userRepository'
import { handleValidationErrors } from '../middlewares/validationMiddleware'

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'

export const loginController = [
  body('email')
    .isEmail()
    .notEmpty()
    .withMessage('Email is required and must be valid'),
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

      res.json({ token })
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message })
      } else {
        res.status(500).json({ error: 'Internal Server Error' })
      }
    }
  },
]
