import express from 'express'
import {
  userSignUp,
  userSignIn,
  updateUserById,
  deleteUserById,
  getUsers,
  getUserById,
  refreshToken
} from '../controllers/index.js'
import { Authenticate, UserAuthenticate } from '../middlewares/index.js'

const router = express.Router()

router.post('/sign-up', userSignUp)
router.post('/sign-in', userSignIn)
router.post('/refresh-token', refreshToken)

router.get('/', Authenticate, getUsers)
router.get('/:id', UserAuthenticate, getUserById)
router.put('/:id', UserAuthenticate, updateUserById)
router.delete('/:id', Authenticate, deleteUserById)

export { router as UserRoute }
