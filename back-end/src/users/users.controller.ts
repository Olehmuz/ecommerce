import { type NextFunction, type Request, type Response } from 'express'

import { NotFoundException } from '../core/common/errors/exceptions/not-found.exception'
import { ValidatorMiddleware } from '../core/common/middlewares/validation.middleware'

import { BaseController } from '../core/common/base.controller'
import { type ILoggerService } from '../core/logger/logger.inteface'
import { type IUsersService } from './intefaces/users-service.inteface'
import { type CreateUserDto, CreateUserDtoSchema } from './dto/create-user.dto'
import { type UpdateUserDto, UpdateUserDtoSchema } from './dto/update-user.dto'

export class UsersController extends BaseController {
  constructor (
    public readonly prefix: string,
    private readonly loggerService: ILoggerService,
    private readonly usersService: IUsersService
  ) {
    super(prefix, loggerService)
    this.bindRoutes([
      {
        path: '',
        func: this.createUser,
        method: 'post',
        middlewares: [new ValidatorMiddleware(CreateUserDtoSchema)]
      },
      {
        path: '',
        func: this.getUsersList,
        method: 'get'
      },
      {
        path: '/:id',
        func: this.findUserById,
        method: 'get'
      },
      {
        path: '/:id',
        func: this.deleteUser,
        method: 'delete'
      },
      {
        path: '/:id',
        func: this.updateUser,
        method: 'patch',
        middlewares: [new ValidatorMiddleware(UpdateUserDtoSchema)]
      }
    ], prefix)
  }

  async createUser (req: Request<{}, {}, CreateUserDto>, res: Response): Promise<void> {
    const dto = req.body
    const user = await this.usersService.createUser(dto)
    res.status(200).send(user)
  }

  async updateUser (req: Request<{ id: string }, {}, UpdateUserDto>, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id
    const dto = req.body
    const existedUser = await this.usersService.findUserById(id)

    if (!existedUser) {
      next(new NotFoundException("User with such ID doesn't exists."))
      return
    }

    const user = await this.usersService.updateUser(id, dto)
    res.status(200).send(user)
  }

  async getUsersList (req: Request, res: Response): Promise<void> {
    const users = await this.usersService.getUsersList()
    res.status(200).send(users)
  }

  async findUserById (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id
    const users = await this.usersService.findUserById(id)
    if (!users) {
      next(new NotFoundException('No user found with such ID.'))
      return
    }
    res.status(200).send(users)
  }

  async deleteUser (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id
    const existedUser = await this.usersService.findUserById(id)

    if (!existedUser) {
      next(new NotFoundException("User with such ID doesn't exists."))
      return
    }

    const deletedUser = await this.usersService.deleteUser(id)

    res.status(200).send(deletedUser)
  }
}
