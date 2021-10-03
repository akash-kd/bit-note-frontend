import '../styles/globals.css'
import Layout from '../components/Layout'
import { AuthCtxProvider } from '../context/authCtx'
function MyApp({ Component, pageProps }) {
    return (
        <AuthCtxProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </AuthCtxProvider>
    )
}

export default MyApp
