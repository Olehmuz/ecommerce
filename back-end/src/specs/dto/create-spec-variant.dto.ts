import { z } from 'zod'

export const CreateSpecVariantDtoSchema = z.object({
  body: z.object({
    specId: z.string(),
    value: z.string(),
    price: z.number()
  })
})

export type CreateSpecVariantDto = z.infer<typeof CreateSpecVariantDtoSchema['shape']['body']>
