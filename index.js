import express from 'express'
import { PORT } from './src/config/index.js'
import dbConnection from './src/services/Database.js'
import * as dotenv from 'dotenv'
import { UserRoute } from './src/routes/index.js'
dotenv.config()

const StartServer = async () => {
  const app = express()
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  await dbConnection()

  app.use('/api/user', UserRoute)
  app.get('/test', (req, res) => {
    res.send('Test API')
  })

  app.listen(PORT, () => {
    console.log(`Listening to the port ${PORT}`)
  })
}

StartServer()
