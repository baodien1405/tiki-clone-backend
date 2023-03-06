import {
  createProductService,
  updateProductService,
  getProductsService,
  getProductService,
  deleteProductService
} from '../services/index.js'

export const createProduct = async (req, res) => {
  try {
    const { name, image, type, price, countInStock, rating, description } = req.body

    if ((!name || !image || !type || !price || !countInStock || !rating, !description)) {
      return res.status(422).json({
        status: 'ERROR',
        message: 'The input is required'
      })
    }

    const response = await createProductService(req.body)

    if (response.status === 'ERROR') {
      return res.status(422).json(response)
    }

    if (response.status === 'OK') {
      return res.status(201).json(response)
    }
  } catch (error) {
    return res.status(404).json({
      message: error
    })
  }
}

export const updateProductById = async (req, res) => {
  try {
    const productId = req.params.id
    const response = await updateProductService(productId, req.body)

    if (response.status === 'ERROR') {
      return res.status(422).json(response)
    }

    if (response.status === 'OK') {
      return res.status(200).json(response)
    }
  } catch (error) {
    return res.status(404).json({
      message: error
    })
  }
}

export const deleteProductById = async (req, res) => {
  try {
    const productId = req.params.id
    const response = await deleteProductService(productId)

    if (response.status === 'ERROR') {
      return res.status(422).json(response)
    }

    if (response.status === 'OK') {
      return res.status(200).json(response)
    }
  } catch (error) {
    return res.status(404).json({
      message: error
    })
  }
}

export const getProducts = async (req, res) => {
  try {
    const { _page, _limit, _sort, _order, name } = req.query
    const response = await getProductsService(
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

export const getProductById = async (req, res) => {
  try {
    const productId = req.params.id
    const response = await getProductService(productId)

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
