import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    rating: { type: Number, required: true },
    description: { type: String, required: true },
    discount: { type: Number },
    quantitySold: { type: Number }
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v
        delete ret.createdAt
        delete ret.updatedAt
      }
    },
    timestamps: true
  }
)

export const Product = mongoose.model('Product', productSchema)
