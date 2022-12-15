import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import { getCommentsByPost, postComment } from '../../api/comments';
import styles from './Comment.module.css';
import Comment from './Comment';

export default function CommentBox() {
  const router = useRouter();
  const postName = router.query.slug as string;
  // ! add types
  const [comments, setComments] = useState([]) as any;
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (newComment.trim() === '') {
      // ! add toast
      return;
    }
    try {
      setIsLoading(true);
      const res = await postComment(newComment, postName);
      setNewComment('');
      getComments();
      setIsLoading(false);
      return res;
    } catch (error) {
      setIsLoading(false);
      return error;
    }
  };

  const getComments = async () => {
    const commentsByPost = await getCommentsByPost(postName);
    setComments(commentsByPost);
  };

  const renderComments = () => {
    // todo: order comments by date
    return comments?.reverse().map((comment: any) => {
      return (
        <Comment
          key={comment.id}
          when={comment.when}
          comment={comment.comment}
        />
      );
    });
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <div className="w-full my-16 border-t">
      <h2 className="text-3xl mt-5">Comments</h2>
      <div className="my-5">
        <h3>Leave your comment below</h3>
        <form className="flex flex-col text-left">
          <textarea
            id={styles.textArea}
            className="bg-transparent border-2 rounded-md my-2 h-28 p-2 focus:border-black dark:border-slate-700 focus:dark:border-white"
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <button
            onClick={handleSubmit}
            className=" self-end bg-black text-white px-3 py-2 rounded-md "
          >
            {isLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              'Send'
            )}
          </button>
        </form>
        {renderComments()}
      </div>
    </div>
  );
}
