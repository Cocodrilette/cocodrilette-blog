import React from 'react';
import { MetaProps } from '../types/layout';
import Head from './Head';
import Navigation from './Navigation';
import ThemeSwitch from './ThemeSwitch';

type LayoutProps = {
  children: React.ReactNode;
  customMeta?: MetaProps;
};

export const WEBSITE_HOST_URL = 'https://nextjs-typescript-mdx-blog.vercel.app';

const Layout = ({ children, customMeta }: LayoutProps): JSX.Element => {
  return (
    <>
      <Head customMeta={customMeta} />
      <header>
        <div className="max-w-5xl px-8 mx-auto">
          <div className="flex items-center justify-between py-6 border-b">
            <Navigation />
            <ThemeSwitch />
          </div>
        </div>
      </header>
      <main>
        <div className="max-w-5xl px-8 py-4 mx-auto">{children}</div>
      </main>
      <footer className="py-8 border-t">
        <div className="max-w-5xl px-8 mx-auto mb-2 font-bold">
          Built with ❤️ by{' '}
          <a
            className="text-gray-900 dark:text-white"
            href="https://twitter.com/cocodrilette"
          >
            Cocodrilette
          </a>
        </div>
        <div className="max-w-5xl px-8 mx-auto">
          Thanks to{' '}
          <a
            className="text-gray-900 dark:text-white"
            href="https://twitter.com/hunterhchang"
          >
            Hunter Chang
          </a>{' '}
          for the template
        </div>
      </footer>
    </>
  );
};

export default Layout;
