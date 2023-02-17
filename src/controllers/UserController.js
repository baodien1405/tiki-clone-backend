import {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUserService,
  getDetailUserService
} from '../services/index.js'

export const userSignUp = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, phone } = req.body
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const isValidEmail = regex.test(email)

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

    const response = await createUser(req.body)
    return res.status(200).json(response)
  } catch (error) {
    return res.status(404).json({
      message: error
    })
  }
}

export const userSignIn = async (req, res) => {
  try {
    const { email, password } = req.body
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const isValidEmail = regex.test(email)

    if (!email || !password) {
      return res.status(200).json({
        status: 'ERROR',
        message: 'The input is required'
      })
    } else if (!isValidEmail) {
      return res.status(200).json({
        status: 'ERROR',
        message: 'The input is valid email'
      })
    }

    const response = await loginUser(req.body)

    if (response) {
      return res.status(201).json(response)
    }

    return res.status(404).json({ message: 'Login error' })
  } catch (error) {
    return res.status(404).json({
      message: error
    })
  }
}

export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId
    const response = await updateUser(userId, req.body)

    if (response) {
      return res.status(200).json(response)
    }

    return res.status(404).json({ message: 'Update user error' })
  } catch (error) {
    return res.status(404).json({
      message: error
    })
  }
}

export const deleteUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId
    const response = await deleteUser(userId)

    if (response) {
      return res.status(200).json(response)
    }

    return res.status(404).json({ message: 'Delete user error' })
  } catch (error) {
    return res.status(404).json({
      message: error
    })
  }
}

export const getAllUser = async (req, res) => {
  try {
    const response = await getAllUserService()

    if (response) {
      return res.status(200).json(response)
    }

    return res.status(404).json({ message: 'Fetch users error' })
  } catch (error) {
    return res.status(404).json({
      message: error
    })
  }
}

export const getDetailUser = async (req, res) => {
  try {
    const userId = req.params.userId
    const response = await getDetailUserService(userId)

    if (response) {
      return res.status(200).json(response)
    }

    return res.status(404).json({ message: 'Get detail user error' })
  } catch (error) {
    return res.status(404).json({
      message: error
    })
  }
}
