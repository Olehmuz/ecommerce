import { type NextFunction, type Request, type Response } from 'express'

import { NotFoundException } from '../core/common/errors/exceptions/not-found.exception'
import { ValidatorMiddleware } from '../core/common/middlewares/validation.middleware'

import { BaseController } from '../core/common/base.controller'
import { type ILoggerService } from '../core/logger/logger.inteface'
import { type IReviewsService } from './intefaces/reviews-service.inteface'

import { UpdateReviewDtoSchema, type UpdateReviewDto } from './dto/update-review.dto'
import { CreateReviewDtoSchema, type CreateReviewDto } from './dto/create-review.dto'

export class ReviewsController extends BaseController {
  constructor (
    public readonly prefix: string,
    private readonly loggerService: ILoggerService,
    private readonly reviewsService: IReviewsService
  ) {
    super(prefix, loggerService)
    this.bindRoutes([
      {
        path: '',
        func: this.createReview,
        method: 'post',
        middlewares: [new ValidatorMiddleware(CreateReviewDtoSchema)]
      },
      {
        path: '',
        func: this.getReviewsList,
        method: 'get'
      },
      {
        path: '/:id',
        func: this.findReviewById,
        method: 'get'
      },
      {
        path: '/:id',
        func: this.deleteReview,
        method: 'delete'
      },
      {
        path: '/:id',
        func: this.updateReview,
        method: 'patch',
        middlewares: [new ValidatorMiddleware(UpdateReviewDtoSchema)]
      }
    ], prefix)
  }

  async createReview (req: Request<{}, {}, CreateReviewDto>, res: Response): Promise<void> {
    const dto = req.body
    const review = await this.reviewsService.createReview(dto)
    res.status(200).send(review)
  }

  async updateReview (req: Request<{ id: string }, {}, UpdateReviewDto>, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id
    const dto = req.body
    const existedReview = await this.reviewsService.findReviewById(id)

    if (!existedReview) {
      next(new NotFoundException("Review with such ID doesn't exists."))
      return
    }

    const review = await this.reviewsService.updateReview(id, dto)
    res.status(200).send(review)
  }

  async getReviewsList (req: Request, res: Response): Promise<void> {
    const reviews = await this.reviewsService.getReviewsList()
    res.status(200).send(reviews)
  }

  async findReviewById (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id
    const reviews = await this.reviewsService.findReviewById(id)
    if (!reviews) {
      next(new NotFoundException('No review found with such ID.'))
      return
    }
    res.status(200).send(reviews)
  }

  async deleteReview (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id
    const existedReview = await this.reviewsService.findReviewById(id)

    if (!existedReview) {
      next(new NotFoundException("Review with such ID doesn't exists."))
      return
    }

    const deletedReview = await this.reviewsService.deleteReview(id)

    res.status(200).send(deletedReview)
  }
}
