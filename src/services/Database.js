import mongoose from 'mongoose'
import { MONGO_URI } from '../config/index.js'

mongoose.set('strictQuery', true)
class Database {
  // constructor() {
  //   this.connect()
  // }

  async connect(type = 'mongodb') {
    try {
      await mongoose.connect(MONGO_URI)
      console.log('DB connected...')
    } catch (error) {
      console.log(error)
    }
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database()
    }

    return Database.instance
  }
}

export const instanceMongoDB = Database.getInstance()
