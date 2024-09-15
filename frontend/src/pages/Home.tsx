import TransactionList from '../components/TranscationList'
import useAppContext from '../hooks/useAppContext'

import LogoutButton from '../components/LogoutButton'
import LoadingSpinner from '../components/LoadingSpinner'

const Home: React.FC = () => {
  const { isLoggedIn, isLoading, loggedInUser } = useAppContext()
  const { balance, transactions, name } = loggedInUser

  if (isLoading || !isLoggedIn) return <LoadingSpinner />

  return (
    <div className="bg-white flex px-10 py-8 rounded-xl h-5/6 w-10/12 shadow-xl min-w-[300px] max-w-screen-lg">
      <LogoutButton />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-8">Bienvenido: {name}</h2>
        <h2 className="text-xl font-bold mb-8">Su balance es: {balance}</h2>
        <main>
          <strong>Sus Transacciones: </strong>
          <TransactionList transactions={transactions} />
        </main>
        {/* <UserList /> */}
        {/* <TransactionForm />
        <TransactionList /> */}
      </div>
    </div>
  )
}

export default Home
