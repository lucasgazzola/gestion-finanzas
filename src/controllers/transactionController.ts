import { Request, Response } from 'express'
import { body, param } from 'express-validator'

import {
  deleteTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
} from '../repositories/transactionRepository'

import { registerTransactionService } from '../services/transactionService'

import { handleValidationErrors } from '../middlewares/validationMiddleware'

// {
//   "id": 1,
//   "amount": 500,
//   "category": "Groceries",
//   "type": "INCOME",
//   "userId": 3,
//   "createdAt": "2024-09-03T17:51:42.790Z",
//   "date": "2024-08-31T00:00:00.000Z",
//   "description": "Weekly grocery shopping"
// },

export const createTransactionController = [
  // Validación y sanitización
  body('amount')
    .isFloat({ min: 0 })
    .withMessage('Amount must be a positive number'),
  body('category').optional().isString().default('Varios'),
  body('date')
    .default(new Date())
    .isISO8601()
    .withMessage('Date must be a valid ISO 8601 date'),
  body('description').isString().optional(),
  body('userId')
    .isInt({ gt: 0 })
    .notEmpty()
    .withMessage('User ID must be a positive integer'),
  body('type')
    .isIn(['INCOME', 'EXPENSE'])
    .notEmpty()
    .withMessage('Invalid transaction type'),

  // Middleware para manejar errores de validación
  handleValidationErrors,

  // Controlador
  async (req: Request, res: Response) => {
    try {
      const transaction = await registerTransactionService(req.body)
      res.status(201).json(transaction)
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message })
      } else {
        res.status(500).json({ error: 'Internal server error' })
      }
    }
  },
]
export const getTransactionByIdController = [
  // Validación
  param('id').isInt({ gt: 0 }).withMessage('ID must be a positive integer'),

  // Middleware para manejar errores de validación
  handleValidationErrors,

  // Controlador
  async (req: Request, res: Response) => {
    try {
      const transaction = await getTransactionById(parseInt(req.params.id))
      if (transaction) {
        res.json(transaction)
      } else {
        res.status(404).json({ error: 'Transaction not found' })
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

export const updateTransactionController = [
  // Validación
  param('id').isInt({ gt: 0 }).withMessage('ID must be a positive integer'),
  body('amount')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Amount must be a positive number'),
  body('category')
    .optional()
    .isString()
    .notEmpty()
    .withMessage('Category is required'),
  body('date')
    .optional()
    .isISO8601()
    .withMessage('Date must be a valid ISO 8601 date'),
  body('description').optional().isString(),

  // Middleware para manejar errores de validación
  handleValidationErrors,

  // Controlador
  async (req: Request, res: Response) => {
    try {
      const transaction = await updateTransaction(
        parseInt(req.params.id),
        req.body
      )
      res.json(transaction)
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message })
      } else {
        res.status(500).json({ error: 'Internal server error' })
      }
    }
  },
]
export const deleteTransactionController = [
  // Validación
  param('id').isInt({ gt: 0 }).withMessage('ID must be a positive integer'),

  // Middleware para manejar errores de validación
  handleValidationErrors,

  // Controlador
  async (req: Request, res: Response) => {
    try {
      await deleteTransaction(parseInt(req.params.id))
      res.status(204).send()
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message })
      } else {
        res.status(500).json({ error: 'Internal server error' })
      }
    }
  },
]

export const getAllTransactionsController = async (
  req: Request,
  res: Response
) => {
  try {
    const transactions = await getAllTransactions()
    res.json(transactions)
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message })
    } else {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}
