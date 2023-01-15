import Head from "next/head"
import { useSession } from "next-auth/react"
import UseContacts from "@/services/contacts"
import { AccessTokenSession } from "@/interfaces/accesstoken";
import { useEffect } from "react";

export default function Page() {
    const { data: session } = useSession()
    const getContacts = async () => await UseContacts({ method: "GET", token: (session as AccessTokenSession)?.accessToken })

    

    return (
        <>
            <Head>
                <title>My Contacts</title>
            </Head>
            <div className="flow">
                <h2 className="mt-4">
                    My Contacts
                </h2>
                <div className="grid gap-1">
                    <article className="border border-gray p-1">#1</article>
                </div>
                <div>
                {session && (
                    <div>
                        <button onClick={getContacts}>
                            Try fetch
                        </button>
                    </div>
                )}
                </div>
            </div>
        </>
    )
}