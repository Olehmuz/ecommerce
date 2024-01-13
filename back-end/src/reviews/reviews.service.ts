import { type Review } from '@prisma/client'
import { type CreateReviewDto } from './dto/create-review.dto'
import { type IReviewsRepository } from './intefaces/reviews-repository.inteface'
import { type IReviewsService } from './intefaces/reviews-service.inteface'
import { type UpdateReviewDto } from './dto/update-review.dto'

export class ReviewsService implements IReviewsService {
  constructor (private readonly reviewRepository: IReviewsRepository) {}

  async createReview (dto: CreateReviewDto): Promise<Review> {
    return await this.reviewRepository.createReview(dto)
  }

  async getReviewsList (): Promise<Review[] | null> {
    return await this.reviewRepository.getReviewsList()
  }

  async findReviewById (id: string): Promise<Review | null> {
    return await this.reviewRepository.findReviewById(id)
  }

  async updateReview (id: string, dto: UpdateReviewDto): Promise<Review> {
    return await this.reviewRepository.updateReview(id, dto)
  }

  async deleteReview (id: string): Promise<Review> {
    return await this.reviewRepository.deleteReview(id)
  }
}
