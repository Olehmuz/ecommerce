import { type User } from '@prisma/client'
import { type JwtPayload, sign, verify, decode } from 'jsonwebtoken'
import { UnauthorizedException } from '../core/common/errors/exceptions/unauthorized.exception'
import { HttpError } from '../core/common/errors/http.error'
import { type Tokens } from './intefaces/tokens.inteface'
import { type IJWTService } from './intefaces/jwt-service.inteface'

export class JWTService implements IJWTService {
  constructor () {}

  generateTokens (payload: User): Tokens {
    const accessToken = sign(payload, process.env.JWT_ACCESS_SECRET!, { expiresIn: '30m' })
    const refreshToken = sign(payload, process.env.JWT_REFRESH_SECRET!, { expiresIn: '7d' })
    return {
      accessToken,
      refreshToken
    }
  }

  validateAccessToken (accessToken: string): JwtPayload | string {
    try {
      const userData = verify(accessToken, process.env.JWT_ACCESS_SECRET!)
      return userData
    } catch (e) {
      throw new UnauthorizedException('Invalid access token')
    }
  }

  validateRefreshToken (refreshToken: string): JwtPayload | string {
    try {
      const userData = verify(refreshToken, process.env.JWT_REFRESH_SECRET!)
      return userData
    } catch (e) {
      throw new UnauthorizedException('Invalid refresh token')
    }
  }
}
