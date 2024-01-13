import { type NextFunction, type Request, type Response } from 'express'

import { NotFoundException } from '../core/common/errors/exceptions/not-found.exception'
import { ValidatorMiddleware } from '../core/common/middlewares/validation.middleware'

import { BaseController } from '../core/common/base.controller'
import { type ILoggerService } from '../core/logger/logger.inteface'
import { type IBrandsService } from './intefaces/brands-service.inteface'
import { type CreateBrandDto, CreateBrandDtoSchema } from './dto/create-brand.dto'
import { type UpdateBrandDto, UpdateBrandDtoSchema } from './dto/update-brand.dto'

export class BrandsController extends BaseController {
  constructor (
    public readonly prefix: string,
    private readonly loggerService: ILoggerService,
    private readonly BrandsService: IBrandsService
  ) {
    super(prefix, loggerService)
    this.bindRoutes([
      {
        path: '',
        func: this.createBrand,
        method: 'post',
        middlewares: [new ValidatorMiddleware(CreateBrandDtoSchema)]
      },
      {
        path: '',
        func: this.getBrandsList,
        method: 'get'
      },
      {
        path: '/:id',
        func: this.findBrandById,
        method: 'get'
      },
      {
        path: '/:id',
        func: this.deleteBrand,
        method: 'delete'
      },
      {
        path: '/:id',
        func: this.updateBrand,
        method: 'patch',
        middlewares: [new ValidatorMiddleware(UpdateBrandDtoSchema)]
      }
    ], prefix)
  }

  async createBrand (req: Request<{}, {}, CreateBrandDto>, res: Response): Promise<void> {
    const dto = req.body
    const brand = await this.BrandsService.createBrand(dto)
    res.status(200).send(brand)
  }

  async updateBrand (req: Request<{ id: string }, {}, UpdateBrandDto>, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id
    const dto = req.body
    const existedBrand = await this.BrandsService.findBrandById(id)

    if (!existedBrand) {
      next(new NotFoundException("Brand with such ID doesn't exists."))
      return
    }

    const brand = await this.BrandsService.updateBrand(id, dto)
    res.status(200).send(brand)
  }

  async getBrandsList (req: Request, res: Response): Promise<void> {
    const brands = await this.BrandsService.getBrandsList()
    res.status(200).send(brands)
  }

  async findBrandById (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id
    const brands = await this.BrandsService.findBrandById(id)
    if (!brands) {
      next(new NotFoundException('No brand found with such ID.'))
      return
    }
    res.status(200).send(brands)
  }

  async deleteBrand (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id
    const existedBrand = await this.BrandsService.findBrandById(id)

    if (!existedBrand) {
      next(new NotFoundException("Brand with such ID doesn't exists."))
      return
    }

    const deletedBrand = await this.BrandsService.deleteBrand(id)

    res.status(200).send(deletedBrand)
  }
}
