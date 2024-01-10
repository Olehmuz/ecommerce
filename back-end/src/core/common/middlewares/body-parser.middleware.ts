import { json } from 'body-parser'
import { type IMiddleware } from './middleware.inteface'

export class BodyParserMiddleware implements IMiddleware {
  execute = json()
}
