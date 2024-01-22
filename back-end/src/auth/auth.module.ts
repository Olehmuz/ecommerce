import { DependencyModule, injected } from 'brandi'
import { TOKENS } from '../core/container/tokens'

import { UsersModule } from '../users/users.module'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JWTService } from './jwt.service'

export const AuthModule = new DependencyModule()

AuthModule.bind(TOKENS.authController).toInstance(AuthController).inContainerScope()
AuthModule.bind(TOKENS.authService).toInstance(AuthService).inContainerScope()
AuthModule.bind(TOKENS.jwtService).toInstance(JWTService).inContainerScope()
AuthModule.bind(TOKENS.authPrefix).toConstant('auth')

AuthModule.use(TOKENS.usersRepository).from(UsersModule)

injected(AuthService, TOKENS.usersRepository, TOKENS.jwtService)
injected(AuthController, TOKENS.authPrefix, TOKENS.loggerService, TOKENS.authService)
