import { type NextFunction, type Request, type Response } from 'express'

import { NotFoundException } from '../core/common/errors/exceptions/not-found.exception'
import { ValidatorMiddleware } from '../core/common/middlewares/validation.middleware'

import { BaseController } from '../core/common/base.controller'
import { type ILoggerService } from '../core/logger/logger.inteface'
import { type IDevicesService } from './intefaces/devices-service.inteface'

import { UpdateDeviceDtoSchema, type UpdateDeviceDto } from './dto/update-device.dto'
import { CreateDeviceDtoSchema, type CreateDeviceDto } from './dto/create-device.dto'

export class DevicesController extends BaseController {
  constructor (
    public readonly prefix: string,
    private readonly loggerService: ILoggerService,
    private readonly devicesService: IDevicesService
  ) {
    super(prefix, loggerService)
    this.bindRoutes([
      {
        path: '',
        func: this.createDevice,
        method: 'post',
        middlewares: [new ValidatorMiddleware(CreateDeviceDtoSchema)]
      },
      {
        path: '',
        func: this.getDevicesList,
        method: 'get'
      },
      {
        path: '/:id',
        func: this.findDeviceById,
        method: 'get'
      },
      {
        path: '/:id',
        func: this.deleteDevice,
        method: 'delete'
      },
      {
        path: '/:id',
        func: this.updateDevice,
        method: 'patch',
        middlewares: [new ValidatorMiddleware(UpdateDeviceDtoSchema)]
      }
    ], prefix)
  }

  async createDevice (req: Request<{}, {}, CreateDeviceDto>, res: Response): Promise<void> {
    const dto = req.body
    const device = await this.devicesService.createDevice(dto)
    res.status(200).send(device)
  }

  async updateDevice (req: Request<{ id: string }, {}, UpdateDeviceDto>, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id
    const dto = req.body
    const existedDevice = await this.devicesService.findDeviceById(id)

    if (!existedDevice) {
      next(new NotFoundException("Device with such ID doesn't exists."))
      return
    }

    const device = await this.devicesService.updateDevice(id, dto)
    res.status(200).send(device)
  }

  async getDevicesList (req: Request, res: Response): Promise<void> {
    const devices = await this.devicesService.getDevicesList()
    res.status(200).send(devices)
  }

  async findDeviceById (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id
    const devices = await this.devicesService.findDeviceById(id)
    if (!devices) {
      next(new NotFoundException('No device found with such ID.'))
      return
    }
    res.status(200).send(devices)
  }

  async deleteDevice (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id
    const existedDevice = await this.devicesService.findDeviceById(id)

    if (!existedDevice) {
      next(new NotFoundException("Device with such ID doesn't exists."))
      return
    }

    const deletedDevice = await this.devicesService.deleteDevice(id)

    res.status(200).send(deletedDevice)
  }
}
