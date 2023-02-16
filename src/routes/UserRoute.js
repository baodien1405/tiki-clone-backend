import express from 'express'
import { userSignUp, userSignIn, updateUserProfile } from '../controllers/index.js'

const router = express.Router()

router.post('/sign-up', userSignUp)
router.post('/sign-in', userSignIn)
router.put('/update-user/:userId', updateUserProfile)

export { router as UserRoute }
