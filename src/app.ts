import express from 'express'
import { fakeUserMiddleware } from './middlewares/fakeUser'
import { loggerMiddleware } from './middlewares/logger'
import pingRoute from './routes/ping.controller'
import pongRoute from './routes/pong.controller'
import { pangController, validatePangRequest } from './routes/pang.controller'

export default express()
  .use(express.json())
  .use(pingRoute)
  .use(pongRoute)
  .get('/pang/:id', loggerMiddleware, fakeUserMiddleware, validatePangRequest, pangController)
