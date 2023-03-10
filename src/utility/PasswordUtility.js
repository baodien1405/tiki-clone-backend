import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../config/index.js'

export const generateSalt = async () => {
  return await bcrypt.genSalt()
}

export const generatePassword = async (password, salt) => {
  return await bcrypt.hash(password, salt)
}

export const validatePassword = async (enteredPassword, savedPassword, salt) => {
  return (await generatePassword(enteredPassword, salt)) === savedPassword
}

export const generateAccessToken = (payload) => {
  return jwt.sign(payload, ACCESS_TOKEN, { expiresIn: '10d' })
}

export const generateRefreshToken = (payload) => {
  return jwt.sign(payload, REFRESH_TOKEN, { expiresIn: '365d' })
}

export const ValidateSignatureForAdmin = async (req) => {
  const signature = req.get('Authorization')

  if (signature) {
    const payload = await jwt.verify(signature.split(' ')[1], ACCESS_TOKEN)
    if (payload.isAdmin) {
      return true
    }
  }

  return false
}

export const ValidateSignatureForUser = async (req, res) => {
  const signature = req.get('Authorization')
  const userId = req.params.id

  if (signature) {
    const payload = await jwt.verify(signature.split(' ')[1], ACCESS_TOKEN)
    if (payload.isAdmin || payload.id === userId) {
      return true
    }
  }

  return false
}

export const ValidateSignature = async (req, res) => {
  const signature = req.get('Authorization')

  if (signature) {
    const payload = await jwt.verify(signature.split(' ')[1], ACCESS_TOKEN)
    req.user = payload
    return true
  }

  return false
}
