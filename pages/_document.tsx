import Header from "@/components/header"
import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
    return (
        <Html>
            <Head></Head>
            <body className="bg-snow">
                <div className="container px-3 flow">
                    <Main />
                </div>
                <NextScript />
            </body>
        </Html>
    )
}