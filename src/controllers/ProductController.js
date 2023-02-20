import {
  createProductService,
  updateProductService,
  getAllProductService,
  getDetailProductService,
  deleteProductService
} from '../services/index.js'

export const createProduct = async (req, res) => {
  try {
    const { name, image, type, price, countInStock, rating, description } = req.body

    if ((!name || !image || !type || !price || !countInStock || !rating, !description)) {
      return res.status(200).json({
        status: 'ERROR',
        message: 'The input is required'
      })
    }

    const response = await createProductService(req.body)
    return res.status(200).json(response)
  } catch (error) {
    return res.status(404).json({
      message: error
    })
  }
}

export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id
    const response = await updateProductService(productId, req.body)

    if (response) {
      return res.status(200).json(response)
    }

    return res.status(404).json({ message: 'Update product error' })
  } catch (error) {
    return res.status(404).json({
      message: error
    })
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id
    const response = await deleteProductService(productId)

    if (response) {
      return res.status(200).json(response)
    }

    return res.status(404).json({ message: 'Delete product error' })
  } catch (error) {
    return res.status(404).json({
      message: error
    })
  }
}

export const getAllProduct = async (req, res) => {
  try {
    const { _page, _limit, _sort, _order, name } = req.query
    const response = await getAllProductService(
      Number(_page || 1),
      Number(_limit || 8),
      _sort || 'name',
      _order || 'asc',
      name || ''
    )

    if (response) {
      return res.status(200).json(response)
    }

    return res.status(404).json({ message: 'Fetch products error' })
  } catch (error) {
    return res.status(404).json({
      message: error
    })
  }
}

export const getDetailProduct = async (req, res) => {
  try {
    const productId = req.params.id
    const response = await getDetailProductService(productId)

    if (response) {
      return res.status(200).json(response)
    }

    return res.status(404).json({ message: 'Get detail product error' })
  } catch (error) {
    return res.status(404).json({
      message: error
    })
  }
}
