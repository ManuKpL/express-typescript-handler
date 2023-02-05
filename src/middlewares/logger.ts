import { RequestHandler } from 'express'

export const loggerMiddleware: RequestHandler = (req, _, next) => {
  const { method, path, query, params, body } = req

  console.info('Received request', { method, path, query, params, body })

  next()
}
