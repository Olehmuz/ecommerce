import { z } from 'zod'

export const CreateBrandDtoSchema = z.object({
  body: z.object({
    name: z.string()
  })
})

export type CreateBrandDto = z.infer<typeof CreateBrandDtoSchema['shape']['body']>
