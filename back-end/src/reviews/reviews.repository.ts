import { type Review } from '@prisma/client'
import { type DatabaseService } from '../core/common/database/database.service'
import { type CreateReviewDto } from './dto/create-review.dto'
import { type IReviewsRepository } from './intefaces/reviews-repository.inteface'
import { type UpdateReviewDto } from './dto/update-review.dto'

export class ReviewsRepository implements IReviewsRepository {
  constructor (private readonly db: DatabaseService) {}

  async createReview (dto: CreateReviewDto): Promise<Review> {
    return await this.db.client.review.create({ data: dto })
  }

  async updateReview (id: string, dto: UpdateReviewDto): Promise<Review> {
    return await this.db.client.review.update({ where: { id }, data: dto })
  }

  async deleteReview (id: string): Promise<Review> {
    return await this.db.client.review.delete({ where: { id } })
  }

  async findReviewByFilter (filter: any): Promise<Review | null> {
    return await this.db.client.review.findFirst({ where: filter })
  }

  async findReviewById (id: string): Promise<Review | null> {
    return await this.db.client.review.findFirst({ where: { id } })
  }

  async getReviewsList (): Promise<Review[] | null> {
    return await this.db.client.review.findMany()
  }
}
