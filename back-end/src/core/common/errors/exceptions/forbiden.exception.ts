import { HttpError } from '../http.error'

export class ForbiddenException extends HttpError {
  constructor (message: string) {
    super(403, message)
  }
}
