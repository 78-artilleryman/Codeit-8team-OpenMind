import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SubInformation = styled.div`
  display: flex;
  gap: 6px;
`;

const SubText = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: ${({ type }) =>
    type === 'answer' ? 'var(--gray60)' : 'var(--gray40)'};
`;

const TimeText = styled(SubText)`
  color: var(--gray40);
`;

const TextContents = styled.div`
  font-size: 18px;
  font-weight: 400;
  color: var(--gray60);
`;
const QuestionContent = ({ subInformation, time, textContents, type }) => {
  return (
    <Container>
      <SubInformation>
        <SubText type={type}>{subInformation}</SubText>
        <TimeText>{time}</TimeText>
      </SubInformation>
      <TextContents>{textContents}</TextContents>
    </Container>
  );
};

export default QuestionContent;
