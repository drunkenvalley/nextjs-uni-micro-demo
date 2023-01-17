import { Contact as IContact } from "@/interfaces/contact"
import { MouseEventHandler, useState } from "react"
import BaseContact from "./baseContact"
import EditContact from "./editContact"

interface Props {
    contact: IContact
    deleteFn?: MouseEventHandler
    saveFn?: MouseEventHandler
}

export default function Contact ({ contact, deleteFn, saveFn }: Props) {
    const [editing, setEditing] = useState(false)

    return editing && <EditContact contact={contact} closeFn={() => setEditing(false)} saveFn={saveFn} />
        || <BaseContact contact={contact} editFn={() => setEditing(true)} deleteFn={deleteFn} />
}