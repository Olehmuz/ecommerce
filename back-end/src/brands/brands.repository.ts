import { type Brand } from '@prisma/client'
import { type DatabaseService } from '../core/common/database/database.service'
import { type CreateBrandDto } from './dto/create-brand.dto'
import { type IBrandsRepository } from './intefaces/brands-repository.inteface'
import { type UpdateBrandDto } from './dto/update-brand.dto'

export class BrandsRepository implements IBrandsRepository {
  constructor (private readonly db: DatabaseService) {}

  async createBrand (dto: CreateBrandDto): Promise<Brand> {
    return await this.db.client.brand.create({ data: dto })
  }

  async updateBrand (id: string, dto: UpdateBrandDto): Promise<Brand> {
    return await this.db.client.brand.update({ where: { id }, data: dto })
  }

  async deleteBrand (id: string): Promise<Brand> {
    return await this.db.client.brand.delete({ where: { id } })
  }

  async findBrandByFilter (filter: any): Promise<Brand | null> {
    return await this.db.client.brand.findFirst({ where: filter })
  }

  async findBrandById (id: string): Promise<Brand | null> {
    return await this.db.client.brand.findFirst({ where: { id } })
  }

  async getBrandsList (): Promise<Brand[] | null> {
    return await this.db.client.brand.findMany()
  }
}
