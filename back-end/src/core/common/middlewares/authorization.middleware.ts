import { type Request, type Response, type NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import { UnauthorizedException } from '../errors/exceptions/unauthorized.exception'
import { HttpError } from '../errors/http.error'
import { type IMiddleware } from './middleware.inteface'

export class AuthMiddleware implements IMiddleware {
  constructor () {}
  execute (
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | undefined {
    try {
      const authHeader = req.headers.authorization
      if (!authHeader) {
        throw new UnauthorizedException('User is not authorized')
      }
      const [type, token] = authHeader.split(' ')
      if (type !== 'Bearer') {
        throw new UnauthorizedException('User is not authorized')
      }

      verify(token, process.env.JWT_ACCESS_SECRET!, (err, user) => {
        if (err) throw new UnauthorizedException('User is not authorized')
        req.user = user
      })
      next()
    } catch (error) {
      if (error instanceof HttpError) {
        return res
          .status(error.code)
          .json({ message: error.message, code: error.code })
      } else {
        return res
          .status(500)
          .json({ message: 'Internal server error', code: 500 })
      }
    }
  }
}
