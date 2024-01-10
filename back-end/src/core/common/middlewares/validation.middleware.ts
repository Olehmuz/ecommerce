import { type Request, type Response, type NextFunction } from 'express'
import { type AnyZodObject } from 'zod'
import { type IMiddleware } from './middleware.inteface'

export class ValidatorMiddleware implements IMiddleware {
  constructor (private readonly schema: AnyZodObject) {}
  execute (req: Request, res: Response, next: NextFunction): Response | undefined {
    try {
      this.schema.parse({
        body: req.body,
        query: req.query,
        params: req.params
      })
      next()
    } catch (error) {
      return res.status(400).json(error)
    }
  }
}
