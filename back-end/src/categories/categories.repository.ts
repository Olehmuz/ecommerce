import { type Category } from '@prisma/client'
import { type DatabaseService } from '../core/common/database/database.service'
import { type UpdateBrandDto } from '../brands/dto/update-brand.dto'
import { generateSlug } from '../lib/generate-slug-from-string'
import { type IPaginationOptions } from '../lib/get-pagination'
import { type CreateCategoryDto } from './dto/create-category.dto'
import { type ICategoriesRepository } from './intefaces/categories-repository.inteface'
import { type UpdateCategoryDto } from './dto/update-category.dto'

export class CategoriesRepository implements ICategoriesRepository {
  constructor (private readonly db: DatabaseService) {}

  async createCategory (dto: CreateCategoryDto): Promise<Category> {
    const slug = generateSlug(dto.name)
    return await this.db.client.category.create({ data: { ...dto, slug } })
  }

  async updateCategory (id: string, dto: UpdateCategoryDto): Promise<Category> {
    return await this.db.client.category.update({ where: { id }, data: dto })
  }

  async deleteCategory (id: string): Promise<Category> {
    return await this.db.client.category.delete({ where: { id } })
  }

  async findCategoryByFilter (filter: any): Promise<Category | null> {
    return await this.db.client.category.findFirst({ where: filter })
  }

  async findCategoryById (id: string): Promise<Category | null> {
    return await this.db.client.category.findFirst({ where: { id } })
  }

  async getCategoriesList (): Promise<Category[] | null> {
    return await this.db.client.category.findMany()
  }
}
