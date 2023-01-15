import { AccessTokenJWT, AccessTokenSession } from "@/interfaces/accesstoken";
import NextAuth, { AuthOptions } from "next-auth"

export const authOptions: AuthOptions = {
    providers: [
        {
            id: 'softrig',
            name: 'Soft Rig',
            type: 'oauth',
            wellKnown: process.env.SOFTRIG_WELLKNOWN,
            authorization: {
                params: {
                    scope: process.env.SOFTRIG_SCOPE
                }
            },
            clientId: process.env.SOFTRIG_CLIENTID,
            clientSecret: process.env.NEXTAUTH_SECRET,
            idToken: true,
            checks: ["pkce", "state"],
            profile(profile) {
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                }
            }
        }
    ],
    callbacks: {
        async session({ session, token }) {
            (session as AccessTokenSession).accessToken = (token as AccessTokenJWT).accessToken;
            return session;
        },
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_token
            }
            return token
        },
    }
}

export default NextAuth(authOptions)
