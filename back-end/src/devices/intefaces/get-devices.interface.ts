import { type Device } from '@prisma/client'
import { type IPaginationOutput } from '../../lib/get-pagination'

export type DevicesWithPagination = {
  data: Device[]
} & IPaginationOutput
