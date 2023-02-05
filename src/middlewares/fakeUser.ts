import { makeHandler } from '../lib/make-handler'

export const fakeUserMiddleware = makeHandler((req, _, next) => {
  req.user = {
    name: 'Ada Lovelace',
    admin: true,
  }

  next()
})
