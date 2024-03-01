import PostItem from './PostItem';
import NoQuestion from './NoQuestion';
import { useEffect, useState } from 'react';
import { getQuestionsById } from '../../api';
import { useParams } from 'react-router-dom';

const PostList = () => {
  const { postId } = useParams();
  const [postData, setPostData] = useState();

  useEffect(() => {
    getQuestionsById(postId).then(setPostData);
  }, [postId]);

  if (!postData) return <></>;
  return postData.results.length === 0 ? (
    <NoQuestion />
  ) : (
    postData.results.map(item => (
      <PostItem key={item.id} QnAData={item} {...item} />
    ))
  );
};

export default PostList;
