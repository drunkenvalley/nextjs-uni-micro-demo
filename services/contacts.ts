interface FetchOptions {
    method?: string
    token: string
    body?: Object
}

export default function UseContacts ({ method = "GET", token, body }: FetchOptions): Promise<Response> {
    const fetchParams: RequestInit = {
        method,
        headers: {
            Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify(body)
    }
    const fetchUrl = `${process.env.NEXT_PUBLIC_SOFTRIG_BASEURL}/biz/contacts?expand=Info,Info.InvoiceAddress,Info.DefaultPhone,Info.DefaultEmail,Info.DefaultAddress&hateoas=false&top=10`

    return fetch(fetchUrl, fetchParams)
}
