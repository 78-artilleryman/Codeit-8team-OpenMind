import styled from 'styled-components';
import { getTimeDifference } from 'utils/dateUtils';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const QuestionBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const QuestionTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: var(--gray40);
`;

const Question = styled.div`
  font-size: 18px;
  font-weight: 400;
  color: var(--gray60);
`;

const AnswerBox = styled.div`
  display: flex;
  gap: 12px;
`;

const ProfileImage = styled.div`
  width: 48px;
  height: 48px;
`;

const AnswerContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Nickname = styled.div`
  font-size: 18px;
  font-weight: 400;
  color: var(--gray60);
`;

const Answer = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: var(--gray60);
  line-height: 22px;
`;

const QnAItem = ({ qnaData }) => {
  if (!qnaData) {
    return <></>;
  }
  return (
    <Container>
      <QuestionBox>
        <QuestionTitle>
          질문 · {getTimeDifference(qnaData.createdAt)}
        </QuestionTitle>
        <Question>{qnaData.content}</Question>
      </QuestionBox>
      {qnaData.answer && (
        <AnswerBox>
          <ProfileImage>{qnaData.profileImage}</ProfileImage>
          <AnswerContent>
            <Nickname>{qnaData.name}</Nickname>
            <Answer>{qnaData.answer}</Answer>
          </AnswerContent>
        </AnswerBox>
      )}
    </Container>
  );
};

export default QnAItem;
