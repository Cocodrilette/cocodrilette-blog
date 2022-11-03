import { format, parseISO } from 'date-fns';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import React from 'react';
import Layout from '../components/Layout';
import { MetaProps } from '../types/layout';
import { getAllPosts } from '../lib/api';
import { PostType } from '../types/post';
import { BsGithub, BsTwitter } from 'react-icons/bs';

import styles from '../styles/index.module.css';

type IndexProps = {
  posts: PostType[];
};

export const Index = ({ posts }: IndexProps): JSX.Element => {
  const customMeta: MetaProps = {
    title: `Cocodrilette`,
    description:
      'As space dedicated to talk about tech, blockchain, web dev, and some more interest things. So, keep your eyes on it.',
    // image: ,
  };
  const lastestPosts = posts.slice(0, 2);

  return (
    <Layout customMeta={customMeta}>
      <div className="flex-col mt-10">
        {' '}
        <h1 id={styles.homePresentation} className="mb-0 text-6xl">
          Hi! I am <span className="font-bold">Cocodrilette</span>,
        </h1>
        <h1 id={styles.homePresentation} className="mb-0 text-6xl">
          a blockchain evangelist,
        </h1>
        <h1 id={styles.homePresentation} className="mb-0 text-6xl">
          Solidity developer
        </h1>
        <h1 id={styles.homePresentation} className="mb-0 text-6xl">
          and backend lover.
        </h1>
      </div>

      <div id={styles.homeSocials} className="flex-wrap gap-5">
        {' '}
        <a
          href="https://github.com/cocodrilette"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex px-6 py-2 rounded-md border-2 text-white dark:text-white bg-gray-900 hover:bg-black hover:text-white dark:hover:text-white mt-10 mr-5"
        >
          Follow me on Github{' '}
          <BsGithub className="inline-flex justify-center text-center m-auto ml-3" />
        </a>
        <a
          href="https://twitter.com/cocodrilette"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex px-6 py-2 rounded-md border-2 text-white dark:text-white bg-blue-500 hover:bg-blue-600 hover:text-white dark:hover:text-white mt-10"
        >
          Follow me on Twitter{' '}
          <BsTwitter className="inline-flex justify-center text-center m-auto ml-3" />
        </a>
      </div>

      <div className="my-10">
        <h2 id={styles.homeSubPresentation}>
          Here you can find an space dedicated to talk about tech, blockchain,
          web dev, and some more interest things. So, keep your eyes on it 👀.
        </h2>
      </div>

      <div className="flex flex-col mt-24 mb-8">
        <h2 className="text-4xl font-bold">Latest posts</h2>
        {lastestPosts.map((post) => (
          <article key={post.slug} className="mt-8">
            <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
              {format(parseISO(post.date), 'MMMM dd, yyyy')}
            </p>
            <h1 className="mb-2 text-xl">
              <Link as={`/posts/${post.slug}`} href={`/posts/[slug]`}>
                <a className="text-gray-900 dark:text-white dark:hover:text-blue-400">
                  {post.title}
                </a>
              </Link>
            </h1>
            <p className="mb-3">{post.description}</p>
            <p>
              <Link as={`/posts/${post.slug}`} href={`/posts/[slug]`}>
                <a>Read More</a>
              </Link>
            </p>
          </article>
        ))}
        <h2 className="mt-8">
          <Link href="/posts">
            <a>See all posts</a>
          </Link>
        </h2>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts(['date', 'description', 'slug', 'title']);

  return {
    props: { posts },
  };
};

export default Index;
