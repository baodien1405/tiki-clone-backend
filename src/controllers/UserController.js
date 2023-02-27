import {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getUsersService,
  getDetailUser,
  refreshTokenService
} from '../services/index.js'

export const userSignUp = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const isValidEmail = regex.test(email)

    if (!email || !password || !confirmPassword) {
      return res.status(422).json({
        status: 'ERROR',
        message: 'The input is required'
      })
    } else if (!isValidEmail) {
      return res.status(422).json({
        status: 'ERROR',
        message: 'The input is valid email'
      })
    } else if (password !== confirmPassword) {
      return res.status(422).json({
        status: 'ERROR',
        message: 'The input is is equal confirm password'
      })
    }

    const response = await createUser(req.body)
    if (response.status === 'ERROR') {
      return res.status(422).json(response)
    }

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
      return res.status(422).json({
        status: 'ERROR',
        message: 'The input is required'
      })
    } else if (!isValidEmail) {
      return res.status(422).json({
        status: 'ERROR',
        message: 'The input is valid email'
      })
    }

    const response = await loginUser(req.body)

    if (response.status === 'ERROR') {
      return res.status(422).json(response)
    }

    if (response.status === 'OK') {
      const { refresh_token, ...newResponse } = response

      res.cookie('refresh_token', refresh_token, {
        httpOnly: true,
        secure: false,
        samesite: 'strict'
      })

      return res.status(201).json(newResponse)
    }

    return res.status(404).json({ message: 'Login error' })
  } catch (error) {
    return res.status(404).json({
      message: error
    })
  }
}

export const updateUserById = async (req, res) => {
  try {
    const userId = req.params.id
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

export const deleteUserById = async (req, res) => {
  try {
    const userId = req.params.id
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

export const getUsers = async (req, res) => {
  try {
    const response = await getUsersService()

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

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id
    const response = await getDetailUser(userId)

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

export const refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refresh_token
    if (!token) {
      return res.status(200).json({
        status: 'Error',
        message: 'Token is required'
      })
    }

    const response = await refreshTokenService(token)

    if (response) {
      return res.status(200).json(response)
    }

    return res.status(404).json({ message: 'Failed to refresh token' })
  } catch (error) {
    return res.status(404).json({
      message: error
    })
  }
}
