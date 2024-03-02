import styled from 'styled-components';

const StyledTitle = styled.div`
  font-size: 20px;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: var(--brown40);
`;

const PostCount = ({ questionCount }) => {
  const questionExistence =
    questionCount === 0
      ? '아직 질문이 없습니다.'
      : `${questionCount}개의 질문이 있습니다.`;

  return (
    <StyledTitle>
      <img src="/icons/Messages.svg" alt="Message Icon" />
      {questionExistence}
    </StyledTitle>
  );
};

export default PostCount;
