import { Request, Response } from 'express'
import { body, param } from 'express-validator'
import { handleValidationErrors } from '../middlewares/validationMiddleware'
// import { AuthenticatedRequest } from '../middlewares/authMiddleware'

import {
  registerUserService,
  updateUserByIdService,
  getUserByEmailService,
  getUserByIdService,
  getAllUsersService,
  deleteUserService,
} from '../services/userService'

export const createUserController = [
  // Validación y sanitización
  body('name').isString().notEmpty().withMessage('Name is required'),
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email'),

  body('password')
    .isString()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6, max: 24 })
    .withMessage('Password must be between 6 and 24 characters'),
  body('confirmPassword')
    .isString()
    .notEmpty()
    .withMessage('Confirm password is required')
    .isLength({ min: 6, max: 24 })
    .withMessage('Confirm password must be equal to password'),

  handleValidationErrors,

  async (req: Request, res: Response) => {
    try {
      if (req.body.password !== req.body.confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' })
      }

      // Eliminar la confirmación de la contraseña solo usada para la validación
      delete req.body.confirmPassword

      const user = await registerUserService(req.body)
      res.status(201).json(user)
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message })
      } else {
        res.status(500).json({ error: 'Internal server error' })
      }
    }
  },
]

export const getUserByEmailController = [
  param('email')
    .isEmail()
    .withMessage('Invalid email')
    .notEmpty()
    .withMessage('Email is required'),

  handleValidationErrors,

  async (req: Request, res: Response) => {
    try {
      const user = await getUserByEmailService(req.params.email)
      if (user) {
        res.status(200).json(user)
      } else {
        res.status(404).json({ error: 'User not found' })
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message })
      } else {
        res.status(500).json({ error: 'Internal server error' })
      }
    }
  },
]

export const getUserByIdController = [
  param('id').isInt({ gt: 0 }).withMessage('ID must be a positive integer'),

  handleValidationErrors,
  async (req: Request, res: Response) => {
    try {
      const user = await getUserByIdService(Number(req.params.id))
      if (user) {
        res.status(200).json(user)
      } else {
        res.status(404).json({ error: 'User not found' })
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message })
      } else {
        res.status(500).json({ error: 'Internal server error' })
      }
    }
  },
]

export const updateUserByIdController = [
  // Validación
  param('id').isInt({ gt: 0 }).withMessage('ID must be a positive integer'),
  body('name').optional().isString(),
  body('email').optional().isEmail().withMessage('Invalid email'),
  body('password')
    .isString()
    .optional()
    .isLength({ min: 6, max: 24 })
    .withMessage('Password must be between 6 and 24 characters'),
  body('balance')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Balance must be a positive number or 0'),

  // Middleware para manejar errores de validación
  handleValidationErrors,

  async (req: Request, res: Response) => {
    try {
      const user = await updateUserByIdService(Number(req.params.id), req.body)
      if (user) {
        res.status(200).json(user)
      } else {
        res.status(404).json({ error: 'User not found' })
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message })
      } else {
        res.status(500).json({ error: 'Internal server error' })
      }
    }
  },
]

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const { email } = req.params
    const user = await getUserByEmailService(email)
    if (user) {
      await deleteUserService(email)
      res.status(200).json({ message: 'User deleted successfully' })
    } else {
      res.status(404).json({ error: 'User not found' })
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message })
    } else {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}

// export const getUserProfileController = async (
//   req: AuthenticatedRequest,
//   res: Response
// ) => {
//   try {
//     if (!req.user) return res.status(404).json({ error: 'User not found' })

//     const user = await getUserByIdService(req.user?.id)
//     if (user) {
//       res.status(200).json(user)
//     } else {
//       res.status(404).json({ error: 'User not found' })
//     }
//   } catch (error) {
//     if (error instanceof Error) {
//       res.status(400).json({ error: error.message })
//     } else {
//       res.status(500).json({ error: 'Internal server error' })
//     }
//   }
// }

export const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsersService()
    res.json(users)
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message })
    } else {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}
