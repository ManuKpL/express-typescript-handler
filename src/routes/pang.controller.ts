import { z } from 'zod'
import { makeController } from '../lib/make-controller'
import { makeValidator, type ValidationSchema } from '../lib/make-validator'
import type { ResBody } from './pong.controller'

const validation = {
  params: z.object({
    id: z.coerce.number().positive(),
  }),
} satisfies ValidationSchema

export const validatePangRequest = makeValidator(validation)

export const pangController = makeController<typeof validation, ResBody, ['user']>((req, res) => {
  console.log({ id: req.params.id, user: req.user.name })
  res.json({ status: 'ok' })
})
