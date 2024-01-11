import { z } from 'zod'

export const UpdateSpecVariantDtoSchema = z.object({
  body: z.object({
    specId: z.string(),
    value: z.string(),
    price: z.number()
  })
})

export type UpdateSpecVariantDto = z.infer<typeof UpdateSpecVariantDtoSchema['shape']['body']>
