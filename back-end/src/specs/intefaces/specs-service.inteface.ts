import { type SpecVariant, type Spec } from '@prisma/client'
import { type CreateSpecDto } from '../dto/create-spec.dto'
import { type CreateSpecVariantDto } from '../dto/create-spec-variant.dto'

export interface ISpecsService {
  createSpec: (dto: CreateSpecDto) => Promise<Spec>
  updateSpec: (id: string, dto: CreateSpecDto) => Promise<Spec>
  deleteSpec: (id: string) => Promise<Spec>
  findSpecById: (id: string) => Promise<Spec | null>
  getSpecsList: () => Promise<Spec[] | null>

  createSpecVariant: (dto: CreateSpecVariantDto) => Promise<SpecVariant>
  updateSpecVariant: (id: string, dto: CreateSpecVariantDto) => Promise<SpecVariant>
  deleteSpecVariant: (id: string) => Promise<SpecVariant>
  findSpecVariantById: (id: string) => Promise<SpecVariant | null>
  getSpecVariantsList: () => Promise<SpecVariant[] | null>
}
