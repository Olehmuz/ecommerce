import { type Brand } from '@prisma/client'
import { type CreateBrandDto } from '../dto/create-brand.dto'
import { type UpdateBrandDto } from '../dto/update-brand.dto'

export interface IBrandsRepository {
  createBrand: (dto: CreateBrandDto) => Promise<Brand>
  updateBrand: (id: string, dto: UpdateBrandDto) => Promise<Brand>
  deleteBrand: (id: string) => Promise<Brand>
  findBrandById: (id: string) => Promise<Brand | null>
  getBrandsList: () => Promise<Brand[] | null>
}
