import { z } from 'zod'
import { configureRequest } from '../lib/configure-request'
import type { InferHandler } from '../lib/make-handler'
import type { ValidationSchema } from '../lib/make-validator'

const validation = {
  params: z.object({
    id: z.coerce.number().positive(),
  }),
} satisfies ValidationSchema

type ResBody = {
  status: 'ok' | 'ko'
}

type ReqExtra = ['user']

const requestHandler: InferHandler<typeof validation, ResBody, ReqExtra> = (req, res) => {
  console.log({ id: req.params.id, user: req.user.name })
  res.json({ status: 'ok' })
}

export default configureRequest<typeof validation, ResBody, ReqExtra>({
  method: 'get',
  path: '/pong/:id',
  middlewares: [loggerMiddleware, fakeUserMiddleware],
  validation: validation,
  handler: requestHandler,
})
