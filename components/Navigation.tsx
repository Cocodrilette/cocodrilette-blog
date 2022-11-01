import Link from 'next/link';
import React from 'react';

import styles from '../styles/navigation.module.css';

const Navigation = (): JSX.Element => {
  return (
    <nav id={styles.navbar}>
      <Link href="/">
        <a className="text-gray-900 text-2xl dark:text-white pr-6 py-4">Home</a>
      </Link>
      <Link href="/contact">
        <a className="text-gray-900 text-2xl dark:text-white px-6 py-4">
          Contact
        </a>
      </Link>
      <Link href="/posts/">
        <a className="text-gray-900 text-2xl dark:text-white px-6 py-4">
          Posts
        </a>
      </Link>
    </nav>
  );
};

export default Navigation;
