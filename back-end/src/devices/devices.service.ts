import { type Device } from '@prisma/client'
import { type CreateDeviceDto } from './dto/create-device.dto'
import { type IDevicesRepository } from './intefaces/devices-repository.inteface'
import { type IDevicesService } from './intefaces/devices-service.inteface'
import { type UpdateDeviceDto } from './dto/update-device.dto'

export class DevicesService implements IDevicesService {
  constructor (private readonly devicesRepository: IDevicesRepository) {}

  async createDevice (dto: CreateDeviceDto): Promise<Device> {
    return await this.devicesRepository.createDevice(dto)
  }

  async getDevicesList (): Promise<Device[] | null> {
    return await this.devicesRepository.getDevicesList()
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
