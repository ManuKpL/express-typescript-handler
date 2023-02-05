import express from 'express'
import { fakeUserMiddleware } from './middlewares/fakeUser'
import { loggerMiddleware } from './middlewares/logger'
import { pingRequestHandlers } from './routes/ping.controller'
import { pongRequestHandlers } from './routes/pong.controller'
import { pangController, validatePangRequest } from './routes/pang.controller'

export default express()
  .use(express.json())
  .get('/ping/:id', loggerMiddleware, fakeUserMiddleware, ...pingRequestHandlers)
  .get('/pong/:id', loggerMiddleware, fakeUserMiddleware, ...pongRequestHandlers)
  .get('/pang/:id', loggerMiddleware, fakeUserMiddleware, validatePangRequest, pangController)
