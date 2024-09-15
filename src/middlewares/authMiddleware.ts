import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'

declare global {
  namespace Express {
    interface Request {
      userId: string
    }
  }
}


export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies['auth_token']
  if (!token) return res.status(401).json({ message: 'Unauthorized' })

  try {
    const decoded = jwt.verify(token, JWT_SECRET as string)
    req.userId = (decoded as JwtPayload).id
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
}
