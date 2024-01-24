import { type Device } from '@prisma/client'
import { type IPaginationOutput, type IPaginationOptions } from '../lib/get-pagination'
import { type CreateDeviceDto } from './dto/create-device.dto'
import { type IDevicesRepository } from './intefaces/devices-repository.inteface'
import { type IDevicesService } from './intefaces/devices-service.inteface'
import { type UpdateDeviceDto } from './dto/update-device.dto'
import { type DevicesWithPagination } from './intefaces/get-devices.interface'

export class DevicesService implements IDevicesService {
  constructor (private readonly devicesRepository: IDevicesRepository) {}

  async createDevice (dto: CreateDeviceDto): Promise<Device> {
    return await this.devicesRepository.createDevice(dto)
  }

  async getDevicesList ({ page, limit }: IPaginationOptions): Promise<DevicesWithPagination> {
    const devicesPromise = this.devicesRepository.getDevicesList({ page, limit })
    const totalCountPromise = this.devicesRepository.countDevices()
    const [devices, totalCount] = await Promise.all([devicesPromise, totalCountPromise])
    return {
      data: devices,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit)
    }
  }

  async findDeviceById (id: string): Promise<Device | null> {
    return await this.devicesRepository.findDeviceById(id)
  }

  async updateDevice (id: string, dto: UpdateDeviceDto): Promise<Device> {
    return await this.devicesRepository.updateDevice(id, dto)
  }

  async deleteDevice (id: string): Promise<Device> {
    return await this.devicesRepository.deleteDevice(id)
  }
}
