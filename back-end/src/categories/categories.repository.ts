import { type Category } from '@prisma/client'
import { type DatabaseService } from '../core/common/database/database.service'
import { type UpdateBrandDto } from '../brands/dto/update-brand.dto'
import { type CreateCategoryDto } from './dto/create-category.dto'
import { type ICategoriesRepository } from './intefaces/categories-repository.inteface'

export class CategoriesRepository implements ICategoriesRepository {
  constructor (private readonly db: DatabaseService) {}

  async createCategory (dto: CreateCategoryDto): Promise<Category> {
    return await this.db.client.category.create({ data: dto })
  }

  async updateCategory (id: string, dto: UpdateBrandDto): Promise<Category> {
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
