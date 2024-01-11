import { z } from 'zod'

export const CreateSpecDtoSchema = z.object({
  body: z.object({
    name: z.string()
  })
})

export type CreateSpecDto = z.infer<typeof CreateSpecDtoSchema['shape']['body']>
