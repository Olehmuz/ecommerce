import { type NextFunction, type Request, type Response } from 'express'
import { AuthMiddleware } from '../core/common/middlewares/authorization.middleware'
import { BaseController } from '../core/common/base.controller'
import { type ILoggerService } from '../core/logger/logger.inteface'

import { MulterMiddleware } from '../core/common/middlewares/multer.middleware'
import { type IFilesService } from './intefaces/files-service.inteface'

export class FilesController extends BaseController {
  constructor (
    public readonly prefix: string,
    private readonly loggerService: ILoggerService,
    private readonly filesService: IFilesService
  ) {
    super(prefix, loggerService)
    this.bindRoutes([
      {
        path: '/upload',
        func: this.uploadFile,
        method: 'post',
        middlewares: [new AuthMiddleware(), new MulterMiddleware()]
      },
      {
        path: '/delete',
        func: this.deleteFiles,
        method: 'delete',
        middlewares: [new AuthMiddleware()]
      }
    ], prefix)
  }

  async uploadFile (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const files = await this.filesService.uploadFile(req.files)
      res.status(200).send(files)
    } catch (error) {
      next(error)
    }
  }

  async deleteFiles (req: Request<{}, {}, { filenames: string[] }>, res: Response, next: NextFunction): Promise<void> {
    try {
      const files = await this.filesService.deleteFiles(req.body.filenames)
      res.status(200).send(files)
    } catch (error) {
      next(error)
    }
  }
}
