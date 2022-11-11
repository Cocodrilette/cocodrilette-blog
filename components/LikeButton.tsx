import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';

import { addLike, getLikesByPost } from '../pages/api/likes';
import styles from '../styles/like.module.css';
// import { Like } from '../types/likes';

const LikeButton = ({ alreadyLiked, setAlreadyLiked }) => {
  const router = useRouter();
  const postName = router.query.slug as string;
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(alreadyLiked);

  const getLikes = async () => {
    const likes: any = await getLikesByPost(postName);
    // console.log(likes);
    setLikes(likes.length);
  };

  const newLike = async () => {
    await addLike(postName);
    setAlreadyLiked(true);
    setLiked(true);
    // console.log(res);
    getLikes();
  };

  const handleOnClick = () => {
    if (!liked) {
      newLike();
    }
  };

  useEffect(() => {
    // console.log(postName);
    getLikes();
  }, [likes]);

  return (
    <button
      title="Like"
      id={styles.likeButton}
      className="border-2 p-1 rounded-md shadow-sm"
      onClick={handleOnClick}
    >
      {liked ? (
        <FcLike
          style={{
            color: 'red',
          }}
        />
      ) : (
        <FcLikePlaceholder />
      )}
    </button>
  );
};

export default LikeButton;
