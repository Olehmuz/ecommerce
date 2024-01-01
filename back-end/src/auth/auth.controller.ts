import { type NextFunction, type Request, type Response } from 'express'
import { BaseController } from '../core/common/base.controller'
import { type ILoggerService } from '../core/logger/logger.inteface'

export class AuthController extends BaseController {
  constructor (
    public readonly prefix: string,
    private readonly loggerService: ILoggerService
  ) {
    super(prefix, loggerService)
    this.bindRoutes([
      {
        path: '/sayHi',
        func: this.hi,
        method: 'get'
      },
      {
        path: '/foo',
        func: this.foo,
        method: 'post'
      }
    ], prefix)
  }

  hi (req: Request, res: Response, next: NextFunction): void {
    console.log(req.body)
    // throw new HttpError(404, 'Method not implemented.')
    this.ok(res, req.body)
  }

  foo (req: Request, res: Response, next: NextFunction): void {
    this.ok(res, 'foo')
  }
}
