import styled from 'styled-components';
import { useState } from 'react';
import Button from 'components/common/Button';
import * as Icons from 'components/common/Icons';
import { postQuestionsReaction } from '../../api';

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
  color: ${({ $clicked }) => ($clicked ? 'var(--blue)' : 'var(--gray40ToGray20)')};
`;

const Reactions = ({ qnaData }) => {
  const [likeClicked, setLikeClicked] = useState(false);
  const [dislikeClicked, setDislikeClicked] = useState(false);

  const handleLike = () => {
    if (!likeClicked) {
      postQuestionsReaction(qnaData.id, 'like');
      setLikeClicked(true);
    }
  };

  const handleDislike = () => {
    if (!dislikeClicked) {
      postQuestionsReaction(qnaData.id, 'dislike');
      setDislikeClicked(true);
    }
  };

  if (!qnaData) return <></>;
  return (
    <ButtonsContainer>
      <LikeButton varient="icon" onClick={handleLike} $clicked={likeClicked}>
        <Icons.ThumbsUp $clicked={likeClicked} />
        좋아요 {likeClicked && qnaData.like + 1}
      </LikeButton>
      <LikeButton
        varient="icon"
        onClick={handleDislike}
        $clicked={dislikeClicked}
      >
        <Icons.ThumbsDown $clicked={dislikeClicked} />
        싫어요 {dislikeClicked && qnaData.dislike + 1}
      </LikeButton>
    </ButtonsContainer>
  );
};

export default Reactions;
