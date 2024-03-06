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

  // postData.results는 해당 Post 페이지 내에 존재하는 질문들을 담은 배열입니다.
  if (!postData) return <></>;
  return postData.results.length === 0 ? (
    <NoQuestion />
  ) : (
    postData.results.map(item => (
      <PostItem key={item.id} qnaData={item} {...item} />
    ))
  );
};

export default PostList;
