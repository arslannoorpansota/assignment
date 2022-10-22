import Axios from 'axios';
import Head from 'next/head';
import { SWRConfig } from 'swr';
import { AppProps } from 'next/app';

import '../styles/tailwind.css';

function MyApp({ Component, pageProps }: AppProps) {
  const title = (Component as any).title || Component.name.replace(/([A-Z])/g, ' $1');

  return (
    <SWRConfig
      value={{
        fetcher: (resource) => Axios.get(resource).then((r) => r.data),
      }}
    >
      <Head>
        <title>{`${title} | Assignment`}</title>
      </Head>

        <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp
