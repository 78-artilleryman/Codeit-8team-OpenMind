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
import Loding from 'components/common/Loding';

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
  border: 1px solid ${({ theme }) => (theme === 'dark' ? '#7D6F5F' : '#c7bbb5')};
  border-radius: 16px;
  background-color: var(--feedColor);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

const limit = 4; // limit는 상수라 위에서 따로 선언 가급적 constants 폴더 이용 및 Snake case으로 네이밍 컨벤션

const Post = () => {
  const [shortUI, setShortUI] = useState(false);
  const [postData, setPostData] = useState([]);
  // 기존 limit 부분 offset으로 변경
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  // 질문의 총개수 표시하는 count 추가
  const [count, setCount] = useState(0);
  const { themeMode, toggleTheme } = useTheme();

  // 유저 정보 state
  const [subject, setSubject] = useState();

  // 안쓰는데 effect 지우면 에러남 ????
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

  //limit을 올리던 기존 방식에서 fetchData수행하게 변경
  const callback = entries => {
    if (entries[0].isIntersecting && !isLoading) {
      fetchData(postId, limit, offset);
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

  //offset 추가, count 추가
  const fetchData = async (postId, limit, offset) => {
    setIsLoading(true);
    getQuestionsById(postId, limit, offset).then(res => {
      const { results } = res;

      setCount(res.count);
      setPostData([...postData, ...results]);

      setOffset(offset + limit);
      setIsLoading(false);
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
    // 질문의 총 개수보다 offset이 높을경우 무한 스크롤 작동 중지
    if (target.current && count > offset) observer.observe(target.current); // 관찰대상이 존재하면 타겟 요소 관측 시작
    return () => observer.disconnect(); // 모든 요소 관측 중단
  }, [observer]);

  useEffect(() => {
    fetchData(postId, limit, offset);
  }, [postId, limit]);

  //왜있는지 모르겠는 context ??????? 없으면 에러남
  useEffect(() => {
    getSubjectById(postId).then(setCurrentSubject);
  }, [postId, setCurrentSubject]);

  useEffect(() => {
    handleUIsize();
  }, [handleUIsize]);

  // 유저데이터를 받아오는 effect
  useEffect(() => {
    const fetchSubject = async () => {
      const subject = await getSubjectById(postId);
      setSubject(subject);
    };
    fetchSubject();
  }, [postId]);
  if (!subject) return <div></div>;
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
              imageSrc={subject.imageSource}
              width="28"
              height="28"
            />
            <Modal.TextStyle>{subject.name}</Modal.TextStyle>
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
        userProfileImage={subject.imageSource}
        userName={subject.name}
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
          <PostCount questionCount={subject.questionCount} />
          <PostList postData={postData} setPostData={setPostData} />
          {isLoading && <Loding />}
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
