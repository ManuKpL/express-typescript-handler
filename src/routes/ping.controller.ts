import { z } from 'zod'
import { configureRequest } from '../lib/configure-request'

export const pingRequestHandlers = configureRequest({
  validation: { params: z.object({ id: z.string().min(1) }) },
  responseBody: z.object({ status: z.enum(['ok', 'ko']) }),
  extra: ['user'],
  handler: (req, res) => {
    console.log({ id: req.params.id, user: req.user.name })
    res.json({ status: 'ok' })
  },
})
