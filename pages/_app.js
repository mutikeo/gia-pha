
import { StateProvider } from '../components/store';
import 'nprogress/nprogress.css';
import dynamic from 'next/dynamic';

const TopProgressBar = dynamic(
  () => {
    return import("../components/TopProgressBar");
  },
  { ssr: false },
);

function MyApp({ Component, pageProps }) {
  return (
    <StateProvider>
      <TopProgressBar />
      <Component {...pageProps} />
    </StateProvider>
  )
}

export default MyApp;