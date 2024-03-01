import styled from 'styled-components';
import { getTimeDifference } from 'utils/dateUtils';
import Avatar from 'components/common/Avatar';

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

const ProfileImage = styled(Avatar)`
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

  display: flex;
  align-items: center;
  gap: 6px;
`;

const Answer = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: var(--gray60);
  line-height: 22px;
`;

const QnAItem = ({ qnaData, userData }) => {
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
          <ProfileImage imageSrc={userData.imageSource} />
          <AnswerContent>
            <Nickname>
              {userData.name}
              <QuestionTitle>
                {getTimeDifference(qnaData.answer.createdAt)}
              </QuestionTitle>
            </Nickname>

            <Answer>{qnaData.answer.content}</Answer>
          </AnswerContent>
        </AnswerBox>
      )}
    </Container>
  );
};

export default QnAItem;
