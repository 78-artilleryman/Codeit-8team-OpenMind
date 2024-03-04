import styled from 'styled-components';
import { useState } from 'react';
import * as Icons from 'components/common/Icons';
import Button from 'components/common/Button';
import KebabOptions from 'components/post/KebabOptions';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const KebabButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;

  &:hover {
    border: 1px solid var(--gray30);
    background-color: var(--gray30);
  }
`;

const Kebab = ({
  onEditClick,
  onDeleteQuestionClick,
  onDeleteAnswerClick,
  onRejectClick,
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleToggle = () => {
    setIsClicked(!isClicked);
  };

  return (
    <Container>
      <KebabButton varient="icon" onClick={handleToggle}>
        <Icons.Kebab />
      </KebabButton>
      <>
        {isClicked && (
          <KebabOptions
            isClick={isClicked}
            onEditClick={onEditClick}
            onDeleteQuestionClick={onDeleteQuestionClick}
            onDeleteAnswerClick={onDeleteAnswerClick}
            onRejectClick={onRejectClick}
          />
        )}
      </>
    </Container>
  );
};

export default Kebab;
