import React, { useCallback, useEffect, useState } from 'react';
import PostBanner from 'components/post/PostBanner';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { deleteSubject, getQuestionsById, getSubjectById } from '../api';
import Share from 'components/post/Share';
import Button from 'components/common/Button';
import styled from 'styled-components';
import PostCount from 'components/post/PostCount';
import PostList from 'components/post/PostList';
import useBrowserSize from 'hooks/useBrowserSize';
import ModalContainer from 'components/common/Modal';
import * as Modal from 'components/common/Modal';
import Editor from 'components/common/Editor';
import { useModal } from 'hooks/useModal';
import { useSubject } from 'context/subjectContext';
import { deleteLocalStorage } from 'utils/useLocalStorage';
import Avatar from 'components/common/Avatar';
import ThemeToggleButton from 'components/common/ThemeToggleButton';
import { useTheme } from 'context/ThemeContext';

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 46px;
  padding: 0 32px 24px;

  @media (max-width: 767px) {
    padding: 0 24px 24px;
  }
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

const PostModalAvatar = styled(Avatar)``;

const Feed = styled.div`
  border: 1px solid ${({theme}) => theme === 'dark' ? '#7D6F5F' : '#c7bbb5'};
  border-radius: 16px;
  background-color: var(--feedColor);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

const Post = () => {
  const [shortUI, setShortUI] = useState(false);
  const [postData, setPostData] = useState([]);

  const { themeMode, toggleTheme } = useTheme();
  const { currentSubject, setCurrentSubject } = useSubject();
  const { openModal, handleModalOpen, handleModalClose } = useModal();
  const { postId } = useParams();
  const { pathname } = useLocation();
  const { windowWidth } = useBrowserSize();

  const paths = pathname.split('/');
  const isAnswerPage = paths[paths.length - 1] === 'answer';

  const navigate = useNavigate();

  const handleUIsize = useCallback(() => {
    if (windowWidth <= 767) {
      setShortUI(true);
      return;
    } else {
      setShortUI(false);
    }
  }, [windowWidth]);

  const handleDelete = () => {
    // 질문 삭제시 로컬스토리지에 있는 질문 id도 없어지게 추가해놈
    deleteLocalStorage(postId);
    deleteSubject(postId).then(() => navigate('/list'));
  };

  useEffect(() => {
    getSubjectById(postId).then(setCurrentSubject);
  }, [postId]);

  useEffect(() => {
    handleUIsize();
  }, [handleUIsize]);

  useEffect(() => {
    getQuestionsById(postId).then(res => {
      const { results } = res;
      setPostData(() => results);
    });
  }, [postId]);

  if (!currentSubject) return <></>;

  return (
    <>
      <ThemeToggleButton toggle={toggleTheme} mode={themeMode} />
      {openModal && (
        <ModalContainer
          width={612}
          height={454}
          title="질문을 작성하세요"
          onClick={handleModalClose}
        >
          <Modal.ToQuestionBox>
            To.
            <PostModalAvatar
              imageSrc={currentSubject.imageSource}
              width="28"
              height="28"
            />
            <Modal.TextStyle>{currentSubject.name}</Modal.TextStyle>
          </Modal.ToQuestionBox>
          <Editor
            placeholder="질문을 입력해주세요"
            width={shortUI ? 279 : 530}
            height={shortUI ? 358 : 180}
            ModalClose={handleModalClose}
            setPostData={setPostData}
          />
        </ModalContainer>
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
        <Feed theme={themeMode}>
          <PostCount questionCount={currentSubject.questionCount} />
          <PostList postData={postData} setPostData={setPostData} />
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
              {shortUI ? '질문작성' : '질문 작성하기'}
            </AddQuestionButton>
          </StyledButtonDiv>
        )}
      </PostContainer>
    </>
  );
};

export default Post;
