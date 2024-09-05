import { Router } from 'express'
import {
  createTransactionController,
  getTransactionByIdController,
  updateTransactionController,
  deleteTransactionController,
  getAllTransactionsController,
} from '../controllers/transactionController'

const router = Router()

router.post('/', createTransactionController)

router.get('/id/:id', getTransactionByIdController)

router.put('/id/:id', updateTransactionController)

router.delete('/id/:id', deleteTransactionController)

router.get('/', getAllTransactionsController)

export default router
