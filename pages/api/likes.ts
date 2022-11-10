import supabase from './supabase';
import { Like, Error, LikesFunction } from '../../types/likes';

export const getLikesByPost: LikesFunction = async (
  postName: string | null
): Promise<Like[] | Error> => {
  if (!postName) {
    return { error: 'No post name provided' };
  }

  const { data, error } = await supabase
    .from('blogpost-likes')
    .select('*')
    .eq('postName', postName);

  if (error) {
    return { error: error.message };
  }

  return data;
};

export const addLike: LikesFunction = async (
  postName: string | null
): Promise<Like[] | Error> => {
  if (!postName) {
    return { error: 'No post name provided' };
  }

  const { data, error } = await supabase.from('blogpost-likes').insert([
    {
      postName,
    },
  ]);

  if (error) {
    return { error: error.message };
  }

  return data;
};
