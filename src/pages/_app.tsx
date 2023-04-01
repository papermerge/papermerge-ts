import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"

function App({ Component, pageProps: { session, ...pageProps} }: AppProps) {
  return (
    <>
     <SessionProvider session={session}>
        <Component {...pageProps} />
    </SessionProvider>
    </>
  )
}

export default App;
