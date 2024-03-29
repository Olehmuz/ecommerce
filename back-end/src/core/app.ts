import { type Server } from 'http'

import express from 'express'

import { type BaseController } from './common/base.controller'
import { type IDBService } from './common/database/database.inteface'
import { type IException } from './common/errors/exception-filter.inteface'
import { BodyParserMiddleware } from './common/middlewares/body-parser.middleware'
import { type IMiddleware } from './common/middlewares/middleware.inteface'
import { type IConfigService } from './config/config-service.interface'
import { type ILoggerService } from './logger/logger.inteface'
import { SessionMiddleware } from './common/middlewares/session.middleware'
import { CorsMiddleware } from './common/middlewares/cors.middleware'

export class App {
  private readonly app: express.Express
  private readonly server: Server
  private readonly controllers?: BaseController[]
  private readonly middlewares?: IMiddleware[]
  constructor (
    public readonly logger: ILoggerService,
    private readonly config: IConfigService,
    private readonly exceptionFilter: IException,
    private readonly databaseService: IDBService,
    private readonly authController: BaseController,
    private readonly categoriesController: BaseController,
    private readonly brandsController: BaseController,
    private readonly specsController: BaseController,
    private readonly filesController: BaseController,
    private readonly devicesController: BaseController,
    private readonly reviewsController: BaseController,
    private readonly usersController: BaseController

  ) {
    this.app = express()
    this.server = this.app.listen(process.env.PORT ?? 7777, () => {
      this.logger.info(
        `[APP] Server running on port ${process.env.PORT ?? 7777}`
      )
    })
    this.controllers = [
      authController,
      categoriesController,
      brandsController,
      specsController,
      filesController,
      devicesController,
      reviewsController,
      usersController
    ]
    this.middlewares = [new BodyParserMiddleware(), new CorsMiddleware(), new SessionMiddleware()]
  }

  async init (): Promise<void> {
    this.useGlobalMiddleware()
    this.bindRoutes()
    this.useExceptionFilter()
    await this.databaseService.connect()

    process.on('uncaughtException', (err) => {
      this.logger.error(`Uncaught: ${err.toString()}`)
      process.exit(1)
    })

    process.on('unhandledRejection', (err) => {
      if (err instanceof Error) {
        this.logger.error(`Unhandled: ${err.message}`)
      }
      process.exit(1)
    })
  }

  private bindRoutes (): void {
    this.controllers?.forEach((controller: BaseController) => {
      this.app.use('/' + controller.prefix, controller.router)
    })
  }

  private useGlobalMiddleware (): void {
    this.middlewares?.forEach((middleware: IMiddleware) => {
      this.app.use(middleware.execute.bind(middleware))
    })
  }

  private useExceptionFilter (): void {
    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter))
    this.logger.info('[APP] Exception filter is setted')
  }
}
