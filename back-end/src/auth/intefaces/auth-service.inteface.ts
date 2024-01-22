import { type LoginUserDto } from '../dto/login-user.dto'
import { type RegisterUserDto } from '../dto/register-user.dto'
import { type Tokens } from './tokens.inteface'

export interface IAuthService {
  register: (dto: RegisterUserDto) => Promise<Tokens>
  login: (dto: LoginUserDto) => Promise<Tokens>
  refresh: (refreshToken: string) => Promise<Tokens>
}
