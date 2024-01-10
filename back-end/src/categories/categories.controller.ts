import { type NextFunction, type Request, type Response } from 'express'

import { NotFoundException } from '../core/common/errors/exceptions/not-found.exception'
import { ValidatorMiddleware } from '../core/common/middlewares/validation.middleware'

import { BaseController } from '../core/common/base.controller'
import { type ILoggerService } from '../core/logger/logger.inteface'
import { type ICategoriesService } from './intefaces/categories-service.inteface'

import { UpdateCategoryDtoSchema, type UpdateCategoryDto } from './dto/update-category.dto'
import { CreateCategoryDtoSchema, type CreateCategoryDto } from './dto/create-category.dto'

export class CategoriesController extends BaseController {
  constructor (
    public readonly prefix: string,
    private readonly loggerService: ILoggerService,
    private readonly categoriesService: ICategoriesService
  ) {
    super(prefix, loggerService)
    this.bindRoutes([
      {
        path: '',
        func: this.createCategory,
        method: 'post',
        middlewares: [new ValidatorMiddleware(CreateCategoryDtoSchema)]
      },
      {
        path: '',
        func: this.getCategoriesList,
        method: 'get'
      },
      {
        path: '/:id',
        func: this.findCategoryById,
        method: 'get'
      },
      {
        path: '/:id',
        func: this.deleteCategory,
        method: 'delete'
      },
      {
        path: '/:id',
        func: this.updateCategory,
        method: 'patch',
        middlewares: [new ValidatorMiddleware(UpdateCategoryDtoSchema)]
      }
    ], prefix)
  }

  async createCategory (req: Request<{}, {}, CreateCategoryDto>, res: Response): Promise<void> {
    const dto = req.body
    const category = await this.categoriesService.createCategory(dto)
    res.status(200).send(category)
  }

  async updateCategory (req: Request<{ id: string }, {}, UpdateCategoryDto>, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id
    const dto = req.body
    const existedCategory = await this.categoriesService.findCategoryById(id)

    if (!existedCategory) {
      next(new NotFoundException("Category with such ID doesn't exists."))
      return
    }

    const category = await this.categoriesService.updateCategory(id, dto)
    res.status(200).send(category)
  }

  async getCategoriesList (req: Request, res: Response): Promise<void> {
    const categories = await this.categoriesService.getCategoriesList()
    res.status(200).send(categories)
  }

  async findCategoryById (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id
    const categories = await this.categoriesService.findCategoryById(id)
    if (!categories) {
      next(new NotFoundException('No category found with such ID.'))
      return
    }
    res.status(200).send(categories)
  }

  async deleteCategory (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id
    const existedCategory = await this.categoriesService.findCategoryById(id)

    if (!existedCategory) {
      next(new NotFoundException("Category with such ID doesn't exists."))
      return
    }

    const deletedCategory = await this.categoriesService.deleteCategory(id)

    res.status(200).send(deletedCategory)
  }
}
