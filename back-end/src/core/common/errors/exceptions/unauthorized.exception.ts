import { HttpError } from '../http.error'

export class UnauthorizedException extends HttpError {
  constructor (message: string) {
    super(401, message)
  }
}
