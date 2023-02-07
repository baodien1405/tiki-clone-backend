import { User } from '../models/index.js'

export const createUserService = async () => {
  try {
    console.log('user service')
    const response = await User.create({})
  } catch (error) {
    console.log(error)
  }
}
