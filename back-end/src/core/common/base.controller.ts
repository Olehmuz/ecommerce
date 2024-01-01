import { type Response, Router } from 'express'

import { type ILoggerService } from '../logger/logger.inteface'
import { type IControllerRoute, type ExpressResponseType } from './route/route.inteface'

export class BaseController {
  private readonly _router: Router
  constructor (public readonly prefix: string, private readonly logger: ILoggerService) {
    this._router = Router()
  }

  get router (): Router {
    return this._router
  }

  send<T>(res: Response, message: T, code: number): Response<any, Record<string, any>> {
    res.type('application/json')
    return res.status(code).send(message)
  }

  ok<T>(res: Response, message: T): ExpressResponseType {
    return this.send(res, message, 200)
  }

  bindRoutes (routes: IControllerRoute[], prefix: string): void {
    for (const route of routes) {
      const handle = route.func.bind(this)
      const middleware = route.middlewares?.map((m) => m.execute.bind(m))
      const pipeline = middleware ? [...middleware, handle] : handle
      this._router[route.method](route.path, pipeline)
      this.logger.info(`[${prefix.toUpperCase()} CONTROLLER] [${route.method}] ${'/' + prefix + route.path}`)
    }
  }
}
