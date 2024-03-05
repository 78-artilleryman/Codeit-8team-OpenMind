import styled from 'styled-components';
import AnswerBadge from './AnswerBadge';
import Reactions from './Reactions';
import QnAItem from './QnAItem';
import Kebab from 'components/post/Kebab';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import {
  createAnswer,
  deleteAnswer,
  deleteQuestion,
  editAnswer,
} from '../../api';

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

const PostItem = ({ qnaData }) => {
  const { pathname } = useLocation();
  const paths = pathname.split('/');
  const isAnswerPage = paths[paths.length - 1] === 'answer';

  const [isEdit, setIsEdit] = useState(false);

  const handleDeleteQuestion = () => {
    deleteQuestion(qnaData.id).then(() => window.location.reload());
  };

  const handleDeleteAnswer = () => {
    if (!qnaData.answer) alert('삭제할 답변이 없어요.😭');
    else deleteAnswer(qnaData.answer.id).then(() => window.location.reload());
  };

  const handleRejectAnswer = () => {
    if (!qnaData.answer) {
      createAnswer(qnaData.id, '답변 거절', true).then(() =>
        window.location.reload(),
      );
    } else {
      editAnswer(qnaData.answer.id, qnaData.answer.content, true).then(() =>
        window.location.reload(),
      );
    }
  };

  if (!qnaData) return <></>;

  return (
    <PostContainer>
      <HeadContainer>
        <AnswerBadge isAnswered={qnaData.answer} />
        {isAnswerPage && (
          <Kebab
            onEditClick={() => {
              if (!qnaData.answer) alert('수정할 답변이 없어요.😭');
              else setIsEdit(true);
            }}
            onDeleteQuestionClick={handleDeleteQuestion}
            onDeleteAnswerClick={handleDeleteAnswer}
            onRejectClick={handleRejectAnswer}
          />
        )}
      </HeadContainer>
      <div>
        {qnaData && (
          <QnAItem
            qnaData={qnaData}
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
