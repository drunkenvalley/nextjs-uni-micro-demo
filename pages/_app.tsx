import "@/styles/main.scss"

import { Poppins } from "@next/font/google"
const poppins = Poppins({
    weight: ['300'],
    fallback: ["Arial", "Helvetica", "sans-serif"],
    subsets: ['latin'],
    display: 'optional',
})

import { SessionProvider } from "next-auth/react"

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}) {
    return (
    // `session` comes from `getServerSideProps` or `getInitialProps`.
    // Avoids flickering/session loading on first load.
        <SessionProvider session={session} refetchInterval={30}>
            <main className={poppins.className}>
                <Component {...pageProps} />
            </main>
        </SessionProvider>
    )
}
