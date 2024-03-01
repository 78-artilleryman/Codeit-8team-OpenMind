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

const PostItem = ({ qnaData }) => {
  return (
    <PostContainer>
      <div>
        <AnswerBadge isAnswered={true} />
      </div>
      <div>{qnaData && <QnAItem qnaData={qnaData} />}</div>
      <Reactions qnaData={qnaData} />
    </PostContainer>
  );
};

export default PostItem;
