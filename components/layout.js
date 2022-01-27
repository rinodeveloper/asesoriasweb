import Head from 'next/head'
import Navbar from './navbar'
import Footer from './footer' 
import Script from 'next/script'


export default function Layout({ children }) {
  return (
    <>
      <Script 
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GTAG_ID}`} 
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.GTAG_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Head>
        <link rel={'shortcut icon'} href={'/mano_dark.png'} />
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