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

    const contactsApi = async ({ method, body, params, next }: { method: string, body?: Object, params?: string, next?: Function }) => {
        try {
            const response = await UseContacts({ method, token: (session as AccessTokenSession)?.accessToken, body, params })
            if (response.status > 299) throw `Failed running operation | ${response.status} - ${response.statusText}`
        } catch(e) {
            console.error(e)
        } finally {
            getContacts()
            if (next) { next() }
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

    const createContact = async (payload: Object) => contactsApi({ method: "POST", body: payload, next: () => setShowNew(false) })
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
                <div className="flex align-items-end justify-space-between">
                    <h2 className="mt-4">
                        My Contacts
                    </h2>
                    {session && (
                        <>
                            <div>
                                <button onClick={getContacts}>
                                    Refresh
                                </button>
                            </div>
                        </>
                    )}
                </div>
                {!session && (
                    <p>
                        Please log in to get started.
                    </p>
                )}
                <main className="contact-grid">
                    {session && !loading && !!contacts.length && (
                        <>
                            {/** I would probably redesign this for additional info? Probably. */}
                            {contacts.map(contact => (
                                <article key={contact.InfoID} className="contact-block">
                                    <section>
                                        <h3>
                                            <span>{contact.Info?.Name}</span>
                                            <div className="flex">
                                                <button className="icon text-blue">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                                                    </svg>
                                                </button>
                                                <button className="icon text-fire" onClick={() => deleteContact(contact)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                                                    </svg>
                                                </button>
                                            </div>
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
                    {session && showNew && (
                        <NewContact callback={createContact} />
                    )}
                    {session &&
                        <button className="contact-block" onClick={() => setShowNew(prev => !prev)}>
                            <h3>
                                New
                            </h3>
                        </button>
                    }
                </main>
                {loading && <div className="spinner my-3 text-blue"></div>}
            </div>
        </>
    )
}