import express from 'express'
import {
  createProduct,
  updateProductById,
  getProducts,
  deleteProductById,
  getProductById,
  deleteManyProduct
} from '../controllers/index.js'
import { Authenticate } from '../middlewares/index.js'

const router = express.Router()

router.post('/', createProduct)
router.get('/', getProducts)
router.get('/:id', getProductById)
router.put('/:id', Authenticate, updateProductById)
router.delete('/many', Authenticate, deleteManyProduct)
router.delete('/:id', Authenticate, deleteProductById)

export { router as ProductRoute }
