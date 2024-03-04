import React, { useCallback, useEffect, useState } from 'react';
import PostBanner from 'components/post/PostBanner';
import { useLocation, useParams } from 'react-router-dom';
import { getSubjectById } from '../api';
import Share from 'components/post/Share';
import Button from 'components/common/Button';
import styled from 'styled-components';
import PostCount from 'components/post/PostCount';
import PostList from 'components/post/PostList';
import useBrowserSize from 'hooks/useBrowserSize';
import Modal from 'components/common/Modal';

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 46px;

  padding: 2% 10%;
`;

const StyledButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const AddQuestionButton = styled(Button)`
  @media (max-width: 767px) {
    width: 123px;
  }
`;

const DeleteQuestionButton = styled(Button)`
  @media (max-width: 767px) {
    width: 70px;
    height: 25px;

    font-size: 10px;
  }
`;

const Feed = styled.div`
  border: 1px solid var(--brown30);
  border-radius: 16px;
  background-color: var(--brown10);
  padding: 16px;

  display: flex;
  flex-direction: column;
  gap: 16px;

  width: 100%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Post = () => {
  const { postId } = useParams();
  const [userData, setUserData] = useState();
  const [shortButton, setShortButton] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const { pathname } = useLocation();
  const paths = pathname.split('/');
  const isAnswerPage = paths[paths.length - 1] === 'answer';

  const { windowWidth } = useBrowserSize();

  // 창 크기가 바뀔 때 질문 작성 버튼 문구 변경
  window.onresize = function () {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 767) {
      setShortButton(true);
      return;
    }
    setShortButton(false);
  };

  const handleButtonsize = useCallback(() => {
    if (windowWidth <= 767) {
      setShortButton(true);
      return;
    } else {
      setShortButton(false);
    }
  }, [windowWidth]);

  useEffect(() => {
    getSubjectById(postId).then(setUserData);
  }, [postId]);

  useEffect(() => {
    handleButtonsize();
  }, [handleButtonsize]);

  if (!userData) return <></>;
  return (
    <>
      {isModalOpen && (
        <Modal
          userName={userData.name}
          imageSource={userData.imageSource}
          onClick={() => {
            setModalOpen(false);
          }}
        />
      )}
      <PostBanner
        userProfileImage={userData.imageSource}
        userName={userData.name}
      ></PostBanner>
      <PostContainer>
        <Share />
        {isAnswerPage && (
          <StyledButtonDiv>
            <DeleteQuestionButton varient="floating" width={100} height={35}>
              삭제하기
            </DeleteQuestionButton>
          </StyledButtonDiv>
        )}
        <Feed>
          <PostCount questionCount={userData.questionCount} />
          <PostList userData={userData} />
        </Feed>
        {!isAnswerPage && (
          <StyledButtonDiv>
            <AddQuestionButton
              varient="floating"
              width={208}
              onClick={() => {
                setModalOpen(true);
              }}
            >
              {shortButton ? '질문작성' : '질문 작성하기'}
            </AddQuestionButton>
          </StyledButtonDiv>
        )}
      </PostContainer>
    </>
  );
};

export default Post;
