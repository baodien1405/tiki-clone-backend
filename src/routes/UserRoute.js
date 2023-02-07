import express from 'express'
import { createUser } from '../controllers/index.js'

const router = express.Router()

router.post('/test', createUser)

export { router as UserRoute }
