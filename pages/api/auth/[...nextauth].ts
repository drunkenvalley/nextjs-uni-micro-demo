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
                console.log(profile)
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                }
            }
        }
    ]
}

export default NextAuth(authOptions)
