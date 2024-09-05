import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'

export interface AuthenticatedRequest extends Request {
  user?: { id: number; email: string; iat: number; exp: number }
}

export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1] // Bearer <token>

  if (token == null) return res.sendStatus(401) // Si no hay token, no autorizado

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403) // Token inválido

    req.user = user as AuthenticatedRequest['user']

    next() // Token válido, continuar con la siguiente función de middleware o ruta
  })
}
