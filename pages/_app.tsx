import "@/styles/main.scss"

import { Poppins } from "@next/font/google"
const poppins = Poppins({
    weight: ['300'],
    fallback: ["Arial", "Helvetica", "sans-serif"],
    subsets: ['latin'],
    display: 'optional',
})

import { SessionProvider } from "next-auth/react"
import Head from "next/head"

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <SessionProvider session={session} refetchInterval={30}>
                <main className={poppins.className}>
                    <Component {...pageProps} />
                </main>
            </SessionProvider>
        </>
    )
}
