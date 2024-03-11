import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Button from 'components/common/Button';
import * as Icons from 'components/common/Icons';
import { getQuestionsById, postQuestionsReaction } from '../../api';
import {
  setDislikeLocalStorage,
  setLikeLocalStorage,
} from 'utils/useLocalStorage';

const ButtonsContainer = styled.div`
  display: flex;
  gap: 32px;
  border-top: 1px solid var(--gray40ToGray20);
  padding-top: 32px;
`;

const LikeButton = styled(Button)`
  display: flex;
  gap: 6px;
  align-items: center;
  color: ${({ $clicked }) =>
    $clicked ? 'var(--blue)' : 'var(--gray40ToGray20)'};
`;

const Reactions = ({ qnaData, setPostData, postId }) => {
  const [likeClicked, setLikeClicked] = useState(false);
  const [dislikeClicked, setDislikeClicked] = useState(false);

  const handleLike = () => {
    if (!likeClicked) {
      postQuestionsReaction(qnaData.id, 'like')
        .then(() => getQuestionsById(postId))
        .then(res => {
          const { results } = res;
          setPostData(() => results);
          setLikeLocalStorage(qnaData.id);
          setLikeClicked(true);
        })
        .catch(error => {
          // 오류 처리
          console.error('좋아요 반응을 보내는 데 문제가 생겼습니다', error);
        });
    }
  };

  const handleDislike = () => {
    if (!dislikeClicked) {
      postQuestionsReaction(qnaData.id, 'dislike')
        .then(() => getQuestionsById(postId))
        .then(res => {
          const { results } = res;
          setPostData(() => results);
          setDislikeLocalStorage(qnaData.id);
          setDislikeClicked(true);
        })
        .catch(error => {
          // 오류 처리
          console.error('싫어요 반응을 보내는 데 문제가 생겼습니다', error);
        });
    }
  };

  useEffect(() => {
    if (
      localStorage.getItem('like') &&
      localStorage.getItem('like').includes(qnaData.id)
    ) {
      setLikeClicked(true);
    }
    if (
      localStorage.getItem('dislike') &&
      localStorage.getItem('dislike').includes(qnaData.id)
    ) {
      setDislikeClicked(true);
    }
  }, []);

  if (!qnaData) return <></>;
  return (
    <ButtonsContainer>
      <LikeButton varient="icon" onClick={handleLike} $clicked={likeClicked}>
        <Icons.ThumbsUp $clicked={likeClicked} />
        좋아요 {likeClicked && qnaData.like}
      </LikeButton>
      <LikeButton
        varient="icon"
        onClick={handleDislike}
        $clicked={dislikeClicked}
      >
        <Icons.ThumbsDown $clicked={dislikeClicked} />
        싫어요 {dislikeClicked && qnaData.dislike}
      </LikeButton>
    </ButtonsContainer>
  );
};

export default Reactions;
