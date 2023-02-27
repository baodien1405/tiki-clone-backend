import { ProductRoute, UserRoute } from '../routes/index.js'

export default async (app) => {
  app.use('/api/user', UserRoute)
  app.use('/api/product', ProductRoute)

  return app
}
