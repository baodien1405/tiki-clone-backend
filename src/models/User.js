import mongoose from 'mongoose'
import mongooseDelete from 'mongoose-delete'

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
    phone: { type: String },
    address: { type: String },
    avatar: { type: String }
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password
        delete ret.salt
        delete ret.__v
        delete ret.createdAt
        delete ret.updatedAt
      }
    },
    timestamps: true
  }
)

userSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all'
})

export const User = mongoose.model('User', userSchema)
