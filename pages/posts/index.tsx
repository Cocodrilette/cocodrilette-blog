import { format, parseISO } from 'date-fns';
import { useState, useEffect } from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import React from 'react';
import Layout from '../../components/Layout';
import { getAllPosts } from '../../lib/api';
import { MetaProps } from '../../types/layout';
import { PostType } from '../../types/post';
import { BsSearch } from 'react-icons/bs';

// import styles from '../../styles/postsIndex.module.css';

type IndexProps = {
  posts: PostType[];
};

export const Index = ({ posts }: IndexProps): JSX.Element => {
  const customMeta: MetaProps = {
    title: `Posts - Cocodrilette`,
    // description: ,
    // image: ,
  };
  const [postsState, setPostsState] = useState<PostType[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');

  const search = (
    searchValue_: string,
    posts_: Array<PostType>
  ): Array<PostType> => {
    const matches = posts_.filter((post) => {
      if (searchValue_.trim() === '') {
        return posts_;
      } else if (
        post.title
          ?.trim()
          .toLowerCase()
          .includes(searchValue_.trim().toLowerCase()) ||
        post.tag
          ?.trim()
          .toLowerCase()
          .includes(searchValue_.trim().toLowerCase()) ||
        post.description
          ?.trim()
          .toLowerCase()
          .includes(searchValue_.trim().toLowerCase())
      ) {
        return post;
      }
    });

    return matches;
  };

  const postsList = (posts_: PostType[]) => {
    {
      if (posts_.length === 0) {
        return <p className="mt-10 mb-40">No matches funded 😓</p>;
      }

      return postsState.map((post) => (
        <article key={post.slug} className="mt-8">
          <div className="inline-flex gap-2">
            <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
              {post.tag}
            </p>
            <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">-</p>
            <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
              {format(parseISO(post.date), 'MMMM dd, yyyy')}
            </p>
          </div>
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
      ));
    }
  };

  const handleSearch = (e: any) => {
    e.preventDefault();
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    setPostsState(posts);
  }, []);

  useEffect(() => {
    setPostsState(search(searchValue, posts));
  }, [searchValue]);

  return (
    <Layout customMeta={customMeta}>
      <h1>All posts</h1>
      <div className="inline-flex w-full p-2 gap-2 border-2 rounded-md border-neutral-500">
        <input
          className="w-full bg-transparent outline-none"
          type="text"
          name="keyword"
          id="keyword"
          value={searchValue}
          onChange={handleSearch}
        />
        <BsSearch className="m-auto" />
      </div>
      {postsList(postsState)}
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts(['date', 'description', 'slug', 'title', 'tag']);

  return {
    props: { posts },
  };
};

export default Index;
