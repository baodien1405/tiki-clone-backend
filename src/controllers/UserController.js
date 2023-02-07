import { createUserService } from '../services/index.js'

export const createUser = async (req, res) => {
  try {
    console.log(req.body)
    // const response = await createUserService()
    // return res.status(200).json(response)
  } catch (error) {
    return res.status(404).json({
      message: error
    })
  }
}
