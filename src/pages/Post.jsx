import React, { useCallback, useEffect, useRef, useState } from 'react';
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
  border: 1px solid var(--brown30);
  border-radius: 16px;
  background-color: var(--brown10);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

const Post = () => {
  const [shortUI, setShortUI] = useState(false);
  const [postData, setPostData] = useState([]);
  const [limit, setLimit] = useState(4);

  const { themeMode, toggleTheme } = useTheme();
  const { currentSubject, setCurrentSubject } = useSubject();
  const { openModal, handleModalOpen, handleModalClose } = useModal();
  const { postId } = useParams();
  const { pathname } = useLocation();
  const { windowWidth } = useBrowserSize();

  const paths = pathname.split('/');
  const isAnswerPage = paths[paths.length - 1] === 'answer';

  const navigate = useNavigate();

  // 타겟 요소 지정
  const target = useRef(null);

  /*
  callback: 교차점이 발생했을 때(관측된 경우) 실행되는 콜백 함수.
  entries: 교차점 정보를 담는 배열
  isIntersecting: 교차점(intersection)이 발생한 요소의 상태
  교차점이 발생하면 limit 8 증가
  */
  const callback = entries => {
    if (entries[0].isIntersecting) {
      console.log('관측 완료');
      setLimit(prev => prev + 4);
    }
  };

  // 관측에 적용하는 옵션
  const options = {
    root: null, // null일 경우 viewport가 root로 지정
    rootMargin: '0px',
    threshold: 0.5, // 0.5라면 타겟 요소의 절반이 교차 영역에 들어왔을 때 콜백 함수 실행
  };

  // 관찰자 생성
  // 첫 번째 인자 - 관측된 경우 실행할 콜백 함수 / 두 번째 인자 - 관측에 대한 옵션 지정
  const observer = new IntersectionObserver(callback, options);

  const fetchData = async (postId, limit) => {
    getQuestionsById(postId, limit).then(res => {
      const { results } = res;
      setPostData(() => results);
    });
  };

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
    deleteSubject(postId).then(() => navigate('/list?page=1&sort=createdAt'));
  };

  useEffect(() => {
    if (target) observer.observe(target.current); // 관찰대상이 존재하면 타겟 요소 관측 시작
    return () => observer.disconnect(); // 모든 요소 관측 중단
  }, []);

  useEffect(() => {
    fetchData(postId, limit);
  }, [postId, limit]);

  useEffect(() => {
    getSubjectById(postId).then(setCurrentSubject);
  }, [postId]);

  useEffect(() => {
    handleUIsize();
  }, [handleUIsize]);

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

        <Feed>
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
      <div ref={target}></div>
    </>
  );
};

export default Post;
