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
      className="text-blue-600 px-3 font-bold bg-white hover:bg-gray-100 rounded-sm">
      Log Out
    </button>
  )
}

export default LogoutButton
