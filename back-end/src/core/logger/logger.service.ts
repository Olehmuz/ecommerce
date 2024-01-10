import pino from 'pino'
import { type ILoggerService } from './logger.inteface'

export class LoggerService implements ILoggerService {
  private readonly logger: pino.Logger
  constructor () {
    this.logger = pino({
      level: process.env.PINO_LOG_LEVEL ?? 'info',
      timestamp: pino.stdTimeFunctions.isoTime
    })
  }

  info (message: string): void {
    this.logger.info(message)
  }

  error (message: string): void {
    this.logger.error(message)
  }

  warn (message: string): void {
    this.logger.warn(message)
  }
}
