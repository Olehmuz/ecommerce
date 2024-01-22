import { type NextFunction, type Request, type Response } from 'express'

import { ValidatorMiddleware } from '../core/common/middlewares/validation.middleware'
import { BaseController } from '../core/common/base.controller'
import { type ILoggerService } from '../core/logger/logger.inteface'
import { type IAuthService } from './intefaces/auth-service.inteface'
import { LoginUserDtoSchema, type LoginUserDto } from './dto/login-user.dto'
import { type RegisterUserDto, RegisterUserDtoSchema } from './dto/register-user.dto'

export class AuthController extends BaseController {
  constructor (
    public readonly prefix: string,
    private readonly loggerService: ILoggerService,
    private readonly authService: IAuthService
  ) {
    super(prefix, loggerService)
    this.bindRoutes([
      {
        path: '/register',
        func: this.register,
        middlewares: [new ValidatorMiddleware(RegisterUserDtoSchema)],
        method: 'post'
      },
      {
        path: '/login',
        func: this.login,
        middlewares: [new ValidatorMiddleware(LoginUserDtoSchema)],
        method: 'post'
      },
      {
        path: '/refresh',
        func: this.refresh,
        method: 'post'
      }
    ], prefix)
  }

  async register (req: Request<{}, {}, RegisterUserDto>, res: Response, next: NextFunction): Promise<void> {
    try {
      const tokens = await this.authService.register(req.body)
      res.status(200).json(tokens)
    } catch (error) {
      next(error)
    }
  }

  async login (req: Request<{}, {}, LoginUserDto>, res: Response, next: NextFunction): Promise<void> {
    try {
      const tokens = await this.authService.login(req.body)
      res.status(200).json(tokens)
    } catch (error) {
      next(error)
    }
  }

  async refresh (req: Request<{}, {}, { refreshToken: string }>, res: Response, next: NextFunction): Promise<void> {
    try {
      const refreshToken = req.body.refreshToken
      const tokens = await this.authService.refresh(refreshToken)
      res.status(200).json(tokens)
    } catch (error) {
      next(error)
    }
  }
}
