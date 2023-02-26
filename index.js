import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import * as dotenv from 'dotenv'

import { PORT } from './src/config/index.js'
import dbConnection from './src/services/Database.js'
import { UserRoute, ProductRoute } from './src/routes/index.js'
dotenv.config()

const DELAY = 0

const StartServer = async () => {
  const app = express()
  app.use(function (req, res, next) {
    setTimeout(next, DELAY)
  })
  // init middlewares of systems
  app.use(morgan('dev'))
  app.use(helmet())
  app.use(compression())
  app.use(cookieParser())
  app.use(cors())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  await dbConnection()

  app.use('/api/user', UserRoute)
  app.use('/api/product', ProductRoute)

  app.listen(PORT, () => {
    console.log(`Listening to the port ${PORT}`)
  })
}

StartServer()
