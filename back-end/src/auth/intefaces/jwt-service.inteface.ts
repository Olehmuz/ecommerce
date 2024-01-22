import { type User } from '@prisma/client'
import { type JwtPayload } from 'jsonwebtoken'
import { type Tokens } from './tokens.inteface'

export interface IJWTService {
  generateTokens: (payload: User) => Tokens
  validateAccessToken: (accessToken: string) => JwtPayload | string
  validateRefreshToken: (refreshToken: string) => JwtPayload | string
}
