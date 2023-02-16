import { User } from '../models/index.js'

export const createUserService = async (newUser) => {
  const { name, email, password, confirmPassword, phone } = newUser
  try {
    const existUser = await User.findOne({
      email: email
    })

    if (existUser !== null) {
      return {
        status: 'OK',
        message: 'The email is already'
      }
    }

    const user = await User.create({
      name,
      email,
      password,
      confirmPassword,
      phone
    })

    if (user) {
      return {
        status: 'OK',
        message: 'Success',
        data: user
      }
    }
  } catch (error) {
    console.log(error)
  }
}
