import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import { IconContext } from 'react-icons';

import React from 'react';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
      <IconContext.Provider value={{ size: '1.5rem' }}>
        <Component {...pageProps} />
      </IconContext.Provider>
    </ThemeProvider>
  );
};

export default MyApp;
