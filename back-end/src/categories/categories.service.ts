import { type Category } from '@prisma/client'
import { type CreateCategoryDto } from './dto/create-category.dto'
import { type ICategoriesRepository } from './intefaces/categories-repository.inteface'
import { type ICategoriesService } from './intefaces/categories-service.inteface'

export class CategoriesService implements ICategoriesService {
  constructor (private readonly categoriesRepository: ICategoriesRepository) {}

  async createCategory (dto: CreateCategoryDto): Promise<Category> {
    return await this.categoriesRepository.createCategory(dto)
  }

  async getCategoriesList (): Promise<Category[] | null> {
    return await this.categoriesRepository.getCategoriesList()
  }

  async findCategoryById (id: string): Promise<Category | null> {
    return await this.categoriesRepository.findCategoryById(id)
  }

  async updateCategory (id: string, dto: CreateCategoryDto): Promise<Category> {
    return await this.categoriesRepository.updateCategory(id, dto)
  }

  async deleteCategory (id: string): Promise<Category> {
    return await this.categoriesRepository.deleteCategory(id)
  }
}
