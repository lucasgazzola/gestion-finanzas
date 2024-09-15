import { createContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'

import Toast from '../components/Toast'
import * as apiClient from '../api/auth'
import { ToastType } from '../enums/'
import { UserDto } from '../../../src/models/User'
import { useLocation, useNavigate } from 'react-router-dom'

// type ContextValueType = {
//   user: UserDto
//   setUser: React.Dispatch<React.SetStateAction<UserDto>>
//   setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
//   isLoading: boolean
//   isAuthenticated: boolean
// }

type ToastMessage = {
  message: string
  type: ToastType
}

export type AppContext = {
  showToast: (toastMessage: ToastMessage) => void
  isLoggedIn: boolean
  isLoading: boolean
  loggedInUser: UserDto
  setLoggedInUser: React.Dispatch<React.SetStateAction<UserDto>>
}

const INITIAL_USER_DTO = {
  id: 0,
  name: '',
  email: '',
  balance: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
  budgets: [],
  goals: [],
  transactions: [],
}

// export const UserContext = createContext<ContextValueType>({
//   user: {
//     id: 0,
//     name: '',
//     email: '',
//     balance: 0,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//     budgets: [],
//     goals: [],
//     transactions: [],
//     token: '',
//   },
//   setUser() {},
//   isLoading: false,
//   isAuthenticated: false,
//   setIsAuthenticated() {},
// })

export const AppContext = createContext<AppContext | null>(null)

export const AppContextProvider = ({ children }: React.PropsWithChildren) => {
  const [loggedInUser, setLoggedInUser] = useState<UserDto>(INITIAL_USER_DTO)

  const [toast, setToast] = useState<ToastMessage | null>(null)

  const navigate = useNavigate()
  const location = useLocation()

  const { isError, isLoading } = useQuery(
    'validateToken',
    apiClient.validateToken,
    {
      retry: false,
      refetchOnWindowFocus: false,
      onSuccess: (data: { user: UserDto }) => {
        setLoggedInUser(data.user) // Guarda los datos del usuario en el estado
      },
      onError: () => {
        // console.log('Hubo error')
        setLoggedInUser(INITIAL_USER_DTO) // Si hay un error, resetea el usuario
      },
    }
  )

  useEffect(() => {
    if (isError) {
      if (location.pathname === '/') {
        navigate('/login')
      }
    } else {
      if (location.pathname !== '/') {
        navigate('/')
      }
    }
  }, [isError, location.pathname, navigate, loggedInUser])

  return (
    // <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
    <AppContext.Provider
      value={{
        showToast: toastMessage => {
          setToast(toastMessage)
        },
        isLoggedIn: !isError,
        loggedInUser,
        isLoading,
        setLoggedInUser,
      }}>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => {
            setToast(null)
          }}
        />
      )}
      {children}
    </AppContext.Provider>
  )
}
