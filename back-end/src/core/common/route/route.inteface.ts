import { type NextFunction, type Response, type Router } from 'express'
import { type IMiddleware } from '../middlewares/middleware.inteface'

export interface IControllerRoute {
  path: string
  func: (req: any, res: Response, next: NextFunction) => Promise<any> | any
  method: keyof Pick<Router, 'get' | 'post' | 'patch' | 'put' | 'delete'>
  middlewares?: IMiddleware[]
}

export type ExpressResponseType = Response<any, Record<string, any>>
