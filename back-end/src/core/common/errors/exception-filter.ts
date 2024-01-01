import { type Request, type Response, type NextFunction } from 'express'

import { HttpError } from './http.error'

import { type IException } from './exception-filter.inteface'
import { type ILoggerService } from '../../logger/logger.inteface'

export class ExceptionFilter implements IException {
  constructor (private readonly logger: ILoggerService) {}
  catch (err: Error | HttpError, req: Request, res: Response, next: NextFunction): void {
    if (err instanceof HttpError) {
      this.logger.error(`[EXCEPTION] code: ${err.code}, message: ${err.message}`)
      res.status(err.code).send({
        err: err.message,
        code: err.code
      })
    } else {
      this.logger.error(`[EXCEPTION] message: ${err.message}]`)
      res.status(500).send({
        err: err.message
      })
    }
  }
}
