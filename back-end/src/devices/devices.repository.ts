import { type Device } from '@prisma/client'
import { type DatabaseService } from '../core/common/database/database.service'
import { type CreateDeviceDto } from './dto/create-device.dto'
import { type IDevicesRepository } from './intefaces/devices-repository.inteface'
import { type UpdateDeviceDto } from './dto/update-device.dto'

export class DevicesRepository implements IDevicesRepository {
  constructor (private readonly db: DatabaseService) {}

  async createDevice (dto: CreateDeviceDto): Promise<Device> {
    const device = { ...dto, specs: { connect: dto.specs?.map(spec => ({ id: spec })) } }
    return await this.db.client.device.create({ data: device })
  }

  async updateDevice (id: string, dto: UpdateDeviceDto): Promise<Device> {
    const device = { ...dto, specs: { set: dto.specs?.map(spec => ({ id: spec })) } }

    return await this.db.client.device.update({ where: { id }, data: device })
  }

  async deleteDevice (id: string): Promise<Device> {
    return await this.db.client.device.delete({ where: { id } })
  }

  async findDeviceByFilter (filter: any): Promise<Device | null> {
    return await this.db.client.device.findFirst({ where: filter })
  }

  async findDeviceById (id: string): Promise<Device | null> {
    return await this.db.client.device.findFirst({
      where: { id },
      include: {
        specs: {
          include: { variants: true }
        },
        category: true,
        brand: true,
        reviews: true
      }
    })
  }

  async getDevicesList (): Promise<Device[] | null> {
    return await this.db.client.device.findMany({
      include: {
        specs: {
          include: { variants: true }
        },
        category: true,
        brand: true,
        reviews: true
      }
    })
  }
}
