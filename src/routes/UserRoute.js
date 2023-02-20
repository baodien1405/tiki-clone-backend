import express from 'express'
import {
  userSignUp,
  userSignIn,
  updateUserProfile,
  deleteUserProfile,
  getAllUser,
  getDetailUser,
  refreshToken
} from '../controllers/index.js'
import { Authenticate, UserAuthenticate } from '../middlewares/index.js'

const router = express.Router()

router.post('/sign-up', userSignUp)
router.post('/sign-in', userSignIn)
router.put('/update-user/:userId', updateUserProfile)
router.delete('/delete-user/:userId', Authenticate, deleteUserProfile)
router.get('/get-all', Authenticate, getAllUser)
router.get('/get-detail/:userId', UserAuthenticate, getDetailUser)
router.post('/refresh-token', refreshToken)

export { router as UserRoute }
