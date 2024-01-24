import { type Device } from '@prisma/client'
import { type CreateDeviceDto } from '../dto/create-device.dto'
import { type UpdateDeviceDto } from '../dto/update-device.dto'
import { type IPaginationOptions } from '../../lib/get-pagination'
import { type DevicesWithPagination } from './get-devices.interface'

export interface IDevicesService {
  createDevice: (dto: CreateDeviceDto) => Promise<Device>
  updateDevice: (id: string, dto: UpdateDeviceDto) => Promise<Device>
  deleteDevice: (id: string) => Promise<Device>
  findDeviceById: (id: string) => Promise<Device | null>
  getDevicesList: ({ page, limit }: IPaginationOptions) => Promise<DevicesWithPagination>
}
