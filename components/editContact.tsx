import { Contact } from "@/interfaces/contact"
import { FormEventHandler, MouseEventHandler, ReactNode, useRef } from "react"

interface Props {
    children: ReactNode
    closeFn: MouseEventHandler
    saveFn: Function
    id: number
    name: string
    role: string
    email: string
}

export default function NewContact({ children, closeFn, saveFn, id, name, role, email }: Partial<Props>) {
    const idRef = useRef<HTMLInputElement>(null)
    const nameRef = useRef<HTMLInputElement>(null)
    const roleRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)

    const onSubmit: FormEventHandler = event => {
        event.preventDefault()
        if (!nameRef.current?.value) return

        // This way feels clumsy; should be revisited
        let id
        let email
        let role

        if (idRef.current?.value) id = {
            ID: idRef.current?.value
        }
        if (roleRef.current?.value) role = {
            Role: roleRef.current?.value
        }
        if (emailRef.current?.value) email = {
            DefaultEmail: {
                EmailAddress: emailRef.current?.value
            }
        }

        const payload = {
            ...id,
            ...role,
            Info: {
                Name: nameRef.current?.value,
                ...email
            }
        }

        if (saveFn) {
            saveFn(payload)
        }

        (event.target as HTMLFormElement).reset()
    }

    return (
        <form onSubmit={onSubmit} className="contact-block border-blue">
            <input type="hidden" ref={idRef} defaultValue={id} />
            <section>
                <h3 className="mb-1">
                    <div className="form-field">
                        <input placeholder="Name*" className="button" id="newContactName" name="newName" ref={nameRef} defaultValue={name} required />
                        <label htmlFor="newContactName">
                            Name<span className="text-fire">*</span>
                        </label>
                    </div>
                </h3>

                <div className="form-field">
                    <input placeholder="Role" className="button" id="newContactRole" name="newRole" defaultValue={role} ref={roleRef} />
                    <label htmlFor="newContactRole">
                        Role
                    </label>
                </div>
            </section>

            <ul role="list">
                <li className="me-2">
                    <div className="form-field">
                        <input placeholder="Email" className="button" id="newContactEmail" name="newEmail" defaultValue={email} ref={emailRef} />
                        <label htmlFor="newContactEmail">
                            Email
                        </label>
                    </div>
                </li>
                <li className="flex">
                    <button type="submit" className="me-1" style={{height: "100%"}}>
                        {children && children || <>Edit</>}
                    </button>
                    <button type="button" className="icon text-fire" onClick={closeFn}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                        </svg>
                    </button>
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