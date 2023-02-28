import express from 'express'
import {
  userSignUp,
  userSignIn,
  updateUserById,
  deleteUserById,
  getUsers,
  getUserById,
  getProfile,
  refreshToken
} from '../controllers/index.js'
import { AdminAuthenticate, UserAuthenticate, Authenticate } from '../middlewares/index.js'

const router = express.Router()

router.post('/sign-up', userSignUp)
router.post('/sign-in', userSignIn)
router.post('/refresh-token', refreshToken)

router.get('/', AdminAuthenticate, getUsers)
router.get('/profile', Authenticate, getProfile)
router.get('/:id', UserAuthenticate, getUserById)
router.put('/:id', UserAuthenticate, updateUserById)
router.delete('/:id', AdminAuthenticate, deleteUserById)

export { router as UserRoute }
