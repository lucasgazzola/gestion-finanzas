import Transaction from '../../../src/models/Transaction'

const TransactionList: React.FC<{
  transactions: Transaction[]
}> = ({ transactions }) => {
  return (
    <ul>
      {transactions?.map(transaction => {
        return <li key={transaction.id}>{transaction.amount}</li>
      })}
    </ul>
  )
}

export default TransactionList
