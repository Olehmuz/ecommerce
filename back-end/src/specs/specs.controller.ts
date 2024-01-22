import { type NextFunction, type Request, type Response } from 'express'

import { AuthMiddleware } from '../core/common/middlewares/authorization.middleware'
import { NotFoundException } from '../core/common/errors/exceptions/not-found.exception'
import { ValidatorMiddleware } from '../core/common/middlewares/validation.middleware'

import { BaseController } from '../core/common/base.controller'
import { type ILoggerService } from '../core/logger/logger.inteface'
import { type ISpecsService } from './intefaces/specs-service.inteface'
import { type CreateSpecDto, CreateSpecDtoSchema } from './dto/create-spec.dto'
import { type UpdateSpecDto, UpdateSpecDtoSchema } from './dto/update-spec.dto'
import { CreateSpecVariantDtoSchema, type CreateSpecVariantDto } from './dto/create-spec-variant.dto'
import { UpdateSpecVariantDtoSchema, type UpdateSpecVariantDto } from './dto/update-spec-variant.dto'

export class SpecsController extends BaseController {
  constructor (
    public readonly prefix: string,
    private readonly loggerService: ILoggerService,
    private readonly specsService: ISpecsService
  ) {
    super(prefix, loggerService)
    this.bindRoutes([
      {
        path: '',
        func: this.createSpec,
        method: 'post',
        middlewares: [new AuthMiddleware(), new ValidatorMiddleware(CreateSpecDtoSchema)]
      },
      {
        path: '',
        func: this.getSpecsList,
        method: 'get'
      },
      {
        path: '/variants',
        func: this.createSpecVariant,
        method: 'post',
        middlewares: [new AuthMiddleware(), new ValidatorMiddleware(CreateSpecVariantDtoSchema)]
      },
      {
        path: '/variants',
        func: this.getSpecVariantsList,
        method: 'get'
      },
      {
        path: '/variants/:id',
        func: this.findSpecVariantById,
        method: 'get'
      },
      {
        path: '/variants/:id',
        func: this.deleteSpecVariant,
        middlewares: [new AuthMiddleware()],
        method: 'delete'
      },
      {
        path: '/variants/:id',
        func: this.updateSpecVariant,
        method: 'patch',
        middlewares: [new AuthMiddleware(), new ValidatorMiddleware(UpdateSpecVariantDtoSchema)]
      },
      {
        path: '/:id',
        func: this.findSpecById,
        method: 'get'
      },
      {
        path: '/:id',
        func: this.deleteSpec,
        middlewares: [new AuthMiddleware()],
        method: 'delete'
      },
      {
        path: '/:id',
        func: this.updateSpec,
        method: 'patch',
        middlewares: [new AuthMiddleware(), new ValidatorMiddleware(UpdateSpecDtoSchema)]
      }
    ], prefix)
  }

  async createSpec (req: Request<{}, {}, CreateSpecDto>, res: Response): Promise<void> {
    const dto = req.body
    const spec = await this.specsService.createSpec(dto)
    res.status(200).send(spec)
  }

  async updateSpec (req: Request<{ id: string }, {}, UpdateSpecDto>, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id
    const dto = req.body
    const existedSpec = await this.specsService.findSpecById(id)

    if (!existedSpec) {
      next(new NotFoundException("Spec with such ID doesn't exists."))
      return
    }

    const spec = await this.specsService.updateSpec(id, dto)
    res.status(200).send(spec)
  }

  async getSpecsList (req: Request, res: Response): Promise<void> {
    const specs = await this.specsService.getSpecsList()
    res.status(200).send(specs)
  }

  async findSpecById (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id
    const specs = await this.specsService.findSpecById(id)
    if (!specs) {
      next(new NotFoundException('No spec found with such ID.'))
      return
    }
    res.status(200).send(specs)
  }

  async deleteSpec (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id
    const existedSpec = await this.specsService.findSpecById(id)

    if (!existedSpec) {
      next(new NotFoundException("Spec with such ID doesn't exists."))
      return
    }

    const deletedSpec = await this.specsService.deleteSpec(id)

    res.status(200).send(deletedSpec)
  }

  async createSpecVariant (req: Request<{}, {}, CreateSpecVariantDto>, res: Response): Promise<void> {
    const dto = req.body
    const specVariant = await this.specsService.createSpecVariant(dto)
    res.status(200).send(specVariant)
  }

  async updateSpecVariant (req: Request<{ id: string }, {}, UpdateSpecVariantDto>, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id
    const dto = req.body
    const existedSpecVariant = await this.specsService.findSpecVariantById(id)

    if (!existedSpecVariant) {
      next(new NotFoundException("SpecVariant with such ID doesn't exists."))
      return
    }

    const specVariant = await this.specsService.updateSpecVariant(id, dto)
    res.status(200).send(specVariant)
  }

  async getSpecVariantsList (req: Request, res: Response): Promise<void> {
    const specVariants = await this.specsService.getSpecVariantsList()
    res.status(200).send(specVariants)
  }

  async findSpecVariantById (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id
    const specVariants = await this.specsService.findSpecVariantById(id)
    if (!specVariants) {
      next(new NotFoundException('No specVariant found with such ID.'))
      return
    }
    res.status(200).send(specVariants)
  }

  async deleteSpecVariant (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id
    const existedSpecVariant = await this.specsService.findSpecVariantById(id)

    if (!existedSpecVariant) {
      next(new NotFoundException("SpecVariant with such ID doesn't exists."))
      return
    }

    const deletedSpecVariant = await this.specsService.deleteSpecVariant(id)

    res.status(200).send(deletedSpecVariant)
  }
}
