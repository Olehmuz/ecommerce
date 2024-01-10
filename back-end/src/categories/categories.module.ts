import { DependencyModule, injected } from 'brandi'
import { DatabaseService } from '../core/common/database/database.service'
import { TOKENS } from '../core/container/tokens'
import { CategoriesController } from './categories.controller'
import { CategoriesRepository } from './categories.repository'
import { CategoriesService } from './categories.service'

export const CategoriesModule = new DependencyModule()

CategoriesModule.bind(TOKENS.categoriesController).toInstance(CategoriesController).inContainerScope()
CategoriesModule.bind(TOKENS.categoriesRepository).toInstance(CategoriesRepository).inContainerScope()
CategoriesModule.bind(TOKENS.categoriesService).toInstance(CategoriesService).inContainerScope()
CategoriesModule.bind(TOKENS.categoriesPrefix).toConstant('categories')

injected(CategoriesRepository, TOKENS.databaseService)
injected(CategoriesService, TOKENS.categoriesRepository)
injected(CategoriesController, TOKENS.categoriesPrefix, TOKENS.loggerService, TOKENS.categoriesService)
