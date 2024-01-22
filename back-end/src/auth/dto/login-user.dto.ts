import { z } from 'zod'

export const LoginUserDtoSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8)
  })
})

export type LoginUserDto = z.infer<typeof LoginUserDtoSchema['shape']['body']>
