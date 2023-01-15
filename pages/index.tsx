import Head from "next/head"

export default function Page() {
    return (
        <>
            <Head>
                <title>My Contacts</title>
            </Head>
            <h2>
                My Contacts
            </h2>
            <p>
                These are relevant people to reach out to, for one reason or another.
            </p>
            <div className="grid gap-1">
                <article className="border border-gray p-1">#1</article>
            </div>
        </>
    )
}