import { Container, injected } from 'brandi'

import { AuthModule } from '../../auth/auth.module'
import { CategoriesModule } from '../../categories/categories.module'
import { CategoriesRepository } from '../../categories/categories.repository'
import { App } from '../app'

import { DatabaseService } from '../common/database/database.service'
import { ExceptionFilter } from '../common/errors/exception-filter'
import { ConfigService } from '../config/config.service'
import { LoggerService } from '../logger/logger.service'

import { BrandsModule } from '../../brands/brands.module'
import { TOKENS } from './tokens'

export const container = new Container()

// Auth module dependencies
container.use(TOKENS.authController).from(AuthModule)
container.use(TOKENS.categoriesController).from(CategoriesModule)
container.use(TOKENS.brandsController).from(BrandsModule)

// Core dependencies
container.bind(TOKENS.app).toInstance(App).inSingletonScope()
container.bind(TOKENS.loggerService).toInstance(LoggerService).inSingletonScope()
container.bind(TOKENS.configService).toInstance(ConfigService).inSingletonScope()
container.bind(TOKENS.exceptionFilter).toInstance(ExceptionFilter).inSingletonScope()
container.bind(TOKENS.databaseService).toInstance(DatabaseService).inSingletonScope()

injected(ConfigService, TOKENS.loggerService)
injected(ExceptionFilter, TOKENS.loggerService)
injected(DatabaseService, TOKENS.loggerService)

injected(App, TOKENS.loggerService, TOKENS.configService, TOKENS.exceptionFilter, TOKENS.databaseService, TOKENS.authController, TOKENS.categoriesController, TOKENS.brandsController)
