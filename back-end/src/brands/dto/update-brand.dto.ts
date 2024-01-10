import { z } from 'zod'

export const UpdateBrandDtoSchema = z.object({
  body: z.object({
    name: z.string()
  })
})

export type UpdateBrandDto = z.infer<typeof UpdateBrandDtoSchema['shape']['body']>
