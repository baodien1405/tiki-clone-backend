import { createUserService } from '../services/index.js'

export const createUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, phone } = req.body
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const isValidEmail = regex.test(email)
    console.log(isValidEmail)

    if (!name || !email || !password || !confirmPassword || !phone) {
      return res.status(200).json({
        status: 'ERROR',
        message: 'The input is required'
      })
    } else if (!isValidEmail) {
      return res.status(200).json({
        status: 'ERROR',
        message: 'The input is valid email'
      })
    } else if (password !== confirmPassword) {
      return res.status(200).json({
        status: 'ERROR',
        message: 'The input is is equal confirm password'
      })
    }

    const response = await createUserService(req.body)
    return res.status(200).json(response)
  } catch (error) {
    return res.status(404).json({
      message: error
    })
  }
}
