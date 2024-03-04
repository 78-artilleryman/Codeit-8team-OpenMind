import styled from 'styled-components';
import { getTimeDifference } from 'utils/dateUtils';
import Avatar from 'components/common/Avatar';
import QuestionContent from 'components/post/QuestionContent';
import React from 'react';

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

const QnAItem = ({ qnaData, userData, isAnswerPage, isEdit }) => {
  if (!qnaData) {
    return <></>;
  }
  return (
    <>
      <Container>
        <QuestionContent
          subInformation="질문 ·"
          time={getTimeDifference(qnaData.createdAt)}
          textContents={qnaData.content}
          type="question"
        />
        {qnaData.answer && !isEdit && (
          <Answer>
            <ProfileImage imageSrc={userData.imageSource} />
            <QuestionContent
              subInformation={userData.name}
              time={getTimeDifference(qnaData.answer.createdAt)}
              textContents={
                qnaData.answer.isRejected === true
                  ? '답변거절'
                  : qnaData.answer.content
              }
              type={
                qnaData.answer.isRejected === true
                  ? 'rejected answer'
                  : 'answer'
              }
            />
          </Answer>
        )}
        {isAnswerPage && qnaData.answer && isEdit && (
          <Answer>
            <ProfileImage imageSrc={userData.imageSource} />
            <QuestionContent
              subInformation={userData.name}
              type="edit answer"
              textContents={qnaData.answer.content}
              answerId={qnaData.answer.id}
            />
          </Answer>
        )}
        {isAnswerPage && !qnaData.answer && (
          <Answer>
            <ProfileImage imageSrc={userData.imageSource} />
            <QuestionContent
              subInformation={userData.name}
              questionId={qnaData.id}
              type="create answer"
            />
          </Answer>
        )}
      </Container>
    </>
  );
};

export default QnAItem;
