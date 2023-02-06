import express from 'express'
import { PORT } from './src/config/index.js'
import * as dotenv from 'dotenv'
dotenv.config()

const StartServer = async () => {
  const app = express()

  app.get('/', (req, res) => res.send('Hello World'))
  app.listen(PORT, () => {
    console.log(`Listening to the port ${PORT}`)
  })
}

StartServer()
