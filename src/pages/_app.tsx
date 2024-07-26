import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'

import '../styles/reset.css'
import '../styles/globals.css'

const client = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={client}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}
