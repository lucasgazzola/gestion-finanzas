import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import { authRoutes, transactionRoutes, userRoutes } from './routes'

const app = express()

// Middleware para parsear JSON
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
)
app.use(cookieParser())

// Configuración de rutas
app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/transactions', transactionRoutes)

// Manejo de errores
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})

export default app
