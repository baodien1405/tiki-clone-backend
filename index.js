import express from 'express'
import { PORT } from './src/config/index.js'
import dbConnection from './src/services/Database.js'
import * as dotenv from 'dotenv'
import { UserRoute, ProductRoute } from './src/routes/index.js'
dotenv.config()

const StartServer = async () => {
  const app = express()
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
