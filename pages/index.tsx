import Head from "next/head"
import { useSession } from "next-auth/react"
import UseContacts from "@/services/contacts"
import { AccessTokenSession } from "@/interfaces/accesstoken";
import { useEffect, useRef, useState } from "react";
import { Contact as IContact } from "@/interfaces/contact";
import EditContact from "@/components/editContact";
import Contact from "@/components/contact";

export default function Page() {
    const { data: session } = useSession()
    const [contacts, setContacts] = useState<IContact[]>([])
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

            const fetchedContacts: IContact[] = await response.json()
            setContacts(fetchedContacts)
        } catch(e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    const createContact = async (payload: Object) => contactsApi({ method: "POST", body: payload, next: () => setShowNew(false) })
    const updateContact = async (contact: IContact) => contactsApi({ method: "PUT", body: contact, params: "/" + contact.ID })
    const deleteContact = async (contact: IContact) => contactsApi({ method: "DELETE", params: "/" + contact.ID })

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
                                <Contact key={contact.ID} contact={contact} deleteFn={() => deleteContact(contact)} saveFn={updateContact} />
                            ))}
                        </>
                    )}
                    {session && showNew && (
                        <EditContact closeFn={() => setShowNew(false)} saveFn={createContact}>Create</EditContact>
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