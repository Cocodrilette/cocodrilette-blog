import type { AppProps } from 'next/app';
import { IconContext } from 'react-icons';
import { ThemeProvider } from 'next-themes';
import { WagmiConfig, createClient, chain } from 'wagmi';
import { ConnectKitProvider, getDefaultClient } from 'connectkit';

import '../styles/globals.css';

const client = createClient(
  getDefaultClient({
    appName: 'blog',
    alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_ID,
    chains: [chain.goerli],
  })
);

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <ThemeProvider attribute="class" enableSystem={true} defaultTheme="dark">
      <IconContext.Provider value={{ size: '1.5rem' }}>
        <WagmiConfig client={client}>
          <ConnectKitProvider theme="midnight">
            <Component {...pageProps} />
          </ConnectKitProvider>
        </WagmiConfig>
      </IconContext.Provider>
    </ThemeProvider>
  );
};

export default MyApp;
