import * as dotenv from 'dotenv'
dotenv.config()

export const MONGO_URI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.app8z6v.mongodb.net/?retryWrites=true&w=majority`
export const PORT = process.env.PORT || 8000
export const ACCESS_TOKEN = process.env.ACCESS_TOKEN
export const REFRESH_TOKEN = process.env.REFRESH_TOKEN

const dev = {
  app: {
    port: process.env.DEV_APP_PORT
  },
  db: {
    host: process.env.DEV_DB_HOST,
    port: process.env.DEV_DB_PORT,
    name: process.env.DEV_DB_NAME
  }
}

const prod = {
  app: {
    port: process.env.PROD_APP_PORT
  },
  db: {
    host: process.env.PROD_DB_HOST,
    port: process.env.PROD_DB_PORT,
    name: process.env.PROD_DB_NAME
  }
}

const config = { dev, prod }
const env = process.env.NODE_ENV || 'dev'

// export default config[env]
