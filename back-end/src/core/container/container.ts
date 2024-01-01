import { Container, injected } from 'brandi'

import { AuthModule } from '../../auth/auth.module'
import { App } from '../app'

import { DatabaseService } from '../common/database/database.service'
import { ExceptionFilter } from '../common/errors/exception-filter'
import { ConfigService } from '../config/config.service'
import { LoggerService } from '../logger/logger.service'

import { TOKENS } from './tokens'

export const container = new Container()

// Auth module dependencies
container.use(TOKENS.authController).from(AuthModule)

// Core dependencies
container.bind(TOKENS.app).toInstance(App).inSingletonScope()
container.bind(TOKENS.loggerService).toInstance(LoggerService).inSingletonScope()
container.bind(TOKENS.configService).toInstance(ConfigService).inSingletonScope()
container.bind(TOKENS.exceptionFilter).toInstance(ExceptionFilter).inSingletonScope()
container.bind(TOKENS.databaseService).toInstance(DatabaseService).inSingletonScope()

injected(ConfigService, TOKENS.loggerService)
injected(ExceptionFilter, TOKENS.loggerService)
injected(DatabaseService, TOKENS.loggerService)

injected(App, TOKENS.loggerService, TOKENS.configService, TOKENS.authController, TOKENS.exceptionFilter, TOKENS.databaseService)
