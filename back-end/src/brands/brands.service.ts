import { type Brand } from '@prisma/client'
import { type CreateBrandDto } from './dto/create-brand.dto'
import { type IBrandsRepository } from './intefaces/brands-repository.inteface'
import { type IBrandsService } from './intefaces/brands-service.inteface'

export class BrandsService implements IBrandsService {
  constructor (private readonly brandsRepository: IBrandsRepository) {}

  async createBrand (dto: CreateBrandDto): Promise<Brand> {
    return await this.brandsRepository.createBrand(dto)
  }

  async getBrandsList (): Promise<Brand[] | null> {
    return await this.brandsRepository.getBrandsList()
  }

  async findBrandById (id: string): Promise<Brand | null> {
    return await this.brandsRepository.findBrandById(id)
  }

  async updateBrand (id: string, dto: CreateBrandDto): Promise<Brand> {
    return await this.brandsRepository.updateBrand(id, dto)
  }

  async deleteBrand (id: string): Promise<Brand> {
    return await this.brandsRepository.deleteBrand(id)
  }
}
