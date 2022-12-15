import supabase from './supabase';

export const postComment = async (comment: string, postName: string) => {
  if (!comment || !postName) {
    return { error: 'No comment or post name provided' };
  }
  const { data, error } = await supabase.from('blog-comments').insert([
    {
      comment,
      postName,
    },
  ]);
  if (error) {
    return { error: error.message };
  }
  return data;
};

export const getCommentsByPost = async (postName: string) => {
  if (!postName) {
    return { error: 'No post name provided' };
  }
  const { data, error } = await supabase
    .from('blog-comments')
    .select('*')
    .eq('postName', postName);

  if (error) {
    return { error: error.message };
  }

  return data;
};
