import { type SpecVariant, type Spec } from '@prisma/client'
import { type CreateSpecDto } from './dto/create-spec.dto'
import { type ISpecsRepository } from './intefaces/specs-repository.inteface'
import { type ISpecsService } from './intefaces/specs-service.inteface'
import { type CreateSpecVariantDto } from './dto/create-spec-variant.dto'

export class SpecsService implements ISpecsService {
  constructor (private readonly specsRepository: ISpecsRepository) {}

  async createSpec (dto: CreateSpecDto): Promise<Spec> {
    return await this.specsRepository.createSpec(dto)
  }

  async getSpecsList (): Promise<Spec[] | null> {
    return await this.specsRepository.getSpecsList()
  }

  async findSpecById (id: string): Promise<Spec | null> {
    return await this.specsRepository.findSpecById(id)
  }

  async updateSpec (id: string, dto: CreateSpecDto): Promise<Spec> {
    return await this.specsRepository.updateSpec(id, dto)
  }

  async deleteSpec (id: string): Promise<Spec> {
    return await this.specsRepository.deleteSpec(id)
  }

  async createSpecVariant (dto: CreateSpecVariantDto): Promise<SpecVariant> {
    return await this.specsRepository.createSpecVariant(dto)
  }

  async getSpecVariantsList (): Promise<SpecVariant[] | null> {
    return await this.specsRepository.getSpecVariantsList()
  }

  async findSpecVariantById (id: string): Promise<SpecVariant | null> {
    return await this.specsRepository.findSpecVariantById(id)
  }

  async updateSpecVariant (id: string, dto: CreateSpecVariantDto): Promise<SpecVariant> {
    return await this.specsRepository.updateSpecVariant(id, dto)
  }

  async deleteSpecVariant (id: string): Promise<SpecVariant> {
    return await this.specsRepository.deleteSpecVariant(id)
  }
}
