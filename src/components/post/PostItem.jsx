import styled from 'styled-components';
import AnswerBadge from './AnswerBadge';
import Reactions from './Reactions';
import QnAItem from './QnAItem';
import Kebab from 'components/post/Kebab';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px;
  gap: 32px;

  border-radius: 16px;
  background-color: #ffffff;
  box-shadow: 0px 4px 4px 0px #8c8c8c40;
`;

const HeadContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PostItem = ({ qnaData, userData }) => {
  const { pathname } = useLocation();
  const paths = pathname.split('/');
  const isAnswerPage = paths[paths.length - 1] === 'answer';

  const [isEdit, setIsEdit] = useState(false);

  if (!qnaData) return <></>;

  return (
    <PostContainer>
      <HeadContainer>
        <AnswerBadge isAnswered={qnaData.answer} />
        {isAnswerPage && <Kebab onEditClick={() => setIsEdit(true)} />}
      </HeadContainer>
      <div>
        {qnaData && (
          <QnAItem
            qnaData={qnaData}
            userData={userData}
            isAnswerPage={isAnswerPage}
            isEdit={isEdit}
          />
        )}
      </div>
      <Reactions qnaData={qnaData} />
    </PostContainer>
  );
};

export default PostItem;
