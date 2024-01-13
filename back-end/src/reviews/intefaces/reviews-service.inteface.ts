import { type Review } from '@prisma/client'
import { type CreateReviewDto } from '../dto/create-review.dto'
import { type UpdateReviewDto } from '../dto/update-review.dto'

export interface IReviewsService {
  createReview: (dto: CreateReviewDto) => Promise<Review>
  updateReview: (id: string, dto: UpdateReviewDto) => Promise<Review>
  deleteReview: (id: string) => Promise<Review>
  findReviewById: (id: string) => Promise<Review | null>
  getReviewsList: () => Promise<Review[] | null>
}
