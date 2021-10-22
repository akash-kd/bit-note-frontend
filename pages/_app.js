import '../styles/globals.css'
import Layout from '../components/Layout'
import {authCtx,auth,AuthProvider} from '../context/authCtx'
import { HotkeysProvider } from '@blueprintjs/core'
function MyApp({ Component, pageProps }) {
  return (
    <HotkeysProvider>
      <AuthProvider >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </HotkeysProvider>
  )
}

export default MyApp
