import type { RequestHandler } from 'express'
import { z } from 'zod'
import { makeController, type InferControllerHandler, type RequestExtra } from './make-controller'
import { makeValidator, type ValidationSchema } from './make-validator'

export function configureRequest<
  Validation extends ValidationSchema,
  ResBody,
  ReqExtra extends RequestExtra = Record<string, never>
>(definition: {
  handler: InferControllerHandler<Validation, ResBody, ReqExtra>
  validation?: Validation
  extra?: Exclude<ReqExtra, Record<string, unknown>> | z.Schema<ReqExtra>
  responseBody?: z.Schema<ResBody>
}): RequestHandler[] {
  const handlers = [makeController(definition.handler)]

  if (definition.validation) {
    handlers.unshift(makeValidator(definition.validation))
  }

  return handlers
}
