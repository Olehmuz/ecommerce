import { DependencyModule, injected } from 'brandi'
import { TOKENS } from '../core/container/tokens'
import { DevicesController } from './devices.controller'
import { DevicesRepository } from './devices.repository'
import { DevicesService } from './devices.service'

export const DevicesModule = new DependencyModule()

DevicesModule.bind(TOKENS.devicesController).toInstance(DevicesController).inContainerScope()
DevicesModule.bind(TOKENS.devicesRepository).toInstance(DevicesRepository).inContainerScope()
DevicesModule.bind(TOKENS.devicesService).toInstance(DevicesService).inContainerScope()
DevicesModule.bind(TOKENS.devicesPrefix).toConstant('devices')

injected(DevicesRepository, TOKENS.databaseService)
injected(DevicesService, TOKENS.devicesRepository)
injected(DevicesController, TOKENS.devicesPrefix, TOKENS.loggerService, TOKENS.devicesService)
