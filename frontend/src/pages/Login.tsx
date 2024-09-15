import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'

import * as apiClient from '../api/auth'

import SubmitButton from '../components/SubmitButton'
import useAppContext from '../hooks/useAppContext'
import { ToastType } from '../enums'
import LoadingSpinner from '../components/LoadingSpinner'

export type LogInFormData = {
  email: string
  password: string
  rememberMe: boolean
}

function Login() {
  const { showToast, setLoggedInUser, isLoading } = useAppContext()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<LogInFormData>()

  const queryClient = useQueryClient()

  const mutation = useMutation(apiClient.login, {
    onSuccess: async data => {
      await queryClient.invalidateQueries('validateToken')
      setLoggedInUser(data.user)
      showToast({ message: 'Sign in Successful!', type: ToastType.SUCCESS })
      navigate('/')
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: ToastType.ERROR })
    },
  })

  const onSubmit = handleSubmit(data => {
    mutation.mutate(data)
  })

  //TODO: Impemementar remember me

  if (isLoading) return <LoadingSpinner />

  return (
    <form
      onSubmit={onSubmit}
      action="http://localhost:3000/api/auth/login"
      method="POST">
      <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-xl max-w-sm">
        <div className="space-y-4">
          <h1 className="text-center text-2xl font-semibold text-gray-600">
            Login
          </h1>
          <hr />
          <div className="flex items-center border-2 py-2 px-3 rounded-md mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
            <input
              className="pl-2 outline-none border-none w-full"
              type="email"
              placeholder="Email"
              autoFocus
              {...register('email', { required: 'Email is required' })}
              // value={loginFields.email}
              // onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center border-2 py-2 px-3 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor">
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            <input
              className="pl-2 outline-none border-none w-full"
              type="password"
              autoComplete="current-password"
              id="password-input"
              placeholder="Password"
              {...register('password', { required: 'Email is required' })}
            />
          </div>
          <div className="flex justify-center items-center mt-4">
            <p className="inline-flex items-center text-gray-700 font-medium text-xs text-center">
              <input
                type="checkbox"
                id="rememberme-checkbox"
                className="mr-2"
                {...register('rememberMe')}
              />
              <span className="text-xs font-semibold">Remember me?</span>
            </p>
          </div>
        </div>

        <div className="py-2.5">
          <SubmitButton text="Login" />
        </div>
        <hr />
        <div className="flex justify-center items-center mt-4">
          <p className="inline-flex items-center text-gray-700 font-medium text-xs text-center">
            <span className="ml-2">
              You don't have an account?
              <Link
                to={'/register'}
                className="text-xs ml-2 text-blue-500 font-semibold">
                Register now
              </Link>
            </span>
          </p>
        </div>
      </div>
    </form>
  )
}

export default Login
