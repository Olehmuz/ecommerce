import session from 'express-session'
import { type IMiddleware } from './middleware.inteface'

export class SessionMiddleware implements IMiddleware {
  execute = session({ secret: process.env.SESSION_SECRET!, resave: true, saveUninitialized: true, cookie: { secure: false } })
}
