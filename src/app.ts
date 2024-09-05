import express, { Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import userRoutes from './routes/user'
import authRoutes from './routes/auth'
import transactionRoutes from './routes/transaction'

const app = express()

// Middleware para parsear JSON
app.use(bodyParser.json())

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
