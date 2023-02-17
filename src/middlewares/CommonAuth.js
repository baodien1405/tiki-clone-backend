import { ValidateSignature } from '../utility/index.js'

export const Authenticate = async (req, res, next) => {
  const signature = await ValidateSignature(req)

  if (signature) {
    next()
  } else {
    return res.status(403).json({ message: 'Unauthorized' })
  }
}
