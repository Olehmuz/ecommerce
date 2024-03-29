import { type Device } from '@prisma/client'
import { type DatabaseService } from '../core/common/database/database.service'
import { generateSlug } from '../lib/generate-slug-from-string'
import { type IPaginationOptions } from '../lib/get-pagination'
import { type CreateDeviceDto } from './dto/create-device.dto'
import { type IDevicesRepository } from './intefaces/devices-repository.inteface'
import { type UpdateDeviceDto } from './dto/update-device.dto'

const include = {
  specs: {
    include: { variants: true }
  },
  colors: true,
  category: true,
  brand: true,
  reviews: true
}

export class DevicesRepository implements IDevicesRepository {
  constructor (private readonly db: DatabaseService) {}

  async createDevice (dto: CreateDeviceDto): Promise<Device> {
    const slug = generateSlug(dto.model)
    const colorWithSlug = dto.colors.map((el) => ({ ...el, slug: generateSlug(el.name) }))
    const device = { ...dto, specs: { connect: dto.specs?.map(spec => ({ id: spec })) }, colors: { create: colorWithSlug }, slug }
    return await this.db.client.device.create({
      data: device,
      include
    })
  }

  async updateDevice (id: string, dto: UpdateDeviceDto): Promise<Device> {
    const device = { ...dto, specs: { set: dto.specs?.map(spec => ({ id: spec })) }, colors: { create: dto.colors } }

    return await this.db.client.device.update({
      where: { id },
      data: device,
      include
    })
  }

  async deleteDevice (id: string): Promise<Device> {
    return await this.db.client.device.delete({
      where: { id },
      include
    })
  }

  async findDeviceByFilter (filter: any): Promise<Device | null> {
    return await this.db.client.device.findFirst({
      where: filter,
      include
    })
  }

  async findDeviceById (id: string): Promise<Device | null> {
    return await this.db.client.device.findFirst({
      where: { id },
      include
    })
  }

  async getDevicesList ({ page, limit }: IPaginationOptions): Promise<Device[]> {
    return await this.db.client.device.findMany({
      include
    })
  }

  async countDevices (): Promise<number> {
    return await this.db.client.device.count()
  }
}
