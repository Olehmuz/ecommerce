import { DependencyModule, injected } from 'brandi'
import { TOKENS } from '../core/container/tokens'
import { ReviewsController } from './reviews.controller'
import { ReviewsRepository } from './reviews.repository'
import { ReviewsService } from './reviews.service'

export const ReviewsModule = new DependencyModule()

ReviewsModule.bind(TOKENS.reviewsController).toInstance(ReviewsController).inContainerScope()
ReviewsModule.bind(TOKENS.reviewsRepository).toInstance(ReviewsRepository).inContainerScope()
ReviewsModule.bind(TOKENS.reviewsService).toInstance(ReviewsService).inContainerScope()
ReviewsModule.bind(TOKENS.reviewsPrefix).toConstant('reviews')

injected(ReviewsRepository, TOKENS.databaseService)
injected(ReviewsService, TOKENS.reviewsRepository)
injected(ReviewsController, TOKENS.reviewsPrefix, TOKENS.loggerService, TOKENS.reviewsService)
