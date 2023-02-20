import { Product } from '../models/index.js'

export const createProductService = async (newProduct) => {
  const { name, image, type, price, countInStock, rating, description } = newProduct
  try {
    const existProduct = await Product.findOne({
      name: name
    })

    if (existProduct !== null) {
      return {
        status: 'OK',
        message: 'The name of product is already'
      }
    }

    const product = await Product.create({
      name,
      image,
      type,
      price,
      countInStock,
      rating,
      description
    })

    if (product) {
      return {
        status: 'OK',
        message: 'Success',
        data: product
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export const updateProductService = async (id, data) => {
  try {
    const existProduct = await Product.findById(id)

    if (!existProduct) {
      return {
        status: 'OK',
        message: 'The product is not defined'
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true })

    return {
      status: 'OK',
      message: 'Success',
      data: updatedProduct
    }
  } catch (error) {
    console.log(error)
  }
}

export const deleteProductService = async (id) => {
  try {
    const existProduct = await Product.findById(id)

    if (!existProduct) {
      return {
        status: 'OK',
        message: 'The product is not defined'
      }
    }

    await Product.findByIdAndDelete(id)

    return {
      status: 'OK',
      message: 'Delete product success'
    }
  } catch (error) {
    console.log(error)
  }
}

export const getAllProductService = async () => {
  try {
    const products = await Product.find()
    if (products) {
      return {
        status: 'OK',
        message: 'Success',
        data: products
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export const getDetailProductService = async (id) => {
  try {
    const existProduct = await Product.findById(id)

    if (!existProduct) {
      return {
        status: 'OK',
        message: 'The product is not found'
      }
    }

    return {
      status: 'OK',
      message: 'Success',
      data: existProduct
    }
  } catch (error) {
    console.log(error)
  }
}
