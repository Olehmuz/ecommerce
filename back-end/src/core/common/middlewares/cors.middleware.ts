import cors from 'cors'
import { type IMiddleware } from './middleware.inteface'

export class CorsMiddleware implements IMiddleware {
  execute = cors({ origin: 'http://localhost:3000' })
}
