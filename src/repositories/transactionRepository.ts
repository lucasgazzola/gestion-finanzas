import { TransactionType } from '@prisma/client'
import dbClient from '../database/client'
import Transaction from '../types/Transaction'

export const createTransaction = async (data: Omit<Transaction, 'id'>) => {
  const user = await dbClient.user.findUnique({
    where: { id: data.userId },
    select: { balance: true },
  })

  if (!user) {
    throw new Error('User not found')
  }

  //If the transaction type is expense and the amount is greater than the user's balance, throw an error
  if (data.type === TransactionType.EXPENSE && data.amount > user.balance) {
    throw new Error('Insufficient balance')
  }

  //If the transaction type is expense, deduct the amount from the user's balance
  if (data.type === TransactionType.EXPENSE && data.amount <= user.balance) {
    user.balance -= data.amount
  }

  //If the transaction type is income, add the amount to the user's balance
  if (data.type === TransactionType.INCOME) {
    user.balance += data.amount
  }

  const [_, transaction] = await dbClient.$transaction([
    dbClient.user.update({
      where: { id: data.userId },
      data: { balance: user.balance },
    }),
    dbClient.transaction.create({ data }),
  ])

  return transaction
}

export const getTransactionById = async (id: Transaction['id']) => {
  return dbClient.transaction.findUnique({
    where: { id },
    include: {
      user: { select: { name: true, email: true, id: true, balance: true } },
    },
  })
}

export const updateTransaction = async (
  id: Transaction['id'],
  data: Partial<Omit<Transaction, 'id'>>
) => {
  return dbClient.transaction.update({
    where: { id },
    data,
  })
}

export const deleteTransaction = async (id: Transaction['id']) => {
  return dbClient.transaction.delete({
    where: { id },
  })
}

export const getAllTransactions = async () => {
  return dbClient.transaction.findMany()
}
