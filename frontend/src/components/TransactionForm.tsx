// src/components/TransactionForm.tsx
import React, { useState } from 'react'
// import { createTransaction } from '../api/transaction'

const TransactionForm: React.FC = () => {
  const [amount, setAmount] = useState<number>(0)
  const [description, setDescription] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // const newTransaction = { amount, description }
    // await createTransaction(newTransaction)
    setAmount(0)
    setDescription('')
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h2 className="text-xl font-bold mb-4">Nueva Transacción</h2>
      <div className="mb-4">
        <label className="block mb-2">Cantidad:</label>
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(Number(e.target.value))}
          className="border rounded p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Descripción:</label>
        <input
          type="text"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="border rounded p-2 w-full"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded">
        Agregar Transacción
      </button>
    </form>
  )
}

export default TransactionForm
