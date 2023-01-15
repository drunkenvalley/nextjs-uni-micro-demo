import { useSession, signIn, signOut } from "next-auth/react"

export default function User () {
    const { data: session } = useSession()
    if (session) {
        return (
            <>
                <strong className="me-2">{session.user?.email}</strong> <button onClick={() => signOut()}>Sign out</button>
            </>
        )
    }
    return (
        <button onClick={() => signIn()}>Sign in</button>
    )
}
