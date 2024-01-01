import { type NextFunction, type Request, type Response } from 'express'
import { type HttpError } from './http.error'

export interface IException {
  catch: (err: Error | HttpError, req: Request, res: Response, next: NextFunction) => void
}
