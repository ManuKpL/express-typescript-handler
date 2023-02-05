import { RequestHandler } from 'express'
import { z } from 'zod'
import { makeHandler, type InferHandler, type RequestExtra } from './make-handler'
import { makeValidator, type ValidationSchema } from './make-validator'

export function configureRequest<
  Validation extends ValidationSchema,
  ResBody,
  ReqExtra extends RequestExtra = Record<string, never>
>(definition: {
  method: 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head'
  path: string
  handler: InferHandler<Validation, ResBody, ReqExtra>
  validation?: Validation
  extra?: Exclude<ReqExtra, Record<string, unknown>> | z.Schema<ReqExtra>
  responseBody?: z.Schema<ResBody>
  middlewares?: RequestHandler[]
}): Router {
  const handlers = [makeHandler(definition.handler)]

  if (definition.validation) {
    handlers.unshift(makeValidator(definition.validation))
  }

  return Router()[definition.method](definition.path, ...(definition.middlewares ?? []), ...handlers)
}
