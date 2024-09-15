import { Router, Request, Response } from 'express'
import { loginController } from '../controllers/authController'
import { verifyToken } from '../middlewares/authMiddleware'
import { getUserByIdService } from '../services/userService'

const router = Router()

router.post('/login', loginController)

router.get(
  '/validate-token',
  verifyToken,
  async (req: Request, res: Response) => {
    const user = await getUserByIdService(Number(req.userId))
    res.status(200).send({ user })
  }
)

router.post('/logout', (req: Request, res: Response) => {
  res.cookie('auth_token', '', { expires: new Date(0) })
  res.status(200).send({ message: 'Logged out successfully' })
})

export default router
