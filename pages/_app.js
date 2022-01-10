import '../styles/globals.css'
import Layout from '../components/layout'

//Load bootstrap files
if (typeof window !== "undefined") {
  require("@popperjs/core");
  require("bootstrap/dist/js/bootstrap");
  require("bootstrap/dist/css/bootstrap.css");
}

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )}