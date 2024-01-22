import { compare, hash } from 'bcrypt'
import { type IUsersRepository } from '../users/intefaces/users-repository.inteface'
import { BadRequestException } from '../core/common/errors/exceptions/bad-request.exception'
import { type IAuthService } from './intefaces/auth-service.inteface'
import { type IJWTService } from './intefaces/jwt-service.inteface'
import { type RegisterUserDto } from './dto/register-user.dto'
import { type Tokens } from './intefaces/tokens.inteface'
import { type LoginUserDto } from './dto/login-user.dto'

export class AuthService implements IAuthService {
  constructor (
    private readonly usersRepository: IUsersRepository,
    private readonly jwtService: IJWTService
  ) {}

  async register (dto: RegisterUserDto): Promise<Tokens> {
    const { email, password } = dto
    const hashedPassword = await hash(password, +process.env.SALT!)

    const existedUser = await this.usersRepository.findUserByFilter({ email })
    console.log(existedUser)
    if (existedUser) {
      throw new BadRequestException('User with such email already exists.')
    }

    const user = await this.usersRepository.createUser({ email, hashedPassword })
    const { accessToken, refreshToken } = this.jwtService.generateTokens(user)

    return {
      accessToken,
      refreshToken
    }
  }

  async login (dto: LoginUserDto): Promise<Tokens> {
    const { email, password } = dto
    const user = await this.usersRepository.findUserByFilter({ email })

    if (!user) {
      throw new BadRequestException('User with such email does not exist.')
    }

    const isPasswordCorrect = await compare(password, user.hashedPassword)

    if (!isPasswordCorrect) {
      throw new BadRequestException('Incorrect password.')
    }

    const { accessToken, refreshToken } = this.jwtService.generateTokens(user)

    return {
      accessToken,
      refreshToken
    }
  }

  async refresh (refreshToken: string): Promise<Tokens> {
    const userData = this.jwtService.validateRefreshToken(refreshToken)

    if (typeof userData === 'object' && typeof userData.id === 'string') {
      const user = await this.usersRepository.findUserById(userData.id)
      if (!user) {
        throw new BadRequestException('User does not exist.')
      }

      const tokens = this.jwtService.generateTokens(user)

      return tokens
    } else {
      throw new BadRequestException('Invalid refresh token.')
    }
  }
}
