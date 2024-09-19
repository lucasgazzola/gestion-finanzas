import { useState } from 'react'
import Transaction, { TransactionType } from '../../../src/models/Transaction'

// model Transaction {
//   id          Int          @id @default(autoincrement())
//   amount      Float
//   category    String   @default("Varios")
//   type        TransactionType
//   userId      Int
//   createdAt   DateTime  @default(now())
//   date DateTime
//   description String?

//   user        User          @relation(fields: [userId], references: [id], onDelete: Cascade)
// }

type Props = {
  setIsNewTransaction: React.Dispatch<React.SetStateAction<boolean>>
}

const TransactionForm: React.FC<Props> = ({ setIsNewTransaction }: Props) => {
  const [newTransaction, setNewTransaction] = useState<Transaction>({
    id: 0,
    amount: 0,
    description: '',
    userId: 1,
    type: TransactionType.EXPENSE,
    category: 'Varios',
    date: new Date(),
    createdAt: new Date(),
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewTransaction({ ...newTransaction, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <button
        onClick={() => setIsNewTransaction(false)}
        className="text-white bg-blue-600 border-blue-300 border-2 px-3 py-1 font-bold hover:text-blue-600 hover:bg-white hover:border-blue-600 rounded">
        &larr;
      </button>
      <h2 className="text-xl font-bold mb-4">Nueva Transacción</h2>
      <div className="mb-4">
        <label className="block mb-2">Cantidad:</label>
        <input
          type="number"
          value={newTransaction.amount}
          onChange={handleChange}
          className="border rounded p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Descripción:</label>
        <input
          type="text"
          onChange={handleChange}
          value={newTransaction.description ?? ''}
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
