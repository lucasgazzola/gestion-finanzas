import TransactionList from '../components/TranscationList'
import useAppContext from '../hooks/useAppContext'

import LogoutButton from '../components/LogoutButton'
import LoadingSpinner from '../components/LoadingSpinner'
import TransactionForm from '../components/TransactionForm'
import { useState } from 'react'

const Home: React.FC = () => {
  const { isLoggedIn, isLoading, loggedInUser } = useAppContext()
  const { balance, transactions, name } = loggedInUser
  const [isNewTransaction, setIsNewTransaction] = useState(false)

  console.log(transactions)
  if (isLoading || !isLoggedIn) return <LoadingSpinner />

  return (
    <div className="relative bg-white flex flex-col px-2 pt-10 rounded-xl h-full max-w-[900px] w-10/12 shadow-xl min-w-[280px]">
      <LogoutButton />
      <div className="px-4 flex flex-col gap-8 py-10">
        <h1 className="text-2xl text-center flex flex-col font-semibold">
          Bienvenido<span>{name}</span>
        </h1>
        <h2 className="text-lg ">Su balance es: {balance}</h2>
        <main>
          {transactions.length > 0 && (
            <>
              <TransactionList transactions={transactions} />
            </>
          )}
          {!isNewTransaction && (
            <button
              className="text-white bg-blue-600 border-blue-300 border-2 px-3 py-1 font-bold hover:text-blue-600 hover:bg-white hover:border-blue-600 rounded"
              onClick={() => setIsNewTransaction(!isNewTransaction)}
              type="button">
              +
            </button>
          )}
          {isNewTransaction && (
            <TransactionForm setIsNewTransaction={setIsNewTransaction} />
          )}
        </main>
      </div>
    </div>
  )
}

export default Home
