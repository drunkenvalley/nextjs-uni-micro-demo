import { PropsWithChildren } from "react"
import "styles/main.scss"

import { Poppins } from "@next/font/google"
const poppins = Poppins({
    weight: ['300'],
    fallback: ["Arial", "Helvetica", "sans-serif"],
    subsets: ['latin'],
    display: 'optional',
    variable: '--font-poppins'
})

interface Props extends PropsWithChildren {}

export default function RootLayout ({ children }: Props) {
    return (
        <html className={poppins.variable}>
            <body className="bg-snow">
                <div className="m-3">
                    {children && children}
                </div>
            </body>
        </html>
    )
}