import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import * as dotenv from 'dotenv'

import { PORT } from './src/config/index.js'
import * as dbConnection from './src/services/Database.js'
import App from './src/utility/ExpressApp.js'
dotenv.config()

const DELAY = 0

const StartServer = async () => {
  const app = express()

  app.use(function (req, res, next) {
    setTimeout(next, DELAY)
  })

  // CACHE for GET requests
  // app.use(function (req, res, next) {
  //   const period = 60 * 5
  //   if (req.method == 'GET') {
  //     res.set("Cache-control", `public, max-age=${period}`)
  //   } else {
  //     res.set("Cache-control", "no-store")
  //   }
  //   next()
  // })

  app.use(morgan('dev'))
  app.use(helmet())
  app.use(compression())
  app.use(cookieParser())
  app.use(cors())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  dbConnection
  await App(app)

  app.listen(PORT, () => {
    console.log(`Listening to the port ${PORT}`)
  })
}

StartServer()
