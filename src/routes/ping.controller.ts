import { z } from 'zod'
import { configureRequest } from '../lib/configure-request'
import { fakeUserMiddleware } from '../middlewares/fakeUser'
import { loggerMiddleware } from '../middlewares/logger'

export default configureRequest({
  method: 'get',
  path: '/ping/:id',
  validation: { params: z.object({ id: z.string().min(1) }) },
  responseBody: z.object({ status: z.enum(['ok', 'ko']) }),
  extra: ['user'],
  middlewares: [loggerMiddleware, fakeUserMiddleware],
  handler: (req, res) => {
    console.log({ id: req.params.id, user: req.user.name })
    res.json({ status: 'ok' })
  },
})
