import express from 'express'
import {
  createProduct,
  updateProductById,
  getProducts,
  deleteProductById,
  getProductById
} from '../controllers/index.js'
import { Authenticate } from '../middlewares/index.js'

const router = express.Router()

router.post('/', createProduct)
router.get('/', getProducts)
router.get('/:id', getProductById)
router.put('/:id', Authenticate, updateProductById)
router.delete('/:id', deleteProductById)

export { router as ProductRoute }
