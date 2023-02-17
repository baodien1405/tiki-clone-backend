import express from 'express'
import {
  userSignUp,
  userSignIn,
  updateUserProfile,
  deleteUserProfile,
  getAllUser,
  getDetailUser
} from '../controllers/index.js'
import { Authenticate } from '../middlewares/index.js'

const router = express.Router()

router.post('/sign-up', userSignUp)
router.post('/sign-in', userSignIn)
router.put('/update-user/:userId', updateUserProfile)
router.delete('/delete-user/:userId', Authenticate, deleteUserProfile)
router.get('/getAll', Authenticate, getAllUser)
router.get('/getDetailUser/:userId', getDetailUser)

export { router as UserRoute }
