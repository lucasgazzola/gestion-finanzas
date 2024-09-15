import { Router } from 'express'
import {
  createUserController,
  getUserByEmailController,
  getUserByIdController,
  // getUserProfileController,
  updateUserByIdController,
  getAllUsersController,
  deleteUserController,
} from '../controllers/userController'
import { verifyToken } from '../middlewares/authMiddleware'

const router = Router()

// Crear un nuevo usuario
router.post('/', createUserController)

router.get('/', getAllUsersController)

router.delete('/email/:email', deleteUserController)
// Obtener usuario por correo electrónico
// TODO: Ruta solo para testear
router.get('/email/:email', getUserByEmailController)

// Obtener usuario por ID
router.get('/id/:id', getUserByIdController)

// TODO: Es necesaria esta ruta?
// router.get('/profile', verifyToken, getUserProfileController)

router.put('/id/:id', updateUserByIdController)

// Ruta protegida para cambiar la contraseña
router.post('/change-password', verifyToken, (req, res) => {
  res.send('Password changed')
})

export default router
