import styled from 'styled-components';
import AnswerBadge from './AnswerBadge';
import Reactions from './Reactions';
import QnAItem from './QnAItem';

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px;
  gap: 32px;

  border-radius: 16px;
  background-color: #ffffff;
  box-shadow: 0px 4px 4px 0px #8c8c8c40;
`;

const PostItem = ({ qnaData, userData }) => {
  if (!qnaData) return <></>;

  return (
    <PostContainer>
      <div>
        <AnswerBadge isAnswered={qnaData.answer} />
      </div>
      <div>{qnaData && <QnAItem qnaData={qnaData} userData={userData} />}</div>
      <Reactions qnaData={qnaData} />
    </PostContainer>
  );
};

export default PostItem;
