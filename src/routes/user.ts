import { Router, Request, Response } from 'express'
import {
  createUserController,
  getUserByEmailController,
  getUserByIdController,
  getUserProfileController,
  updateUserByIdController,
  getAllUsersController,
} from '../controllers/userController'
import { authenticateToken } from '../middlewares/authMiddleware'

const router = Router()

// Crear un nuevo usuario
router.post('/', createUserController)
router.get('/', getAllUsersController)

// Obtener usuario por correo electrónico
// TODO: Ruta solo para testear
router.get('/email/:email', getUserByEmailController)

// Obtener usuario por ID
router.get('/id/:id', getUserByIdController)

router.get('/profile', authenticateToken, getUserProfileController)

router.put('/id/:id', updateUserByIdController)

// Ruta protegida para cambiar la contraseña
router.post('/change-password', authenticateToken, (req, res) => {
  res.send('Password changed')
})

export default router
