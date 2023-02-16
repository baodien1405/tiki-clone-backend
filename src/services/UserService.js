import { User } from '../models/index.js'
import {
  GenerateSalt,
  GeneratePassword,
  ValidatePassword,
  GenerateAccessToken,
  GenerateRefreshToken
} from '../utility/index.js'

export const createUser = async (newUser) => {
  const { name, email, password, phone } = newUser
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

    const salt = await GenerateSalt()
    const userPassword = await GeneratePassword(password, salt)

    const user = await User.create({
      name,
      email,
      password: userPassword,
      salt: salt,
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

export const loginUser = async (userLogin) => {
  const { email, password } = userLogin
  try {
    const existUser = await User.findOne({
      email: email
    })

    if (!existUser) {
      return {
        status: 'OK',
        message: 'The user is not defined'
      }
    }

    const validation = await ValidatePassword(password, existUser.password, existUser.salt)

    if (validation) {
      const accessToken = GenerateAccessToken({
        _id: existUser._id,
        isAdmin: existUser.isAdmin
      })

      const refreshToken = GenerateRefreshToken({
        _id: existUser._id,
        isAdmin: existUser.isAdmin
      })

      return {
        status: 'OK',
        message: 'Success',
        access_token: accessToken,
        refresh_token: refreshToken
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export const updateUser = async (id, data) => {
  try {
    const existUser = await User.findById({
      _id: id
    })

    if (!existUser) {
      return {
        status: 'OK',
        message: 'The user is not defined'
      }
    }

    const updatedUser = await User.findByIdAndUpdate(id, data, { new: true })

    return {
      status: 'OK',
      message: 'Success',
      data: updatedUser
    }
  } catch (error) {
    console.log(error)
  }
}
