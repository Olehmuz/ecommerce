import { z } from 'zod'

export const UpdateSpecDtoSchema = z.object({
  body: z.object({
    name: z.string()
  })
})

export type UpdateSpecDto = z.infer<typeof UpdateSpecDtoSchema['shape']['body']>
