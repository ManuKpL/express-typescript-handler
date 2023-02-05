import express from 'express'
import { fakeUserMiddleware } from './middlewares/fakeUser'
import { loggerMiddleware } from './middlewares/logger'
import pingHandlers from './routes/ping.controller'
import pongHandlers from './routes/pong.controller'
import { pangController, validatePangRequest } from './routes/pang.controller'

export default express()
  .use(express.json())
  .get('/ping/:id', loggerMiddleware, fakeUserMiddleware, ...pingHandlers)
  .get('/pong/:id', loggerMiddleware, fakeUserMiddleware, ...pongHandlers)
  .get('/pang/:id', loggerMiddleware, fakeUserMiddleware, validatePangRequest, pangController)
