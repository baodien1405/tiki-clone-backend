import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { APP_SECRET, REFRESH_TOKEN } from '../config/index.js'

export const GenerateSalt = async () => {
  return await bcrypt.genSalt()
}

export const GeneratePassword = async (password, salt) => {
  return await bcrypt.hash(password, salt)
}

export const ValidatePassword = async (enteredPassword, savedPassword, salt) => {
  return (await GeneratePassword(enteredPassword, salt)) === savedPassword
}

export const GenerateAccessToken = (payload) => {
  return jwt.sign(payload, APP_SECRET, { expiresIn: '1d' })
}

export const GenerateRefreshToken = (payload) => {
  return jwt.sign(payload, REFRESH_TOKEN, { expiresIn: '365d' })
}
