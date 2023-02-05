import { z } from 'zod'
import { configureRequest } from '../lib/configure-request'
import type { InferControllerHandler } from '../lib/make-controller'
import type { ValidationSchema } from '../lib/make-validator'

const validation = {
  params: z.object({
    id: z.coerce.number().positive(),
  }),
} satisfies ValidationSchema

export type ResBody = {
  status: 'ok' | 'ko'
}

type ReqExtra = ['user']

const requestHandler: InferControllerHandler<typeof validation, ResBody, ReqExtra> = (req, res) => {
  console.log({ id: req.params.id, user: req.user.name })
  res.json({ status: 'ok' })
}

export const pongRequestHandlers = configureRequest<typeof validation, ResBody, ReqExtra>({
  validation: validation,
  handler: requestHandler,
})
