import {
  createTransaction,
  deleteTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
} from '../repositories/transactionRepository'
import Transaction from '../types/Transaction'

export const registerTransactionService = async (
  data: Omit<Transaction, 'id'>
) => {
  return createTransaction(data)
}
