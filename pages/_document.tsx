import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
    return (
        <Html>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <body className="bg-snow">
                <div className="container p-3 flow">
                    <Main />
                </div>
                <NextScript />
            </body>
        </Html>
    )
}