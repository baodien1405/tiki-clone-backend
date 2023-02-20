import { ValidateSignature, ValidateSignatureForUser } from '../utility/index.js'

export const Authenticate = async (req, res, next) => {
  const signature = await ValidateSignature(req)

  if (signature) {
    next()
  } else {
    return res.status(403).json({ message: 'Unauthorized' })
  }
}

export const UserAuthenticate = async (req, res, next) => {
  try {
    const signature = await ValidateSignatureForUser(req, res)
    if (signature) {
      next()
    } else {
      return res.status(403).json({ message: 'Unauthorized' })
    }
  } catch (error) {
    return res.status(404).json({
      message: 'Token expired',
      status: 'Error'
    })
  }
}
