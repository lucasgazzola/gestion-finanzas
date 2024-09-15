import { Link, useNavigate } from 'react-router-dom'

import * as apiClient from '../api/auth'

import EmailSvg from '../assets/svg/EmailSvg'
import PasswordSvg from '../assets/svg/PasswordSvg'
import NameSvg from '../assets/svg/NameSvg'

import SubmitButton from '../components/SubmitButton'
import useAppContext from '../hooks/useAppContext'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { ToastType } from '../enums'
import LoadingSpinner from '../components/LoadingSpinner'

export type RegisterFormData = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

//TODO: Fix register user

function Register() {
  const { showToast, isLoading } = useAppContext()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>()

  const queryClient = useQueryClient()

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('validateToken')
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

  if (isLoading) return <LoadingSpinner />

  return (
    <form onSubmit={onSubmit}>
      <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-xl max-w-sm">
        <div className="space-y-4">
          <h1 className="text-center text-2xl font-semibold text-gray-600">
            Sign Up
          </h1>
          <hr />
          <div className="flex-col">
            <div className="flex items-center border-2 py-2 px-3 rounded-md">
              <NameSvg />
              <input
                className="pl-2 outline-none border-none w-full"
                autoComplete="off"
                type="text"
                id="name-input"
                placeholder="Name"
                {...register('name', { required: 'Name is required' })}
              />
            </div>
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </div>
          <div className="flex-col">
            <div className="flex items-center border-2 py-2 px-3 rounded-md">
              <EmailSvg />
              <input
                className="pl-2 outline-none border-none w-full"
                type="email"
                placeholder="Email"
                {...register('email', { required: 'Email is required' })}
              />
            </div>
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>
          <div className="flex-col">
            <div className="flex items-center border-2 py-2 px-3 rounded-md">
              <PasswordSvg />
              <input
                className="pl-2 outline-none border-none w-full"
                type="password"
                id="password"
                placeholder="Password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                  maxLength: {
                    value: 24,
                    message: 'Password must be less than 24 characters',
                  },
                })}
              />
            </div>
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>
          <div className="flex-col">
            <div className="flex items-center border-2 py-2 px-3 rounded-md">
              <PasswordSvg />
              <input
                className="pl-2 outline-none border-none w-full"
                type="password"
                id="confirm-password"
                placeholder="Confirm Password"
                {...register('confirmPassword', {
                  validate: val => {
                    if (!val) {
                      return 'Confirm password is required'
                    }
                    if (val !== watch('password')) {
                      return 'Passwords do not match'
                    }
                  },
                })}
              />
            </div>
            {errors.confirmPassword && (
              <span className="text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
          <div className="py-2">
            <SubmitButton text="Sign Up" />
          </div>
        </div>
        <hr />
        <div className="flex justify-center items-center mt-4">
          <p className="inline-flex items-center text-gray-700 font-medium text-xs text-center">
            <span className="ml-2">
              Already have an account?
              <Link
                to={'/login'}
                className="text-xs ml-2 text-blue-500 font-semibold">
                Login
              </Link>
            </span>
          </p>
        </div>
      </div>
    </form>
  )
}

export default Register
