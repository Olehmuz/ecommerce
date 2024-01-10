import { z } from 'zod'

export const UpdateCategoryDtoSchema = z.object({
  body: z.object({
    name: z.string()
  })
})

export type UpdateCategoryDto = z.infer<typeof UpdateCategoryDtoSchema['shape']['body']>
