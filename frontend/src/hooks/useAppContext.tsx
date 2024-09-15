import { useContext } from 'react'
import { AppContext } from '../contexts/AppContext'

const useAppContext = () => {
  const context = useContext(AppContext)
  return context as AppContext
}

export default useAppContext
