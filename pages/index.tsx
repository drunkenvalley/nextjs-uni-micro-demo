import Head from "next/head"
import { useSession } from "next-auth/react"
import UseContacts from "@/services/contacts"
import { AccessTokenSession } from "@/interfaces/accesstoken";
import { useEffect, useRef, useState } from "react";
import { Contact } from "@/interfaces/contact";
import NewContact from "@/components/newContact";

export default function Page() {
    const { data: session } = useSession()
    const [contacts, setContacts] = useState<Contact[]>([])
    const [loading, setLoading] = useState(false)
    const [showNew, setShowNew] = useState(false)

    const contactsApi = async ({ method, body, params }: { method: string, body?: Object, params?: string }) => {
        try {
            const response = await UseContacts({ method, token: (session as AccessTokenSession)?.accessToken, body, params })
            if (response.status > 299) throw `Failed running operation | ${response.status} - ${response.statusText}`
        } catch(e) {
            console.error(e)
        } finally {
            getContacts()
        }
    }

    const getContacts = async () => {
        setLoading(true)
        try {
            const response = await UseContacts({ method: "GET", token: (session as AccessTokenSession)?.accessToken })
            if (response.status > 299) throw `Failed fetching contacts | ${response.status} - ${response.statusText}`

            const fetchedContacts: Contact[] = await response.json()
            setContacts(fetchedContacts)
        } catch(e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    const createContact = async (payload: Object) => contactsApi({ method: "POST", body: payload })
    const deleteContact = async (contact: Contact) => contactsApi({ method: "DELETE", params: "/" + contact.ID })

    useEffect(() => {
        console.log(session)
        if ((session as AccessTokenSession)?.accessToken) {
            getContacts()
        }
    }, [(session as AccessTokenSession)?.accessToken])

    return (
        <>
            <Head>
                <title>My Contacts</title>
            </Head>
            <div className="flow">
                <h2 className="mt-4">
                    My Contacts
                </h2>
                {loading && <div className="spinner my-3 text-blue"></div>}
                <main className="contact-grid">
                    {session && !loading && !!contacts.length && (
                        <>
                            {/** I would probably redesign this for additional info? Probably. */}
                            {contacts.map(contact => (
                                <article key={contact.InfoID} className="contact-block">
                                    <section>
                                        <h3>
                                            <span>{contact.Info?.Name}</span>
                                            <button onClick={() => deleteContact(contact)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                                                </svg>
                                            </button>
                                        </h3>
                                        {contact.Role && 
                                            <p>
                                                {contact.Role}
                                            </p>
                                        }
                                    </section>
                                    <ul role="list">
                                        {contact.Info?.DefaultEmail?.EmailAddress && 
                                        <li>
                                            <a href={`mailto:${contact.Info?.DefaultEmail?.EmailAddress}`}>
                                                {contact.Info?.DefaultEmail?.EmailAddress}
                                            </a>
                                        </li>
                                        }
                                    </ul>
                                </article>
                            ))}
                        </>
                    )}
                    {showNew && (
                        <NewContact callback={createContact} />
                    )}
                </main>
                {session && (
                    <>
                        <div>
                            <button className="me-1" onClick={() => setShowNew(prev => !prev)}>
                                New
                            </button>
                            <button onClick={getContacts}>
                                Refresh
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}