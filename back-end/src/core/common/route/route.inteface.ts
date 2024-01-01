import { type NextFunction, type Request, type Response, type Router } from 'express'
import { type IMiddleware } from '../middleware/middleware.inteface'

export interface IControllerRoute {
  path: string
  func: (req: Request, res: Response, next: NextFunction) => void
  method: keyof Pick<Router, 'get' | 'post' | 'patch' | 'put' | 'delete'>
  middlewares?: IMiddleware[]
}

export type ExpressResponseType = Response<any, Record<string, any>>
