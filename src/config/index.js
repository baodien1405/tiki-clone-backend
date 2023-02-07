import * as dotenv from 'dotenv'
dotenv.config()

export const MONGO_URI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.app8z6v.mongodb.net/?retryWrites=true&w=majority`
export const PORT = process.env.PORT || 8000
