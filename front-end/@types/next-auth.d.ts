import { UserRoles } from "@/lib/roles.enum"
import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      accessToken: string
      refreshToken: string
      email: string
      accessToken
      exp: number
      iat: number
      jti: string
      role: UserRoles
    }
  }
}