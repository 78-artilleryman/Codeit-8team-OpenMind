import React from 'react';
import styled from 'styled-components';
import AnswerInputForm from './AnswerInputForm';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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
    type === 'question' ? 'var(--gray40)' : 'var(--gray60)'};
`;

const TimeText = styled(SubText)`
  color: var(--gray40);
`;

const TextContents = styled.div`
  font-size: 18px;
  font-weight: 400;
  color: ${({ type }) =>
    type === 'rejected answer' ? 'var(--red)' : 'var(--gray60)'};
`;

const QuestionContent = ({
  subInformation,
  time,
  textContents,
  type,
  questionId,
  answerId,
}) => {
  return (
    <Container>
      <SubInformation>
        <SubText type={type}>{subInformation}</SubText>
        <TimeText>{time}</TimeText>
      </SubInformation>
      {type === 'create answer' ? (
        <AnswerInputForm
          questionId={questionId}
          placeholder="답변을 입력해주세요"
          buttonText="답변 완료"
          type={type}
        />
      ) : type === 'edit answer' ? (
        <AnswerInputForm
          questionId={questionId}
          buttonText="수정 완료"
          type={type}
          answerId={answerId}
        >
          {textContents}
        </AnswerInputForm>
      ) : (
        <TextContents type={type}>{textContents}</TextContents>
      )}
    </Container>
  );
};

export default QuestionContent;
