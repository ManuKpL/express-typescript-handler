import { RequestHandler } from 'express'

export const fakeUserMiddleware: RequestHandler = (req, _, next) => {
  req.user = {
    name: 'Ada Lovelace',
    admin: true,
  }

  next()
}
