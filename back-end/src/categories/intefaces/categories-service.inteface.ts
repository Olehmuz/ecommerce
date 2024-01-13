import { type Category } from '@prisma/client'
import { type CreateCategoryDto } from '../dto/create-category.dto'
import { type UpdateCategoryDto } from '../dto/update-category.dto'

export interface ICategoriesService {
  createCategory: (dto: CreateCategoryDto) => Promise<Category>
  updateCategory: (id: string, dto: UpdateCategoryDto) => Promise<Category>
  deleteCategory: (id: string) => Promise<Category>
  findCategoryById: (id: string) => Promise<Category | null>
  getCategoriesList: () => Promise<Category[] | null>
}
