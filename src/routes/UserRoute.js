import express from 'express'
import { userSignUp, userSignIn } from '../controllers/index.js'

const router = express.Router()

router.post('/sign-up', userSignUp)
router.post('/sign-in', userSignIn)

export { router as UserRoute }
