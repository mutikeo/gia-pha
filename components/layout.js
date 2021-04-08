import Head from 'next/head'
import Header from './header'

const Layout = (props) => (
  <>
    <Head>
      <title>Gia phả</title>
    </Head>
    <style jsx global>{`
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        color: #333;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
          'Helvetica Neue', Arial, Noto Sans, sans-serif, 'Apple Color Emoji',
          'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
      }

      .container {
        margin: 0 auto;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
      }
    `}</style>
    <Header />

    <main>
      <div className="container">{props.children}</div>
    </main>
  </>
)

export default Layout
