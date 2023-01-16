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
        event.stopPropagation()

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

        if (callback) {
            callback(payload)
        }

        (event.target as HTMLFormElement).reset()
    }

    return (
        <form onSubmit={onSubmit} className="contact-block border-blue">
            <section>
                <h3 className="mb-1">
                    <div className="form-field">
                        <input placeholder="Name*" className="button" id="newContactName" name="newName" ref={nameRef} required />
                        <label htmlFor="newContactName">
                            Name<span className="text-fire">*</span>
                        </label>
                    </div>
                </h3>

                <div className="form-field">
                    <input placeholder="Role" className="button" id="newContactRole" name="newRole" ref={roleRef} />
                    <label htmlFor="newContactRole">
                        Role
                    </label>
                </div>
            </section>

            <ul role="list">
                <li className="me-2">
                    <div className="form-field">
                        <input placeholder="Email" className="button" id="newContactEmail" name="newEmail" ref={emailRef} />
                        <label htmlFor="newContactEmail">
                            Email
                        </label>
                    </div>
                </li>
                <li>
                    <button type="submit" style={{height: "100%"}}>Create</button>
                </li>
            </ul>
        </form>
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