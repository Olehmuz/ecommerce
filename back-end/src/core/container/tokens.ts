import { token } from 'brandi'
import { type App } from '../app'

import { type BaseController } from '../common/base.controller'
import { type IDBService } from '../common/database/database.inteface'
import { type IException } from '../common/errors/exception-filter.inteface'
import { type IConfigService } from '../config/config-service.interface'
import { type ILoggerService } from '../logger/logger.inteface'

export const TOKENS = {
  app: token<App>('app'),
  loggerService: token<ILoggerService>('loggerService'),
  configService: token<IConfigService>('configService'),
  authController: token<BaseController>('authController'),
  authPrefix: token<string>('authPrefix'),
  exceptionFilter: token<IException>('exception'),
  databaseService: token<IDBService>('databaseService')
}
