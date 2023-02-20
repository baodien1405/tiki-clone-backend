import express from 'express'
import { createProduct, updateProduct, getAllProduct, deleteProduct, getDetailProduct } from '../controllers/index.js'
import { Authenticate } from '../middlewares/index.js'

const router = express.Router()

router.post('/create', createProduct)
router.put('/update/:id', Authenticate, updateProduct)
router.delete('/delete-product/:id', deleteProduct)
router.get('/get-all', getAllProduct)
router.get('/get-detail-product/:id', getDetailProduct)

export { router as ProductRoute }
