import { DependencyModule, injected } from 'brandi'
import { AuthController } from './auth.controller'
import { TOKENS } from '../core/container/tokens'

export const AuthModule = new DependencyModule()

AuthModule.bind(TOKENS.authController).toInstance(AuthController).inContainerScope()
AuthModule.bind(TOKENS.authPrefix).toConstant('auth')

injected(AuthController, TOKENS.authPrefix, TOKENS.loggerService)
