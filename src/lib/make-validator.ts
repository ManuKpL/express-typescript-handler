import type { RequestHandler } from 'express'
import { z } from 'zod'

const emptyObject = z.object({})

export type ValidationSchema<
  ReqParams = z.ZodSchema,
  ReqBody = z.ZodSchema,
  ReqQuery = z.ZodSchema,
  ReqLocals = z.ZodSchema
> = {
  body?: ReqBody
  params?: ReqParams
  query?: ReqQuery
  locals?: ReqLocals
}

export type InferValidationHandler<Handler> = Handler extends ValidationSchema<
  infer ReqParams,
  infer ReqBody,
  infer ReqQuery,
  infer ReqLocals
>
  ? RequestHandler<
      z.infer<ReqParams extends z.ZodObject<z.ZodRawShape> ? ReqParams : typeof emptyObject>,
      unknown,
      z.infer<ReqBody extends z.ZodObject<z.ZodRawShape> ? ReqBody : typeof emptyObject | z.ZodVoid>,
      z.infer<ReqQuery extends z.ZodObject<z.ZodRawShape> ? ReqQuery : typeof emptyObject>,
      z.infer<ReqLocals extends z.ZodObject<z.ZodRawShape> ? ReqLocals : typeof emptyObject>
    >
  : never

export function makeValidator(validationSchema: ValidationSchema): RequestHandler {
  return (req, res, next) => {
    const result = z
      .object({
        body: validationSchema.body ?? emptyObject.or(z.void()),
        params: validationSchema.params ?? emptyObject,
        query: validationSchema.query ?? emptyObject,
      })
      .safeParse({
        body: req.body,
        params: req.params,
        query: req.query,
      })

    if (result.success) {
      Object.assign(req, result.data)
      next()
    } else {
      res.status(400).json({ errors: result.error.errors })
    }
  }
}
