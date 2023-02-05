/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextFunction, Request, RequestHandler, Response } from 'express'
import type { InferValidationHandler } from './make-validator'

type InferRequest<T> = T extends RequestHandler<
  infer Params,
  infer ResBody,
  infer ReqBody,
  infer ReqQuery,
  infer Locals
>
  ? Request<Params, ResBody, ReqBody, ReqQuery, Locals>
  : never

type InferResponse<Handler> = Handler extends RequestHandler<
  infer _Params,
  infer ResBody,
  infer _ReqBody,
  infer _ReqQuery,
  infer Locals
>
  ? Response<ResBody, Locals>
  : never

type OptionalProperties<T> = keyof { [P in keyof T as T[P] extends Required<T>[P] ? never : P]: T[P] }
export type RequestExtra = OptionalProperties<Request>[] | Record<string, unknown>

export type InferHandler<Validation, ResBody, RequestExtra> = InferValidationHandler<Validation> extends RequestHandler<
  infer Params,
  infer _ResBody,
  infer ReqBody,
  infer ReqQuery,
  infer Locals
>
  ? (
      req: InferExtendedRequest<RequestHandler<Params, ResBody, ReqBody, ReqQuery, Locals>, RequestExtra>,
      res: InferResponse<RequestHandler<Params, ResBody, ReqBody, ReqQuery, Locals>>,
      next: NextFunction
    ) => ReturnType<RequestHandler>
  : never

type InferExtendedRequest<Handler, ReqExtra> = ReqExtra extends Exclude<RequestExtra, Record<string, unknown>>
  ? Omit<InferRequest<Handler>, ReqExtra[number]> & Required<Pick<InferRequest<Handler>, ReqExtra[number]>>
  : InferRequest<Handler> & RequestExtra

export function makeHandler<Validation, ResBody = unknown, ReqExtra extends RequestExtra = Record<string, never>>(
  handler: InferHandler<Validation, ResBody, ReqExtra>
): RequestHandler {
  return handler as unknown as RequestHandler
}
