import { token } from 'brandi'
import { type App } from '../app'

import { type BaseController } from '../common/base.controller'
import { type ICategoriesRepository } from '../../categories/intefaces/categories-repository.inteface'
import { type ICategoriesService } from '../../categories/intefaces/categories-service.inteface'
import { type IDBService } from '../common/database/database.inteface'
import { type IException } from '../common/errors/exception-filter.inteface'
import { type IConfigService } from '../config/config-service.interface'
import { type ILoggerService } from '../logger/logger.inteface'
import { type IBrandsRepository } from '../../brands/intefaces/brands-repository.inteface'
import { type IBrandsService } from '../../brands/intefaces/brands-service.inteface'
import { type ISpecsRepository } from '../../specs/intefaces/specs-repository.inteface'
import { type ISpecsService } from '../../specs/intefaces/specs-service.inteface'
import { type IFilesService } from '../../files/intefaces/files-service.inteface'
import { type IDevicesRepository } from '../../devices/intefaces/devices-repository.inteface'
import { type IDevicesService } from '../../devices/intefaces/devices-service.inteface'
import { type IReviewsRepository } from '../../reviews/intefaces/reviews-repository.inteface'
import { type IReviewsService } from '../../reviews/intefaces/reviews-service.inteface'
import { type IUsersRepository } from '../../users/intefaces/users-repository.inteface'
import { type IUsersService } from '../../users/intefaces/users-service.inteface'

export const TOKENS = {
  app: token<App>('app'),
  loggerService: token<ILoggerService>('loggerService'),
  configService: token<IConfigService>('configService'),
  authController: token<BaseController>('authController'),
  authPrefix: token<string>('authPrefix'),
  exceptionFilter: token<IException>('exception'),
  databaseService: token<IDBService>('databaseService'),
  categoriesPrefix: token<string>('categoriesPrefix'),
  categoriesRepository: token<ICategoriesRepository>('categoriesRepository'),
  categoriesController: token<BaseController>('categoriesController'),
  categoriesService: token<ICategoriesService>('categoriesService'),
  brandsPrefix: token<string>('brandsPrefix'),
  brandsRepository: token<IBrandsRepository>('brandsRepository'),
  brandsController: token<BaseController>('brandsController'),
  brandsService: token<IBrandsService>('brandsService'),
  specsPrefix: token<string>('specsPrefix'),
  specsRepository: token<ISpecsRepository>('specsRepository'),
  specsController: token<BaseController>('specsController'),
  specsService: token<ISpecsService>('specsService'),
  filesPrefix: token<string>('filesPrefix'),
  filesController: token<BaseController>('filesController'),
  filesService: token<IFilesService>('filesService'),
  devicesPrefix: token<string>('devicesPrefix'),
  devicesRepository: token<IDevicesRepository>('devicesRepository'),
  devicesController: token<BaseController>('devicesController'),
  devicesService: token<IDevicesService>('devicesService'),
  reviewsPrefix: token<string>('reviewsPrefix'),
  reviewsRepository: token<IReviewsRepository>('reviewsRepository'),
  reviewsController: token<BaseController>('reviewsController'),
  reviewsService: token<IReviewsService>('reviewsService'),
  usersPrefix: token<string>('usersPrefix'),
  usersRepository: token<IUsersRepository>('usersRepository'),
  usersController: token<BaseController>('usersController'),
  usersService: token<IUsersService>('usersService')
}
