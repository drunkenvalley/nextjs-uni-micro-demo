interface FetchOptions {
    body?: Object
    method?: string
    params?: string
    token: string
}

export default function UseContacts ({ method = "GET", token, body, params = '?expand=Info,Info.InvoiceAddress,Info.DefaultPhone,Info.DefaultEmail,Info.DefaultAddress&hateoas=false&top=10' }: FetchOptions): Promise<Response> {
    const fetchParams: RequestInit = {
        method,
        headers: {
            Authorization: 'Bearer ' + token,
        },
    }
    if (body) {
        fetchParams.body = JSON.stringify(body)
    }

    const fetchUrl = `${process.env.NEXT_PUBLIC_SOFTRIG_BASEURL}/biz/contacts${params}`

    return fetch(fetchUrl, fetchParams)
}
