import { DependencyModule, injected } from 'brandi'
import { TOKENS } from '../core/container/tokens'
import { BrandsController } from './brands.controller'
import { BrandsRepository } from './brands.repository'
import { BrandsService } from './brands.service'

export const BrandsModule = new DependencyModule()

BrandsModule.bind(TOKENS.brandsController).toInstance(BrandsController).inContainerScope()
BrandsModule.bind(TOKENS.brandsRepository).toInstance(BrandsRepository).inContainerScope()
BrandsModule.bind(TOKENS.brandsService).toInstance(BrandsService).inContainerScope()
BrandsModule.bind(TOKENS.brandsPrefix).toConstant('brands')

injected(BrandsRepository, TOKENS.databaseService)
injected(BrandsService, TOKENS.brandsRepository)
injected(BrandsController, TOKENS.brandsPrefix, TOKENS.loggerService, TOKENS.brandsService)
