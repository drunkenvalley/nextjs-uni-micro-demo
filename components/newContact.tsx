import { Contact } from "@/interfaces/contact"
import { FormEventHandler, useRef } from "react"

interface Props {
    callback: Function
}

export default function NewContact({ callback }: Partial<Props>) {
    const nameRef = useRef<HTMLInputElement>(null)
    const roleRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)

    const onSubmit: FormEventHandler = event => {
        event.preventDefault()

        // This way feels clumsy; should be revisited
        let email
        let role

        if (!nameRef.current?.value) return
        if (roleRef.current?.value) role = {
            Role: roleRef.current?.value
        }
        if (emailRef.current?.value) email = {
            DefaultEmail: {
                EmailAddress: emailRef.current?.value
            }
        }

        const payload = {
            ...role,
            Info: {
                Name: nameRef.current?.value,
                ...email
            }
        }

        if (callback) callback(payload)
    }

    return (
        <section className="create-contact mt-3">
            <h3>New contact</h3>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="newContactName">
                        Name
                    </label>
                    <input id="newContactName" name="newName" ref={nameRef} required />
                </div>

                <div>
                    <label htmlFor="newContactRole">
                        Role
                    </label>
                    <input id="newContactRole" name="newRole" ref={roleRef} />
                </div>

                <div>
                    <label htmlFor="newContactEmail">
                        Email
                    </label>
                    <input id="newContactEmail" name="newEmail" ref={emailRef} />
                </div>
                <button type="submit">Create</button>
            </form>
        </section>
    )
}

/**
 * {
    "Info": {
        "Name": "Mikke Mus Kontaktperson",
        "InvoiceAddress": {
            "AddressLine1": "Andebygaten 33b",
            "AddressLine2": "2 etg.",
            "AddressLine3": "",
            "City": "Andeby",
            "Country": "DisneyWorld",
            "CountryCode": "DW",
            "PostalCode": "341234-A",
        },
        "DefaultPhone": {
            "CountryCode": "+999",
            "Description": "Mobile",
            "Number": "999-999-999",
        },
        "DefaultEmail": {
            "EmailAddress": "mikke@mus.com",
        }
        },
    "Comment": "Her har vi en splitter ny kontaktperson"
    }
 */