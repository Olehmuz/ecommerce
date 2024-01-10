import path from 'path'
import { type DotenvParseOutput, config } from 'dotenv'

import { type ILoggerService } from '../logger/logger.inteface'
import { type IConfigService } from './config-service.interface'

export class ConfigService implements IConfigService {
  config: DotenvParseOutput

  constructor (private readonly loggerService: ILoggerService) {
    const { error, parsed } = config({ path: path.resolve('.env') })

    if (error instanceof Error) throw new Error('[CONFIG SERVICE] .env is required')

    if (!parsed) throw new Error('[CONFIG SERVICE] .env is empty')

    this.config = parsed

    this.loggerService.info('[CONFIG SERVICE] initialize config service')
  }

  get (key: string): string {
    const result = this.config[key]
    if (!result) throw new Error('[CONFIG SERVICE] The key doesn\'t exist')

    return result
  }
}
