import express from 'express'
import { PORT } from './src/config/index.js'
import dbConnection from './src/services/Database.js'
import * as dotenv from 'dotenv'
dotenv.config()

const StartServer = async () => {
  const app = express()

  await dbConnection()

  app.get('/', (req, res) => res.send('Hello World'))
  app.listen(PORT, () => {
    console.log(`Listening to the port ${PORT}`)
  })
}

StartServer()
