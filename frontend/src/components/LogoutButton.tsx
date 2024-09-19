import { useMutation, useQueryClient } from 'react-query'

import * as apiClient from '../api/auth'
import useAppContext from '../hooks/useAppContext'
import { ToastType } from '../enums'

const LogoutButton = () => {
  const queryClient = useQueryClient()
  const { showToast } = useAppContext()
  const mutation = useMutation(apiClient.logout, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('validateToken')
      showToast({ message: 'Sign out Successful!', type: ToastType.SUCCESS })
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: ToastType.ERROR })
    },
  })
  const onClick = () => {
    mutation.mutate()
  }
  return (
    <button
      onClick={onClick}
      className="absolute top-4 right-4 text-white bg-blue-600 border-blue-300 border-2 px-3 py-1 font-bold hover:text-blue-600 hover:bg-white hover:border-blue-600 rounded-md w-24">
      Logout
    </button>
  )
}

export default LogoutButton
