import NextAuth, { AuthOptions } from "next-auth"

export const authOptions: AuthOptions = {
    providers: [
        {
            id: 'uniMicro',
            name: 'Uni Micro',
            type: 'oauth',
            authorization: {
                url: process.env.softRigAuthorization || "",
                params: {
                    scope: "openid profile AppFramework",
                }
            },
            clientId: process.env.softRigClientId || "",
            profile(profile) {
                return {
                    id: profile.id,
                    // probably needs changing
                    name: profile.softRigAcc?.profile.nickname,
                    email: profile.softRigAcc?.email,
                    image: profile.softRigAcc?.profile.profile_image_url,
                }
            }
        }
    ]
}

export default NextAuth(authOptions)
