import styled from 'styled-components';
import { getTimeDifference } from 'utils/dateUtils';
import Avatar from 'components/common/Avatar';
import QuestionContent from 'components/post/QuestionContent';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const Answer = styled.div`
  display: flex;
  gap: 12px;
`;

const ProfileImage = styled(Avatar)`
  width: 48px;
  height: 48px;
`;

const QnAItem = ({ qnaData, userData }) => {
  if (!qnaData) {
    return <></>;
  }
  return (
    <Container>
      <QuestionContent
        subInformation="질문 ·"
        time={getTimeDifference(qnaData.createdAt)}
        textContents={qnaData.content}
      />
      {qnaData.answer && (
        <Answer>
          <ProfileImage imageSrc={userData.imageSource} />
          <QuestionContent
            subInformation={userData.name}
            time={getTimeDifference(qnaData.answer.createdAt)}
            textContents={qnaData.answer.content}
            type="answer"
          />
        </Answer>
      )}
    </Container>
  );
};

export default QnAItem;
