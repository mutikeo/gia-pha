
import { StateProvider } from '../components/store';
import Router from 'next/router';
import NProgress from 'nprogress';

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

function MyApp({ Component, pageProps }) {
  return <StateProvider><Component {...pageProps} /></StateProvider>
}

export default MyApp