import Head from 'next/head';
import Navbar from './navbar'
import Footer from './footer' 

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/mano_dark.png" />
      </Head>
      <div className={'bg-light'}>
        <Navbar />
          <main className={'container'}>
            {children}
          </main>
        <Footer />
      </div>
    </>
  )
}