import { z } from 'zod'

export const RegisterUserDtoSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8)
  })
})

export type RegisterUserDto = z.infer<typeof RegisterUserDtoSchema['shape']['body']>
