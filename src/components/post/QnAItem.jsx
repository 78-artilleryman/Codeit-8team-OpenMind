import styled from 'styled-components';
import { getTimeDifference } from 'utils/dateUtils';
import Avatar from 'components/common/Avatar';
import QuestionContent from 'components/post/QuestionContent';
import React from 'react';
import { useSubject } from 'context/subjectContext';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const Answer = styled.div`
  display: flex;
  gap: 12px;
`;

const ProfileImage = styled(Avatar)``;

const QnAImageSize = 48;

const QnAItem = ({ qnaData, isAnswerPage, isEdit }) => {
  const { currentSubject } = useSubject();

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

            <ProfileImage
              imageSrc={userData.imageSource}
              width={QnAImageSize}
              height={QnAImageSize}
            />

            <QuestionContent
              subInformation={currentSubject.name}
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
            <ProfileImage
              imageSrc={userData.imageSource}
              width={QnAImageSize}
              height={QnAImageSize}
            />

            <QuestionContent
              subInformation={currentSubject.name}
              type="edit answer"
              textContents={qnaData.answer.content}
              answerId={qnaData.answer.id}
            />
          </Answer>
        )}
        {isAnswerPage && !qnaData.answer && (
          <Answer>
            <ProfileImage
              imageSrc={userData.imageSource}
              width={QnAImageSize}
              height={QnAImageSize}
            />

            <QuestionContent
              subInformation={currentSubject.name}
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
