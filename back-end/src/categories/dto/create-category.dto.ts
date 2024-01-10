import { z } from 'zod'

export const CreateCategoryDtoSchema = z.object({
  body: z.object({
    name: z.string()
  })
})

export type CreateCategoryDto = z.infer<typeof CreateCategoryDtoSchema['shape']['body']>
