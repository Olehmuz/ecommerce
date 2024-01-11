import { type SpecVariant, type Spec } from '@prisma/client'
import { type DatabaseService } from '../core/common/database/database.service'
import { type CreateSpecDto } from './dto/create-spec.dto'
import { type ISpecsRepository } from './intefaces/specs-repository.inteface'
import { type UpdateSpecDto } from './dto/update-spec.dto'
import { type CreateSpecVariantDto } from './dto/create-spec-variant.dto'
import { type UpdateSpecVariantDto } from './dto/update-spec-variant.dto'

export class SpecsRepository implements ISpecsRepository {
  constructor (private readonly db: DatabaseService) {}

  async createSpec (dto: CreateSpecDto): Promise<Spec> {
    return await this.db.client.spec.create({ data: dto })
  }

  async updateSpec (id: string, dto: UpdateSpecDto): Promise<Spec> {
    return await this.db.client.spec.update({ where: { id }, data: dto })
  }

  async deleteSpec (id: string): Promise<Spec> {
    return await this.db.client.spec.delete({ where: { id } })
  }

  async findSpecByFilter (filter: any): Promise<Spec | null> {
    return await this.db.client.spec.findFirst({ where: filter })
  }

  async findSpecById (id: string): Promise<Spec | null> {
    return await this.db.client.spec.findFirst({ where: { id } })
  }

  async getSpecsList (): Promise<Spec[] | null> {
    return await this.db.client.spec.findMany({ include: { variants: true } })
  }

  async createSpecVariant (dto: CreateSpecVariantDto): Promise<SpecVariant> {
    return await this.db.client.specVariant.create({ data: dto })
  }

  async updateSpecVariant (id: string, dto: UpdateSpecVariantDto): Promise<SpecVariant> {
    return await this.db.client.specVariant.update({ where: { id }, data: dto })
  }

  async deleteSpecVariant (id: string): Promise<SpecVariant> {
    return await this.db.client.specVariant.delete({ where: { id } })
  }

  async findSpecVariantByFilter (filter: any): Promise<SpecVariant | null> {
    return await this.db.client.specVariant.findFirst({ where: filter })
  }

  async findSpecVariantById (id: string): Promise<SpecVariant | null> {
    return await this.db.client.specVariant.findFirst({ where: { id } })
  }

  async getSpecVariantsList (): Promise<SpecVariant[] | null> {
    return await this.db.client.specVariant.findMany()
  }
}
