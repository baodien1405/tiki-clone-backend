import jwt from 'jsonwebtoken'
import { REFRESH_TOKEN } from '../config/index.js'
import { User } from '../models/index.js'
import {
  generateSalt,
  generatePassword,
  validatePassword,
  generateAccessToken,
  generateRefreshToken
} from '../utility/index.js'

export const createUser = async ({ email, password }) => {
  try {
    const existUser = await User.findOne({
      email: email
    })

    if (existUser !== null) {
      return {
        status: 'ERROR',
        message: 'The email is already'
      }
    }

    const salt = await generateSalt()
    const userPassword = await generatePassword(password, salt)

    const user = await User.create({
      email,
      password: userPassword,
      salt: salt
    })

    if (user) {
      return {
        status: 'OK',
        message: 'Create account success!',
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
        status: 'ERROR',
        message: 'The user is not defined'
      }
    }

    const validation = await validatePassword(password, existUser.password, existUser.salt)

    if (validation) {
      const accessToken = generateAccessToken({
        id: existUser._id,
        isAdmin: existUser.isAdmin
      })

      const refreshToken = generateRefreshToken({
        id: existUser._id,
        isAdmin: existUser.isAdmin
      })

      return {
        status: 'OK',
        message: 'Login success!',
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
    const existUser = await User.findById(id)

    if (!existUser) {
      return {
        status: 'ERROR',
        message: 'The user is not defined'
      }
    }

    const updatedUser = await User.findByIdAndUpdate(id, data, { new: true })

    return {
      status: 'OK',
      message: 'Update success!',
      data: updatedUser
    }
  } catch (error) {
    console.log(error)
  }
}

export const restoreUser = async (id) => {
  try {
    const updatedUser = await User.restore({ _id: id })

    return {
      status: 'OK',
      message: 'Restore success!',
      data: updatedUser
    }
  } catch (error) {
    console.log(error)
  }
}

export const deleteUser = async (id) => {
  try {
    const existUser = await User.findById(id)

    if (!existUser) {
      return {
        status: 'ERROR',
        message: 'The user is not defined'
      }
    }

    await User.delete({ _id: id })

    return {
      status: 'OK',
      message: 'Delete user success!'
    }
  } catch (error) {
    console.log(error)
  }
}

export const forceDeleteUser = async (id) => {
  try {
    await User.deleteOne({ _id: id })

    return {
      status: 'OK',
      message: 'Force delete user success!'
    }
  } catch (error) {
    console.log(error)
  }
}

export const getUsersService = async () => {
  try {
    const [users, deletedCount] = await Promise.all([User.find({ isAdmin: false }), User.countDocumentsDeleted()])

    if (users) {
      return {
        status: 'OK',
        message: 'Success',
        data: users,
        deletedCount: deletedCount
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export const getTrashUsersService = async () => {
  try {
    const users = await User.findDeleted()
    if (users) {
      return {
        status: 'OK',
        message: 'Success',
        data: users
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export const getDetailUser = async (id) => {
  try {
    const existUser = await User.findById(id)

    if (!existUser) {
      return {
        status: 'ERROR',
        message: 'The user is not found'
      }
    }

    return {
      status: 'OK',
      message: 'Success',
      data: existUser
    }
  } catch (error) {
    console.log(error)
  }
}

export const refreshTokenService = async (token) => {
  try {
    const payload = await jwt.verify(token, REFRESH_TOKEN)
    const accessToken = await generateAccessToken({
      id: payload.id,
      isAdmin: payload.isAdmin
    })

    return {
      status: 'OK',
      message: 'Success',
      access_token: accessToken
    }
  } catch (error) {
    return {
      status: 'Error',
      message: 'The authentication'
    }
  }
}
