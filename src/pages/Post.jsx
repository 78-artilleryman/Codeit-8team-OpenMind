import React, { useEffect, useState } from 'react';
import PostBanner from 'components/post/PostBanner';
import { useParams } from 'react-router-dom';
import { getSubjectById } from '../api';
import Share from 'components/post/Share';
import Button from 'components/common/Button';
import styled from 'styled-components';
import PostCount from 'components/post/PostCount';
import PostList from 'components/post/PostList';

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 46px;

  padding: 2%;
`;

const AddQuestionButton = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Feed = styled.div`
  border: 1px solid var(--brown30);
  border-radius: 16px;
  background-color: var(--brown10);
  padding: 16px;

  display: flex;
  flex-direction: column;
  gap: 16px;

  width: 70%;
  margin: auto;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const Post = () => {
  const { postId } = useParams();
  const [userData, setUserData] = useState();
  const [shortButton, setShortButton] = useState(false);

  // 창 크기가 바뀔 때 질문 작성 버튼 문구 변경
  window.onresize = function () {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 767) {
      setShortButton(true);
      return;
    }
    setShortButton(false);
  };

  useEffect(() => {
    getSubjectById(postId).then(setUserData);
  }, [postId]);

  if (!userData) return <></>;
  return (
    <>
      <PostBanner
        userProfileImage={userData.imageSource}
        userName={userData.name}
      ></PostBanner>
      <PostContainer>
        <Share />
        <Feed>
          <PostCount questionCount={userData.questionCount} />
          <PostList userData={userData} />
        </Feed>
        <AddQuestionButton>
          <Button varient="floating" width={208}>
            {shortButton ? '질문작성' : '질문 작성하기'}
          </Button>
        </AddQuestionButton>
      </PostContainer>
    </>
  );
};

export default Post;
