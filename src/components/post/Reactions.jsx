import styled from 'styled-components';
import { useState } from 'react';
import Button from 'components/common/Button';
import * as Icons from 'components/common/Icons';

const ButtonsContainer = styled.div`
  display: flex;
  gap: 32px;
  border-top: 1px solid var(--gray30);
  padding-top: 32px;
`;

const LikeButton = styled(Button)`
  display: flex;
  gap: 6px;
  align-items: center;
  color: ${({ clicked }) => (clicked ? 'var(--blue)' : 'var(--gray40)')};
`;

const Reactions = ({ qnaData }) => {
  const [likeCount, setLikeCount] = useState(null);
  const [dislikeCount, setDislikeCount] = useState(null);

  const [likeClicked, setLikeClicked] = useState(false);
  const [dislikeClicked, setDislikeClicked] = useState(false);

  const handleLike = () => {
    setLikeCount(likeCount + 1);
    setLikeClicked(true);
  };

  const handleDislike = () => {
    setDislikeCount(dislikeCount + 1);
    setDislikeClicked(true);
  };

  return (
    <ButtonsContainer>
      <LikeButton varient="icon" onClick={handleLike} clicked={likeClicked}>
        <Icons.ThumbsUp clicked={likeClicked} />
        좋아요{likeCount}
      </LikeButton>
      <LikeButton
        varient="icon"
        onClick={handleDislike}
        clicked={dislikeClicked}
      >
        <Icons.ThumbsDown clicked={dislikeClicked} />
        싫어요{dislikeCount}
      </LikeButton>
    </ButtonsContainer>
  );
};

export default Reactions;
