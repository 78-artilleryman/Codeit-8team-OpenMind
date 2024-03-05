import React, { useCallback, useEffect, useState } from 'react';
import PostBanner from 'components/post/PostBanner';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { deleteSubject, getSubjectById } from '../api';
import Share from 'components/post/Share';
import Button from 'components/common/Button';
import styled from 'styled-components';
import PostCount from 'components/post/PostCount';
import PostList from 'components/post/PostList';
import useBrowserSize from 'hooks/useBrowserSize';
import Modal from 'components/common/Modal';
import { useModal } from 'hooks/useModal';
import { useSubject } from 'context/subjectContext';

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

  @media (max-width: 1023px) {
    width: 90%;
  }
`;

const Post = () => {
  const { postId } = useParams();
  const { currentSubject, setCurrentSubject } = useSubject();
  const [shortButton, setShortButton] = useState(false);
  // 모달 오픈 여부 변수
  const { openModal, handleModalOpen, handleModalClose } = useModal();

  const { pathname } = useLocation();
  const paths = pathname.split('/');
  const isAnswerPage = paths[paths.length - 1] === 'answer';

  const { windowWidth } = useBrowserSize();

  const navigate = useNavigate();

  const handleButtonsize = useCallback(() => {
    if (windowWidth <= 767) {
      setShortButton(true);
      return;
    } else {
      setShortButton(false);
    }
  }, [windowWidth]);

  const handleDelete = () => {
    deleteSubject(postId).then(() => navigate('/list'));
  };

  useEffect(() => {
    getSubjectById(postId).then(setCurrentSubject);
  }, [postId]);

  useEffect(() => {
    handleButtonsize();
  }, [handleButtonsize]);

  if (!currentSubject) return <></>;
  return (
    <>
      {openModal && (
        <Modal
          userName={currentSubject.name}
          imageSource={currentSubject.imageSource}
          onClick={handleModalClose}
        />
      )}
      <PostBanner
        userProfileImage={currentSubject.imageSource}
        userName={currentSubject.name}
      ></PostBanner>
      <PostContainer>
        <Share />
        {isAnswerPage && (
          <StyledButtonDiv>
            <DeleteQuestionButton
              varient="floating"
              width={100}
              height={35}
              onClick={handleDelete}
            >
              삭제하기
            </DeleteQuestionButton>
          </StyledButtonDiv>
        )}
        <Feed>
          <PostCount questionCount={currentSubject.questionCount} />
          <PostList />
        </Feed>
        {!isAnswerPage && (
          <StyledButtonDiv>
            <AddQuestionButton
              varient="floating"
              width={208}
              onClick={() => {
                handleModalOpen();
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
