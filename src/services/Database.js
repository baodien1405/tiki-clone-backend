import mongoose from 'mongoose'
import { MONGO_URI } from '../config/index.js'

mongoose.set('strictQuery', true)

export default async () => {
  try {
    await mongoose.connect(MONGO_URI)
    console.log('DB connected...')
  } catch (error) {
    console.log(error)
  }
}
