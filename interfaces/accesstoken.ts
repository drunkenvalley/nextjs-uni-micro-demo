import { Session } from "next-auth"
import { JWT } from "next-auth/jwt"

export interface AccessTokenSession extends Session {
    accessToken: string
}
export interface AccessTokenJWT extends JWT {
    accessToken: string
}
