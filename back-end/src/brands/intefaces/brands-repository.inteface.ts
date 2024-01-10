import { type Brand } from '@prisma/client'
import { type CreateBrandDto } from '../dto/create-brand.dto'

export interface IBrandsRepository {
  createBrand: (dto: CreateBrandDto) => Promise<Brand>
  updateBrand: (id: string, dto: CreateBrandDto) => Promise<Brand>
  deleteBrand: (id: string) => Promise<Brand>
  findBrandById: (id: string) => Promise<Brand | null>
  getBrandsList: () => Promise<Brand[] | null>
}
