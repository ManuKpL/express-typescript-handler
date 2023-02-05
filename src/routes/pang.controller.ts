import { z } from 'zod'
import { makeHandler } from '../lib/make-handler'
import { makeValidator, type ValidationSchema } from '../lib/make-validator'

const validation = {
  params: z.object({
    id: z.coerce.number().positive(),
  }),
} satisfies ValidationSchema

export const validatePangRequest = makeValidator(validation)

type ResBody = {
  status: 'ok' | 'ko'
}

export const pangController = makeHandler<typeof validation, ResBody, ['user']>((req, res) => {
  console.log({ id: req.params.id, user: req.user.name })
  res.json({ status: 'ok' })
})
