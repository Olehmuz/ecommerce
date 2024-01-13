import { type Device } from '@prisma/client'
import { type CreateDeviceDto } from '../dto/create-device.dto'
import { type UpdateDeviceDto } from '../dto/update-device.dto'

export interface IDevicesRepository {
  createDevice: (dto: CreateDeviceDto) => Promise<Device>
  updateDevice: (id: string, dto: UpdateDeviceDto) => Promise<Device>
  deleteDevice: (id: string) => Promise<Device>
  findDeviceById: (id: string) => Promise<Device | null>
  getDevicesList: () => Promise<Device[] | null>
}
