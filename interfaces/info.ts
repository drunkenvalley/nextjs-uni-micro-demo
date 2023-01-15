import { Email } from "./email";
import { InvoiceAddress } from "./invoice-address";
import { Phone } from "./phone";
export interface Info {
    "ID": number,
    "DefaultEmailID": number,
    "DefaultPhoneID": number,
    "InvoiceAddressID": number,
    "Name": string,
    "DefaultPhone": Phone,
    "DefaultEmail": Email,
    "InvoiceAddress": InvoiceAddress,
    "Role": string
}
