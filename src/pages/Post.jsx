import React, { useEffect, useState } from 'react';
import PostBanner from 'components/post/PostBanner';
import { useParams } from 'react-router-dom';
import { getSubjectById } from '../api';
import Share from 'components/post/Share';

const Post = () => {
  const { postId } = useParams();
  const [postData, setPostData] = useState();

  useEffect(() => {
    getSubjectById(postId).then(setPostData);
  }, [postId]);

  return (
    <div>
      {postData && (
        <>
          <PostBanner
            userProfileImage={postData.imageSource}
            userName={postData.name}
          ></PostBanner>
          <Share />
        </>
      )}
    </div>
  );
};

export default Post;
