import { useState } from 'react';
import { format, parseISO } from 'date-fns';
import fs from 'fs';
import matter from 'gray-matter';
import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import path from 'path';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import Layout, { WEBSITE_HOST_URL } from '../../components/Layout';
import { MetaProps } from '../../types/layout';
import { PostType } from '../../types/post';
import { postFilePaths, POSTS_PATH } from '../../utils/mdxUtils';
// import { BsShareFill } from 'react-icons/bs';

import styles from '../../styles/post.module.css';
import LikeButton from '../../components/LikeButton';
// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components = {
  Head,
  Image,
  Link,
};

type PostPageProps = {
  source: MDXRemoteSerializeResult;
  frontMatter: PostType;
};

const PostPage = ({ source, frontMatter }: PostPageProps): JSX.Element => {
  const { title, description, date, tag, image } = frontMatter;
  const [alreadyLiked, setAlreadyLiked] = useState(false);

  const customMeta: MetaProps = {
    title: `${title} - Cocodrilette`,
    description: description,
    image: `${WEBSITE_HOST_URL}${image}`,
    date: date,
    type: 'article',
  };
  return (
    <Layout customMeta={customMeta}>
      <article id={styles.articleContainer} className="flex-col">
        <h1 className="mb-1 mt-5 text-gray-900 text-3xl font-extrabold dark:text-white">
          {title}
        </h1>
        <p className="mb-10 text-sm  text-gray-500 dark:text-gray-400">{tag}</p>
        <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
          {format(parseISO(date), 'MMMM dd, yyyy')}
        </p>

        {/* <button
          title="Share"
          className="max-w-xs"
          onClick={() => {
            // console.log(window.location); // todo
          }}
        >
          <BsShareFill />
        </button> */}

        <div className="prose dark:prose-dark">
          <MDXRemote {...source} components={components} />
        </div>
      </article>
      <div className="flex items-center gap-5 mt-10">
        <p className="text-xl my-5">
          If you liked this article <strong>give it a like</strong> and share it
          with your friends!{' '}
        </p>
        <div>
          <LikeButton
            alreadyLiked={alreadyLiked}
            setAlreadyLiked={setAlreadyLiked}
          />
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postFilePath = path.join(POSTS_PATH, `${params.slug}.mdx`);
  const source = fs.readFileSync(postFilePath);

  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        rehypeCodeTitles,
        rehypePrism,
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ['anchor'],
            },
          },
        ],
      ],
      format: 'mdx',
    },
    scope: data,
  });

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = postFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ''))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

export default PostPage;
