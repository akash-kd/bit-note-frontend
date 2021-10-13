import '../styles/globals.css'
import Layout from '../components/Layout'
import {authCtx,auth,AuthProvider} from '../context/authCtx'
function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  )
}

export default MyApp
