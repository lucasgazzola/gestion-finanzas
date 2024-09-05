import { type Transaction } from '@prisma/client'

export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

export default Transaction
