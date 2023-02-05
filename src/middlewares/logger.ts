import { makeHandler } from '../lib/make-handler'

export const loggerMiddleware = makeHandler((req, _, next) => {
  const { method, path, query, params, body } = req

  console.info('Received request', { method, path, query, params, body })

  next()
})
